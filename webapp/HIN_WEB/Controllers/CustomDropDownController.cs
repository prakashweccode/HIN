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
    public class CustomDropDownController : ControllerBase
    {
        [Route("SaveCustomDropDown")]
        [HttpPost]
        public async Task<ActionResult<CustomDropDown>> SaveCustomDropDown(CustomDropDown customDropDown)
        {
            string apiPath = customDropDown.SaveApiPath;
            HttpResponseMessage response = await DataManager.PostData(apiPath, customDropDown).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var customField = JsonConvert.DeserializeObject<CustomDropDown>(content);
                return Ok(customField);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetCustomDropDown")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetCustomDropDown(string getApiPath)
        {
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            string apiPath = getApiPath;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                lstCustomDropDown = JsonConvert.DeserializeObject<List<CustomDropDown>>(content);
                return Ok(lstCustomDropDown);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}
