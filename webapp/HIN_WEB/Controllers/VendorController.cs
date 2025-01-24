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
    public class VendorController : ControllerBase
    {
        [Route("SaveVendor")]
        [HttpPost]
        public async Task<ActionResult<Vendor>> PostAsync(Vendor vendors)
        {
            try
            {
                string apiPath = string.Format("Vendor/SaveVendor");
                HttpResponseMessage response = await DataManager.PostData(apiPath, vendors).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    vendors = JsonConvert.DeserializeObject<Vendor>(content);
                    return Ok(vendors);
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

        [Route("GetVendorById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendorById(int vendorId)
        {
            string api = string.Format("Vendor/GetVendorById?vendorId=" + vendorId);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var vendor = JsonConvert.DeserializeObject<Vendor>(content);
                return Ok(vendor);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }


        [Route("GetODataVendor")]
        [HttpGet]
        public async Task<ActionResult> GetODataVendor()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataVendor" + urlParams;
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



        [Route("GetReferralDropdown")]
        [HttpGet]
        public async Task<ActionResult<List<ReferralDropdown>>> GetReferralDropdown()
        {
            try
            {
                List<ReferralDropdown> userDetail = new List<ReferralDropdown>();
                string apiPath = string.Format("Vendor/GetReferralDropdown");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<ReferralDropdown>>(content);
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
        [Route("GetVendor")]
        [HttpGet]
        public async Task<ActionResult<List<Vendor>>> GetVendor()
        {
            try
            {
                List<Vendor> userDetail = new List<Vendor>();
                string apiPath = string.Format("Vendor/GetVendor");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Vendor>>(content);
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
                string apiPath = string.Format("Vendor/GetReferral");
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
        [Route("GetVendorsByEntityOrigin")]
        [HttpGet]
        public async Task<ActionResult<List<Vendor>>> GetVendorsByEntityOrigin(int entityId, int originId)
        {
            try
            {
                string apiPath = string.Format("Vendor/GetVendorsByEntityOrigin?entityId=" + entityId + "&originId=" + originId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var vendors = JsonConvert.DeserializeObject<List<Vendor>>(content);
                    return Ok(vendors);
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
                string apiPath = string.Format("Vendor/GetPartner");
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