using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartCatalogController : Controller
    {
        private readonly TenantContext _context;
        public PartCatalogController(TenantContext context)
        {
            _context = context;
        }
        [Route("SavePartCatalog")]
        [HttpPost]
        public async Task<ActionResult<PartCatalog>> SavePartCatalog(PartCatalog partCatalog)
        {
            if(partCatalog.Id > 0)
            {
                _context.PartCatalog.Update(partCatalog);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.PartCatalog.Add(partCatalog);
                await _context.SaveChangesAsync();
            }
            return Ok(partCatalog);
        }

        [Route("GetPartCatalog")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartCatalog>>> GetPartCatalog()
        {
            return await _context.PartCatalog.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PartCatalog>> GetPartCatalog(int id)
        {
            var partCatalog = await _context.PartCatalog.FindAsync(id);

            if (partCatalog == null)
            {
                return NotFound();
            }

            return partCatalog;
        }

    }
}