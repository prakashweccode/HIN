using Dapper;
using DTO.Models;
using Admin_API.Helper;
using System.Data;
using System.Data.SqlClient;

namespace Admin_API.Repository
{
    public class TransactionRepository
    {
        DBConnectionHelper connectionHelper;
        public TransactionRepository(DBConnectionHelper _connectionHelper)
        {
            this.connectionHelper = _connectionHelper;
        }
        #region CRMTransactions
        public async Task<int> UpdateCompanyRegister(CompanyDto model)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
            {
                model.PhoneNumber = model.PhoneNumber == null ? 0 : model.PhoneNumber;
                model.CellNumber = model.CellNumber == null ? 0 : model.CellNumber;
                int companyStatus = model.IsActive == true ? 1 : 0;
                string updateQuery = @$"UPDATE CompanyRegister SET CompanyName = '{model.CompanyName}', PhoneNumber = {model.PhoneNumber}, ContactFirstName = '{model.ContactFirstName}', ContactLastName = '{model.ContactLastName}', ContactTitle = '{model.ContactTitle}', CellNumber = {model.CellNumber}, Email = '{model.Email}', MaximumUser = {model.MaximumUser},SupportEmail = {model.SupportEmail}, IsActive = {companyStatus} WHERE RegisterId = {model.Id}";
                var rowsAffected = await db.ExecuteScalarAsync<int>(updateQuery);
                return rowsAffected;
            }
        }
        public async Task<int> UpdateTenantUser(TenantUserDto model)
        {
            using (IDbConnection db = new SqlConnection(!string.IsNullOrEmpty(model.Tenant) ? connectionHelper.getConnectionString(model.Tenant) : connectionHelper.getMasterConnectionString()))
            {
                string updateQuery = string.Empty;
                int userStatus = model.IsActive == true ? 1 : 0;
                if (!string.IsNullOrEmpty(model.Password) && !string.IsNullOrEmpty(model.AdminPassword))
                {
                    var loginPassword = DataCryptoHelper.EncryptString(model.Password);
                    updateQuery = @$"UPDATE Users SET FirstName = '{model.FirstName}', LastName = '{model.LastName}', Password = '{loginPassword}', AdminPassword = '{model.AdminPassword}', IsActive = {userStatus} Where UserId = {model.UserId}";
                }
                else if(!string.IsNullOrEmpty(model.Password) && string.IsNullOrEmpty(model.AdminPassword))
                {
                    var loginPassword = DataCryptoHelper.EncryptString(model.Password);
                    updateQuery = @$"UPDATE Users SET FirstName = '{model.FirstName}', LastName = '{model.LastName}', Password = '{loginPassword}', IsActive = {userStatus} Where UserId = {model.UserId}";
                }
                else if(string.IsNullOrEmpty(model.Password) && !string.IsNullOrEmpty(model.AdminPassword))
                {
                    updateQuery = @$"UPDATE Users SET FirstName = '{model.FirstName}', LastName = '{model.LastName}', AdminPassword = '{model.AdminPassword}', IsActive = {userStatus} Where UserId = {model.UserId}";
                }
                else
                {
                    updateQuery = @$"UPDATE Users SET FirstName = '{model.FirstName}', LastName = '{model.LastName}', IsActive = {userStatus} Where UserId = {model.UserId}";
                }
                var rowsAffected = await db.ExecuteScalarAsync<int>(updateQuery);
                return rowsAffected;
            }
        }
        public async Task<CompanyDto> GetCompanyDetailsById(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
            {
                string getCompanyDetailsQuery = $@"SELECT [RegisterId] as Id
      ,[CompanyName]
      ,[PhoneNumber]
      ,[Extension]
      ,[FaxNumber]
      ,[ContactFirstName]
      ,[ContactMiddleName]
      ,[ContactLastName]
      ,[ContactTitle]
      ,[CellNumber]
      ,[Email]
      ,[Address]
      ,[City]
      ,[State]
      ,[ZipCode]
      ,[Country]
      ,[MaximumUser]
      ,[UserName]
      ,[Name]
      ,[IsActive]
      ,[CompanyLogo]
      ,[CompanyPracticeCode]
  FROM [dbo].[CompanyRegister] WHERE RegisterId = {id}";
                var rowsAffected = await db.QuerySingleAsync<CompanyDto>(getCompanyDetailsQuery);
                return rowsAffected;
            }
        }

        public async Task<TenantUserDto> GetTenantUserById(int id, string tenantName)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString(tenantName)))
            {
                string getCompanyDetailsQuery = $@"SELECT [UserId]
                      ,[Email]
                      ,[FirstName]
                      ,[LastName]
                      ,[UserName]
                      ,[Password]
                      ,[IsActive]
                      ,[IsAdmin]
                      ,[AdminPassword]
                      ,[IsUser]
                  FROM [dbo].[Users] WHERE UserId = {id}";
                var rowsAffected = await db.QuerySingleAsync<TenantUserDto>(getCompanyDetailsQuery);
                return rowsAffected;
            }
        }

        public async Task<DashboardStatsDto> GetDasboardStats()
        {
            var dashboardStats = new DashboardStatsDto();
            using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
            {
                string GetRegisteredCompanyCount = "SELECT COUNT(RegisterId) as RegisteredCompanies FROM CompanyRegister";
                string GetActiveCompanyCount = "SELECT COUNT(RegisterId) as ActiveCompanies FROM CompanyRegister WHERE IsActive = 1";
                string GetInactiveCompanyCount = "SELECT COUNT(RegisterId) as InactiveCompanies FROM CompanyRegister WHERE IsActive = 0 OR IsActive IS NULL";
                dashboardStats.RegisteredCompanies = await db.ExecuteScalarAsync<int>(GetRegisteredCompanyCount);
                dashboardStats.ActiveCompanies = await db.ExecuteScalarAsync<int>(GetActiveCompanyCount);
                dashboardStats.InactiveCompanies = await db.ExecuteScalarAsync<int>(GetInactiveCompanyCount);
            }
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                string GetRegisteredUserCount = "SELECT COUNT(Id) as TenantUsers FROM TenantUser";
                string GetActiveUserCount = "SELECT COUNT(Id) as ActiveTenantUsers FROM TenantUser WHERE IsActive = 1";
                string GetInactiveUserCount = "SELECT COUNT(Id) as ActiveTenantUsers FROM TenantUser WHERE IsActive = 0 OR IsActive IS NULL";
                dashboardStats.TenantUsers = await db.ExecuteScalarAsync<int>(GetRegisteredUserCount);
                dashboardStats.ActiveTenantUsers = await db.ExecuteScalarAsync<int>(GetActiveUserCount);
                dashboardStats.InactiveTenantUsers = await db.ExecuteScalarAsync<int>(GetInactiveUserCount);
            }
            return dashboardStats;
        }


        #endregion CRMTransactions
    }

}