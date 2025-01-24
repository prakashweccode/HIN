using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class K9ERPSettingController : ControllerBase
    {
        private readonly TenantContext _context;
        public K9ERPSettingController(TenantContext context)
        {
            _context = context;
        }

        [Route("SaveErpSetting")]
        [HttpPost]
        public async Task<ActionResult<K9erpsetting>> SaveErpSetting(K9erpsetting k9erpsettings)
        {
            var configs = _context.Config.Where(x => x.Name == "K9ERP_userName" || x.Name == "K9ERP_password" || x.Name == "K9ERP_URL");
            foreach (var _config in configs)
            {
                if (_config.Name == "K9ERP_userName")
                {
                    _config.Value = k9erpsettings.Erpname;
                }
                if (_config.Name == "K9ERP_password")
                {
                    _config.Value = k9erpsettings.Erppassword;
                }
                if (_config.Name == "K9ERP_URL")
                {
                    _config.Value = k9erpsettings.ErpcompanyName;
                }
                _context.Config.Update(_config);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetErpSetting", new { id = k9erpsettings.Id }, k9erpsettings);
        }

        [HttpGet]
        [Route("GetErpSetting")]
        public async Task<ActionResult<K9erpsetting>> GetErpSetting(string id)
        {
            //var k9erpsettings = await _context.K9erpsetting.FindAsync(id);

            //if (k9erpsettings == null)
            //{
            //    return NotFound();
            //}

            var configs = _context.Config.ToList();
            if (configs.Count==0)
            {
                return NotFound();
            }
            var k9erpsettings = new K9erpsetting();
            k9erpsettings.ErpcompanyName = configs.Where(x => x.Name == "K9ERP_URL").FirstOrDefault().Value;
            k9erpsettings.Erpname = configs.Where(x => x.Name == "K9ERP_userName").FirstOrDefault().Value;
            k9erpsettings.Erppassword = configs.Where(x => x.Name == "K9ERP_password").FirstOrDefault().Value;

            return k9erpsettings;
        }
    }
}