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
using ODataHttpClient.Models;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventShowController : ControllerBase
    {
        [Route("SaveEventShow")]
        [HttpPost]
        public async Task<ActionResult<EventShow>> PostAsync(EventShow eventShows)
        {
            try
            {
                string apiPath = string.Format("EventShow/SaveEventShow");
                HttpResponseMessage response = await DataManager.PostData(apiPath, eventShows).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    eventShows = JsonConvert.DeserializeObject<EventShow>(content);
                    return Ok(eventShows);
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
        [Route("GetODataEventShow")]
        [HttpGet]
        public async Task<ActionResult> GetODataEventShow()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataEventShow" + urlParams;
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
        [Route("GetEventMode")]
        [HttpGet]
        public async Task<ActionResult<List<EventMode>>> GetEventMode()
        {
            try
            {
                List<EventMode> userDetail = new List<EventMode>();
                string apiPath = string.Format("EventShow/GetEventMode");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<EventMode>>(content);
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
        [Route("GetEventShow")]
        [HttpGet]
        public async Task<ActionResult<List<EventShow>>> GetEventShow()
        {
            try
            {
                List<EventShow> userDetail = new List<EventShow>();
                string apiPath = string.Format("EventShow/GetEventShow");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<EventShow>>(content);
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
        [Route("GetVendorEvents")]
        [HttpGet]
        public async Task<ActionResult<List<EventShow>>> GetVendorEvents(int vendorId)
        {
            try
            {
                List<EventShow> userDetail = new List<EventShow>();
                string apiPath = string.Format("EventShow/GetVendorEvents?vendorId=" + vendorId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var eventShow = JsonConvert.DeserializeObject<List<EventShow>>(content);
                    return Ok(eventShow);
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

        [Route("GetPartnerEvents")]
        [HttpGet]
        public async Task<ActionResult<List<EventShow>>> GetPartnerEvents(int partnerId)
        {
            try
            {
                List<EventShow> userDetail = new List<EventShow>();
                string apiPath = string.Format("EventShow/GetPartnerEvents?partnerId=" + partnerId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var eventShow = JsonConvert.DeserializeObject<List<EventShow>>(content);
                    return Ok(eventShow);
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

        [Route("GetReferralEvents")]
        [HttpGet]
        public async Task<ActionResult<List<EventShow>>> GetReferralEvents(int referralId)
        {
            try
            {
                List<EventShow> userDetail = new List<EventShow>();
                string apiPath = string.Format("EventShow/GetReferralEvents?referralId=" + referralId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var eventShow = JsonConvert.DeserializeObject<List<EventShow>>(content);
                    return Ok(eventShow);
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

        [Route("SaveEventCost")]
        [HttpPost]
        public async Task<ActionResult<EventCost>> SaveEventCost(EventCost eventCost)
        {
            try
            {
                string apiPath = string.Format("EventShow/SaveEventCost");
                HttpResponseMessage response = await DataManager.PostData(apiPath, eventCost).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    eventCost = JsonConvert.DeserializeObject<EventCost>(content);
                    return Ok(eventCost);
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

        [Route("GetEventCost")]
        [HttpGet]
        public async Task<ActionResult<EventCost>> GetEventCost(int eventId)
        {
            try
            {
                string apiPath = string.Format("EventShow/GetEventCost?eventId=" + eventId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var eventCost = JsonConvert.DeserializeObject<EventCost>(content);
                    return Ok(eventCost);
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

        [Route("GetEventShowType")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<EventStatus>, IEnumerable<EventMode>>>> GetEventShowType()
        {
            string apiPath = "EventShow/GetEventShowType";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var eventsList = JsonConvert.DeserializeObject<Tuple<IEnumerable<EventStatus>, IEnumerable<EventMode>>>(content);
                return Ok(eventsList);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetEventShowById")]
        [HttpGet]
        public async Task<ActionResult<EventShow>> GetEventShowById(int eventId)
        {
            try
            {
                string apiPath = string.Format("EventShow/GetEventShowById?eventId=" + eventId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var eventShow = JsonConvert.DeserializeObject<EventShow>(content);
                    return Ok(eventShow);
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