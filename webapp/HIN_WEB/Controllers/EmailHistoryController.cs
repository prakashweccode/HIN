using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailHistoryController : Controller
    {
        [Route("SaveEmailHistory")]
        [HttpPost]
        public async Task<ActionResult<EmailHistory>> PostAsync(EmailHistory emailHistory)
        {
            try
            {
                string apiPath = string.Format("EmailHistory/SaveEmailHistory");
                HttpResponseMessage response = await DataManager.PostData(apiPath, emailHistory).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    emailHistory = JsonConvert.DeserializeObject<EmailHistory>(content);
                    return Ok(emailHistory);
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


        [Route("GetEmailHistory")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmailHistory>>> GetAsync()
        {
            try
            {
                IEnumerable<EmailHistory> emailHistory = new List<EmailHistory>();
                string apiPath = string.Format("EmailHistory/GetEmailHistory");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    emailHistory = JsonConvert.DeserializeObject<List<EmailHistory>>(content);
                    return Ok(emailHistory);
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


        [Route("GetODataEmailHistory")]
        [HttpGet]
        public async Task<ActionResult> GetODataEmailHistory()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataEmailHistory" + urlParams;
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