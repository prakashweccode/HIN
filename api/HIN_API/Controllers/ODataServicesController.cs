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
    public class ODataServicesController : Controller
    {
        private readonly TenantContext _context;
        public ODataServicesController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.VwServices.AsQueryable();
            return Ok(result);
        }
    }
}
