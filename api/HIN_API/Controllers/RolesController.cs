using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HIN_API.Models;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly TenantContext _context;

        public RolesController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetRolePermissions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePermissions>>> GetRolePermissions(int roleId)
        {
            return await _context.RolePermissions.Where(w => w.RoleId == roleId).ToListAsync();
        }
        // GET: api/Roles
        [Route("GetRoles")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Roles>>> GetRoles()
        {
            return await _context.Roles.Where(w => w.Status == true).ToListAsync();
        }
        [Route("GetPermissions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permissions>>> GetPermissions()
        {
            return await _context.Permissions.ToListAsync();
        }
        [Route("SaveRolePermission")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<RolePermissions>>> SaveRolePermission(List<RolePermissions> rolePermissions)
        {
            try
            {
                if(rolePermissions.Count > 0)
                {
                    if (rolePermissions.FirstOrDefault().Id > 0)
                        _context.RolePermissions.UpdateRange(rolePermissions);
                    else 
                    {
                        //List<RolePermissions> newRolePer = new List<RolePermissions>();
                        //foreach(var data in rolePermissions)
                        //{
                        //    var obj = new RolePermissions
                        //    {
                        //        IsEnabled = data.IsEnabled,
                        //        PermissionId = data.PermissionId,
                        //        RoleId = data.RoleId
                        //    };
                        //    //newRolePer.Add(obj);
                        //    _context.RolePermissions.Add(obj); await _context.SaveChangesAsync();
                        //}
                        _context.RolePermissions.AddRange(rolePermissions);
                    }
                    await _context.SaveChangesAsync();
                }
                return Ok(rolePermissions);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Roles>> GetRoles(int id)
        {
            var roles = await _context.Roles.FindAsync(id);

            if (roles == null)
            {
                return NotFound();
            }

            return roles;
        }

        [Route("AddOrUpdateRole")]
        [HttpPost]
        public async Task<ActionResult<Roles>> AddOrUpdateRole(Roles roles)
        {
            if (roles.RoleId > 0) 
            {
                _context.Roles.Update(roles);
                await _context.SaveChangesAsync();
            }
            else
            {
                roles.Status = true;
                _context.Roles.Add(roles);
                await _context.SaveChangesAsync();
            }
            return Ok(roles);
        }

        // DELETE: api/Roles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Roles>> DeleteRoles(int id)
        {
            var roles = await _context.Roles.FindAsync(id);
            if (roles == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(roles);
            await _context.SaveChangesAsync();

            return roles;
        }

        private bool RolesExists(int id)
        {
            return _context.Roles.Any(e => e.RoleId == id);
        }
    }
}
