using HIN_API.Models;
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
    public class ServicesController : ControllerBase
    {
        private readonly TenantContext _context;
        public ServicesController(TenantContext context)
        {
            _context = context;
        }
        // GET: api/<ServicesController>
        [HttpGet]
        [Route("GetAllServices")]
        public async Task<IEnumerable<Models.Services>> GetAllServices()
        {
            try
            {
                return await _context.Services.ToListAsync();
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("GetAllLeadServices")]
        public async Task<IEnumerable<Models.Services>> GetAllLeadServices(int leadId)
        {
            try
            {
                return await _context.Services.Where(w=>w.LeadId == leadId).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("GetAllEventAppointment")]
        public async Task<IEnumerable<Models.Services>> GetAllEventAppointment(int eventId)
        {
            try
            {
                return await _context.Services.Where(w => w.EventId == eventId).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpGet]
        [Route("GetAllDealServices")]
        public async Task<IEnumerable<Models.Services>> GetAllDealServices(int dealId)
        {
            try
            {
                return await _context.Services.Where(w => w.DealId == dealId).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // GET api/<ServicesController>/5
        [HttpGet]
        [Route("GetServiceById")]
        public async Task<Models.Services> GetServiceById(int id)
        {
            try
            {
                return await _context.Services.Where(w=>w.Id == id).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // POST api/<ServicesController>
        [HttpPost]
        [Route("AddOrUpdateService")]
        public async Task<Models.Services> AddOrUpdateService(Models.Services service)
        {
            try
            {
                if(service.Id > 0)
                {
                    _context.Services.Update(service);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    await _context.Services.AddAsync(service);
                    await _context.SaveChangesAsync();
                }
                return service;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        [Route("UpdateServicePipelineStatus")]
        [HttpPatch]
        public async Task<ActionResult<Models.Services>> UpdateServicePipelineStatus(int id, int statusId)
        {
            var service = await _context.Services.FindAsync(id);
            service.StatusId = statusId;
            _context.Services.Update(service);
            await _context.SaveChangesAsync();
            return Ok(service);
        }

        // DELETE api/<ServicesController>/5
        [HttpDelete]
        [Route("RemoveServiceById")]
        public async Task<ActionResult> RemoveServiceById(int id)
        {
            try
            {
                var lstServices = await _context.Services.Where(w => w.Id == id).ToListAsync();
                if(lstServices!=null && lstServices.Count > 0)
                {
                    _context.Services.RemoveRange(lstServices);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return NoContent();
                }
            }
            catch(Exception ex)
            {
                return Problem();
            }
        }

        [Route("GetServiceByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Services>>> GetServiceByPipeLineGroupId(int id)
        {
            var data = await _context.Services.Where(x => x.PipelineGroupId == id).ToListAsync();
            return data;
        }

        [Route("UpdateServicePipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Models.Services>> UpdateServicePipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var service = await _context.Services.FindAsync(id);
            service.PipelineId = pipelineId.PipelineId;
            service.Percentage = pipelineId.Probability == null ? 0 : Convert.ToDecimal(pipelineId.Probability);
            _context.Services.Update(service);
            await _context.SaveChangesAsync();
            return Ok(service);
        }
        [Route("GetStepDetails")]
        [HttpGet]
        public Tuple<Deal, List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>>> GetStepDetails(int serviceId)
        {
            var service = _context.Deal.Find(serviceId);
            var dealContacts = _context.DealContact.Where(x => x.DealId == serviceId && x.EntityTypeId == 29).ToList();
            var materialCost = new List<MaterialCost>();
            var timeCost = new List<TimeCost>();

            List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>> lstDealContacts = new List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>>();

            foreach (var dealContact in dealContacts)
            {

                // var materialCost = _context.MaterialCost.Where(x => x.DealContact.Any(x => x.DealId == deal.DealId));
                materialCost = _context.MaterialCost.Where(x => x.DealContactId == dealContact.Id).ToList();
                timeCost = _context.TimeCost.Where(x => x.DealContactId == dealContact.Id).ToList();
                lstDealContacts.Add(Tuple.Create(dealContact, materialCost, timeCost));
            }
            return (Tuple.Create(service, lstDealContacts));
        }
        [Route("UpdateStatusId")]
        [HttpPatch]
        public async Task<ActionResult<Models.Services>> UpdateStatusId(int serviceId, int statusId)
        {
            var service = await _context.Services.FindAsync(serviceId);
            service.StatusId = statusId;
            _context.Services.Update(service);
            await _context.SaveChangesAsync();
            return Ok(service);
        }
        [Route("UpdateCancelReason")]
        [HttpPost]
        public async Task<ActionResult<Models.Services>> UpdateCancelReason(Models.Services service)
        {
            _context.Services.Update(service);
            await _context.SaveChangesAsync();
            return Ok(service);
        }

        [HttpGet]
        [Route("GetAllTemplateList")]
        public async Task<IActionResult> GetAllTemplateList()
        {
            try
            {
                return Ok(await _context.TemplateList.Select(s => new { s.Id, s.TemplateName }).ToListAsync());
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet]
        [Route("GetTemplateListById")]
        public async Task<IActionResult> GetTemplateListById(int templateId)
        {
            try
            {
                return Ok(await _context.TemplateList.FindAsync(templateId));
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
