using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        [Route("SavePartner")]
        [HttpPost]
        public async Task<ActionResult<Partner>> PostAsync(Partner Partners)
        {
            try
            {
                string apiPath = string.Format("Partner/SavePartner");
                HttpResponseMessage response = await DataManager.PostData(apiPath, Partners).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    Partners = JsonConvert.DeserializeObject<Partner>(content);
                    return Ok(Partners);
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



        [Route("GetODataPartner")]
        [HttpGet]
        public async Task<ActionResult> GetODataPartner()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataPartner" + urlParams;
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

        [Route("GetReferralFee")]
        [HttpGet]
        public async Task<ActionResult<List<ReferralFee>>> GetReferralFee()
        {
            try
            {
                List<ReferralFee> userDetail = new List<ReferralFee>();
                string apiPath = string.Format("Vendor/GetReferralFee");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<ReferralFee>>(content);
                    return Ok(userDetail);
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

        [Route("GetPaymentModel")]
        [HttpGet]
        public async Task<ActionResult<List<PaymentMode>>> GetPaymentModel()
        {
            try
            {
                List<PaymentMode> userDetail = new List<PaymentMode>();
                string apiPath = string.Format("Vendor/GetPaymentModel");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<PaymentMode>>(content);
                    return Ok(userDetail);
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
        [Route("GetPartner")]
        [HttpGet]
        public async Task<ActionResult<List<Partner>>> GetPartner()
        {
            try
            {
                List<Partner> userDetail = new List<Partner>();
                string apiPath = string.Format("Partner/GetPartner");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Partner>>(content);
                    return Ok(userDetail);
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



        [Route("GetProvider")]
        [HttpGet]
        public async Task<ActionResult<List<ProviderType>>> GetProvider()
        {
            try
            {
                List<ProviderType> userDetail = new List<ProviderType>();
                string apiPath = string.Format("Vendor/GetProvider");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<ProviderType>>(content);
                    return Ok(userDetail);
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



        [Route("GetVendorByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendorByPipeLineGroupId(int id)
        {
            List<Vendor> listVendor = new List<Vendor>();
            string api = string.Format("Vendor/GetVendorByPipeLineGroupId?id=" + id);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listVendor = JsonConvert.DeserializeObject<List<Vendor>>(content);
                return Ok(listVendor);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }


        [Route("GetPartnerByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartnerByPipeLineGroupId(int id)
        {
            List<Partner> listPartner = new List<Partner>();
            string api = string.Format("Partner/GetPartnerByPipeLineGroupId?id=" + id);
            HttpResponseMessage response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listPartner = JsonConvert.DeserializeObject<List<Partner>>(content);
                return Ok(listPartner);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }


        [Route("UpdatePartnerPipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Partner>> UpdatePartnerPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                string apiPath = string.Format("Partner/UpdatePartnerPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var partner = JsonConvert.DeserializeObject<Partner>(content);
                    return Ok(partner);
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



        [Route("GetPartnerById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartnerById(int partnerId)
        {
            string api = string.Format("Partner/GetPartnerById?partnerId=" + partnerId);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var partner = JsonConvert.DeserializeObject<Partner>(content);
                return Ok(partner);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("UpdateEventPipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Event>> UpdateEventPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                Event service = new Event();
                string apiPath = string.Format("Partner/UpdateEventPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    service = JsonConvert.DeserializeObject<Event>(content);
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



        //[Route("GetVendorContacts")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<VendorContact>>> GetVendorContacts(int vendorId)
        //{
        //    List<VendorContact> listVendor = new List<VendorContact>();
        //    string api = string.Format("Vendor/GetVendorContacts?vendorId=" + vendorId);
        //    var response = await DataManager.GetData(api).ConfigureAwait(false);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        listVendor = JsonConvert.DeserializeObject<List<VendorContact>>(content);
        //        return Ok(listVendor);
        //    }
        //    else
        //    {
        //        return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
        //    }
        //}
    }
}