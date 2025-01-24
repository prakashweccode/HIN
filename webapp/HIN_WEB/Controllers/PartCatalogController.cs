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
    public class PartCatalogController : Controller
    {
        [Route("SavePartCatalog")]
        [HttpPost]
        public async Task<ActionResult<PartCatalog>> PostAsync(PartCatalog partCatalog)
        {
            try
            {
                string apiPath = string.Format("PartCatalog/SavePartCatalog");
                HttpResponseMessage response = await DataManager.PostData(apiPath, partCatalog).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    partCatalog = JsonConvert.DeserializeObject<PartCatalog>(content);
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
        [Route("SaveLines")]
        [HttpPost]
        public async Task<ActionResult<LinePart>> PostAsync(LinePart linePart)
        {
            try
            {
                string apiPath = string.Format("LinePart/SaveLinePart");
                HttpResponseMessage response = await DataManager.PostData(apiPath, linePart).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    linePart = JsonConvert.DeserializeObject<LinePart>(content);
                    return Ok(linePart);
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


        [Route("GetPartCatalog")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartCatalog>>> GetAsync()
        {
            try
            {
                IEnumerable<PartCatalog> partCatalog = new List<PartCatalog>();
                string apiPath = string.Format("PartCatalog/GetPartCatalog");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    partCatalog = JsonConvert.DeserializeObject<List<PartCatalog>>(content);
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

        [Route("GetODataPartCatalog")]
        [HttpGet]
        public async Task<ActionResult> GetODataPartCatalog()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataPartCatalog" + urlParams;
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

        [Route("GetLeadPartCatalog")]
        [HttpGet]
        public async Task<ActionResult<List<PartCatalog>>> GetLeadPartCatalog(int leadId)
        {
            try
            {
                List<PartCatalog> userDetail = new List<PartCatalog>();
                string apiPath = string.Format("PartCatalog/GetLeadPartCatalog?leadId=" + leadId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var partCatalog = JsonConvert.DeserializeObject<List<PartCatalog>>(content);
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

        [Route("GetDealPartCatalog")]
        [HttpGet]
        public async Task<ActionResult<List<PartCatalog>>> GetDealPartCatalog(int dealId)
        {
            try
            {
                List<PartCatalog> userDetail = new List<PartCatalog>();
                string apiPath = string.Format("PartCatalog/GetDealPartCatalog?dealId=" + dealId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var partCatalog = JsonConvert.DeserializeObject<List<PartCatalog>>(content);
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


    }
}