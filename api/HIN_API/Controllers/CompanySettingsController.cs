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
    public class CompanySettingsController : ControllerBase
    {
        private readonly TenantContext _context;

        public CompanySettingsController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetSettings")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Settings>>> GetSettings()
        {
            try
            {
                return await _context.Settings.ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }

        [Route("GetCompanySettingsById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanySettings>>> GetCompanySettingsById(int id)
        {
            try
            {
                return await _context.CompanySettings.Where(x=>x.CompanyId==id).ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }

        [Route("SaveCompanySettings")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<CompanySettings>>> SaveCompanySettings(List<CompanySettings> companySettings)
        {
            try
            {
                if (companySettings.Count > 0)
                {
                    List<CompanySettings> existingInfo = await _context.CompanySettings.Where(x => x.CompanyId == companySettings.FirstOrDefault().CompanyId).ToListAsync();
                    if (existingInfo.Count > 0)
                    {
                        _context.CompanySettings.RemoveRange(existingInfo);
                        await _context.SaveChangesAsync();
                    }
                    _context.CompanySettings.AddRange(companySettings);
                     await _context.SaveChangesAsync();

                    return Ok(companySettings);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
    }
}
