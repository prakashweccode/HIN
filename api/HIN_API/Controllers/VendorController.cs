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
    public class VendorController : ControllerBase
    {
        private readonly TenantContext _context;
        public VendorController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetVendor")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendor()
        {
            return await _context.Vendor.ToListAsync();
        }

        [Route("GetPartner")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartner()
        {
            return await _context.Partner.ToListAsync();
        }

        [Route("GetReferral")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferral()
        {
            return await _context.Referral.ToListAsync();
        }
        [Route("GetVendorsByEntityOrigin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendorsByEntityOrigin(int entityId, int originId)
        {
            switch (originId)
            {
                case 1:
                    return await _context.Vendor.Where(w => w.OriginId == originId && w.EventId == entityId).ToListAsync();
                case 6:
                    return await _context.Vendor.Where(w => w.OriginId == originId && w.NetworkingId == entityId).ToListAsync();
                //case 7:
                //    return await _context.Vendor.Where(w => w.OriginId == originId && w.PartnerId == entityId).ToListAsync();
                //case 8:
                //    return await _context.Vendor.Where(w => w.OriginId == originId && w.ReferralId == entityId).ToListAsync();
                default:
                    return null;
            }
        }
        [Route("GetProvider")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProviderType>>> GetProvider()
        {
            return await _context.ProviderType.ToListAsync();
        }

        [Route("GetReferralDropdown")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReferralDropdown>>> GetReferralDropdown()
        {
            return await _context.ReferralDropdown.ToListAsync();
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

        [Route("GetVendorById")]
        [HttpGet]
        public async Task<ActionResult<Vendor>> GetVendorById(int vendorId)
        {
            return await _context.Vendor.FindAsync(vendorId);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vendor>> GetVendor(int id)
        {
            var vendors = await _context.Vendor.FindAsync(id);

            if (vendors == null)
            {
                return NotFound();
            }

            return vendors;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendor(int id, Vendor vendors)
        {
            if (id != vendors.VendorId)
            {
                return BadRequest();
            }

            _context.Entry(vendors).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
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
        [Route("SaveVendor")]
        [HttpPost]
        public async Task<ActionResult<Vendor>> SaveVendor(Vendor vendors, bool isFromK9Erp = false)
        {
            if (vendors.VendorId == null || vendors.VendorId == 0)
            {
                _context.Vendor.Add(vendors);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.Vendor.Update(vendors);
                await _context.SaveChangesAsync();
            }
            try
            {
                var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault();
                if (isK9ErpSync != null && !isFromK9Erp && Convert.ToBoolean(isK9ErpSync.Value))
                {
                    var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                    var result = await k9ErpSyncHelper.IntegrateK9ErpVendor(vendors);
                }
            }
            catch (Exception ex)
            {

            }

            return Ok(vendors);
            //_context.Vendor.Add(vendors);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("Getvendor", new { id = vendors.VendorId }, vendors);
        }
        [Route("GetVendorByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vendor>>> GetVendorByPipeLineGroupId(int id)
        {
            return await _context.Vendor.Where(x => x.PipelineGroupId == id).ToListAsync();
        }
        //[Route("GetVendorContacts")]
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<VendorContact>>> GetVendorContacts(int vendorId)
        //{
        //    return await _context.VendorContact.Where(x => x.VendorId == vendorId).ToListAsync();
        //}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vendor>> DeleteVendor(int id)
        {
            var vendors = await _context.Vendor.FindAsync(id);
            if (vendors == null)
            {
                return NotFound();
            }

            _context.Vendor.Remove(vendors);
            await _context.SaveChangesAsync();

            return vendors;
        }
        private bool VendorExists(int id)
        {
            return _context.Vendor.Any(e => e.VendorId == id);
        }

    }
}