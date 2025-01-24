using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly TenantContext _context;
        public GroupController(TenantContext context)
        {
            _context = context;
        }
        // GET: api/Groups
        [Route("GetUserGroups")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserGroups>>> GetGroups()
        {
            return await _context.UserGroups.ToListAsync();
        }
        [Route("GetUserGroupMapping")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserGroupMapping>>> GetUserGroupMapping(int userId)
        {
            return await _context.UserGroupMapping.Where(w => w.UserId == userId).ToListAsync();
        }

        [Route("GetLeadGroupMapping")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadGroupMapping>>> GetLeadGroupMapping(int leadId)
        {
            return await _context.LeadGroupMapping.Where(w => w.LeadId == leadId).ToListAsync();
        }
        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserGroups>> GetGroups(int id)
        {
            var groups = await _context.UserGroups.FindAsync(id);

            if (groups == null)
            {
                return NotFound();
            }

            return groups;
        }
        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroups(int id, UserGroups groups)
        {
            if (id != groups.UserGroupId)
            {
                return BadRequest();
            }

            _context.Entry(groups).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Route("SaveGroups")]
        [HttpPost]
        public async Task<ActionResult<UserGroups>> SaveGroups(UserGroups groups)
        {
            if (groups.UserGroupId > 0)
            {
                _context.UserGroups.Update(groups);
                await _context.SaveChangesAsync();
            }
            else
            {
                groups.CreatedOn = DateTime.UtcNow;
                _context.UserGroups.Add(groups);
                await _context.SaveChangesAsync();
            }
            return Ok(groups);
        }
        [Route("SaveUsergroupMapping")]
        [HttpPost]
        public async Task<ActionResult<List<UserGroupMapping>>> SaveUsergroupMapping(List<UserGroupMapping> userGroupMappings)
        {
            if (userGroupMappings.Count > 0)
            {
                try
                {
                    var removeData = _context.UserGroupMapping.Where(w => w.UserId == userGroupMappings.FirstOrDefault().UserId).ToList();
                    if (removeData.Count > 0)
                        _context.UserGroupMapping.RemoveRange(removeData);
                    _context.UserGroupMapping.AddRange(userGroupMappings);
                    await _context.SaveChangesAsync();
                }
                catch(Exception ex)
                {

                }
            }
            return Ok();
        }
        [Route("DeleteUserGroupMapping")]
        [HttpDelete]
        public async Task<ActionResult> DeleteUserGroupMapping(int userId)
        {
            var records = await _context.UserGroupMapping.Where(w => w.UserId == userId).ToListAsync();
            if (records.Count > 0)
            {
                _context.UserGroupMapping.RemoveRange(records);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [Route("SaveLeadgroupMapping")]
        [HttpPost]
        public async Task<ActionResult<List<LeadGroupMapping>>> SaveLeadgroupMapping(List<LeadGroupMapping> leadGroupMappings)
        {
            if (leadGroupMappings.Count > 0)
            {
                try
                {
                    var removeData = _context.LeadGroupMapping.Where(w => w.LeadId == leadGroupMappings.FirstOrDefault().LeadId).ToList();
                    if (removeData.Count > 0)
                        _context.LeadGroupMapping.RemoveRange(removeData);
                    _context.LeadGroupMapping.AddRange(leadGroupMappings);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {

                }
            }
            return Ok();
        }
        [Route("DeleteLeadGroupMapping")]
        [HttpDelete]
        public async Task<ActionResult> DeleteLeadGroupMapping(int leadId)
        {
            var records = await _context.LeadGroupMapping.Where(w => w.LeadId == leadId).ToListAsync();
            if (records.Count > 0)
            {
                _context.LeadGroupMapping.RemoveRange(records);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        private bool GroupsExists(int id)
        {
            return _context.UserGroups.Any(e => e.UserGroupId == id);
        }

    }
}