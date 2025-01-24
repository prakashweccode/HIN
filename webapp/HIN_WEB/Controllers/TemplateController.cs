using HIN_WEB.Helper;
using HIN_WEB.Models;
using HIN_WEB.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System;
using System.Threading.Tasks;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        [Route("OdataVwTemplate")]
        [HttpGet]
        public async Task<ActionResult> OdataVwTemplate()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataTemplate" + urlParams;
            var response = await DataManager.GetOData(apiPath).ConfigureAwait(false);
            if (response.Success)
            {
                return Ok(response.Body);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("SaveDraftTemplate")]
        [HttpPost]
        public async Task<ActionResult> SaveDraftTemplate(Template template)
        {
            string apiPath = "Template/SaveDraftTemplate";
            var response = await DataManager.PostData(apiPath, template).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Template>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("SendTemplateMail")]
        [HttpPost]
        public async Task<ActionResult> SendTemplateMail(TemplateMailRequest template)
        {
            string apiPath = "Template/SendTemplateMail";
            var response = await DataManager.PostData(apiPath, template).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<TemplateMailRequest>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("AddOrUpdateTemplate")]
        [HttpPost]
        public async Task<ActionResult> AddOrUpdateTemplate(Template template)
        {
            string apiPath = "Template/AddOrUpdateTemplate";
            var response = await DataManager.PostData(apiPath, template).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Template>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetTemplateById")]
        [HttpGet]
        public async Task<ActionResult> GetTemplateById(int id)
        {
            string apiPath = "Template/GetTemplateById?id=" + id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Template>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetTemplatePageById")]
        [HttpGet]
        public async Task<ActionResult> GetTemplatePageById(int id)
        {
            string apiPath = "Template/GetTemplatePageById?id=" + id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetDefaultData")]
        [HttpGet]
        public async Task<ActionResult> GetDefaultData()
        {
            string apiPath = "Template/GetDefaultData";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetSelectedAppointmentDetail")]
        [HttpGet]
        public async Task<ActionResult> GetSelectedAppointmentDetail(int id)
        {
            string apiPath = "Template/GetSelectedAppointmentDetail?id="+ id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetAllPractice")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetAllPractice()
        {
            try
            {
                IEnumerable<Deal> leads = new List<Deal>();
                string apiPath = string.Format("Template/GetAllPractice");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leads = JsonConvert.DeserializeObject<List<Deal>>(content);
                    return Ok(leads);
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
