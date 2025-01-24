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
    public class CategoryController : ControllerBase
    {
        [Route("SaveCategory")]
        [HttpPost]
        public async Task<ActionResult<Category>> SaveCategory(Category category)
        {
            try
            {
              
                string apiPath = string.Format("Category/SaveCategory");
                HttpResponseMessage response = await DataManager.PostData<Category>(apiPath, category).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<Category>(content);
                    return Ok(data);
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

        [Route("SaveCategoryValues")]
        [HttpPost]
        public async Task<ActionResult<List<CategoryValues>>> SaveCategoryValues(List<CategoryValues> categoryValues)
        {
            try
            {

                string apiPath = string.Format("Category/SaveCategoryValues");
                HttpResponseMessage response = await DataManager.PostData<List<CategoryValues>>(apiPath, categoryValues).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<List<Category>>(content);
                    return Ok(data);
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

        [Route("GetCategory")]
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategory(int entityTypeId)
        {
            try
            {
                string apiPath = "Category/GetCategory?entityTypeId=" + entityTypeId;
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<List<Category>>(content);
                    return Ok(data);
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

        [Route("GetCategoryValues")]
        [HttpGet]
        public async Task<ActionResult<List<CategoryValues>>> GetCategoryValues(int entityTypeId, int entityId, int categoryType)
        {
            try
            {
                string apiPath = "Category/GetCategoryValues?entityTypeId=" + entityTypeId + "&entityId=" + entityId + "&categoryType=" + categoryType;
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<List<CategoryValues>>(content);
                    return Ok(data);
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
        [Route("DeleteCategoryValues")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCategoryValues(int entityTypeId, int entityId)
        {
            try
            {
                string apiPath = "Category/DeleteCategoryValues?entityTypeId=" + entityTypeId + "&entityId=" + entityId;
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