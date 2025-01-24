using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNet.OData;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataPatientController : Controller
    {
        private readonly TenantContext _context;
        public ODataPatientController(TenantContext dbContext)
        {
            _context = dbContext;
        }
        public IActionResult Get()
        {
            try
            {
                var result = _context.TempPatient.AsQueryable();
                return Ok(result);
            }
            catch(Exception ex)
            {
                return null;
            }
            
        }

        
    }
}
