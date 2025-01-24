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
    public class CurrencyController : ControllerBase
    {
        [Route("SaveCurrency")]
        [HttpPost]
        public async Task<ActionResult<Currency>> PostAsync(Currency Currencies)
        {
            try
            {
                string apiPath = string.Format("Currency/SaveCurrency");
                HttpResponseMessage response = await DataManager.PostData(apiPath, Currencies).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    Currencies = JsonConvert.DeserializeObject<Currency>(content);
                    return Ok(Currencies);
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

        [Route("GetODataCurrency")]
        [HttpGet]
        public async Task<ActionResult> GetODataCurrency()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataCurrency" + urlParams;
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

        [Route("GetCurrency")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Currency>>> GetAsync()
        {
            try
            {
                IEnumerable<Currency> currencies = new List<Currency>();
                string apiPath = string.Format("Currency/GetCurrency");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    currencies = JsonConvert.DeserializeObject<List<Currency>>(content);
                    return Ok(currencies);
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

        [Route("GetReason")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reason>>> GetReason()
        {
            try
            {
                IEnumerable<Reason> reasons = new List<Reason>();
                string apiPath = string.Format("Currency/GetReason");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    reasons = JsonConvert.DeserializeObject<List<Reason>>(content);
                    return Ok(reasons);
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