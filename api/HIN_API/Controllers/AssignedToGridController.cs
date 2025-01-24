using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignedToGridController : ControllerBase
    {
        private readonly TenantContext _context;

        public AssignedToGridController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetUsers")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<Users>, int>>> GetAllUsers(int pageSize, int skip)
        {
            try
            {
                var totalCount = new SqlParameter { ParameterName = "totalCount", SqlDbType = System.Data.SqlDbType.Int, Direction = System.Data.ParameterDirection.Output };
                string dbScript = $@"
                EXEC [dbo].[GetUsersByPageSize]
		        @skip = {skip},
		        @pageSize = {pageSize},
		        @search = N'',
		        @totalCount = @totalCount OUTPUT

                SELECT	@totalCount as N'@totalCount'";

                var lstUsers = await _context.Set<Users>().FromSqlRaw(dbScript, totalCount).ToListAsync();
                int _totalCount = (int)totalCount.Value;

                return Ok(new Tuple<List<Users>, int>(lstUsers, _totalCount));
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }
    }
}
