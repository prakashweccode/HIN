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
    public class K9ERPSettingController : ControllerBase
    {
        [Route("SaveErpSetting")]
        [HttpPost]
        public async Task<ActionResult<K9erpsetting>> PostAsync(K9erpsetting k9erpsettings)
        {
            try
            {
                string apiPath = string.Format("K9ERPSetting/SaveErpSetting");
                HttpResponseMessage response = await DataManager.PostData(apiPath, k9erpsettings).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    k9erpsettings = JsonConvert.DeserializeObject<K9erpsetting>(content);
                    return Ok(k9erpsettings);
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