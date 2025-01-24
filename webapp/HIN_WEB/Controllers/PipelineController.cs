using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PipelineController : ControllerBase
    {
        // GET: api/<PipelineController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroup>>> GetAsync()
        {
            try
            {

                string apiPath = string.Format("Pipeline");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return Ok(JsonConvert.DeserializeObject<IEnumerable<PipelineGroup>>(content));
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

        // GET api/<PipelineController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PipelineController>
        [HttpPost]
        public async Task<ActionResult<PipelineGroup>> PostAsync([FromBody] PipelineGroup pipelineGroup)
        {
            try
            {

                string apiPath = string.Format("Pipeline");
                HttpResponseMessage response = await DataManager.PostData(apiPath, pipelineGroup).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    pipelineGroup = JsonConvert.DeserializeObject<PipelineGroup>(content);
                    return Ok(pipelineGroup);
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

        // PUT api/<PipelineController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PipelineController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [Route("GetPipeLineGroup")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroup>>> GetPipeLineGroup()
        {
            try
            {
                List<PipelineGroup> pipelineDetail = new List<PipelineGroup>();
                string apiPath = string.Format("Pipeline/GetPipeLineGroup");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    pipelineDetail = JsonConvert.DeserializeObject<List<PipelineGroup>>(content);
                    return Ok(pipelineDetail);
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

        [Route("GetPipeLineByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pipeline>>> GetPipeLineByPipeLineGroupId(int Id)
        {
            try
            {
                List<Pipeline> pipelineDetail = new List<Pipeline>();
                string apiPath = string.Format("Pipeline/GetPipeLineByPipeLineGroupId?Id=" + Id);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    pipelineDetail = JsonConvert.DeserializeObject<List<Pipeline>>(content);
                    return Ok(pipelineDetail);
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

        [Route("GetPipelineByGroupTypeName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pipeline>>> GetPipelineByGroupTypeName(string Name) 
        {
            try
            {
                List<Pipeline> pipelineDetail = new List<Pipeline>();
                string apiPath = string.Format("Pipeline/GetPipelineByGroupTypeName?Name=" + Name);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    pipelineDetail = JsonConvert.DeserializeObject<List<Pipeline>>(content);
                    return Ok(pipelineDetail);
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


        [Route("getPipeLine")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pipeline>>> getPipeLine()
        {
            try
            {
                List<Pipeline> pipelineDetail = new List<Pipeline>();
                string apiPath = string.Format("Pipeline/getPipeLine");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    pipelineDetail = JsonConvert.DeserializeObject<List<Pipeline>>(content);
                    return Ok(pipelineDetail);
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

        [Route("GetPipelineGroupType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroupType>>> GetPipelineGroupType()
        {
            try
            {
                List<PipelineGroupType> pipelineDetail = new List<PipelineGroupType>();
                string apiPath = string.Format("Pipeline/GetPipelineGroupType");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    pipelineDetail = JsonConvert.DeserializeObject<List<PipelineGroupType>>(content);
                    return Ok(pipelineDetail);
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

        [Route("DeletePipeline")]
        [HttpDelete]
        public async Task<ActionResult<int>> DeletePipeline(int Id)
        {
            try
            {
                string apiPath = string.Format("Pipeline/" + Id);
                HttpResponseMessage response = await DataManager.DeleteData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return Ok(JsonConvert.DeserializeObject<int>(content));
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
