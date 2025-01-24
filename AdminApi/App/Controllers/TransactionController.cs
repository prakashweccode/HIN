using DTO.Models;
using Admin_API.Helper;
using Admin_API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Admin_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        TransactionRepository oTransaction;
        public TransactionController(DBConnectionHelper _helper)
        {
            oTransaction = new TransactionRepository(_helper);
        }
        
        [Route("GetCompanyDetailsById")]
        [HttpGet]
        public Task<CompanyDto> GetCompanyDetailsById(int companyId)
        {
            return oTransaction.GetCompanyDetailsById(companyId);
        }
        [Route("GetTenantUserById")]
        [HttpGet]
        public Task<TenantUserDto> GetTenantUserById(int userId, string tenantName)
        {
            return oTransaction.GetTenantUserById(userId, tenantName);
        }
        [Route("UpdateTenantUser")]
        [HttpPost]
        public Task<int> UpdateTenantUser(TenantUserDto model)
        {
            return oTransaction.UpdateTenantUser(model);
        }
        [Route("UpdateCompanyRegister")]
        [HttpPost]
        public Task<int> UpdateCompanyRegister(CompanyDto model)
        {
            return oTransaction.UpdateCompanyRegister(model);
        }
        [Route("GetDasboardStats")]
        [HttpGet]
        public Task<DashboardStatsDto> GetDasboardStats()
        {
            return oTransaction.GetDasboardStats();
        }
    }
}
