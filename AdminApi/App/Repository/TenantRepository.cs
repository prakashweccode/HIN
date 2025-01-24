using Dapper;
using DTO.Models;
using Admin_API.Helper;
using System.Data;
using System.Data.SqlClient;

namespace Admin_API.Repository
{
    public class TenantRepository
    {
        IWebHostEnvironment env;
        DBConnectionHelper connectionHelper;
        public TenantRepository(DBConnectionHelper _connectionHelper, IWebHostEnvironment env)
        {
            this.connectionHelper = _connectionHelper;
        }


        #region TenantUser

        public async Task<TenantUserDataModel> GetTenantUser(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string getQuery = "SELECT * FROM TenantUser WHERE Id = @id";
                return await db.QuerySingleAsync<TenantUserDataModel>(getQuery, new { id });
            }
        }

        public async Task<IEnumerable<TenantUserDataModel>> FindAllTenantUser()
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string findAllQuery = "SELECT * FROM TenantUser";
                var results = await db.QueryAsync<TenantUserDataModel>(findAllQuery);
                return results;
            }
        }

        public async Task<IEnumerable<TenantUserDataModel>> FindTenantUserByAll(int? id, int? companyId, string email, string tenant, int? userId)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string findByAllQuery = "SELECT * FROM TenantUser WHERE (@id IS NULL OR Id = @id), (@companyId IS NULL OR CompanyId = @companyId), (@email IS NULL OR Email = @email), (@tenant IS NULL OR Tenant = @tenant), (@userId IS NULL OR UserId = @userId)";
                var results = await db.QueryAsync<TenantUserDataModel>(findByAllQuery, new { id, companyId, email, tenant, userId });
                return results;
            }
        }

        public async Task<IEnumerable<TenantUserDataModel>> FindTenantUserByAny(int? id, int? companyId, string email, string tenant, int? userId)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string findByAnyQuery = "SELECT * FROM TenantUser WHERE (@id IS NOT NULL AND Id = @id), (@companyId IS NOT NULL AND CompanyId = @companyId), (@email IS NOT NULL AND Email = @email), (@tenant IS NOT NULL AND Tenant = @tenant), (@userId IS NOT NULL AND UserId = @userId)";
                var results = await db.QueryAsync<TenantUserDataModel>(findByAnyQuery, new { id, companyId, email, tenant, userId });
                return results;
            }
        }

        public async Task<int> CreateTenantUser(int id, int? companyId, string email, string tenant, int? userId)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string insertQuery = "INSERT INTO TenantUser (Id, CompanyId, Email, Tenant, UserId) VALUES (@id, @companyId, @email, @tenant, @userId)";
                var rowsAffected = await db.ExecuteScalarAsync<int>(insertQuery, new { id, companyId, email, tenant, userId });
                return rowsAffected;
            }
        }

        public async Task<int> SyncTenantUser()
        {
            await TruncateTenantUser();
            K9LeadGenRepository cRM_CompanyRepository = new K9LeadGenRepository(connectionHelper, env);
            var companyList = await cRM_CompanyRepository.FindAllCompanyRegister();
            foreach (var company in companyList)
            {
                try
                {
                    using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString(company.CompanyName)))
                    {
                        const string insertQuery = @"SELECT [UserId],[UserName],[Email],[IsActive] FROM [dbo].[Users]";
                        var rowsAffected = await db.QueryAsync(insertQuery);
                        foreach (var row in rowsAffected)
                        {
                            TenantUserDataModel tenantModel = new TenantUserDataModel();
                            tenantModel.CompanyId = company.RegisterId;
                            tenantModel.Tenant = company.CompanyName;
                            tenantModel.Email = row.Email;
                            tenantModel.UserName = row.UserName;
                            tenantModel.UserId = row.UserId;
                            tenantModel.IsActive = row.IsActive;
                            await CreateTenantUser(tenantModel);
                        }

                    }

                }
                catch (Exception ex)
                {

                }

            }
            return 0;
        }
        public async Task<int> TruncateTenantUser()
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string insertQuery = "Truncate Table TenantUser";
                var rowsAffected = await db.ExecuteScalarAsync<int>(insertQuery);

                return rowsAffected;
            }
        }
        public async Task<int> CreateTenantUser(TenantUserDataModel TenantUserDataModelObj)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string insertQuery = "INSERT INTO TenantUser (CompanyId, Email,UserName, Tenant, UserId, IsActive) VALUES (@CompanyId, @Email, @UserName, @Tenant, @UserId, @IsActive)";
                var rowsAffected = await db.ExecuteScalarAsync<int>(insertQuery,
                    new
                    {
                        TenantUserDataModelObj.UserId,
                        TenantUserDataModelObj.CompanyId,
                        TenantUserDataModelObj.Tenant,
                        TenantUserDataModelObj.Email,
                        TenantUserDataModelObj.UserName,
                        TenantUserDataModelObj.IsActive
                    });

                return rowsAffected;
            }
        }

        public async Task<int> UpdateTenantUser(int id, int? companyId, string email, string tenant, int? userId)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string updateQuery = "UPDATE TenantUser SET Id = @id, CompanyId = @companyId, Email = @email, Tenant = @tenant, UserId = @userId WHERE Id = @id";
                var rowsAffected = await db.ExecuteScalarAsync<int>(updateQuery, new { id });
                return rowsAffected;
            }
        }
        public async Task<int> UpdateTenantUser(TenantUserDataModel TenantUserDataModelObj)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string updateQuery = "UPDATE TenantUser SET Id = @Id, CompanyId = @CompanyId, Email = @Email, Tenant = @Tenant, UserId = @UserId WHERE Id = @Id";
                var rowsAffected = await db.ExecuteScalarAsync<int>(updateQuery, new { TenantUserDataModelObj });
                return rowsAffected;
            }
        }

        public async Task<int> DeleteTenantUser(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
            {
                const string deleteQuery = "DELETE TenantUser WHERE Id = @id";
                var rowsAffected = await db.ExecuteScalarAsync<int>(deleteQuery, new { id });
                return rowsAffected;
            }
        }

        // WARNING: The Dapper code generation tool doesn't currently generate merge method(s).

        #endregion TenantUser
    }
}
