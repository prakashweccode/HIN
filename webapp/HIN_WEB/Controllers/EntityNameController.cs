using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntityNameController : Controller
    {
        [Route("GetEntityName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityNameDto>>> GetEntityName(int entityTypeId, int leadTypeId)
        {
            List<EntityNameDto> listEntityName = new List<EntityNameDto>();
            string api = string.Format("EntityName/GetEntityName?entityTypeId=" + entityTypeId + "&leadTypeId=" + leadTypeId);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listEntityName = JsonConvert.DeserializeObject<List<EntityNameDto>>(content);
                return Ok(listEntityName);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}