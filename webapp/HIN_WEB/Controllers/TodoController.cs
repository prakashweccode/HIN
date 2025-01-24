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
    public class TodoController : ControllerBase
    {
        [Route("GetODataTodoList")]
        [HttpGet]
        public async Task<ActionResult> GetODataTodoList()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataTodoList" + urlParams;
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

        [Route("GetTodoByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetDealByPipeLineGroupId(int id)
        {
            List<Todo> listTodo = new List<Todo>();
            string api = string.Format("Todo/GetTodoByPipeLineGroupId?id=" + id);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listTodo = JsonConvert.DeserializeObject<List<Todo>>(content);
                return Ok(listTodo);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("GetRecurrenceEvents")]
        [HttpGet]
        public async Task<ActionResult<List<EventRecurrenceDto>>> GetRecurrenceEvents()
        {
            string apiPath = "Todo/GetRecurrenceEvents";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<List<EventRecurrenceDto>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetCalendarEvents")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Todo>,IEnumerable<DealContact>, IEnumerable<DealContactNextStep>, IEnumerable<Services>>>> GetCalendarEvents()
        {
            string apiPath = "Todo/GetCalendarEvents";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var todoList = JsonConvert.DeserializeObject<Tuple<IEnumerable<Todo>, IEnumerable<DealContact>, IEnumerable<DealContactNextStep>, IEnumerable<Services>>>(content);
                return Ok(todoList);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("UpdateTodoSchedule/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Todo>> UpdateTodoSchedule(int id, [FromBody] EventSchedule eventSchedule)
        {
            try
            {
                string apiPath = string.Format("Todo/UpdateTodoSchedule?id={0}", id);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, eventSchedule).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<Todo>(content);
                    return Ok(data);
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
        [Route("GetTodoById")]
        [HttpGet]
        public async Task<ActionResult<Todo>> GetTodoById(int todoId)
        {
            string apiPath = "Todo/GetTodoById?todoId=" + todoId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var todo = JsonConvert.DeserializeObject<Todo>(content);
                return Ok(todo);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("SaveTodo")]
        [HttpPost]
        public async Task<ActionResult<Todo>> SaveTodo(Todo todo)
        {
            string apiPath = "Todo/SaveTodo";
            var response = await DataManager.PostData(apiPath, todo).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var todoData = JsonConvert.DeserializeObject<Todo>(content);
                return Ok(todoData);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("UpdateTodoPipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Todo>> UpdateTodoPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                Todo todo = new Todo();
                string apiPath = string.Format("Todo/UpdateTodoPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    todo = JsonConvert.DeserializeObject<Todo>(content);
                    return Ok(todo);
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
        [Route("updateTodoStatus/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Todo>> updateTodoStatus(int id, [FromBody] int statusId)
        {
            try
            {
                Todo todo = new Todo();
                string apiPath = string.Format("Todo/updateTodoStatus?id={0}", id, statusId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, statusId).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    todo = JsonConvert.DeserializeObject<Todo>(content);
                    return Ok(todo);
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
        [Route("UpdateVendorPipelineId/{id}")]
        [HttpPatch]
        public async Task<ActionResult<Vendor>> UpdateVendorPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            try
            {
                string apiPath = string.Format("Todo/UpdateVendorPipelineId?id={0}", id, pipelineId);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, pipelineId).ConfigureAwait(false);
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
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("GetImportance")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Importance>>> GetImportance()
        {
            string apiPath = "Todo/GetImportance";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var listImportance = JsonConvert.DeserializeObject<IEnumerable<Importance>>(content);
                return Ok(listImportance);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetLeadGenType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadGenEntityType>>> GetLeadGenType()
        {
            string apiPath = "Todo/GetLeadGenType";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var listLeadGenType = JsonConvert.DeserializeObject<IEnumerable<LeadGenEntityType>>(content);
                return Ok(listLeadGenType);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetServiceRecurrenceEvents")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<EventRecurrenceDto>, List<RecurrenceDays>>>> GetServiceRecurrenceEvents()
        {
            string apiPath = "Todo/GetServiceRecurrenceEvents";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<Tuple<List<EventRecurrenceDto>, List<RecurrenceDays>>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }

    }
}
