using Dapper;
using DynamicODataToSQL;
using HIN_API.Models;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SqlKata.Compilers;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DapperController : ControllerBase
    {
        private readonly TenantContext _context;
        public DapperController(TenantContext context)
        {
            _context = context;
        }
        private void ProcessQueries(Dictionary<string, string> data, string query, NameValueCollection keys)
        {
            if (keys.GetValues("$" + query)?.Length > 0)
                data.Add(query, keys.GetValues("$" + query)?.Length > 0 ? keys.GetValues("$" + query)[0] : "*");
            else if (query == "select")
            {
                data.Add(query, keys.GetValues("$" + query)?.Length > 0 ? keys.GetValues("$" + query)[0] : "LeadName");
            }
            else if (query == "orderby")
            {
                data.Add(query, keys.GetValues("$" + query)?.Length > 0 ? keys.GetValues("$" + query)[0] : "LeadName");
            }
        }
        private Dictionary<string, string> AddDicParams(string urlParms)
        {
            var keys = HttpUtility.ParseQueryString(urlParms);
            var odataQueryParams = new Dictionary<string, string>();
            ProcessQueries(odataQueryParams, "select", keys);
            ProcessQueries(odataQueryParams, "filter", keys);
            ProcessQueries(odataQueryParams, "orderby", keys);
            ProcessQueries(odataQueryParams, "top", keys);
            ProcessQueries(odataQueryParams, "skip", keys);
            // ProcessQueries(odataQueryParams, "count", keys);
            return odataQueryParams;
        }
        [Route("GetData")]
        [HttpGet]
        public async Task<IEnumerable<Lead>> GetData()
        {
            string urlParms = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
           // AddDicParams(urlParms);
            var tableName = typeof(Lead).Name;

            var converter = new ODataToSqlConverter(new EdmModelBuilder(), new SqlServerCompiler() { UseLegacyPagination = false });
            var odataQueryParams = AddDicParams(urlParms);
            var dupdataQueryParams = new Dictionary<string, string>
                {
                    {"select", "Name, Email" },
                    {"filter", "contains(Email,'outlook.com')" },
                    {"orderby", "Name" },
                    {"top", "20" },
                    {"skip", "5" },
                };

            var result = converter.ConvertToSQL(
                           tableName,
                           odataQueryParams,
                           false);

            string sql = result.Item1;
            // SELECT [Name], [Email] FROM [Customers] WHERE [Email] like @p0 ORDER BY [Name] ASC OFFSET @p1 ROWS FETCH NEXT @p2 ROWS ONLY

            IDictionary<string, object> sqlParams = result.Item2;
            // {"@p0", "%outlook.com%"},{"@p1", 5}, {"@p2", 20}


            // assuming here you want the newest rows first, and column name is "created_date"
            // may also wish to specify the exact columns needed, rather than *
            var query = "SELECT * FROM @TableName ORDER BY created_date DESC Limit @Limit Offset @Offset";


            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var results = await con.QueryAsync<Lead>(result.Item1, result.Item2);
                return results;
            }
        }
    }
}
