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
    public class CustomFieldsController : ControllerBase
    {
        private readonly TenantContext _context;
        public CustomFieldsController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetCustomFieldType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbPropertyTypes>>> GetCustomFieldType()
        {
            try
            {
                return await _context.DbPropertyTypes.ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetCustomFieldValues")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomPropertyValues>>> GetCustomFieldValues(int entityId, int typeId, string alignment)
            {
            try
            {
                int[] customPropertyIds;
                switch (alignment)
                {
                    case "left":
                        customPropertyIds = _context.CustomProperty.Where(w => w.EntityTypeId == typeId && w.IsVisible == true && w.IsRight != true).Select(s => s.Id).ToArray();
                        break;
                    case "right":
                        customPropertyIds = _context.CustomProperty.Where(w => w.EntityTypeId == typeId && w.IsVisible == true && w.IsRight == true).Select(s => s.Id).ToArray();
                        break;
                    default:
                        customPropertyIds = _context.CustomProperty.Where(w => w.EntityTypeId == typeId && w.IsVisible == true).Select(s => s.Id).ToArray();
                        break;
                }
                if (customPropertyIds != null)
                    return await _context.CustomPropertyValues.Where(w => customPropertyIds.Contains(w.CustomPropertyId ?? int.MinValue) && w.EntityId == entityId).ToListAsync();
                else
                    return NoContent();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("AddCustomProperty")]
        [HttpPost]
        public async Task<ActionResult<CustomProperty>> AddCustomProperty(CustomProperty customFields)
        {
            try
            {
                if (customFields.Id == 0)
                {
                    _context.CustomProperty.Add(customFields);
                    await _context.SaveChangesAsync();
                    try
                    {
                        var parentUserPermissionId = _context.LeadGenEntityType.Where(x => x.Id == customFields.EntityTypeId).FirstOrDefault().UserPermissionParentId;
                        if (parentUserPermissionId != null)
                        {
                            var parentIdHtml = _context.UserPermission.Where(x => x.Id == parentUserPermissionId).FirstOrDefault().IdHtml;
                            var siblingListIds = _context.UserPermission.Where(x => x.Parent == parentUserPermissionId).Select(x => x.Id).ToList();
                            var siblingList = siblingListIds.Where(x => x.Contains("-")).ToList();
                            var userPermissionId = "";

                            int maxId = 1;
                            var stringToReplace = string.Concat(parentUserPermissionId, '-');
                            if (siblingList.Count > 0)
                            {
                                var SiblingListTrimmedIds = siblingList.Select(x => x.Replace(stringToReplace, "")).ToList();
                                var SiblingListTrimmedIdsInt = SiblingListTrimmedIds.ConvertAll(int.Parse);
                                maxId = SiblingListTrimmedIdsInt.Max() + 1;
                            }

                            {// Generate UserPermissionId                                
                                userPermissionId = string.Concat(stringToReplace, maxId);
                                //customFields.UserPermissionId = userPermissionId;
                            }
                            {//Generate IDHtml
                                var IdHtmlStartIndex = 100;
                                var idHtml = string.Concat(parentIdHtml + ".", IdHtmlStartIndex + maxId);
                                customFields.IdHtml = idHtml;
                            }

                            var userPermission = new UserPermission()
                            {
                                Id = userPermissionId,
                                IdHtml = customFields.IdHtml,
                                IsMenuEntry = false,
                                Name = customFields.PropertyName,
                                Parent = parentUserPermissionId
                            };

                            _context.UserPermission.Add(userPermission);
                            await _context.SaveChangesAsync();

                            string insertQuery = @$"INSERT INTO [UsersGroupsPermission] (IdGroup, IdPermis, StatGrant, StatRead, StatHide)
                                    SELECT ug.UserGroupId, UP.id, 1, 0, 0 FROM [UserPermission] UP 
                                    CROSS JOIN UserGroups ug
                                    LEFT OUTER JOIN [UsersGroupsPermission] UGP ON UP.id = UGP.idPermis and UGP.idGroup = ug.UserGroupId
                                    WHERE UGP.id IS NULL";
                            _ = await _context.Database.ExecuteSqlRawAsync(insertQuery);
                        }
                    }
                    catch (Exception ex)
                    {
                        var a = ex;
                    }

                    _context.CustomProperty.Update(customFields);
                    await _context.SaveChangesAsync();

                }
                else
                {
                    _context.CustomProperty.Update(customFields);
                    await _context.SaveChangesAsync();
                }
                return customFields;
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("SaveCustomFieldValues")]
        [HttpPost]
        public async Task<ActionResult> SaveCustomFieldValues(List<CustomPropertyValues> customFieldValues)
        {
            try
            {
                var addValues = customFieldValues.Where(w => w.Id == 0).ToList();
                var updateValues = customFieldValues.Where(w => w.Id > 0).ToList();
                if (updateValues.Count > 0)
                    _context.CustomPropertyValues.UpdateRange(updateValues);
                if (addValues.Count > 0)
                    _context.CustomPropertyValues.AddRange(addValues);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("saveListItems")]
        [HttpPost]
        public async Task<ActionResult> saveListItems(List<CustomFieldListItems> items)
        {
            try
            {
                var addValues = items.Where(w => w.Id == 0).ToList();
                var updateValues = items.Where(w => w.Id > 0).ToList();
                if (updateValues.Count > 0)
                    _context.CustomFieldListItems.UpdateRange(updateValues);
                if (addValues.Count > 0)
                    _context.CustomFieldListItems.AddRange(addValues);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetCustomFieldByType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomProperty>>> GetCustomFieldByType(int typeId, string alignment)
        {
            try
            {
                switch (alignment.ToLower())
                {
                    case "right":
                        return await _context.CustomProperty.Where(w => w.EntityTypeId == typeId && w.IsVisible == true && w.IsRight == true).ToListAsync();
                    case "left":
                        return await _context.CustomProperty.Where(w => w.EntityTypeId == typeId && w.IsVisible == true  && w.IsRight != true).ToListAsync();
                    default:
                        return await _context.CustomProperty.Where(w => w.EntityTypeId == typeId && w.IsVisible == true).ToListAsync();
                }
                
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("DeleteCustomFieldValues")]
        [HttpDelete]
        public async Task<ActionResult> DeleteCustomFieldValues(int id)
        {
            try
            {
                var result = await _context.CustomProperty.FindAsync(id);
                _context.CustomProperty.Remove(result);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }


        [Route("GetListItems")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomFieldListItems>>> GetListItems(int id)
        {
            try
            {
                return await _context.CustomFieldListItems.Where(w => w.CustomPropertyId == id).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("UpdateDbField")]
        [HttpPost]
        public async Task<ActionResult> UpdateDbField(DbColumnUpdate model)
        {
            try
            {
                string sql = @"Update " + model.TableName + " set " + model.ColumnName + " = " + model.ColumnValue + " where " + model.KeyName + " = " + model.KeyValue;
                await _context.Database.ExecuteSqlRawAsync(sql);
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
