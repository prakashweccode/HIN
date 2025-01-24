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
    public class GroupController : ControllerBase
    {
        [Route("SaveUsergroups")]
        [HttpPost]
        public async Task<ActionResult<UserGroups>> SaveUser(UserGroups user)
        {
            try
            {
                UserGroups userDetail = new UserGroups();
                string apiPath = string.Format("Group/SaveGroups");
                HttpResponseMessage response = await DataManager.PostData<UserGroups>(apiPath, user).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<UserGroups>(content);
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
        [Route("SaveUsergroupMapping")]
        [HttpPost]
        public async Task<ActionResult<List<UserGroupMapping>>> SaveUsergroupMapping(List<UserGroupMapping> userGroupMapping)
        {
            try
            {
                string apiPath = string.Format("Group/SaveUsergroupMapping");
                HttpResponseMessage response = await DataManager.PostData<List<UserGroupMapping>>(apiPath, userGroupMapping).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var userGroup = JsonConvert.DeserializeObject<List<UserGroupMapping>>(content);
                    return Ok(userGroup);
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
        [Route("DeleteUserGroupMapping")]
        [HttpDelete]
        public async Task<ActionResult> DeleteUserGroupMapping(int userId)
        {
            try
            {
                string apiPath = string.Format("Group/DeleteUserGroupMapping?userId={0}", userId);
                HttpResponseMessage response = await DataManager.DeleteData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
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
        [Route("SaveLeadgroupMapping")]
        [HttpPost]
        public async Task<ActionResult<List<LeadGroupMapping>>> SaveLeadgroupMapping(List<LeadGroupMapping> leadGroupMapping)
        {
            try
            {
                string apiPath = string.Format("Group/SaveLeadgroupMapping");
                HttpResponseMessage response = await DataManager.PostData<List<LeadGroupMapping>>(apiPath, leadGroupMapping).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var lstLeadGroupMapping = JsonConvert.DeserializeObject<List<LeadGroupMapping>>(content);
                    return Ok(lstLeadGroupMapping);
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
        [Route("DeleteLeadGroupMapping")]
        [HttpDelete]
        public async Task<ActionResult> DeleteLeadGroupMapping(int leadId)
        {
            try
            {
                string apiPath = string.Format("Group/DeleteLeadGroupMapping?leadId={0}", leadId);
                HttpResponseMessage response = await DataManager.DeleteData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
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
        [Route("GetUserGroups")]
        [HttpGet]
        public async Task<ActionResult<List<UserGroups>>> GetUserGroups()
        {
            try
            {
                List<UserGroups> userDetail = new List<UserGroups>();
                string apiPath = string.Format("Group/GetUserGroups");
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

        [Route("GetUserGroupMapping")]
        [HttpGet]
        public async Task<ActionResult<List<UserGroupMapping>>> GetUserGroupMapping(int userId)
        {
            try
            {
                List<UserGroupMapping> userDetail = new List<UserGroupMapping>();
                string apiPath = string.Format("Group/GetUserGroupMapping?userId={0}", userId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<UserGroupMapping>>(content);
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

        [Route("GetLeadGroupMapping")]
        [HttpGet]
        public async Task<ActionResult<List<LeadGroupMapping>>> GetLeadGroupMapping(int leadId)
        {
            try
            {
                string apiPath = string.Format("Group/GetLeadGroupMapping?leadId={0}", leadId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<List<LeadGroupMapping>>(content);
                    return Ok(data);
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

        [Route("GetODataUserGroups")]
        [HttpGet]
        public async Task<ActionResult> GetODataUserGroups()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataUserGroups" + urlParams;
            var response = await DataManager.GetOData(apiPath).ConfigureAwait(false);
            if (response.Success)
            {
                return Ok(response.Body);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
