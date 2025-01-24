using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using HIN_WEB.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [Route("PortalLogin")]
        [HttpPost]
        public async Task<IActionResult> PortalLogin(TwoFactor model)
        {
            try
            {
                UserDetail userDetail = new UserDetail();
                string apiPath = string.Format("Authentication/{0}", string.IsNullOrEmpty(model.AccessCode) ? "PortalLogin" : "TwoFactorVerification");
                HttpResponseMessage response = await DataManager.PostData<TwoFactor>(apiPath, model).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<UserDetail>(content);
                    return Ok(string.IsNullOrEmpty(userDetail.User?.TwoFactorCode) ? null : userDetail);
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    //return StatusCode(Convert.ToInt32(response.StatusCode), content);
                    return Problem(content.Replace("\"", ""), null, (int)response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("ValidateHinPortalAccount")]
        [HttpPost]
        public async Task<IActionResult> ValidateHinPortalAccount(MSUserDto model)
        {
            try
            {
                UserDetail userDetail = new UserDetail();
                string apiPath = "Authentication/ValidateHinPortalAccount";
                HttpResponseMessage response = await DataManager.PostData<dynamic>(apiPath, model).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    userDetail = JsonConvert.DeserializeObject<UserDetail>(content);
                    return Ok(string.IsNullOrEmpty(userDetail.User?.TwoFactorCode) ? null : userDetail);
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    //return StatusCode(Convert.ToInt32(response.StatusCode), content);
                    return Problem(content.Replace("\"", ""), null, (int)response.StatusCode);
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }

        [Route("ForgotPassword")]
        [HttpPost]
        public async Task<IActionResult> ForgotPassword(ForgotPassword forgotpassword)
        {
            try
            {
                string apiPath = string.Format("Authentication/ForgotPassword");
                HttpResponseMessage response = await DataManager.PostData(apiPath, forgotpassword).ConfigureAwait(false);
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

        [Route("ResetPassword")]
        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPassword resetpassword)
        {
            try
            {
                string apiPath = string.Format("Authentication/ResetPassword");
                HttpResponseMessage response = await DataManager.PostData(apiPath, resetpassword).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {

                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return Ok(content);
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

        [Route("SaveTempPatient")]
        [HttpPost]
        public async Task<ActionResult<TempPatient>> SaveTempPatient(TempPatient tempPatient)
        {
            try
            {
                string apiPath = string.Format("Authentication/SaveTempPatient");
                HttpResponseMessage response = await DataManager.PostData(apiPath, tempPatient).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    tempPatient = JsonConvert.DeserializeObject<TempPatient>(content);
                    return Ok(tempPatient);
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

        [Route("GetTenantDetail")]
        [HttpGet]
        public async Task<ActionResult<CompanyRegister>> GetTenantDetail(string code)
        {
            try
            {
                string api = string.Format("Authentication/GetTenantDetail?code=" + code);
                var response = await DataManager.GetData(api).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<CompanyRegister>(content);
                    return Ok(result);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        [Route("GetValidatePracticeCode")]
        [HttpGet]
        public async Task<ActionResult<CompanyRegister>> GetValidatePracticeCode(string code)
        {
            try
            {
                string api = string.Format("Authentication/GetValidatePracticeCode?code=" + code);
                var response = await DataManager.GetData(api).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var result = JsonConvert.DeserializeObject<CompanyRegister>(content);
                    return Ok(result);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

    }
}
