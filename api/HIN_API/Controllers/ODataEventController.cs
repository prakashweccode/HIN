using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataEventController : ControllerBase
    {
        private readonly TenantContext _context;
        public ODataEventController(TenantContext dbContext)
        {
            _context = dbContext;
        }
       
        public IActionResult Get()
        {
            try
            {
                var result = _context.VwEvent.AsQueryable();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
