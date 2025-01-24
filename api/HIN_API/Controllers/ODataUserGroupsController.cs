using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HIN_API.Controllers
{
    [EnableQuery]
    public class ODataUserGroupsController : ODataController
    {
        private readonly TenantContext _Context;

        public ODataUserGroupsController(TenantContext dbContext)
        {
            _Context = dbContext;
        }
        public IActionResult Get()
        {
            var result = _Context.UserGroups.AsQueryable();
            return Ok(result);
        }
    }
}
