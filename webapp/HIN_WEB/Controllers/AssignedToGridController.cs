using HIN_WEB.Helper;
using HIN_WEB.Models;
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
    public class AssignedToGridController : ControllerBase
    {
        [Route("GetUsers")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<Users>, int>>> GetUsers(int pageSize, int skip)
        {
            string api = string.Format("AssignedToGrid/GetUsers?pageSize=" + pageSize + "&skip=" + skip);
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var listUsers = JsonConvert.DeserializeObject<Tuple<List<Users>, int>>(content);
                return Ok(listUsers);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}





