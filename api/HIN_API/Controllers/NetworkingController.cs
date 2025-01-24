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
    public class NetworkingController : ControllerBase
    {
        private readonly TenantContext _context;
        public NetworkingController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetNetworkingById")]
        [HttpGet]
        public async Task<ActionResult<Networking>> GetNetworkingById(int networkingId)
        {
            return await _context.Networking.FindAsync(networkingId);
        }


        [Route("GetNetworking")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Networking>>> GetNetworking()
        {
            return await _context.Networking.ToListAsync();
        }
        [Route("GetNetworkingLeads")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetNetworkingLeads(int networkingId)
        {
            return await _context.Lead.Where(w=>w.NetworkingId == networkingId).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Networking>> GetNetworking(int id)
        {
            var networking = await _context.Networking.FindAsync(id);

            if (networking == null)
            {
                return NotFound();
            }

            return networking;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNetworking(int id, Networking networking)
        {
            if (id != networking.NetworkingId)
            {
                return BadRequest();
            }

            _context.Entry(networking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NetworkingExists(id))
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
        [Route("SaveNetworking")]
        [HttpPost]
        public async Task<ActionResult<Networking>> SaveNetworking(Networking networking)
        {
            if (networking.NetworkingId == null || networking.NetworkingId == 0)
            {
                if (networking.Cost != null)
                {
                    if (networking.Cost.NetworkingCostId == 0)
                    {
                        _context.NetworkingCost.Add(networking.Cost);
                    }
                    else
                    {
                        _context.NetworkingCost.Update(networking.Cost);
                    }
                    await _context.SaveChangesAsync();
                    networking.CostId = networking.Cost.NetworkingCostId;
                }
                if (networking.EventMeet != null)
                {
                    if (networking.EventMeet.Id == 0)
                    {
                        _context.NetworkingEventMeet.Add(networking.EventMeet);
                    }
                    else
                    {
                        _context.NetworkingEventMeet.Update(networking.EventMeet);
                    }
                    await _context.SaveChangesAsync();
                    networking.EventMeetId = networking.EventMeet.Id;
                }
                _context.Networking.Add(networking);
                await _context.SaveChangesAsync();
                return Ok(networking);
            }
            else
            {
                if (networking.Cost != null)
                {
                    if (networking.Cost.NetworkingCostId == 0)
                    {
                        _context.NetworkingCost.Add(networking.Cost);
                    }
                    else
                    {
                        _context.NetworkingCost.Update(networking.Cost);
                    }
                    await _context.SaveChangesAsync();
                    networking.CostId = networking.Cost.NetworkingCostId;
                }
                if (networking.EventMeet != null)
                {
                    if (networking.EventMeet.Id == 0)
                    {
                        _context.NetworkingEventMeet.Add(networking.EventMeet);
                    }
                    else
                    {
                        _context.NetworkingEventMeet.Update(networking.EventMeet);
                    }
                    await _context.SaveChangesAsync();
                    networking.EventMeetId = networking.EventMeet.Id;
                }
                _context.Networking.Update(networking);
                await _context.SaveChangesAsync();
                return Ok(networking);
            }

        }
        [Route("GetNetworkingCost")]
        [HttpGet]
        public async Task<ActionResult<NetworkingCost>> GetNetworkingCost(int NetworkingCostId)
        {
            return await _context.NetworkingCost.FindAsync(NetworkingCostId);
        }
        [Route("GetNetworkingEventMeet")]
        [HttpGet]
        public async Task<ActionResult<NetworkingEventMeet>> GetNetworkingEventMeet(int EventId)
        {
            return await _context.NetworkingEventMeet.FindAsync(EventId);
        }

        private bool NetworkingExists(int id)
        {
            return _context.Networking.Any(e => e.NetworkingId == id);
        }

    }
}