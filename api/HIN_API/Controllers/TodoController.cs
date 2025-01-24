    using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TenantContext _context;
        public TodoController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetCalendarEvents")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Todo>, IEnumerable<DealContact>, IEnumerable<DealContactNextStep>, IEnumerable<Models.Services>>>> GetCalendarEvents()
        {
            try
            {
                List<Todo> lstTodos = await _context.Todo.Where(w => w.StartDate != null && w.EndDate != null && (w.IsRecurrence == null || w.IsRecurrence == false) && w.IsDone != true).ToListAsync();
                List<DealContact> lstDealContacts = await _context.DealContact.Where(w => w.StartDate != null && w.EndDate != null).ToListAsync();
                List<DealContactNextStep> lstDealContactNextSteps = await _context.DealContactNextStep.Where(w => w.StartDate != null && w.EndDate !=null).ToListAsync();
                List<Models.Services> lstServices = await _context.Services.Where(w => w.StartDate != null && w.EndDate != null).ToListAsync();
                return new Tuple<IEnumerable<Todo>, IEnumerable<DealContact>, IEnumerable<DealContactNextStep>, IEnumerable<Models.Services>>(lstTodos, lstDealContacts, lstDealContactNextSteps, lstServices);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("GetRecurrenceEvents")]
        [HttpGet]
        public async Task<ActionResult<List<EventRecurrenceDto>>> GetRecurrenceEvents()
        {
            try
            {
                string sql = @"select t.Id as TodoId, rec.Id as RecurrenceId, t.Color, t.TodoName, t.Subject, rec.StartDate, rec.StartTime, rec.EndDate, rec.EndTime, rec.RecursOn,
                rec.RecurrenceTypeId, rType.Name as RecurrenceType
                from Todo as t left join Recurrence as rec on 
                rec.Id = t.RecurrenceId
                left join RecurrenceType as rType on
                rType.Id = rec.RecurrenceTypeId 
                Where t.IsRecurrence = 1";
                List<EventRecurrenceDto> recurringEvents = await _context.Query<EventRecurrenceDto>().FromSqlRaw(sql).ToListAsync();
                return Ok(recurringEvents);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("UpdateTodoPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Todo>> UpdateTodoPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var todo = await _context.Todo.FindAsync(id);
            todo.PipelineId = pipelineId.PipelineId;
            _context.Todo.Update(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);
        }
        [Route("UpdateVendorPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Vendor>> UpdateVendorPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var vendor = await _context.Vendor.FindAsync(id);
            vendor.PipelineId = pipelineId.PipelineId;
            _context.Vendor.Update(vendor);
            await _context.SaveChangesAsync();
            return Ok(vendor);
        }
        [Route("updateTodoStatus")]
        [HttpPatch]
        public async Task<ActionResult<Todo>> updateTodoStatus(int id, [FromBody] int statusId)
        {
            var todo = await _context.Todo.FindAsync(id);
            if (statusId == 1)
            {
                todo.IsDone = true;
            }
            _context.Todo.Update(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);
        }
        [Route("UpdateTodoSchedule")]
        [HttpPatch]
        public async Task<ActionResult<Todo>> UpdateTodoSchedule(int id, [FromBody] EventSchedule eventSchedule)
        {
            var todo = await _context.Todo.FindAsync(id);
            todo.StartDate = eventSchedule.Start;
            todo.EndDate = eventSchedule.End;
            _context.Todo.Update(todo);
            await _context.SaveChangesAsync();
            return Ok(todo);
        }
        [Route("SaveTodo")]
        [HttpPost]
        public async Task<ActionResult<Todo>> SaveTodo(Todo todo)
        {
            try
            {
                if (todo.Id > 0)
                {
                    _context.Todo.Update(todo);
                }
                else
                {
                    todo.CreatedBy = User.Identity.Name;
                    todo.CreatedOn = DateTime.Now;
                    _context.Todo.Add(todo);
                }
                await _context.SaveChangesAsync();
                return Ok(todo);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("GetTodoByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodoByPipeLineGroupId(int id)
        {
            return await _context.Todo.Where(x => x.PipelineGroupId == id && x.IsDone != true).ToListAsync();
        }

        [Route("GetTodoById")]
        [HttpGet]
        public async Task<ActionResult<Todo>> GetTodoById(int todoId)
        {
            return await _context.Todo.FindAsync(todoId);
        }
        [Route("GetImportance")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Importance>>> GetImportance()
        {
            return await _context.Importance.ToListAsync();
        }
        [Route("GetLeadGenType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadGenEntityType>>> GetLeadGenType()
        {
            return await _context.LeadGenEntityType.Where(x=> x.IsShowScreen == true).ToListAsync();
        }

        [Route("GetServiceRecurrenceEvents")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<EventRecurrenceDto>, List<RecurrenceDays>>>> GetServiceRecurrenceEvents()
        {
            try
            {
                List<EventRecurrenceDto> recurringEvents = new List<EventRecurrenceDto>();
                using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
                {
                    string sql = @"Select j.Id, j.RecurrenceId, j.Color as EventColor, j.ServiceName as EventName, j.ServiceNumber as EventNumber, j.StartDate as EventStartDate,j.EndDate as EventEndDate, j.IsRecurrence, r.StartDate as RecurrenceStartDate, r.EndDate as RecurrenceEndDate, r.RecursOn,r.StartTime as RecurrenceStartTime,r.EndTime as RecurrenceEndTime, r.RecurrenceIntervalHour, r.RecurrenceEndInterval,r.RecurrenceEndType, r.RecurrenceInterval, r.RecurrenceIntervalDay, r.RecurrenceIntervalMonth, r.RecurrenceIntervalMinutes, r.RecurrenceTypeId, rt.Name as RecurrenceType from [Services] j 
                      left join Recurrence r on j.RecurrenceId = r.Id left join RecurrenceType rt on r.RecurrenceTypeId = rt.Id
                      Where j.IsRecurrence = 1";
                    //List<EventRecurrenceDto> recurringEvents = await _context.Query<EventRecurrenceDto>().FromSqlRaw(sql).ToListAsync();
                    recurringEvents = con.Query<EventRecurrenceDto>(sql).ToList();
                }
                List<RecurrenceDays> recurrenceDays = new List<RecurrenceDays>();
                if (recurringEvents.Count > 0)
                {
                    int?[] dayIds = recurringEvents.Select(s => s.RecurrenceId).ToArray();
                    recurrenceDays = await _context.RecurrenceDays.Where(w => dayIds.Contains(w.RecurrenceId)).ToListAsync();
                }
                return Ok(new Tuple<List<EventRecurrenceDto>, List<RecurrenceDays>>(recurringEvents, recurrenceDays));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
