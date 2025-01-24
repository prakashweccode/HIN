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
    public class ReferralController : ControllerBase
    {
        private readonly TenantContext _context;
        public ReferralController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetReferral")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferral()
        {
            return await _context.Referral.ToListAsync();
        }

        [Route("GetProvider")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProviderType>>> GetProvider()
        {
            return await _context.ProviderType.ToListAsync();
        }

        [Route("GetReferralByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralByPipeLineGroupId(int id)
        {
            return await _context.Referral.Where(x => x.PipelineGroupId == id).ToListAsync();
        }

        [Route("UpdateReferralPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Referral>> UpdateReferralPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var referral = await _context.Referral.FindAsync(id);
            referral.PipelineId = pipelineId.PipelineId;
            _context.Referral.Update(referral);
            await _context.SaveChangesAsync();
            return Ok(referral);
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

        [Route("GetReferralById")]
        [HttpGet]
        public async Task<ActionResult<Referral>> GetReferralById(int referralId)
        {
            return await _context.Referral.FindAsync(referralId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Referral>> GetReferral(int id)
        {
            var referrals = await _context.Referral.FindAsync(id);

            if (referrals == null)
            {
                return NotFound();
            }

            return referrals;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReferral(int id, Referral referrals)
        {
            if (id != referrals.ReferralId)
            {
                return BadRequest();
            }

            _context.Entry(referrals).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReferralExists(id))
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
        [Route("SaveReferral")]
        [HttpPost]
        public async Task<ActionResult<Referral>> SaveReferral(Referral referrals, bool isFromK9Erp = false)
        {
            if (referrals.ReferralId == null || referrals.ReferralId == 0)
            {
                _context.Referral.Add(referrals);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.Referral.Update(referrals);
                await _context.SaveChangesAsync();
            }
            try
            {
                var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault();
                if (isK9ErpSync != null && !isFromK9Erp && Convert.ToBoolean(isK9ErpSync.Value))
                {
                    var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                    var result = await k9ErpSyncHelper.IntegrateK9ErpReferral(referrals);
                }
            }
            catch (Exception ex)
            {

            }

            return Ok(referrals);
        }
        //[Route("GetReferralByPipeLineGroupId")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Referral>>> GetReferralByPipeLineGroupId(int id)
        //{
        //    return await _context.Referral.Where(x => x.PipelineGroupId == id).ToListAsync();
        //}
        //[Route("GetVendorContacts")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<VendorContact>>> GetVendorContacts(int vendorId)
        //{
        //    return await _context.VendorContact.Where(x => x.VendorId == vendorId).ToListAsync();
        //}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Referral>> DeleteReferral(int id)
        {
            var referrals = await _context.Referral.FindAsync(id);
            if (referrals == null)
            {
                return NotFound();
            }

            _context.Referral.Remove(referrals);
            await _context.SaveChangesAsync();

            return referrals;
        }
        private bool ReferralExists(int id)
        {
            return _context.Referral.Any(e => e.ReferralId == id);
        }


        [HttpGet]
        [Route("GetAllEventReferral")]
        public async Task<IEnumerable<Models.Referral>> GetAllEventReferral(int eventId)
        {
            try
            {
                return await _context.Referral.Where(w => w.EventId == eventId).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}