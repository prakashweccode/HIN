using DTO.Models;
using Admin_API.Helper;
using Admin_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admin_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantUserController : ControllerBase
    {
		TenantRepository objTenantUser;
		public TenantUserController(DBConnectionHelper _helper, IWebHostEnvironment env)
		{
			objTenantUser = new TenantRepository(_helper, env);
		}
		#region TenantUser

		[HttpGet("GetTenantUser")]
		public async Task<TenantUserDataModel> GetTenantUser(int id)
		{
			return await objTenantUser.GetTenantUser(id);
		}

		[HttpGet("FindAllTenantUser")]
		public async Task<IEnumerable<TenantUserDataModel>> FindAllTenantUser()
		{
			return await objTenantUser.FindAllTenantUser();
		}

		[HttpPost("CreateTenantUser")]
		public async Task<int> CreateTenantUser(TenantUserDataModel TenantUserDataModelObj)
		{
			return await objTenantUser.CreateTenantUser(TenantUserDataModelObj);
		}

		[HttpPost("UpdateTenantUser")]
		public async Task<int> UpdateTenantUser(TenantUserDataModel TenantUserDataModelObj)
		{
			return await objTenantUser.UpdateTenantUser(TenantUserDataModelObj);
		}

		[HttpDelete("DeleteTenantUser")]
		public async Task<int> DeleteTenantUser(int id)
		{
			return await objTenantUser.DeleteTenantUser(id);
		}

		[HttpGet("SyncTenantUser")]
		public async Task<int> SyncTenantUser()
		{
			return await objTenantUser.SyncTenantUser();
		}

		[HttpGet("TestCall")]
		public async Task<int> TestCall()
		{
			return await objTenantUser.SyncTenantUser();
		}

		// WARNING: The Dapper code generation tool doesn't currently generate merge method(s).

		#endregion TenantUser
	}
}
