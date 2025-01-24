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
    public class UsersController : ControllerBase
    {
        [Route("SaveUser")]
        [HttpPost]
        public async Task<ActionResult<Users>> SaveUser(Users user)
        {
            try
            {
                Users userDetail = new Users();
                string apiPath = string.Format("Users/SaveUser");
                HttpResponseMessage response = await DataManager.PostData<Users>(apiPath, user).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<Users>(content);
                    return Ok(userDetail);
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return Problem(content.Replace("\"", ""), null, (int)response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }
        [Route("SaveUserCost")]
        [HttpPost]
        public async Task<ActionResult<Users>> SaveUserCost(UserCost userCost)
        {
            try
            {
                string apiPath = string.Format("Users/SaveUserCost");
                HttpResponseMessage response = await DataManager.PostData<UserCost>(apiPath, userCost).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<UserCost>(content);
                    return Ok(result);
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
        [Route("SaveUserGoal")]
        [HttpPost]
        public async Task<ActionResult<UserGoal>> SaveUserGoal(UserGoal userGoal)
        {
            try
            {
                string apiPath = string.Format("Users/SaveUserGoal");
                HttpResponseMessage response = await DataManager.PostData<UserGoal>(apiPath, userGoal).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<UserGoal>(content);
                    return Ok(result);
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
        [Route("SaveUserTheme")]
        [HttpGet]
        public async Task<ActionResult<Users>> SaveUserTheme(int userId, string userTheme)
        {
            try
            {
                Users userDetail = new Users();
                string apiPath = string.Format("Users/SaveUserTheme?userId=" + userId + "&userTheme=" + userTheme);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<Users>(content);
                    return Ok(userDetail);
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

        [Route("GetUser")]
        [HttpGet]
        public async Task<ActionResult<List<Users>>> GetUser(string searchtext)
        {
            try
            {
                List<Users> userDetail = new List<Users>();
                string apiPath = string.Format("Users/search");
                HttpResponseMessage response = await DataManager.GetData(apiPath + "?id=" + searchtext).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Users>>(content);
                    return Ok(userDetail);
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
        [Route("GetUserCost")]
        [HttpGet]
        public async Task<ActionResult<UserCost>> GetUserCost(int userId)
        {
            try
            {
                string apiPath = string.Format("Users/GetUserCost?userId={0}", userId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<UserCost>(content);
                    return Ok(result);
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

        [Route("GetUserGoal")]
        [HttpGet]
        public async Task<ActionResult<UserGoal>> GetUserGoal(int userId)
        {
            try
            {
                string apiPath = string.Format("Users/GetUserGoal?userId={0}", userId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<UserGoal>(content);
                    return Ok(result);
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
        [Route("GetUsers")]
        [HttpGet]
        public async Task<ActionResult<List<Users>>> GetUsers()
        {
            try
            {
                List<Users> userDetail = new List<Users>();
                string apiPath = string.Format("Users/GetAllUsers");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Users>>(content);
                    return Ok(userDetail);
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
        [Route("GetCountries")]
        [HttpGet]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            try
            {
                string apiPath = string.Format("Users/GetCountries");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var countries = JsonConvert.DeserializeObject<List<Country>>(content);
                    return Ok(countries);
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

        [Route("GetStatesByCountryId")]
        [HttpGet]
        public async Task<ActionResult<List<State>>> GetStatesByCountryId(int countryId)
        {
            try
            {
                string apiPath = string.Format("Users/GetStatesByCountryId?countryId={0}", countryId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var states = JsonConvert.DeserializeObject<List<State>>(content);
                    return Ok(states);
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

        [Route("GetCityByStateId")]
        [HttpGet]
        public async Task<ActionResult<List<City>>> GetCityByStateId(int stateId)
        {
            try
            {
                string apiPath = string.Format("Users/GetStatesByCountryId?stateId={0}", stateId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var cities = JsonConvert.DeserializeObject<List<City>>(content);
                    return Ok(cities);
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

        [Route("GetEmployeeTypes")]
        [HttpGet]
        public async Task<ActionResult<List<EmployeeType>>> GetEmployeeTypes()
        {
            try
            {
                string apiPath = string.Format("Users/GetEmployeeTypes");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<List<EmployeeType>>(content);
                    return Ok(result);
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
        [Route("GetGroupUsers")]
        [HttpGet]
        public async Task<ActionResult<List<Users>>> GetGroupUsers(int groupId)
        {
            try
            {
                List<Users> userDetail = new List<Users>();
                string apiPath = string.Format("Users/GetGroupUsers?groupId={0}", groupId);
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Users>>(content);
                    return Ok(userDetail);
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
        [Route("GetUserById")]
        [HttpGet]
        public async Task<ActionResult<Users>> GetUserById(string Id)
        {
            try
            {
                Users userDetail = new Users();
                string apiPath = string.Format("Users/searchById");
                HttpResponseMessage response = await DataManager.GetData(apiPath + "?id=" + Id).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<Users>(content);
                    return Ok(userDetail);
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

        [Route("GetODataUserList")]
        [HttpGet]
        public async Task<ActionResult> GetODataUserList()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataUser" + urlParams;
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


        [Route("GetGender")]
        [HttpGet]
        public async Task<ActionResult<List<Gender>>> GetGender()
        {
            try
            {
                List<Gender> userDetail = new List<Gender>();
                string apiPath = string.Format("Users/GetGender");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<Gender>>(content);
                    return Ok(userDetail);
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


        [Route("GetUserCostDropdown")]
        [HttpGet]
        public async Task<ActionResult<List<UserCostDropdown>>> GetUserCostDropdown()
        {
            try
            {
                List<UserCostDropdown> userDetail = new List<UserCostDropdown>();
                string apiPath = string.Format("Users/GetUserCostDropdown");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<List<UserCostDropdown>>(content);
                    return Ok(userDetail);
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

        [Route("GetChartName")]
        [HttpGet]
        public async Task<ActionResult<List<ChartName>>> GetChartName()
        {
            try
            {
                List<ChartName> chartName = new List<ChartName>();
                string apiPath = string.Format("Users/GetChartName");
                HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    chartName = JsonConvert.DeserializeObject<List<ChartName>>(content);
                    return Ok(chartName);
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

        [Route("GetChartsById")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<HeaderChartMapping>, List<DashboardChartMapping>, List<UserQuoteChartMapping>>>> GetChartsById(int userId)
        {
            string apiPath = string.Format("Users/GetChartsById?userId={0}", userId);
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var data = JsonConvert.DeserializeObject<Tuple<List<HeaderChartMapping>, List<DashboardChartMapping>, List<UserQuoteChartMapping>>>(content);
                return Ok(data);
            }
            else
            {
                return NoContent();
            }
        }


        //[Route("GetHeaderChartNameById")]
        //[HttpGet]
        //public async Task<ActionResult<List<HeaderChartMapping>>> GetHeaderChartNameById(int userId)
        //{
        //    try
        //    {
        //        List<HeaderChartMapping> chartName = new List<HeaderChartMapping>();
        //        string apiPath = string.Format("Users/GetHeaderChartNameById?userId={0}", userId);
        //        HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //            chartName = JsonConvert.DeserializeObject<List<HeaderChartMapping>>(content);
        //            return Ok(chartName);
        //        }
        //        else
        //        {
        //            return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Problem(ex.Message, null, 1001);
        //    }
        //}

        //[Route("GetDashboardChartNameById")]
        //[HttpGet]
        //public async Task<ActionResult<List<DashboardChartMapping>>> GetDashboardChartNameById(int userId)
        //{
        //    try
        //    {
        //        List<DashboardChartMapping> chartName = new List<DashboardChartMapping>();
        //        string apiPath = string.Format("Users/GetDashboardChartNameById?userId={0}", userId);
        //        HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //            chartName = JsonConvert.DeserializeObject<List<DashboardChartMapping>>(content);
        //            return Ok(chartName);
        //        }
        //        else
        //        {
        //            return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Problem(ex.Message, null, 1001);
        //    }
        //}

        //[Route("GetUserQuoteChartNameById")]
        //[HttpGet]
        //public async Task<ActionResult<List<UserQuoteChartMapping>>> GetUserQuoteChartNameById(int userId)
        //{
        //    try
        //    {
        //        List<UserQuoteChartMapping> chartName = new List<UserQuoteChartMapping>();
        //        string apiPath = string.Format("Users/GetUserQuoteChartNameById?userId={0}", userId);
        //        HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
        //        if (response.IsSuccessStatusCode)
        //        {
        //            var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //            chartName = JsonConvert.DeserializeObject<List<UserQuoteChartMapping>>(content);
        //            return Ok(chartName);
        //        }
        //        else
        //        {
        //            return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return Problem(ex.Message, null, 1001);
        //    }
        //}

        [Route("SaveHeaderChartMapping")]
        [HttpPost]
        public async Task<ActionResult<List<HeaderChartMapping>>> SaveHeaderChartMapping(List<HeaderChartMapping> headerChartMappings)
        {
            try
            {
                List<HeaderChartMapping> listHeaderChartMapping = new List<HeaderChartMapping>();
                string apiPath = string.Format("Users/SaveHeaderChartMapping");
                HttpResponseMessage response = await DataManager.PostData(apiPath, headerChartMappings).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    listHeaderChartMapping = JsonConvert.DeserializeObject<List<HeaderChartMapping>>(content);
                    return Ok(listHeaderChartMapping);
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

        [Route("SaveDashboardChartMapping")]
        [HttpPost]
        public async Task<ActionResult<List<DashboardChartMapping>>> SaveDashboardChartMapping(List<DashboardChartMapping> dashboardChartMappings)
        {
            try
            {
                List<DashboardChartMapping> listDashboardChartMapping = new List<DashboardChartMapping>();
                string apiPath = string.Format("Users/SaveDashboardChartMapping");
                HttpResponseMessage response = await DataManager.PostData(apiPath, dashboardChartMappings).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    listDashboardChartMapping = JsonConvert.DeserializeObject<List<DashboardChartMapping>>(content);
                    return Ok(listDashboardChartMapping);
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

        [Route("SaveUserQuoteChartMapping")]
        [HttpPost]
        public async Task<ActionResult<List<UserQuoteChartMapping>>> SaveUserChartMapping(List<UserQuoteChartMapping> userQuoteChartMappings)
        {
            try
            {
                List<UserQuoteChartMapping> listUserQuoteChartMapping = new List<UserQuoteChartMapping>();
                string apiPath = string.Format("Users/SaveUserQuoteChartMapping");
                HttpResponseMessage response = await DataManager.PostData(apiPath, userQuoteChartMappings).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    listUserQuoteChartMapping = JsonConvert.DeserializeObject<List<UserQuoteChartMapping>>(content);
                    return Ok(listUserQuoteChartMapping);
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

        [Route("SaveUsers")]
        [HttpPost]
        public async Task<ActionResult<Users>> SaveUsers(Users users)
        {
            try
            {
                string apiPath = string.Format("Users/SaveUsers");
                HttpResponseMessage response = await DataManager.PostData<Users>(apiPath, users).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<Users>(content);
                    return Ok(result);
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
