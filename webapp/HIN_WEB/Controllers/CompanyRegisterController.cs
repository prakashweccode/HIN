using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyRegisterController : ControllerBase
    {
        private IHostingEnvironment _hostingEnvironment;
        public CompanyRegisterController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }
        [Route("SaveCompanyRegister")]
        [HttpPost]
        public async Task<ActionResult<CompanyRegister>> SaveCompanyRegister(CompanyRegister companyRegister)
        {
            try
            {
                CompanyRegister companyDetails = new CompanyRegister();
                string apiPath = string.Format("CompanyRegister/SaveCompanyRegister");
                HttpResponseMessage response = await DataManager.PostData<CompanyRegister>(apiPath, companyRegister).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    companyDetails = JsonConvert.DeserializeObject<CompanyRegister>(content);
                    CreateContentRootDirectory(companyDetails);
                    return Ok(companyDetails);
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

        private void CreateContentRootDirectory(CompanyRegister companyDetails)
        {
            try
            {
                string applicationPath = _hostingEnvironment.WebRootPath;
                string rootPath = applicationPath + "\\Content\\" + companyDetails.CompanyName;
                if (!Directory.Exists(rootPath))
                {
                    Directory.CreateDirectory(rootPath);
                    if (!Directory.Exists(rootPath + "\\Lead"))
                        Directory.CreateDirectory(rootPath + "\\Lead");
                    if (!Directory.Exists(rootPath + "\\Opportunity"))
                        Directory.CreateDirectory(rootPath + "\\Opportunity");
                    if (!Directory.Exists(rootPath + "\\Vendor"))
                        Directory.CreateDirectory(rootPath + "\\Vendor");
                    if (!Directory.Exists(rootPath + "\\Partner"))
                        Directory.CreateDirectory(rootPath + "\\Partner");
                    if (!Directory.Exists(rootPath + "\\Referral"))
                        Directory.CreateDirectory(rootPath + "\\Referral");
                }
            }
            catch(Exception ex)
            {

            }
        }

        [Route("GetODataCompanyRegister")]
        [HttpGet]
        public async Task<ActionResult> GetODataCompanyRegister()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataCompanyRegister" + urlParams;
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
    }
}
