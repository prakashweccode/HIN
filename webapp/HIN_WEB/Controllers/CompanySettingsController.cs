using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanySettingsController : ControllerBase
    {


        [Route("GetSettings")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Settings>>> GetSettings()
        {
            string apiPath = "CompanySettings/GetSettings";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var settingsInfo = JsonConvert.DeserializeObject<IEnumerable<Settings>>(content);
                return Ok(settingsInfo);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetCompanySettingsById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanySettings>>> GetCompanySettingsById(int id)
        {
            string apiPath = "CompanySettings/GetCompanySettingsById?id=" + id;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var settingsInfo = JsonConvert.DeserializeObject<IEnumerable<CompanySettings>>(content);
                return Ok(settingsInfo);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("SaveCompanySettings")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<CompanySettings>>> SaveCompanySettings(List<CompanySettings> companySettings)
        {
            string apiPath = "CompanySettings/SaveCompanySettings";
            HttpResponseMessage response = await DataManager.PostData(apiPath, companySettings).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var settingsInfo = JsonConvert.DeserializeObject<IEnumerable<CompanySettings>>(content);
                return Ok(settingsInfo);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
