using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        [Route("OdataVwEvent")]
        [HttpGet]
        public async Task<ActionResult> OdataVwEvent()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataEvent" + urlParams;
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

        [Route("saveEvent")]
        [HttpPost]
        public async Task<ActionResult<Event>> PostAsync(Event events)
        {
            try
            {
                string apiPath = string.Format("Event/SaveEvent");
                HttpResponseMessage response = await DataManager.PostData(apiPath, events).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    events = JsonConvert.DeserializeObject<Event>(content);
                    return Ok(events);
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

        [Route("GetEventById")]
        [HttpGet]
        public async Task<ActionResult> GetEventById(int id)
        {
            string apiPath = "Event/GetEventById?id=" + id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Event>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetEventByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventByPipeLineGroupId(int id)
        {
            string api = string.Format("Event/GetEventByPipeLineGroupId?id=" + id);
            HttpResponseMessage response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var listEvent = JsonConvert.DeserializeObject<List<Event>>(content);
                return Ok(listEvent);
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
                string apiPath = string.Format("Event/UpdateEventPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var partner = JsonConvert.DeserializeObject<Event>(content);
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

        [Route("GetAllEvents")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetAllEvents()
        {
            List<Event> listEvent = new List<Event>();
            string api = string.Format("Event/GetAllEvents");
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listEvent = JsonConvert.DeserializeObject<List<Event>>(content);
                return Ok(listEvent);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}
