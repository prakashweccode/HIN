using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataQuoteController : Controller
    {
        private readonly TenantContext _context;
        public ODataQuoteController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.Quote.AsQueryable();
            return Ok(result);
        }
    }
}