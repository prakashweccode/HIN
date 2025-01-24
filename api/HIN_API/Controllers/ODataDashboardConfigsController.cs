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
    public class ODataDashboardConfigsController : Controller
    {
        private readonly TenantContext _context;
        public ODataDashboardConfigsController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.DashboardUserConfig.AsQueryable();
            return Ok(result);
        }
    }
}
