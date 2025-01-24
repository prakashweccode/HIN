using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntityNameController : Controller
    {
        private readonly TenantContext _context;
        public EntityNameController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetEntityName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityNameDto>>> GetEntityName(int entityTypeId, int leadTypeId)
        {
            List<EntityNameDto> entityNameDto = new List<EntityNameDto>();
            string dbScript = $@"DECLARE @return_value int 
                EXEC	@return_value = [dbo].[sp_SelectNameWithKeyByEntity] @entity = " + entityTypeId + ", @leadType =" + leadTypeId;
            entityNameDto = await _context.Query<EntityNameDto>().FromSqlRaw(dbScript).ToListAsync();
            return entityNameDto;
        }
    }
}