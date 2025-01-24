using DTO.Models;
using Admin_API.Helper;
using Admin_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admin_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

		K9LeadGenRepository objCompanyRegister;
		public CompanyController(DBConnectionHelper _helper, IWebHostEnvironment env)
		{
			objCompanyRegister = new K9LeadGenRepository(_helper, env);
		}
		#region CompanyRegister

		[HttpGet("GetCompanyRegister")]
		public async Task<CompanyRegisterDataModel> GetCompanyRegister(int registerId)
		{
			return await objCompanyRegister.GetCompanyRegister(registerId);
		}

		[HttpGet("FindAllCompanyRegister")]
		public async Task<IEnumerable<CompanyRegisterDataModel>> FindAllCompanyRegister()
		{
			return await objCompanyRegister.FindAllCompanyRegister();
		}

		[HttpPost("CreateCompanyRegister")]
		public async Task<int> CreateCompanyRegister(CompanyRegisterDataModel companyRegisterDataModel)
		{
			return await objCompanyRegister.CreateCompanyRegister(companyRegisterDataModel);
		}

		[HttpPost("UpdateCompanyRegister")]
		public async Task<int> UpdateCompanyRegister(CompanyRegisterDataModel companyRegisterDataModel)
		{
			return await objCompanyRegister.UpdateCompanyRegister(companyRegisterDataModel);
		}

		[HttpDelete("DeleteCompanyRegister")]
		public async Task<int> DeleteCompanyRegister(int registerId)
		{
			return await objCompanyRegister.DeleteCompanyRegister(registerId);
		}
		[HttpPost("CreateNewCompany")]
		public async Task<int> CreateNewCompany(CompanyRegister companyRegister)
		{
            return await objCompanyRegister.CreateNewCompany(companyRegister);
        }

        
        
        // WARNING: The Dapper code generation tool doesn't currently generate merge method(s).

        #endregion CompanyRegister
    }
}
