using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupPermissionController : ControllerBase
    {
        private readonly TenantContext _context;

        public GroupPermissionController(TenantContext context) => _context = context;

        [HttpGet]
        [Route("GetGroupPermissions")]
        public async Task<ActionResult<object>> GetGroupPermissions(int groupId)
        {
            try
            {
                string insertQuery = @$"INSERT INTO [UsersGroupsPermission] (IdGroup, IdPermis, StatGrant, StatRead, StatHide)
                                    SELECT {groupId}, UP.id, 0, 0, 0 FROM [UserPermission] UP 
                                    LEFT OUTER JOIN [UsersGroupsPermission] UGP ON UP.id = UGP.idPermis and UGP.idGroup = {groupId}
                                    WHERE UGP.id IS NULL";
                _ = await _context.Database.ExecuteSqlRawAsync(insertQuery);

                return await (from ugp in _context.UsersGroupsPermission
                              join up in _context.UserPermission
                              on ugp.IdPermis equals up.Id
                              where ugp.IdGroup == groupId
                              select new
                              {
                                  ugp.Id,
                                  ugp.IdGroup,
                                  ugp.IdPermis,
                                  ugp.StatGrant,
                                  ugp.StatRead,
                                  ugp.StatHide,
                                  up.Name,
                                  up.Parent
                              }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
           
        }

        [HttpGet]
        [Route("GetUserGroupsForPermissions")]
        public async Task<ActionResult<List<UserGroups>>> GetUserGroupsForPermissions()
        {
            return await _context.UserGroups.Select(x => new UserGroups()
            {
                Name = x.Name,
                UserGroupId = x.UserGroupId,
                Description = x.Description,
                IsActive = x.IsActive
            }).ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroupPermissions(int id, JArray permissions)
        {
            foreach(var permission in permissions)
            {
                UsersGroupsPermission permissionObject = permission.ToObject<UsersGroupsPermission>();
                if (id != permissionObject.IdGroup)
                    return BadRequest();

                var permisObject = await _context.UsersGroupsPermission.Where(x => x.Id == permissionObject.Id).FirstOrDefaultAsync();
                permisObject.StatGrant = permissionObject.StatGrant;
                permisObject.StatHide = permissionObject.StatHide;
                permisObject.StatRead = permissionObject.StatRead;
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }
    }
}
