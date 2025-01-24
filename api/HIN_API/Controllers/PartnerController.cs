using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        private readonly TenantContext _context;
        public PartnerController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetPartnerById")]
        [HttpGet]
        public async Task<ActionResult<Partner>> GetPartnerById(int partnerId)
        {
            return await _context.Partner.FindAsync(partnerId);
        }

        [Route("GetPartnerByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartnerByPipeLineGroupId(int id)
        {
            return await _context.Partner.Where(x => x.PipelineGroupId == id).ToListAsync();
        }

        [Route("UpdatePartnerPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Partner>> UpdatePartnerPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var partner = await _context.Partner.FindAsync(id);
            partner.PipelineId = pipelineId.PipelineId;
            _context.Partner.Update(partner);
            await _context.SaveChangesAsync();
            return Ok(partner);
        }


        [Route("GetPartner")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartner()
        {
            return await _context.Partner.ToListAsync();
        }

        [Route("GetProvider")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProviderType>>> GetProvider()
        {
            return await _context.ProviderType.ToListAsync();
        }


        [Route("GetReferralFee")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReferralFee>>> GetReferralFee()
        {
            return await _context.ReferralFee.ToListAsync();
        }
        [Route("GetPaymentModel")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentMode>>> GetPaymentModel()
        {
            return await _context.PaymentMode.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Partner>> GetPartner(int id)
        {
            var partners = await _context.Partner.FindAsync(id);

            if (partners == null)
            {
                return NotFound();
            }

            return partners;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartner(int id, Partner partners)
        {
            if (id != partners.PartnerId)
            {
                return BadRequest();
            }

            _context.Entry(partners).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartnerExists(id))
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
        [Route("SavePartner")]
        [HttpPost]
        public async Task<ActionResult<Partner>> SavePartner(Partner partners, bool isFromK9Erp = false)
        {
            if (partners.PartnerId == null || partners.PartnerId == 0)
            {
                _context.Partner.Add(partners);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.Partner.Update(partners);
                await _context.SaveChangesAsync();
            }
            try
            {
                var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault();
                if (isK9ErpSync != null && !isFromK9Erp && Convert.ToBoolean(isK9ErpSync.Value))
                {
                    var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                    var result = await k9ErpSyncHelper.IntegrateK9ErpPartner(partners);
                }
            }
            catch (Exception ex)
            {

            }

            return Ok(partners);
        }
        //[Route("GetPartnerByPipeLineGroupId")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Partner>>> GetPartnerByPipeLineGroupId(int id)
        //{
        //    return await _context.Partner.Where(x => x.PipelineGroupId == id).ToListAsync();
        //}
        //[Route("GetVendorContacts")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<VendorContact>>> GetVendorContacts(int vendorId)
        //{
        //    return await _context.VendorContact.Where(x => x.VendorId == vendorId).ToListAsync();
        //}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Partner>> DeletePartner(int id)
        {
            var partners = await _context.Partner.FindAsync(id);
            if (partners == null)
            {
                return NotFound();
            }

            _context.Partner.Remove(partners);
            await _context.SaveChangesAsync();

            return partners;
        }
        private bool PartnerExists(int id)
        {
            return _context.Partner.Any(e => e.PartnerId == id);
        }

        [Route("UpdateEventPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Models.Event>> UpdateEventPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var events = await _context.Event.FindAsync(id);
            events.PipelineId = pipelineId.PipelineId;
            //events.Percentage = pipelineId.Probability == null ? 0 : Convert.ToDecimal(pipelineId.Probability);
            _context.Event.Update(events);
            await _context.SaveChangesAsync();
            return Ok(events);
        }

    }
}