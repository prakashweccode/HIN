using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignedNameController : ControllerBase
    {
        private readonly TenantContext _context;

        public AssignedNameController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetUserandPartnerName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignedNameDto>>> GetUserandPartnerName()
        {
            List<AssignedNameDto> assignedNameDto = new List<AssignedNameDto>();
            string dbScript = $@"select ISNULL(u.FirstName, ' ') +' '+ ISNULL(u.LastName, ' ') as Name, u.UserId as Id, 'User' as Type from Users as u
                               union
                               select p.Name as Name, p.PartnerId as Id, 'Partner' as Type from Partner as p
							   union
							   select v.Name as Name, v.VendorId as Id, 'Vendor' as Type from Vendor as v";
            assignedNameDto = await _context.Query<AssignedNameDto>().FromSqlRaw(dbScript).ToListAsync();
            return assignedNameDto;
        }



    }
}
