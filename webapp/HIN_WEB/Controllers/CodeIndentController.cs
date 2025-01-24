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
    public class CodeIndentController : ControllerBase
    {
        [Route("GetLastIndentByEntity")]
        [HttpGet]
        public async Task<ActionResult<string>> GetLastIndentByEntity(string entity, string prefix)
        {
            try
            {
                string apiPath = string.Format("CodeIndent/GetLastIndentByEntity?entity={0}", entity);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var lastId = JsonConvert.DeserializeObject<int>(content);
                    EntityCodeNumber entityCodeNumber = new EntityCodeNumber();
                    entityCodeNumber.EntityNumber = CodeIndentHelper.ProcessLastIdByEntity(entity, prefix, lastId);
                    return Ok(entityCodeNumber);
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
        [Route("GetLastQuoteIdentity")]
        [HttpGet]
        public async Task<ActionResult<string>> GetLastQuoteIdentity(string prefix)
        {
            try
            {
                string apiPath = string.Format("CodeIndent/GetLastQuoteIdentity");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var lastId = JsonConvert.DeserializeObject<int>(content);
                    EntityCodeNumber entityCodeNumber = new EntityCodeNumber();
                    entityCodeNumber.EntityNumber = CodeIndentHelper.ProcessLastQuoteIdentity(prefix, lastId);
                    return Ok(entityCodeNumber);
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
