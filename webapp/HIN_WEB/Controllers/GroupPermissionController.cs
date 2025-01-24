using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupPermissionController : ControllerBase
    {
        [HttpGet]
        [Route("GetGroupPermissions")]
        public async Task<ActionResult<object>> GetGroupPermissions(int groupId)
        {
            string apiPath = $"GroupPermission/GetGroupPermissions?groupId={groupId}";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var groupPermissions = JsonConvert.DeserializeObject<object>(content);
                return Ok(groupPermissions);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("GetUserGroupsForPermissions")]
        public async Task<ActionResult<List<UserGroups>>> GetUserGroupsForPermissions()
        {
            try
            {
                List<UserGroups> userDetail = new List<UserGroups>();
                string apiPath = string.Format("GroupPermission/GetUserGroupsForPermissions");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<UserGroups>>(content);
                    return Ok(userDetail);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroupPermissions(int id, JArray permissions)
        {
            try
            {
                string apiPath = $"GroupPermission/{id}";
                HttpResponseMessage response = await DataManager.PutData<object>(apiPath, permissions);
                if (!response.IsSuccessStatusCode)
                { 
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch(Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
            return Ok();
        }

    }
}
