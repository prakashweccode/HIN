using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailTemplateController : ControllerBase
    {
        [Route("SaveEmailTemplate")]
        [HttpPost]
        public async Task<ActionResult<EmailTemplate>> SaveEmailTemplate(EmailTemplate emailTemplate)
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/SaveEmailTemplate");
                HttpResponseMessage response = await DataManager.PostData(apiPath, emailTemplate).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    emailTemplate = JsonConvert.DeserializeObject<EmailTemplate>(content);
                    return Ok(emailTemplate);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("SendBatchEmail")]
        [HttpPost]
        public async Task<ActionResult<BatchEmailSender>> SendBatchEmail(BatchEmailSender batchEmailSender)
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/SendBatchEmail");
                HttpResponseMessage response = await DataManager.PostData(apiPath, batchEmailSender).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    batchEmailSender = JsonConvert.DeserializeObject<BatchEmailSender>(content);
                    return Ok();
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }
        [Route("SendEmailsToGroups")]
        [HttpPost]
        public async Task<ActionResult<BatchEmailSender>> SendEmailsToGroups(BatchEmailSender batchEmailSender)
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/SendEmailsToGroups");
                HttpResponseMessage response = await DataManager.PostData(apiPath, batchEmailSender).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    batchEmailSender = JsonConvert.DeserializeObject<BatchEmailSender>(content);
                    return Ok();
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }


        [Route("GetAllTemplateNames")]
        [HttpGet]
        public async Task<ActionResult<List<string>>> GetAllTemplateNames()
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/GetAllTemplateNames");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<List<string>>(content);
                    return Ok(result);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("GetAllEmailTemplatesNames")]
        [HttpGet]
        public async Task<ActionResult<List<EmailTemplate>>> GetAllEmailTemplatesNames()
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/GetAllEmailTemplatesNames");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<List<EmailTemplate>>(content);
                    return Ok(result);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("GetEmailTemplateById")]
        [HttpGet]
        public async Task<ActionResult<EmailTemplate>> GetEmailTemplateById(int id)
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/GetEmailTemplateById?id={0}", id);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var emailTemplate = JsonConvert.DeserializeObject<EmailTemplate>(content);
                    return Ok(emailTemplate);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("GetContactsForGroup")]
        [HttpGet]
        public async Task<ActionResult<List<ContactInformation>>> GetContactsForGroup(int groupId)
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/GetContactsForGroup?groupId={0}", groupId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<List<ContactInformation>>(content);
                    return Ok(result);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("GetAllEmailTemplates")]
        [HttpGet]
        public async Task<ActionResult<List<EmailTemplate>>> GetAllEmailTemplates()
        {
            try
            {
                string apiPath = string.Format("EmailTemplate/GetAllEmailTemplates");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<List<EmailTemplate>>(content);
                    return Ok(result);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }
    }
}
