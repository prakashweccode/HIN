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
    public class CategoryController : ControllerBase
    {
        private readonly TenantContext _context;
        public CategoryController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetCategory")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory(int entityTypeId)
        {
            return await _context.Category.Where(w => w.EntityTypeId == entityTypeId).ToListAsync();
        }
        [Route("DeleteCategoryValues")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCategoryValues(int entityTypeId, int entityId)
        {
            var records = await _context.CategoryValues.Where(w => w.EntityTypeId == entityTypeId && w.EntityId == entityId).ToListAsync();
            if (records.Count > 0)
            {
                _context.CategoryValues.RemoveRange(records);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        [Route("GetCategoryValues")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryValues>>> GetCategoryValues(int entityTypeId, int entityId, int categoryType)
        {
            return await _context.CategoryValues.Where(w => w.EntityTypeId == entityTypeId && w.EntityId == entityId).Join(_context.Category.Where(k=>k.EntityTypeId == categoryType), x => x.CategoryId, y => y.Id, (x, y) => x).ToListAsync();
        }
        [Route("SaveCategory")]
        [HttpPost]
        public async Task<ActionResult<Category>> SaveCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }
        [Route("SaveCategoryValues")]
        [HttpPost]
        public async Task<ActionResult<CategoryValues>> SaveCategoryValues(List<CategoryValues> categoryValues)
        {
            if (categoryValues.Count > 0)
            {
                var removeData = _context.CategoryValues.Where(w => w.EntityTypeId == categoryValues.FirstOrDefault().EntityTypeId && w.EntityId == categoryValues.FirstOrDefault().EntityId).ToList();
                if (removeData.Count > 0)
                    _context.CategoryValues.RemoveRange(removeData);
                _context.CategoryValues.AddRange(categoryValues);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
    }
}