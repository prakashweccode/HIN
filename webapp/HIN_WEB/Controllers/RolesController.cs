using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        [Route("GetRoles")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Roles>>> GetRoles()
        {
            try
            {
                string apiPath = "Roles/GetRoles";
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var roles = JsonConvert.DeserializeObject<List<Roles>>(content);
                    return Ok(roles);
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
        [Route("GetPermissions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permissions>>> GetPermissions()
        {
            try
            {
                string apiPath = "Roles/GetPermissions";
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var roles = JsonConvert.DeserializeObject<List<Permissions>>(content);
                    return Ok(roles);
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
        [Route("GetRolePermissions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePermissions>>> GetRolePermissions(int roleId)
        {
            try
            {
                string apiPath = "Roles/GetRolePermissions?roleId=" + roleId;
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var roles = JsonConvert.DeserializeObject<List<RolePermissions>>(content);
                    return Ok(roles);
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
        [Route("SaveRolePermission")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<RolePermissions>>> SaveRolePermission(List<RolePermissions> model)
        {
            try
            {
                string apiPath = "Roles/SaveRolePermission";
                HttpResponseMessage response = await DataManager.PostData(apiPath, model).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var roles = JsonConvert.DeserializeObject<List<RolePermissions>>(content);
                    return Ok();
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
        [Route("AddOrUpdateRole")]
        [HttpPost]
        public async Task<ActionResult<Roles>> AddOrUpdateRole(Roles model)
        {
            try
            {
                string apiPath = "Roles/AddOrUpdateRole";
                HttpResponseMessage response = await DataManager.PostData(apiPath, model).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var role = JsonConvert.DeserializeObject<Roles>(content);
                    return Ok(role);
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
    }
}
