using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesInfoController : ControllerBase
    {
        private readonly TenantContext _context;
        public NotesInfoController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetEntityNotes")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotesInformation>>> GetContactInfos(int entityId, int entityTypeId)
        {
            try
            {
                return await _context.NotesInformation.Where(w => w.EntityTypeId == entityTypeId && w.EntityId == entityId).ToListAsync();
            }
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveEntityNotes")]
        [HttpPost]
        public async Task<ActionResult<NotesInformation>> SaveEntityNotes(NotesInformation notesInfo)
        {
            try
            {
                if(notesInfo != null)
                {
                    //notesInfo.CreatedOn = DateTime.Now;
                    //notesInfo.CreatedBy = User.Identity.Name;
                    _context.NotesInformation.Add(notesInfo);
                    await _context.SaveChangesAsync();
                }
                return Ok(notesInfo);
            }
            catch(Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
