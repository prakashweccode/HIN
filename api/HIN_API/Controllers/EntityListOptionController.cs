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
    public class EntityListOptionController : ControllerBase
    {
        private readonly TenantContext _context;
        public EntityListOptionController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetDropDownOptions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityListOptions>>> GetDropDownOptions(int entityType) 
        {
            try
            {
                return await _context.EntityListOptions.Where(w => w.Type == entityType && (w.Inactive == false || w.Inactive == null)).ToListAsync();
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("SaveListOptions")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<EntityListOptions>>> SaveListOptions(List<EntityListOptions> listOptions)
        {
            try
            {
                if (listOptions.Count > 0)
                {
                    _context.EntityListOptions.AddRange(listOptions);
                    await _context.SaveChangesAsync();
                }
                return Ok(listOptions);
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
        [Route("UpdateListOption")]
        [HttpPost]
        public async Task<ActionResult<EntityListOptions>> UpdateListOption(EntityListOptions listOption)
        {
            try
            {
                if (listOption.Id > 0)
                {
                    _context.EntityListOptions.Update(listOption);
                    await _context.SaveChangesAsync();
                }
                return Ok(listOption);
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
    }
}
