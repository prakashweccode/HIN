using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataVwContactsController : Controller
    {
        private readonly TenantContext _context;
        public ODataVwContactsController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.VwContactInformation.AsQueryable();
            return Ok(result);
        }
    }
}
