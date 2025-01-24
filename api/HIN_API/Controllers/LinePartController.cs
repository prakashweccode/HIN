using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LinePartController : Controller
    {
        private readonly TenantContext _context;
        public LinePartController(TenantContext context)
        {
            _context = context;
        }
        [Route("SaveLinePart")]
        [HttpPost]
        public async Task<ActionResult<LinePart>> SaveLinePart(LinePart linePart)
        {
            if (linePart.Id > 0)
            {
                _context.LinePart.Update(linePart);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.LinePart.Add(linePart);
                await _context.SaveChangesAsync();
            }
            return Ok(linePart);
        }

    }
}