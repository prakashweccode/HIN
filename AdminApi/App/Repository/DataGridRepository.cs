using Dapper;
using DTO.Models;
using Admin_API.Helper;
using System.Data;
using System.Data.SqlClient;

namespace Admin_API.Repository
{
    public class DataGridRepository
    {
        DBConnectionHelper connectionHelper;
        public DataGridRepository(DBConnectionHelper _connectionHelper)
        {
            this.connectionHelper = _connectionHelper;
        }
        public Tuple<List<TenantUserListDTO>, int?> GetTenantUserList(GridFilterDataModel gridFilter)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@pageNumber", gridFilter.PageNumber);
                queryParameters.Add("@pageSize", gridFilter.PageSize);
                queryParameters.Add("@userName", gridFilter.UserName);
                queryParameters.Add("@companyId", gridFilter.CompanyId);
                queryParameters.Add("@totalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

                int? totalCount = 0;
                using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
                {
                    var result = db.Query<TenantUserListDTO>(@"SP_TenantUser", queryParameters, commandType: CommandType.StoredProcedure).ToList();
                    totalCount = queryParameters.Get<int?>("@totalCount");
                    return new Tuple<List<TenantUserListDTO>, int?>(result, totalCount);
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public Tuple<List<CompanyUserListDTO>, int?> GetCompanyUser(GridFilterDataModel gridFilter)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@pageNumber", gridFilter.PageNumber);
                queryParameters.Add("@pageSize", gridFilter.PageSize);
                queryParameters.Add("@totalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

                int? totalCount = 0;
                using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
                {
                    var result = db.Query<CompanyUserListDTO>(@"SP_CompanyUser", queryParameters, commandType: CommandType.StoredProcedure).ToList();
                    totalCount = queryParameters.Get<int?>("@totalCount");
                    return new Tuple<List<CompanyUserListDTO>, int?>(result, totalCount);
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public Tuple<List<CompanyRegisterListDTO>, int?> GetCompanyRegisterList(GridFilterDataModel gridFilter)
        {
            try
            {
                var queryParameters = new DynamicParameters();
                queryParameters.Add("@pageNumber", gridFilter.PageNumber);
                queryParameters.Add("@pageSize", gridFilter.PageSize);
                queryParameters.Add("@totalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

                int? totalCount = 0;
                using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
                {
                    var result = db.Query<CompanyRegisterListDTO>(@"SP_CompanyRegister", queryParameters, commandType: CommandType.StoredProcedure).ToList();
                    totalCount = queryParameters.Get<int?>("@totalCount");
                    return new Tuple<List<CompanyRegisterListDTO>, int?>(result, totalCount);
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public IEnumerable<FilterDropDownListResponseDto> GetFilterDropDownResponse(FilterDropDownListRequestDto request)
        {
            try
            {
                using (IDbConnection db = new SqlConnection(connectionHelper.getConnectionString()))
                {
                    string query = $"SELECT DISTINCT {request.ValueColumn} as Name, {request.KeyColumn} as Id from {request.TableName}";
                    var rowsAffected = db.Query<FilterDropDownListResponseDto>(query);
                    return rowsAffected;
                }
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
    
}
