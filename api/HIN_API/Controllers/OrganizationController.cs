using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly TenantContext _context;
        private readonly AppSettings _appSettings;

        public OrganizationController(TenantContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }
        // GET: api/<OrganizationController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organization>>> Get()
        {
            return await _context.Organization.ToListAsync();
        }

        // GET api/<OrganizationController>/5
        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<List<Organization>>> search(string id)
        {
            var org = await _context.Organization.Where(x => x.Name.Contains(id)).ToListAsync();

            if (org == null)
            {
                return NotFound();
            }

            return org;
        }

        [HttpGet]
        [Route("GetOrganization")]
        public async Task<ActionResult<Organization>> GetOrganization(string id)
        {
            var org = await _context.Organization.FindAsync(id);

            if (org == null)
            {
                return NotFound();
            }

            return org;
        }
        [Route("SaveOrganization")]
        [HttpPost]
        public async Task<ActionResult<Organization>> PostOrgs(Organization org)
        {
            if (org.Id == null || org.Id == 0)
            {
                _context.Organization.Add(org);
                await _context.SaveChangesAsync();
                return Ok(org);
            }
            else
            {
                _context.Organization.Update(org);
                await _context.SaveChangesAsync();
                return Ok(org);
            }
        }
        // POST api/<OrganizationController>
        

        // PUT api/<OrganizationController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrganizationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        [HttpGet]
        [Route("searchById")]
        public async Task<ActionResult<Organization>> searchById(string id)
        {
            var Id = 0;
            int.TryParse(id, out Id);
            var organization = await _context.Organization.Where(x => x.Id == Id).FirstOrDefaultAsync();

            if (organization == null)
            {
                return NotFound();
            }

            return organization;
        }
    }
}
