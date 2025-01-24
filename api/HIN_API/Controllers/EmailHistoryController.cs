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
    public class EmailHistoryController : Controller
    {
        private readonly TenantContext _context;
        public EmailHistoryController(TenantContext context)
        {
            _context = context;
        }
        [Route("SaveEmailHistory")]
        [HttpPost]
        public async Task<ActionResult<EmailHistory>> SaveEmailHistory(EmailHistory emailHistory)
        {
            _context.EmailHistory.Add(emailHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmailHistory", new { id = emailHistory.EmailId }, emailHistory);
        }

        [Route("GetEmailHistory")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailHistory>>> GetEmailHistory()
        {
            return await _context.EmailHistory.ToListAsync();
        }

    }
}