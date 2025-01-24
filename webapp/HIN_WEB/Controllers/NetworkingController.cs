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
    public class NetworkingController : ControllerBase
    {
        [Route("SaveNetworking")]
        [HttpPost]
        public async Task<ActionResult<Networking>> PostAsync(Networking networking)
        {
            try
            {
                string apiPath = string.Format("Networking/SaveNetworking");
                HttpResponseMessage response = await DataManager.PostData(apiPath, networking).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    networking = JsonConvert.DeserializeObject<Networking>(content);
                    return Ok(networking);
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


        [Route("GetNetworkingById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Networking>>> GetNetworkingById(int networkingId)
        {
            string api = string.Format("Referral/GetNetworkingById?networkingId=" + networkingId);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var networking = JsonConvert.DeserializeObject<Networking>(content);
                return Ok(networking);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }


        [Route("GetNetworking")]
        [HttpGet]
        public async Task<ActionResult<List<Networking>>> GetNetworking()
        {
            try
            {
                string apiPath = string.Format("Networking/GetNetworking");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var networkings = JsonConvert.DeserializeObject<List<Networking>>(content);
                    return Ok(networkings);
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
        [Route("GetNetworkingLeads")]
        [HttpGet]
        public async Task<ActionResult<List<Lead>>> GetNetworkingLeads(int networkingId)
        {
            try
            {
                string apiPath = string.Format("Networking/GetNetworkingLeads?networkingId=" + networkingId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var leads = JsonConvert.DeserializeObject<List<Lead>>(content);
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
        [Route("GetNetworkingCost")]
        [HttpGet]
        public async Task<ActionResult<NetworkingCost>> GetNetworkingCost(int NetworkingCostId)
        {
            try
            {
                string apiPath = string.Format("Networking/GetNetworkingCost?NetworkingCostId={0}", NetworkingCostId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var networkingCost = JsonConvert.DeserializeObject<NetworkingCost>(content);
                    return Ok(networkingCost);
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
        [Route("GetNetworkingEventMeet")]
        [HttpGet]
        public async Task<ActionResult<NetworkingEventMeet>> GetNetworkingEventMeet(int EventId)
        {
            try
            {
                string apiPath = string.Format("Networking/GetNetworkingEventMeet?EventId={0}", EventId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var networkingMeet = JsonConvert.DeserializeObject<NetworkingEventMeet>(content);
                    return Ok(networkingMeet);
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

        [Route("GetODataNetworking")]
        [HttpGet]
        public async Task<ActionResult> GetODataNetworking()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataNetworking" + urlParams;
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
    }
}