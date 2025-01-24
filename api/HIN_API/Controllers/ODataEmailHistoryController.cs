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
    public class ODataEmailHistoryController : Controller
    {
        private readonly TenantContext _context;
        public ODataEmailHistoryController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.EmailHistory.AsQueryable();
            return Ok(result);
        }
    }
}