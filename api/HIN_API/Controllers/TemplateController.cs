using Dapper;
using HIN_API.Models;
using HIN_API.Models.DTO;
using HIN_API.Query;
using HIN_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly TenantContext _context;
        private IEmailSender _emailSender;
        public TemplateController(TenantContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        [HttpPost]
        [Route("SaveDraftTemplate")]
        public async Task<Models.Template> SaveDraftTemplate(Models.Template template)
        {
            try
            {
                template.CreatedBy = User.Identity.Name;
                template.CreatedOn = DateTime.Now;
                await _context.Template.AddAsync(template);
                await _context.SaveChangesAsync();
                return template;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("SendTemplateMail")]
        public async Task<TemplateMailRequest> SendTemplateMail(TemplateMailRequest template)
        {
            try
            {
                if (!string.IsNullOrEmpty(template.MailId))
                {
                    await _emailSender.SendMailMessage(template.MailId, template.Appointment, template.HtmlBody);
                }
                return template;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        [Route("AddOrUpdateTemplate")]
        public async Task<Models.Template> AddOrUpdateTemplate(Models.Template template)
        {
            try
            {
                if (template.Id > 0)
                {
                    _context.Template.Update(template);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    template.CreatedBy = User.Identity.Name;
                    template.CreatedOn = DateTime.Now;
                    await _context.Template.AddAsync(template);
                    await _context.SaveChangesAsync();
                }
                return template;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("GetTemplateById")]
        public async Task<Models.Template> GetTemplateById(int id)
        {
            try
            {
                return await _context.Template.Where(w => w.Id == id).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet]
        [Route("GetTemplatePageById")]
        public async Task<Models.TemplateList> GetTemplatePageById(int id)
        {
            try
            {
                return await _context.TemplateList.Where(w => w.Id == id).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet]
        [Route("GetDefaultData")]
        public async Task<ActionResult> GetDefaultData()
        {
            try
            {
                var appointments = await _context.Services.Select(x => new { x.Id, x.ServiceNumber, x.Lead.LeadName }).ToArrayAsync();
                var templates = await _context.TemplateList.Select(x => new { x.Id, x.TemplateName }).ToArrayAsync();
                return Ok(new Tuple<Array, Array>(appointments, templates));
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet]
        [Route("GetSelectedAppointmentDetail")]
        public async Task<ActionResult> GetSelectedAppointmentDetail(int id)
        {
            try
            {
                string sql = $"select s.ServiceNumber as AppointmentNumber,s.StartDate as AppointmentDate, d.DealName as PracticeName, d.DealNumber as PracticeNumber,l.LeadNumber, l.BatchNumber as PatientEmr, (l.LeadName + ' ' + l.PatientLastName) as PatientName,g.GenderName,l.DOB,l.Occupation,l.Age, d.[Address] from [Services] s Left Join Deal d on s.DealId = d.DealId Left Join [Lead] l on s.LeadId = l.LeadId left Join Gender g on l.GenderId = g.GenderId Where s.Id = {id}";
                dynamic data;
                using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
                {
                    data = await con.QuerySingleOrDefaultAsync(sql);
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Route("GetAllPractice")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetAllPractice()
        {
            return await _context.Deal.ToListAsync();
        }

    }
}
