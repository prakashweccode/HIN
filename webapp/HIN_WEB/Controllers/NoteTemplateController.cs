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
    public class NoteTemplateController : ControllerBase
    {
        [Route("GetNoteTemplate")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteTemplate>>> GetAsync()
        {
            try
            {
                IEnumerable<NoteTemplate> noteTemplates = new List<NoteTemplate>();
                string apiPath = string.Format("NoteTemplate/GetNoteTemplate");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    noteTemplates = JsonConvert.DeserializeObject<List<NoteTemplate>>(content);
                    return Ok(noteTemplates);
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