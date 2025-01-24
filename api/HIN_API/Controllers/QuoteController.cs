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
    public class QuoteController : Controller
    {
        private readonly TenantContext _context;
        public QuoteController(TenantContext context)
        {
            _context = context;
        }


        [Route("SaveQuote")]
        [HttpPost]
        public async Task<ActionResult<Quote>> SaveQuote(Quote quote)
        {
            if (quote.Id > 0)
            {
                _context.Quote.Update(quote);
                await _context.SaveChangesAsync();
            }
            else
            {
                var lastId = _context.Quote.Where(w => w.IdentYear == DateTime.Now.Year).Max(m => m.LastIdentNo);
                if (lastId != null)
                {
                    quote.IdentYear = DateTime.Now.Year;
                    quote.LastIdentNo = (lastId + 1);
                }
                else
                {
                    quote.IdentYear = DateTime.Now.Year;
                    quote.LastIdentNo = 1;
                }
                _context.Quote.Add(quote);
                await _context.SaveChangesAsync();
            }
            return Ok(quote);
        }

        [Route("GetQuote")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuote()
        {
            return await _context.Quote.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            var quote = await _context.Quote.FindAsync(id);

            if (quote == null)
            {
                return NotFound();
            }

            return quote;
        }
        [Route("GetDealDropdown")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetDealDropdown()
        {
            return await _context.Deal.ToListAsync();
        }
        [Route("GetQuoteCatalog")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LinePart>>> GetQuoteCatalog(int quoteId)
        {
            return await _context.LinePart.Where(w => w.QuoteId == quoteId).ToListAsync();
        }

        [Route("GetLeadProposal")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetLeadProposal(int leadId)
        {
            return await _context.Quote.Where(w => w.Deal.LeadId == leadId).ToListAsync();
        }
        [Route("GetDealProposal")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetDealProposal(int dealId)
        {
            return await _context.Quote.Where(w => w.DealId == dealId).ToListAsync();
        }

    }
}