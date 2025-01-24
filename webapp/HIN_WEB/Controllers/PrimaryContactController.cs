using HIN_WEB.Helper;
using HIN_WEB.Models;
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
    public class PrimaryContactController : ControllerBase
    {

        [Route("SavePrimaryContact")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> SavePrimaryContact(ContactInformation contactInfo)
        {
            string apiPath = "PrimaryContact/SavePrimaryContact";
            HttpResponseMessage response = await DataManager.PostData(apiPath, contactInfo).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(content);
                return Ok(contactInformation);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("GetPrimaryContact")]
        [HttpGet]
        public async Task<ActionResult<ContactInformation>> GetPrimaryContact(int entityId, int type)
        {
            string api = "PrimaryContact/GetPrimaryContact?entityId=" + entityId + "&type=" + type;
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactinfo = JsonConvert.DeserializeObject<ContactInformation>(content);
                return Ok(contactinfo);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }
    }
}
