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
    public class NotesInfoController : ControllerBase
    {
        [Route("GetEntityNotes")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotesInformation>>> GetContactInfos(int entityId, int entityTypeId)
        {
            string apiPath = "NotesInfo/GetEntityNotes?entityId=" + entityId + "&entityTypeId=" + entityTypeId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var notesInformation = JsonConvert.DeserializeObject<IEnumerable<NotesInformation>>(content);
                return Ok(notesInformation);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("SaveEntityNotes")]
        [HttpPost]
        public async Task<ActionResult<NotesInformation>> SaveEntityNotes(NotesInformation notesInfo)
        {
            string apiPath = "NotesInfo/SaveEntityNotes";
            HttpResponseMessage response = await DataManager.PostData(apiPath, notesInfo).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var notesInformation = JsonConvert.DeserializeObject<NotesInformation>(content);
                return Ok(notesInformation);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
