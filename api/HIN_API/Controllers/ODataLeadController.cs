using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataLeadController : ODataController
    {
        private readonly TenantContext _context;
        public ODataLeadController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.Lead.AsQueryable();
            return Ok(result);
        }
    }
}
