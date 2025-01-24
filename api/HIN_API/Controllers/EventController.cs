using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly TenantContext _context;
        public EventController(TenantContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("SaveEvent")]
        public async Task<Models.Event> SaveEvent(Models.Event events)
        {
            try
            {
                if (events.Id > 0)
                {
                    _context.Event.Update(events);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    events.CreatedBy = User.Identity.Name;
                    events.CreatedOn = DateTime.Now;
                    await _context.Event.AddAsync(events);
                    await _context.SaveChangesAsync();
                }
                return events;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        [HttpGet]
        [Route("GetEventById")]
        public async Task<Models.Event> GetEventById(int id)
        {
            try
            {
                return await _context.Event.Where(w => w.Id == id).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Route("GetEventByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEventByPipeLineGroupId(int id)
        {
            return await _context.Event.Where(x => x.PipelineGroupId == id).ToListAsync();
        }

        [Route("UpdateEventPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Event>> UpdateEventPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var events = await _context.Event.FindAsync(id);
            events.PipelineId = pipelineId.PipelineId;
            _context.Event.Update(events);
            await _context.SaveChangesAsync();
            return Ok(events);
        }

        [Route("GetAllEvents")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetAllEvents()
        {
            return await _context.Event.ToListAsync();
        }
    }
}
