using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataTemplateController : ControllerBase
    {
        private readonly TenantContext _context;
        public ODataTemplateController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            try
            {
                var result = _context.VwTemplate.AsQueryable();
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
            //return Ok();
        }

    }
}
