using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadController : ControllerBase
    {
        // GET: api/<LeadController>

        [Route("GetLeadById")]
        [HttpGet]
        public async Task<ActionResult<Lead>> GetDealById(int leadId)
        {
            try
            {
                string apiPath = string.Format("Leads/GetLeadById?leadId={0}", leadId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var leadInfo = JsonConvert.DeserializeObject<Lead>(content);
                    return Ok(leadInfo);
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

        [Route("GetUserLeadIds")]
        [HttpGet]
        public async Task<ActionResult<int?[]>> GetUserLeadIds(int userId)
        {
            try
            {
                string apiPath = string.Format("Leads/GetUserLeadIds?userId={0}", userId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var leadIds = JsonConvert.DeserializeObject<int?[]>(content);
                    return Ok(leadIds);
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

        [Route("GetLeadByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadByPipeLineGroupId(int id)
        {
            List<Lead> listLead = new List<Lead>();
            string api = string.Format("Leads/GetLeadByPipeLineGroupId?id=" + id);
            HttpResponseMessage response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listLead = JsonConvert.DeserializeObject<List<Lead>>(content);
                return Ok(listLead);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("UpdateLeadPipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Lead>> UpdateLeadPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                Lead lead = new Lead();
                string apiPath = string.Format("Leads/UpdateLeadPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lead = JsonConvert.DeserializeObject<Lead>(content);
                    return Ok(lead);
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

        [Route("GetLeadsByEntityOrigin")]
        [HttpGet]
        public async Task<ActionResult<List<Lead>>> GetLeadsByEntityOrigin(int entityId, int originId)
        {
            try
            {
                List<Lead> leads = new List<Lead>();
                string apiPath = string.Format("Leads/GetLeadsByEntityOrigin?entityId=" + entityId + "&originId=" + originId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leads = JsonConvert.DeserializeObject<List<Lead>>(content);
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


        [Route("GetLeadsByPartnerId")]
        [HttpGet]
        public async Task<ActionResult<List<Lead>>> GetLeadsByPartnerId(int partnerId)
        {
            try
            {
                List<Lead> leads = new List<Lead>();
                string apiPath = string.Format("Leads/GetLeadsByPartnerId?partnerId=" + partnerId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leads = JsonConvert.DeserializeObject<List<Lead>>(content);
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

        [Route("GetLeadsByReferralId")]
        [HttpGet]
        public async Task<ActionResult<List<Lead>>> GetLeadsByReferralId(int referralId)
        {
            try
            {
                List<Lead> leads = new List<Lead>();
                string apiPath = string.Format("Leads/GetLeadsByReferralId?referralId=" + referralId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leads = JsonConvert.DeserializeObject<List<Lead>>(content);
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


        [Route("GetAllLeads")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetAsync()
        {
            try
            {
                IEnumerable<Lead> leads = new List<Lead>();
                string apiPath = string.Format("Leads");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leads = JsonConvert.DeserializeObject<List<Lead>>(content);
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

        [Route("GetLeadOriginType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadOriginType>>> GetLeadOriginType()
        {
            try
            {
                IEnumerable<LeadOriginType> leadOriginType = new List<LeadOriginType>();
                string apiPath = string.Format("Leads/GetLeadOriginType");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leadOriginType = JsonConvert.DeserializeObject<List<LeadOriginType>>(content);
                    return Ok(leadOriginType);
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

        [Route("GetIndustryType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndustryType>>> GetIndustryType()
        {
            try
            {
                IEnumerable<IndustryType> industryType = new List<IndustryType>();
                string apiPath = string.Format("Leads/GetIndustryType");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    industryType = JsonConvert.DeserializeObject<List<IndustryType>>(content);
                    return Ok(industryType);
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

        [Route("GetLeadStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadStatus>>> GetLeadStatus()
        {
            try
            {
                IEnumerable<LeadStatus> leadStatus = new List<LeadStatus>();
                string apiPath = string.Format("Leads/GetLeadStatus");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leadStatus = JsonConvert.DeserializeObject<List<LeadStatus>>(content);
                    return Ok(leadStatus);
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

        [Route("GetSocialMediaType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMediaType>>> GetSocialMediaType()
        {
            try
            {
                IEnumerable<SocialMediaType> socialMediaType = new List<SocialMediaType>();
                string apiPath = string.Format("Leads/GetSocialMediaType");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    socialMediaType = JsonConvert.DeserializeObject<List<SocialMediaType>>(content);
                    return Ok(socialMediaType);
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
        // GET api/<LeadController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<LeadController>
        [HttpPost]
        public async Task<ActionResult<Lead>> PostAsync([FromBody] Lead lead)
        {
            try
            {
                string apiPath = string.Format("Leads");
                HttpResponseMessage response = await DataManager.PostData(apiPath, lead).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lead = JsonConvert.DeserializeObject<Lead>(content);
                    return Ok(lead);
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

        // PUT api/<LeadController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LeadController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [Route("GetODataLeadList")]
        [HttpGet]
        public async Task<ActionResult> GetODataLeadList()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataLead" + urlParams + "$expand=deal";
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


        [Route("UpdateStatus")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> UpdateStatus(Bulkassign bulkassign)
        {
            try
            {
                List<Lead> lstLead = new List<Lead>();
                string apiPath = string.Format("Leads/UpdateStatus");
                HttpResponseMessage response = await DataManager.PostData(apiPath, bulkassign).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lstLead = JsonConvert.DeserializeObject<List<Lead>>(content);
                    return Ok(lstLead);
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

        [Route("UpdateSecurityGroup")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> UpdateSecurityGroup(Bulkassign bulkassign)
        {
            try
            {
                List<Lead> lstLead = new List<Lead>();
                string apiPath = string.Format("Leads/UpdateSecurityGroup");
                HttpResponseMessage response = await DataManager.PostData(apiPath, bulkassign).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lstLead = JsonConvert.DeserializeObject<List<Lead>>(content);
                    return Ok(lstLead);
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

        [Route("UpdateAssignedToId")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> UpdateAssignedToId(Bulkassign bulkassign)
        {
            try
            {
                List<Lead> lstLead = new List<Lead>();
                string apiPath = string.Format("Leads/UpdateAssignedToId");
                HttpResponseMessage response = await DataManager.PostData(apiPath, bulkassign).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lstLead = JsonConvert.DeserializeObject<List<Lead>>(content);
                    return Ok(lstLead);
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

        [Route("ApprovePatient")]
        [HttpPost]
        public async Task<ActionResult<TempPatient>> ApprovePatient(TempPatient tempPatient)
        {
            try
            {
                string apiPath = string.Format("Leads/ApprovePatient");
                HttpResponseMessage response = await DataManager.PostData(apiPath, tempPatient).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    tempPatient = JsonConvert.DeserializeObject<TempPatient>(content);
                    return Ok(tempPatient);
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

        [Route("GetTempPatientById")]
        [HttpGet]
        public async Task<ActionResult> GetTempPatientById(int id)
        {
            string apiPath = "Leads/GetTempPatientById?id=" + id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<TempPatient>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

    }
}
