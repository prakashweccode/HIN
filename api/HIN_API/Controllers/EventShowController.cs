using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventShowController : ControllerBase
    {
        private readonly TenantContext _context;
        public EventShowController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetEventShowById")]
        [HttpGet]
        public async Task<ActionResult<EventShow>> GetEventShowById(int eventId)
        {
            return await _context.EventShow.FindAsync(eventId);
        }

        [Route("GetEventShowType")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<EventStatus>, IEnumerable<EventMode>>>> GetEventShowType()
        {
            try
            {
                List<EventStatus> lstEventStatus = await _context.EventStatus.ToListAsync();
                List<EventMode> lstEventMode = await _context.EventMode.ToListAsync();
                return new Tuple<IEnumerable<EventStatus>, IEnumerable<EventMode>>(lstEventStatus, lstEventMode);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }




        [Route("GetEventShow")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventShow>>> GetEventShow()
        {
            return await _context.EventShow.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<EventShow>> GetEventShow(int id)
        {
            var eventShows = await _context.EventShow.FindAsync(id);

            if (eventShows == null)
            {
                return NotFound();
            }

            return eventShows;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventShow(int id, EventShow eventShows)
        {
            if (id != eventShows.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventShows).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventShowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        private bool EventShowExists(int id)
        {
            return _context.EventShow.Any(e => e.Id == id);
        }
        [Route("SaveEventShow")]
        [HttpPost]
        public async Task<ActionResult<EventShow>> SaveEventShow(EventShow eventShows)
        {
            if (eventShows.Id == null || eventShows.Id == 0)
            {
                _context.EventShow.Add(eventShows);
                await _context.SaveChangesAsync();
                return Ok(eventShows);
            }
            else
            {
                _context.EventShow.Update(eventShows);
                await _context.SaveChangesAsync();
                return Ok(eventShows);
            }
           
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<EventShow>> DeleteEventShow(int id)
        {
            var eventShows = await _context.EventShow.FindAsync(id);
            if (eventShows == null)
            {
                return NotFound();
            }

            _context.EventShow.Remove(eventShows);
            await _context.SaveChangesAsync();

            return eventShows;
        }
        [Route("GetEventMode")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventMode>>> GetEventMode()
        {
            return await _context.EventMode.ToListAsync();
        }
        [Route("GetVendorEvents")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventShow>>> GetVendorEvents(int vendorId)
        {
            return await _context.EventShow.Where(w=>w.VendorId == vendorId).ToListAsync();
        }
        [Route("GetPartnerEvents")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventShow>>> GetPartnerEvents(int partnerId)
        {
            return await _context.EventShow.Where(w => w.PartnerId == partnerId).ToListAsync();
        }
        [Route("GetReferralEvents")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventShow>>> GetReferralEvents(int referralId)
        {
            return await _context.EventShow.Where(w => w.ReferralId == referralId).ToListAsync();
        }

        [Route("GetEventCost")]
        [HttpGet]
        public async Task<ActionResult<EventCost>> GetEventCost(int eventId)
        {
            var eventCost = await _context.EventCost.FirstOrDefaultAsync(x=>x.EventId == eventId);

            if (eventCost == null)
            {
                return NotFound();
            }

            return eventCost;
        }


        [Route("SaveEventCost")]
        [HttpPost]
        public async Task<ActionResult<EventCost>> SaveEventCost(EventCost eventCost)
        {
            if (eventCost.Id == null || eventCost.Id == 0)
            {
                eventCost.UpdatedBy = User.Identity.Name;
                eventCost.UpdatedOn = DateTime.UtcNow;
                _context.EventCost.Add(eventCost);
                await _context.SaveChangesAsync();
                return Ok(eventCost);
            }
            else
            {
                eventCost.UpdatedBy = User.Identity.Name;
                eventCost.UpdatedOn = DateTime.UtcNow;
                _context.EventCost.Update(eventCost);
                await _context.SaveChangesAsync();
                return Ok(eventCost);
            }

        }
    }
}