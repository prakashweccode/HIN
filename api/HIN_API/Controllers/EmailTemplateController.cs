using HIN_API.Models;
using HIN_API.Models.DTO;
using HIN_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailTemplateController : ControllerBase
    {
        private readonly TenantContext _context;
        private IEmailSender _emailSender;
        public EmailTemplateController(TenantContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }
        [Route("GetAllEmailTemplates")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailTemplate>>> GetAllEmailTemplates()
        {
            try
            {
                return await _context.EmailTemplate.ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }

        [Route("GetEmailTemplateById")]
        [HttpGet]
        public async Task<ActionResult<EmailTemplate>> GetDealById(int id)
        {
            return await _context.EmailTemplate.FindAsync(id);
        }


        [Route("GetAllEmailTemplatesNames")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailTemplate>>> GetAllEmailTemplatesNames()
        {
            try
            {
                List<EmailTemplateName> lstEmailTemplateNames = new List<EmailTemplateName>();
                string dbScript = $@"select Et.TemplateName as TemplateName, Et.TemplateId as TemplateId from EmailTemplate as Et";
                lstEmailTemplateNames = await _context.Query<EmailTemplateName>().FromSqlRaw(dbScript).ToListAsync();
                List<EmailTemplate> lstEmailTemplate = new List<EmailTemplate>();
                foreach (var emailTemplate in lstEmailTemplateNames)
                {
                    EmailTemplate emailTemplatesName = new EmailTemplate();
                    emailTemplatesName.TemplateId = emailTemplate.TemplateId;
                    emailTemplatesName.TemplateName = emailTemplate.TemplateName;
                    lstEmailTemplate.Add(emailTemplatesName);
                }
                return lstEmailTemplate;
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }

        [Route("GetContactsForGroup")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetContactsForGroup(int groupId)
        {
            try
            {
                var contactIds = await _context.ContactGroup.Where(w => w.GroupId == groupId).Select(s => s.ContactId).ToArrayAsync();
                if (contactIds != null)
                {
                    var contacts = await _context.ContactInformation.Where(w => contactIds.Contains(w.Id)).ToListAsync();
                    return contacts;
                }
                else
                    return NoContent();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("GetAllTemplateNames")]
        [HttpGet]
        public async Task<ActionResult<List<string>>> GetAllTemplateNames()
        {
            try
            {
                return await _context.EmailTemplate.Select(s=>s.TemplateName.ToLower()).ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("SaveEmailTemplate")]
        [HttpPost]
        public async Task<ActionResult<EmailTemplate>> SaveEmailTemplate(EmailTemplate emailTemplate)
        {
            try
            {
                if(emailTemplate.TemplateId > 0)
                {
                    _context.EmailTemplate.Update(emailTemplate);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    _context.EmailTemplate.Add(emailTemplate);
                    await _context.SaveChangesAsync();
                }
                return Ok(emailTemplate);
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("SendBatchEmail")]
        [HttpPost]
        public async Task<ActionResult> SendBatchEmail(BatchEmailSender batchEmail)
        {
            try
            {
                string content = string.Empty;
                if(batchEmail.TemplateId !=null && batchEmail.TemplateId > 0)
                {
                    content = _context.EmailTemplate.FirstOrDefault(x => x.TemplateId == batchEmail.TemplateId).TemplateHtml;
                }
                else
                {
                    content = batchEmail.ContentHtml;
                }
                SendEmailToContacts(batchEmail.Contacts, batchEmail.Subject, content);
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        private async void SendEmailToContacts(List<ContactInformation> lstContacts, string subject, string content)
        {
            foreach (var data in lstContacts)
            {
                if (!string.IsNullOrEmpty(data.Email))
                {
                    await _emailSender.SendMailMessage(data.Email, subject, content);
                }
            }
        }
        [Route("SendEmailsToGroups")]
        [HttpPost]
        public async Task<ActionResult> SendEmailsToGroups(BatchEmailSender batchEmail)
        {
            try
            {
                string content = string.Empty;
                if (batchEmail.TemplateId != null && batchEmail.TemplateId > 0)
                {
                    content = _context.EmailTemplate.FirstOrDefault(x => x.TemplateId == batchEmail.TemplateId).TemplateHtml;
                }
                else
                {
                    content = batchEmail.ContentHtml;
                }
                foreach (var data in batchEmail.Groups)
                {
                    var contactIds = _context.ContactGroup.Where(w => w.GroupId == data.Id).Select(s => s.ContactId).ToArray();
                    if (contactIds != null)
                    {
                        var lstContacts = _context.ContactInformation.Where(w => contactIds.Contains(w.Id)).ToList();
                        SendEmailToContacts(lstContacts, batchEmail.Subject, content);
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
    }
}
