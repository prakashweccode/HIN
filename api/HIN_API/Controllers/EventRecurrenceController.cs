using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using HIN_API.Models;
using HIN_API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventRecurrenceController : ControllerBase
    {
        private readonly TenantContext _context;
        public EventRecurrenceController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetDays")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Days>>> GetDays()
        {
            try
            {
                return await _context.Days.ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("GetRecurrenceType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecurrenceType>>> GetRecurrenceType()
        {
            try
            {
                return await _context.RecurrenceType.ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("saveRecurrence")]
        [HttpPost]
        public async Task<ActionResult<Tuple<Recurrence, List<RecurrenceDays>>>> saveRecurrence(Tuple<Recurrence, List<RecurrenceDays>> tuple)
        {
            try
            {
                var oRecurrence = tuple.Item1;
                if(oRecurrence.Id > 0)
                {
                    _context.Recurrence.Update(oRecurrence);
                    await _context.SaveChangesAsync();
                    if(tuple.Item2.Count > 0)
                    {
                        List<RecurrenceDays> recurrenceDays = new List<RecurrenceDays>();
                        recurrenceDays = _context.RecurrenceDays.Where(w => w.RecurrenceId == oRecurrence.Id).ToList();
                        _context.RecurrenceDays.RemoveRange(recurrenceDays);
                        tuple.Item2.ForEach(f => f.RecurrenceId = oRecurrence.Id);
                        _context.RecurrenceDays.AddRange(tuple.Item2);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    _context.Recurrence.Add(oRecurrence);
                    await _context.SaveChangesAsync();
                    if (tuple.Item2.Count > 0)
                    {
                        tuple.Item2.ForEach(f => f.RecurrenceId = oRecurrence.Id);
                        _context.RecurrenceDays.AddRange(tuple.Item2);
                        await _context.SaveChangesAsync();
                    }
                    
                }
                return Ok(tuple);
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("GetRecurrenceData")]
        [HttpGet]
        public async Task<ActionResult<Tuple<Recurrence, List<RecurrenceDays>>>> GetRecurrenceData(int id)
        {
            Recurrence recurrence = await _context.Recurrence.FindAsync(id);
            List<RecurrenceDays> lstRecurrenceDays = new List<RecurrenceDays>();
            if (recurrence != null)
            {
                lstRecurrenceDays = await _context.RecurrenceDays.Where(w => w.RecurrenceId == recurrence.Id).ToListAsync();
            }
            return Ok(new Tuple<Recurrence, List<RecurrenceDays>>(recurrence, lstRecurrenceDays));
        }

        [Route("SpGetAllCalendarEvents")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<EventResponseDto>>> SpGetAllCalendarEvents(EventRequestDto request)
        {
            try
            {
                var funnelDetailsDto = new FunnelDetailsDto();
                using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
                {
                    var data = con.Query<EventResponseDto>("sp_GetAllCalendarEvents", new { startDate = request.StartDate, endDate = request.EndDate }, commandType: CommandType.StoredProcedure).ToList();
                    return Ok(data);
                }
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
    }
}
