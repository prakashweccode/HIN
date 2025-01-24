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
    public class CurrencyController : ControllerBase
    {
        private readonly TenantContext _context;
        public CurrencyController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetCurrency")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Currency>>> GetCurrency()
        {
            return await _context.Currency.ToListAsync();
        }

        [Route("GetReason")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reason>>> GetReason()
        {
            return await _context.Reason.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Currency>> GetCurrency(int id)
        {
            var currencies = await _context.Currency.FindAsync(id);

            if (currencies == null)
            {
                return NotFound();
            }

            return currencies;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurrency(int id, Currency currencies)
        {
            if (id != currencies.Id)
            {
                return BadRequest();
            }

            _context.Entry(currencies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CurrencyExists(id))
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


        [Route("SaveCurrency")]
        [HttpPost]
        public async Task<ActionResult<Currency>> SaveCurrency(Currency currencies)
        {
            _context.Currency.Add(currencies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurrency", new { id = currencies.Id }, currencies);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Currency>> DeleteCurrency(int id)
        {
            var currencies = await _context.Currency.FindAsync(id);
            if (currencies == null)
            {
                return NotFound();
            }

            _context.Currency.Remove(currencies);
            await _context.SaveChangesAsync();

            return currencies;
        }


        private bool CurrencyExists(int id)
        {
            return _context.Currency.Any(e => e.Id == id);
        }
    }
}