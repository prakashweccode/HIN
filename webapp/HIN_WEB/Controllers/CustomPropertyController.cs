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
    public class CustomPropertyController : ControllerBase
    {
        [Route("GetLeadCustomColumns")]
        [HttpGet]
        public async Task<ActionResult> GetLeadCustomColumns()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/LeadCustomColumns" + urlParams;
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
        [Route("GetCustomFieldType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbPropertyTypes>>> GetCustomFieldType()
        {
            string apiPath = "CustomFields/GetCustomFieldType";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var customFieldTypes = JsonConvert.DeserializeObject<IEnumerable<DbPropertyTypes>>(content);
                return Ok(customFieldTypes);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetCustomFieldValues")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomPropertyValues>>> GetCustomFieldValues(int entityId, int typeId, string alignment)
        {
            string apiPath = "CustomFields/GetCustomFieldValues?entityId=" + entityId + "&typeId=" + typeId + "&alignment=" + alignment;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var customFieldValues = JsonConvert.DeserializeObject<IEnumerable<CustomPropertyValues>>(content);
                return Ok(customFieldValues);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("DeleteCustomFieldValues")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCustomFieldValues(int id)
        {
            string api = string.Format("CustomFields/DeleteCustomFieldValues?id=" + id);
            var response = await DataManager.DeleteData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
               return Ok();
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("AddCustomProperty")]
        [HttpPost]
        public async Task<ActionResult<CustomProperty>> AddCustomProperty(CustomProperty customFields)
        {
            string apiPath = "CustomFields/AddCustomProperty";
            HttpResponseMessage response = await DataManager.PostData(apiPath, customFields).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var customField = JsonConvert.DeserializeObject<CustomProperty>(content);
                return Ok(customField);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("SaveCustomFieldValues")]
        [HttpPost]
        public async Task<ActionResult> SaveCustomFieldValues(List<CustomPropertyValues> customFieldValues)
        {
            string apiPath = "CustomFields/SaveCustomFieldValues";
            HttpResponseMessage response = await DataManager.PostData(apiPath, customFieldValues).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                //var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                //var customField = JsonConvert.DeserializeObject<CustomProperty>(content);
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetCustomFieldByType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomProperty>>> GetCustomFieldByType(int typeId, string alignment)
        {
            string apiPath = "CustomFields/GetCustomFieldByType?typeId=" + typeId + "&alignment=" + alignment;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var customField = JsonConvert.DeserializeObject<IEnumerable<CustomProperty>>(content);
                return Ok(customField);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("saveListItems")]
        [HttpPost]
        public async Task<ActionResult> saveListItems(List<CustomFieldListItems> items)
        {
            string apiPath = "CustomFields/saveListItems";
            HttpResponseMessage response = await DataManager.PostData(apiPath, items).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var listItems = JsonConvert.DeserializeObject<List<CustomFieldListItems>>(content);
                return Ok(listItems);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetListItems")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomFieldListItems>>> GetListItems(int id)
        {
            string apiPath = "CustomFields/GetListItems?id=" + id;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var customField = JsonConvert.DeserializeObject<IEnumerable<CustomFieldListItems>>(content);
                return Ok(customField);
            }
            else
            {
                return NoContent();
            }
        }
        
    }
}
