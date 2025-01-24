using HIN_WEB.Helper;
using HIN_WEB.Models;
using HIN_WEBApi.Models;
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
    public class DashboardConfigController : ControllerBase
    {
        [Route("GetDashboardConfigData")]
        [HttpGet]
        public async Task<ActionResult> GetDashboardConfigData(int entity)
        {
            string apiPath = "DashboardConfig/GetDashboardConfigData?entity=" + entity;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Tuple<List<DashboardConfigFields>, List<SearchCriteria>>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("GetChartConfigById")]
        [HttpGet]
        public async Task<ActionResult> GetChartConfigById(int configId)
        {
            string apiPath = "DashboardConfig/GetChartConfigById?configId=" + configId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Tuple<DashboardUserConfig, List<DashBoardQueries>>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetSearchValues")]
        [HttpGet]
        public async Task<ActionResult> GetSearchValues(int id, string fieldname)
        {
            string apiPath = "DashboardConfig/GetSearchValues?id=" + id + "&fieldname=" + fieldname;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetAllChartConfig")]
        [HttpGet]
        public async Task<ActionResult> GetChartConfigById()
        {
            string apiPath = "DashboardConfig/GetAllChartConfig";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<VwDashboardChartConfig>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetChartData")]
        [HttpPost]
        public async Task<ActionResult> GetChartData(VwDashboardChartConfig config)
        {
            string apiPath = "DashboardConfig/GetChartData";
            HttpResponseMessage response = await DataManager.PostData(apiPath, config).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("SaveDashboardConfig")]
        [HttpPost]
        public async Task<ActionResult> SaveDashboardConfig(DashboardSettingsModel model)
        {
            string apiPath = "DashboardConfig/SaveDashboardConfig";
            HttpResponseMessage response = await DataManager.PostData(apiPath, model).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<DashboardSettingsModel>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetODataDashboardConfigs")]
        [HttpGet]
        public async Task<ActionResult> GetODataNetworking()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataDashboardConfigs" + urlParams;
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

        [Route("SaveChartConfig")]
        [HttpPost]
        public async Task<ActionResult> SaveChartConfig(ChartConfig model)
        {
            string apiPath = "DashboardConfig/SaveChartConfig";
            HttpResponseMessage response = await DataManager.PostData(apiPath, model).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<ChartConfig>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("getAllChartConfigById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChartConfig>>> getAllChartConfigById(int id)
        {
            string apiPath = "DashboardConfig/getAllChartConfigById?id=" + id;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<ChartConfig>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("RemoveChartConfigById")]
        [HttpDelete]
        public async Task<ActionResult> RemoveChartConfigById(int id)
        {
            try
            {
                string apiPath = string.Format("DashboardConfig/RemoveChartConfigById?id={0}", id);
                HttpResponseMessage response = await DataManager.DeleteData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    return Ok();
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
