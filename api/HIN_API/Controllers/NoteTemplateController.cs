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
    public class NoteTemplateController : ControllerBase
    {
        private readonly TenantContext _context;
        public NoteTemplateController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetNoteTemplate")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteTemplate>>> GetNoteTemplate()
        {
            return await _context.NoteTemplate.ToListAsync();
        }
    }
}