using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntityListOptionController : ControllerBase
    {
        [Route("GetDropDownOptions")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityListOptions>>> GetDropDownOptions(int entityType)
        {
            string apiPath = "EntityListOption/GetDropDownOptions?entityType=" + entityType;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<EntityListOptions>>(content);
                return Ok(result);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
        [Route("SaveListOptions")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<EntityListOptions>>> SaveListOptions(List<EntityListOptions> listOptions)
        {
            string apiPath = "EntityListOption/SaveListOptions";
            var response = await DataManager.PostData(apiPath, listOptions).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<EntityListOptions>>(content);
                return Ok(result);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
        [Route("UpdateListOption")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<EntityListOptions>>> UpdateListOption(EntityListOptions listOption)
        {
            string apiPath = "EntityListOption/UpdateListOption";
            var response = await DataManager.PostData(apiPath, listOption).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<EntityListOptions>(content);
                return Ok(result);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}
