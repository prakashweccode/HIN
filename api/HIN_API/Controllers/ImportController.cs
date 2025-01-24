using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportController : ControllerBase
    {
        private readonly TenantContext _context;
        public ImportController(TenantContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("SaveImportExceptions")]
        public async Task<ActionResult<List<ImportException>>> SaveImportExceptions(List<ImportException> lstException)
        {
            try
            {
                _context.ImportException.AddRange(lstException);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch(Exception ex)
            {
                return Problem();
            }
        }
        [HttpGet]
        [Route("GetAllImportExceptions")]
        public async Task<ActionResult<List<ImportException>>> GetAllImportExceptions()
        {
            try
            {
                return await _context.ImportException.ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [HttpGet]
        [Route("GetImportExceptionsByNumber")]
        public async Task<ActionResult<List<ImportException>>> GetImportExceptionsByNumber(string batchNumber)
        {
            try
            {
                return await _context.ImportException.Where(w=>w.BatchNumber.Trim() == batchNumber.Trim()).ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
    }
}
