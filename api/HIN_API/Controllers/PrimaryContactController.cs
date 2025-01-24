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
    public class PrimaryContactController : ControllerBase
    {
        private readonly TenantContext _context;

        public PrimaryContactController(TenantContext context)
        {
            _context = context;
        }

        [Route("SavePrimaryContact")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> SavePrimaryContact(ContactInformation contactInfo)
        {
            try
            {
                ContactInformation contactInformation = new ContactInformation();
                contactInformation = await _context.ContactInformation.Where(x => x.EntityId == contactInfo.EntityId && x.Type == contactInfo.Type && x.IsPrimary == true).FirstOrDefaultAsync();
                int entityLength = 0;
                entityLength = await _context.ContactInformation.CountAsync();
                if (contactInformation == null)
                {
                    string entity = "ContactInformation";
                    if (entityLength > 0)
                    {
                        string sql = "SELECT IDENT_CURRENT('" + entity + "') as LastId";
                        var lastId = _context.Query<CodeIndent>().FromSqlRaw(sql).First();
                        contactInfo.ContactInfoNumber = ProcessLastIdByEntity("C", lastId != null ? Convert.ToInt32(lastId.LastId) : 0);
                    }
                    else
                    {
                        contactInfo.ContactInfoNumber = ProcessLastIdByEntity("C", 0);
                    }
                    contactInfo.IsPrimary = true;
                    _context.ContactInformation.Add(contactInfo);
                    await _context.SaveChangesAsync();
                    return contactInfo;
                }
                else
                {
                    contactInformation.FirstName = contactInfo.FirstName;
                    contactInformation.LastName = contactInfo.LastName;
                    contactInformation.ContactName = contactInfo.ContactName;
                    contactInformation.ContactTitle = contactInfo.ContactTitle;
                    contactInformation.CellNumber = contactInfo.CellNumber;
                    contactInformation.MiddleName = contactInfo.MiddleName;
                    contactInformation.SecondMiddleName = contactInfo.SecondMiddleName;
                    contactInformation.SecondLastName = contactInfo.SecondLastName;
                    contactInformation.OfficeNumber = contactInfo.OfficeNumber;
                    contactInformation.Email = contactInfo.Email;
                    contactInformation.Website = contactInfo.Website;
                    _context.ContactInformation.Update(contactInformation);
                    await _context.SaveChangesAsync();
                    return contactInformation;
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        public static string ProcessLastIdByEntity(string prefix, int lastId)
        {
            switch (lastId.ToString().Length)
            {
                case 1:
                    return prefix + "000000" + (lastId + 1);
                case 2:
                    return prefix + "00000" + (lastId + 1);
                case 3:
                    return prefix + "0000" + (lastId + 1);
                case 4:
                    return prefix + "000" + (lastId + 1);
                case 5:
                    return prefix + "00" + (lastId + 1);
                case 6:
                    return prefix + "0" + (lastId + 1);
                default:
                    return prefix + (lastId + 1);
            }
        }

        [Route("GetPrimaryContact")]
        [HttpGet]
        public async Task<ActionResult<ContactInformation>> GetPrimaryContact(int entityId, int type)
        {
            var contactInformation = new ContactInformation();
            contactInformation = await _context.ContactInformation.Where(x => x.EntityId == entityId && x.Type == type && x.IsPrimary == true).FirstOrDefaultAsync();
            return contactInformation;
        }
    }
}
