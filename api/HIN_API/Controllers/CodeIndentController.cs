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
    public class CodeIndentController : ControllerBase
    {
        private readonly TenantContext _context;
        public CodeIndentController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetLastIndentByEntity")]
        [HttpGet]
        public async Task<ActionResult<int>> GetLastIndentByEntity(string entity)
        {
            int entityLength = 0;
            switch (entity)
            {
                case "Partner":
                    entityLength = await _context.Partner.CountAsync();
                    break;
                case "Referral":
                    entityLength = await _context.Referral.CountAsync();
                    break;
                case "Vendor":
                    entityLength = await _context.Vendor.CountAsync();
                    break;
                case "Deal":
                    entityLength = await _context.Deal.CountAsync();
                    break;
                case "Lead":
                    entityLength = await _context.Lead.CountAsync();
                    break;
                case "ContactInformation":
                    entityLength = await _context.ContactInformation.CountAsync();
                    break;
                case "Todo":
                    entityLength = await _context.Todo.CountAsync();
                    break;
                case "EventShow":
                    entityLength = await _context.EventShow.CountAsync();
                    break;
                case "Networking":
                    entityLength = await _context.Networking.CountAsync();
                    break;
                case "Services":
                    entityLength = await _context.Services.CountAsync();
                    break;
                case "Event":
                    entityLength = await _context.Event.CountAsync();
                    break;
            }
            //var oppLength = await _context.Deal.CountAsync();
            if (entityLength > 0)
            {
                string sql = "SELECT IDENT_CURRENT('" + entity + "') as LastId";
                var lastId = _context.Query<CodeIndent>().FromSqlRaw(sql).First();
                return lastId != null ? Convert.ToInt32(lastId.LastId) : 0;
            }
            else
                return 0;
        }
        [Route("GetLastQuoteIdentity")]
        [HttpGet]
        public async Task<ActionResult<int>> GetLastQuoteIdentity()
        {
            var lastId = _context.Quote.Where(w => w.IdentYear == DateTime.Now.Year).Max(m => m.LastIdentNo);
            return lastId != null ? Convert.ToInt32(lastId) : 0;
        }
    }
}
