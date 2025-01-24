using System;
using System.Collections.Generic;
using System.Data.OracleClient;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        // GET: api/<OrganizationController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Organization>>> GetAsync()
        {
            try
            {
                IEnumerable<Organization> leads = new List<Organization>();
                string apiPath = string.Format("Lead");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    leads = JsonConvert.DeserializeObject<List<Organization>>(content);
                    return Ok(leads);
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

        // GET api/<OrganizationController>/5
        [Route("GetOrg")]
        [HttpGet]
        public async Task<ActionResult<List<Organization>>> GetOrg(string searchtext)
        {
            try
            {
                List<Organization> userDetail = new List<Organization>();
                string apiPath = string.Format("Organization/search");
                HttpResponseMessage response = await DataManager.GetData(apiPath + "?id=" + searchtext).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Organization>>(content);
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

        // POST api/<OrganizationController>
        [Route("SaveOrganization")]
        [HttpPost]
        public async Task<ActionResult<Organization>> PostAsync(Organization organization)
        {
            try
            {
                string apiPath = string.Format("Organization/SaveOrganization");
                HttpResponseMessage response = await DataManager.PostData(apiPath, organization).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    organization = JsonConvert.DeserializeObject<Organization>(content);
                    return Ok(organization);
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
        [Route("GetODataOrganization")]
        [HttpGet]
        public async Task<ActionResult> GetODataOrganization()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataOrganization" + urlParams;
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

        [Route("GetOrganizationById")]
        [HttpGet]
        public async Task<ActionResult<Organization>> GetOrganizationById(string Id)
        {
            try
            {
                Organization userDetail = new Organization();
                string apiPath = string.Format("Organization/searchById");
                HttpResponseMessage response = await DataManager.GetData(apiPath + "?id=" + Id).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<Organization>(content);
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

    }
}
