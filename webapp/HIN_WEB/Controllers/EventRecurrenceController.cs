using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using HIN_WEB.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventRecurrenceController : ControllerBase
    {
        [Route("GetDays")]
        [HttpGet]
        public async Task<ActionResult<List<Days>>> GetDays()
        {
            string apiPath = "EventRecurrence/GetDays";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<List<Days>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetRecurrenceType")]
        [HttpGet]
        public async Task<ActionResult<List<RecurrenceType>>> GetRecurrenceType()
        {
            string apiPath = "EventRecurrence/GetRecurrenceType";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<List<RecurrenceType>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("saveRecurrence")]
        [HttpPost]
        public async Task<ActionResult<Tuple<Recurrence , List<RecurrenceDays>>>> saveRecurrence(Tuple<Recurrence, List<RecurrenceDays>> request)
        {
             string apiPath = "EventRecurrence/saveRecurrence";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<Tuple<Recurrence, List<RecurrenceDays>>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetRecurrenceData")]
        [HttpGet]
        public async Task<ActionResult<Tuple<Recurrence, List<RecurrenceDays>>>> GetRecurrenceData(int id)
        {
            string apiPath = "EventRecurrence/GetRecurrenceData?id=" + id;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<Tuple<Recurrence, List<RecurrenceDays>>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("SpGetAllCalendarEvents")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<EventResponseDto>>> SpGetAllCalendarEvents(EventRequestDto request)
        {
            string apiPath = "EventRecurrence/SpGetAllCalendarEvents";
            var response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<List<EventResponseDto>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
