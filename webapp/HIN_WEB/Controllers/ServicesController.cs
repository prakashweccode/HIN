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
    public class ServicesController : ControllerBase
    {[Route("OdataVwServices")]
        [HttpGet]
        public async Task<ActionResult> OdataVwServices()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataServices" + urlParams;
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
        [Route("AddOrUpdateService")]
        [HttpPost]
        public async Task<ActionResult> AddOrUpdateService(Services service)
        {
            string apiPath = "Services/AddOrUpdateService";
            var response = await DataManager.PostData(apiPath, service).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Services>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("UpdateServicePipelineStatus/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Services>> UpdateServicePipelineStatus(int id, [FromBody] int statusId)
        {
            try
            {
                Services service = new Services();
                string apiPath = string.Format("Services/UpdateServicePipelineStatus?id={0}&statusId={1}", id, statusId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    service = JsonConvert.DeserializeObject<Services>(content);
                    return Ok(service);
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


        [Route("GetServiceById")]
        [HttpGet]
        public async Task<ActionResult> GetServiceById(int id)
        {
            string apiPath = "Services/GetServiceById?id=" + id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Services>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetAllServices")]
        [HttpGet]
        public async Task<ActionResult> GetAllServices()
        {
            string apiPath = "Services/GetAllServices";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<Services>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetAllLeadServices")]
        [HttpGet]
        public async Task<ActionResult> GetAllLeadServices(int leadId)
        {
            string apiPath = "Services/GetAllLeadServices?leadId="+leadId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<Services>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetAllEventAppointment")]
        [HttpGet]
        public async Task<ActionResult> GetAllEventAppointment(int eventId)
        {
            string apiPath = "Services/GetAllEventAppointment?eventId=" + eventId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<Services>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetAllDealServices")]
        [HttpGet]
        public async Task<ActionResult> GetAllDealServices(int dealId)
        {
            string apiPath = "Services/GetAllDealServices?dealId=" + dealId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<Services>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetServiceByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Services>>> GetServiceByPipeLineGroupId(int id)
        {
            List<Services> listServices = new List<Services>();
            string api = string.Format("Services/GetServiceByPipeLineGroupId?id=" + id);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listServices = JsonConvert.DeserializeObject<List<Services>>(content);
                return Ok(listServices);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("UpdateServicePipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Services>> UpdateServicePipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                Services service = new Services();
                string apiPath = string.Format("Services/UpdateServicePipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    service = JsonConvert.DeserializeObject<Services>(content);
                    return Ok(service);
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
        [Route("GetStepDetails")]
        [HttpGet]
        public async Task<ActionResult<Tuple<Deal, List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>>>>> GetStepDetails(int serviceId)
        {
            string apiPath = "Services/GetStepDetails?serviceId=" + serviceId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<Tuple<Deal, List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>>>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("UpdateStatusId/{serviceId}")]
        [HttpPatch]
        public async Task<ActionResult<Deal>> UpdateStatusId(int serviceId, [FromBody] int statusId)
        {
            try
            {
                string apiPath = string.Format("Services/UpdateStatusId?serviceId={0}&statusId={1}", serviceId, statusId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<Services>(content);
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
        [Route("UpdateCancelReason")]
        [HttpPost]
        public async Task<ActionResult<Services>> UpdateCancelReason(Services service)
        {
            try
            {
                string apiPath = string.Format("Services/UpdateCancelReason");
                HttpResponseMessage response = await DataManager.PostData(apiPath, service).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<Services>(content);
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
        [Route("GetServiceStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetServiceStatus()
        {
            try
            {
                string apiPath = string.Format("Services/GetReason");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<IEnumerable<CustomDropDown>>(content);
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

        [Route("GetAllTemplateList")]
        [HttpGet]
        public async Task<ActionResult> GetAllTemplateList()
        {
            string apiPath = "Services/GetAllTemplateList";
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
        [Route("GetTemplateListById")]
        [HttpGet]
        public async Task<ActionResult> GetTemplateListById(int templateId)
        {
            string apiPath = "Services/GetTemplateListById?templateId=" + templateId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<TemplateList>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
