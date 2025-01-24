using DTO.Models;
using Admin_API.Helper;
using Admin_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admin_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyUserController : ControllerBase
    {
		Admin_APIRepository objCompanyUser;
		public CompanyUserController(DBConnectionHelper _helper)
        {
			objCompanyUser = new Admin_APIRepository(_helper);
		}
		#region CompanyUser

		[HttpGet("GetCompanyUser")]
		public async Task<CompanyUserDataModel> GetCompanyUser(int userId)
		{
			return await objCompanyUser.GetCompanyUser(userId);
		}

		[HttpGet("FindAllCompanyUser")]
		public async Task<IEnumerable<CompanyUserDataModel>> FindAllCompanyUser()
		{
			return await objCompanyUser.FindAllCompanyUser();
		}

		[HttpPost("CreateCompanyUser")]
		public async Task<int> CreateCompanyUser(string userName, string password)
		{
			return await objCompanyUser.CreateCompanyUser(userName, password);
		}

		[HttpPost("ValidateUser")]
		public async Task<IEnumerable<CompanyUserDataModel>> ValidateUser(string userName, string password)
		{
			return await objCompanyUser.ValidateUser(userName, password);
		}

		[HttpPost("UpdateCompanyUser")]
		public async Task<int> UpdateCompanyUser(int userId, string userName, string password)
		{
			return await objCompanyUser.UpdateCompanyUser(userId, userName, password);
		}

		[HttpDelete("DeleteCompanyUser")]
		public async Task<int> DeleteCompanyUser(int userId, string userName, string password)
		{
			return await objCompanyUser.DeleteCompanyUser(userId, userName, password);
		}

		// WARNING: The Dapper code generation tool doesn't currently generate merge method(s).

		#endregion CompanyUser
	}
}
