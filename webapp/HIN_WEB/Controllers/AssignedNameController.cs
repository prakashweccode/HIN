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
    public class AssignedNameController : ControllerBase
    {
        [Route("GetUserandPartnerName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignedName>>> GetUserandPartnerName()
        {
            List<AssignedName> listAssignedName = new List<AssignedName>();
            string api = string.Format("AssignedName/GetUserandPartnerName");
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                listAssignedName = JsonConvert.DeserializeObject<List<AssignedName>>(content);
                return Ok(listAssignedName);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}
