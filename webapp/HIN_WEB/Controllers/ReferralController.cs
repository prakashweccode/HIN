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
    public class ReferralController : ControllerBase
    {
        [Route("SaveReferral")]
        [HttpPost]
        public async Task<ActionResult<Referral>> PostAsync(Referral Referrals)
        {
            try
            {
                string apiPath = string.Format("Referral/SaveReferral");
                HttpResponseMessage response = await DataManager.PostData(apiPath, Referrals).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    Referrals = JsonConvert.DeserializeObject<Referral>(content);
                    return Ok(Referrals);
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

        [Route("GetReferralById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralById(int referralId)
        {
            string api = string.Format("Referral/GetReferralById?referralId=" + referralId);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var referral = JsonConvert.DeserializeObject<Referral>(content);
                return Ok(referral);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("GetODataReferral")]
        [HttpGet]
        public async Task<ActionResult> GetODataReferral()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataReferral" + urlParams;
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
        [Route("GetReferral")]
        [HttpGet]
        public async Task<ActionResult<List<Referral>>> GetReferral()
        {
            try
            {
                List<Referral> userDetail = new List<Referral>();
                string apiPath = string.Format("Referral/GetReferral");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Referral>>(content);
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

        [Route("GetReferralType")]
        [HttpGet]
        public async Task<ActionResult<List<CustomDropDown>>> GetReferralType()
        {
            try
            {
                List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
                string apiPath = string.Format("CustomDropDown/GetReferralDropdown");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lstCustomDropDown = JsonConvert.DeserializeObject<List<CustomDropDown>>(content);
                    return Ok(lstCustomDropDown);
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

        [Route("GetProviderType")]
        [HttpGet]
        public async Task<ActionResult<List<ProviderType>>> GetProviderType()
        {
            try
            {
                List<ProviderType> lstProviderType = new List<ProviderType>();
                string apiPath = string.Format("Referral/GetProvider");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lstProviderType = JsonConvert.DeserializeObject<List<ProviderType>>(content);
                    return Ok(lstProviderType);
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


        [Route("GetReferralByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralByPipeLineGroupId(int id)
        {
            List<Referral> listReferral = new List<Referral>();
            string api = string.Format("Referral/GetReferralByPipeLineGroupId?id=" + id);
            HttpResponseMessage response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listReferral = JsonConvert.DeserializeObject<List<Referral>>(content);
                return Ok(listReferral);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }


        [Route("UpdateReferralPipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Referral>> UpdateReferralPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                string apiPath = string.Format("Referral/UpdateReferralPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var referral = JsonConvert.DeserializeObject<Referral>(content);
                    return Ok(referral);
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


        [Route("GetAllEventReferral")]
        [HttpGet]
        public async Task<ActionResult> GetAllEventReferral(int eventId)
        {
            string apiPath = "Referral/GetAllEventReferral?eventId=" + eventId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<Referral>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
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