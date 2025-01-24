using Dapper;
using DTO.Models;
using Admin_API.Helper;
using System.Data;
using System.Data.SqlClient;

namespace Admin_API.Repository
{
    public class Admin_APIRepository
    {
		#region CompanyUser

		DBConnectionHelper connectionHelper;
		public Admin_APIRepository(DBConnectionHelper _connectionHelper)
        {
			this.connectionHelper = _connectionHelper;
        }

		public async Task<CompanyUserDataModel> GetCompanyUser(int userId)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string getQuery = "SELECT * FROM CompanyUser WHERE UserId = @userId";
				return await db.QuerySingleAsync<CompanyUserDataModel>(getQuery, new { userId });
			}
		}

		public async Task<IEnumerable<CompanyUserDataModel>> FindAllCompanyUser()
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string findAllQuery = "SELECT * FROM CompanyUser";
				var results = await db.QueryAsync<CompanyUserDataModel>(findAllQuery);
				return results;
			}
		}

		public async Task<IEnumerable<CompanyUserDataModel>> ValidateUser(string userName, string password)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string findQuery = "SELECT UserId, UserName FROM CompanyUser  WHERE UserName = @userName AND Password = @password";
				var results = await db.QueryAsync<CompanyUserDataModel>(findQuery, new { userName, password });
				return results;
			}
		}

		public async Task<IEnumerable<CompanyUserDataModel>> FindCompanyUserByAll(int? userId, string userName, string password)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string findByAllQuery = "SELECT * FROM CompanyUser WHERE (@userId IS NULL OR UserId = @userId), (@userName IS NULL OR UserName = @userName), (@password IS NULL OR Password = @password)";
				var results = await db.QueryAsync<CompanyUserDataModel>(findByAllQuery, new { userId, userName, password });
				return results;
			}
		}

		public async Task<IEnumerable<CompanyUserDataModel>> FindCompanyUserByAny(int? userId, string userName, string password)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string findByAnyQuery = "SELECT * FROM CompanyUser WHERE (@userId IS NOT NULL AND UserId = @userId), (@userName IS NOT NULL AND UserName = @userName), (@password IS NOT NULL AND Password = @password)";
				var results = await db.QueryAsync<CompanyUserDataModel>(findByAnyQuery, new { userId, userName, password });
				return results;
			}
		}

		public async Task<int> CreateCompanyUser(string userName, string password)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string insertQuery = "INSERT INTO CompanyUser (UserName, Password) VALUES (@userName, @password)";
				var rowsAffected = await db.ExecuteScalarAsync<int>(insertQuery, new { userName, password });
				return rowsAffected;
			}
		}

		public async Task<int> UpdateCompanyUser(int userId, string userName, string password)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string updateQuery = "UPDATE CompanyUser SET UserName = @userName, Password = @password WHERE UserId = @userId";
				var rowsAffected = await db.ExecuteScalarAsync<int>(updateQuery, new { userId, userName, password });
				return rowsAffected;
			}
		}

		public async Task<int> DeleteCompanyUser(int userId, string userName, string password)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
			{
				const string deleteQuery = "DELETE CompanyUser WHERE UserId = @userId";
				var rowsAffected = await db.ExecuteScalarAsync<int>(deleteQuery, new { userId });
				return rowsAffected;
			}
		}


		#endregion CompanyUser
	}
}


