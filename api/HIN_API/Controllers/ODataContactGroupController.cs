using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataContactGroupController : ControllerBase
    {
        private readonly TenantContext _context;
        public ODataContactGroupController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _context.Group.AsQueryable();
            return Ok(result);
        }
    }
}
