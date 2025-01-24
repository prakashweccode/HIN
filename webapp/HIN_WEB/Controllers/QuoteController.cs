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
    public class QuoteController : Controller
    {
        [Route("SaveQuote")]
        [HttpPost]
        public async Task<ActionResult<Quote>> PostAsync(Quote quote)
        {
            try
            {
                string apiPath = string.Format("Quote/SaveQuote");
                HttpResponseMessage response = await DataManager.PostData(apiPath, quote).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    quote = JsonConvert.DeserializeObject<Quote>(content);
                    return Ok(quote);
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

        [Route("GetQuote")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetAsync()
        {
            try
            {
                IEnumerable<Quote> quote = new List<Quote>();
                string apiPath = string.Format("Quote/GetQuote");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    quote = JsonConvert.DeserializeObject<List<Quote>>(content);
                    return Ok(quote);
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

        [Route("GetODataQuote")]
        [HttpGet]
        public async Task<ActionResult> GetODataQuote()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataQuote" + urlParams;
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

        [Route("GetDealDropdown")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetDealDropdown()
        {
            try
            {
                IEnumerable<Deal> lstDeal = new List<Deal>();
                string apiPath = string.Format("Quote/GetDealDropdown");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    lstDeal = JsonConvert.DeserializeObject<List<Deal>>(content);
                    return Ok(lstDeal);
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

        [Route("GetQuoteCatalog")]
        [HttpGet]
        public async Task<ActionResult<List<LinePart>>> GetQuoteCatalog(int quoteId)
        {
            try
            {
                List<LinePart> lineParts = new List<LinePart>();
                string apiPath = string.Format("Quote/GetQuoteCatalog?quoteId=" + quoteId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var partCatalog = JsonConvert.DeserializeObject<List<LinePart>>(content);
                    return Ok(partCatalog);
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

        [Route("GetLeadProposal")]
        [HttpGet]
        public async Task<ActionResult<List<Quote>>> GetLeadProposal(int leadId)
        {
            try
            {
                List<Quote> userDetail = new List<Quote>();
                string apiPath = string.Format("Quote/GetLeadProposal?leadId=" + leadId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var quote = JsonConvert.DeserializeObject<List<Quote>>(content);
                    return Ok(quote);
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

        [Route("GetDealProposal")]
        [HttpGet]
        public async Task<ActionResult<List<Quote>>> GetDealProposal(int dealId)
        {
            try
            {
                List<Quote> userDetail = new List<Quote>();
                string apiPath = string.Format("Quote/GetDealProposal?dealId=" + dealId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var quote = JsonConvert.DeserializeObject<List<Quote>>(content);
                    return Ok(quote);
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