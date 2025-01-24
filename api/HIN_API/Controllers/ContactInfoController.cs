using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Math.EC.Rfc7748;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactInfoController : ControllerBase
    {
        private readonly TenantContext _context;
        public ContactInfoController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetContactInfos")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetContactInfos(int entityType, int entityId, bool additionalInfo)
        {
            try
            {
                if (entityType == 2)
                {
                    return Ok(await ConcatContactInformation(entityType, entityId, additionalInfo));
                }
                else if(entityType == 29)
                {
                    List<ContactInformation> lstDealContacts = new List<ContactInformation>();
                    var serviceContacts = await GetContactInformation(entityType, entityId, additionalInfo);
                    var deal = _context.Services.Where(w => w.Id == entityId).FirstOrDefault();
                    if (deal != null)
                    {
                        var dealContacts = await ConcatServiceContactInformation(entityType, deal.LeadId.HasValue?deal.LeadId.Value : 0, additionalInfo);
                        lstDealContacts = dealContacts.ToList();
                    }
                    var mappedContacts = serviceContacts.Concat(lstDealContacts);
                    return Ok(mappedContacts);
                }
                else
                {
                    return Ok(await GetContactInformation(entityType, entityId, additionalInfo));
                }

            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        private async Task<IEnumerable<ContactInformation>> ConcatServiceContactInformation(int entityType, int entityId, bool additionalInfo)
        {
            var dealEntity = await GetContactInformation(entityType, entityId, additionalInfo);
            var deal = _context.Services.Where(x => x.LeadId == entityId).FirstOrDefault();
            if (deal != null)
            {
                var leadEntityId = deal.LeadId;
                if (leadEntityId.HasValue && dealEntity != null)
                {
                    var leadEntity = await GetContactInformation(1, leadEntityId.Value, additionalInfo);
                    if (leadEntity != null)
                    {
                        var contactInfo = dealEntity.Concat(leadEntity);
                        return contactInfo;
                    }
                }
            }
            return dealEntity;
        }

        private async Task<IEnumerable<ContactInformation>> ConcatContactInformation(int entityType, int entityId, bool additionalInfo)
        {
            var dealEntity = await GetContactInformation(entityType, entityId, additionalInfo);
            var deal = _context.Deal.Where(x => x.DealId == entityId).FirstOrDefault();
            if (deal != null)
            {
                var leadEntityId = deal.LeadId;
                if (leadEntityId.HasValue && dealEntity != null)
                {
                    var leadEntity = await GetContactInformation(1, leadEntityId.Value, additionalInfo);
                    if (leadEntity != null)
                    {
                        var contactInfo = dealEntity.Concat(leadEntity);
                        return contactInfo;
                    }
                }
            }
            return dealEntity;
        }

        private async Task<IEnumerable<ContactInformation>> GetContactInformation(int entityType, int entityId, bool additionalInfo)
        {
            if (additionalInfo)
            {
                return await _context.ContactInformation.Where(w => w.Type == entityType && w.EntityId == entityId && w.IsAdditionalInfo == true).OrderByDescending(o=>o.CreatedOn).ToListAsync();
            }
            else
            {
                return await _context.ContactInformation.Where(w => w.Type == entityType && w.EntityId == entityId && w.IsAdditionalInfo != true).OrderByDescending(o => o.CreatedOn).ToListAsync();
            }
        }

        [Route("GetAllContactInfos")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetAllContactInfos()
        {
            try
            {
                return await _context.ContactInformation.ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetDealContacts")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DealContact>>> GetDealContacts(int entityId, int entityType)
        {
            try
            {
                return await _context.DealContact.Where(w => w.DealId == entityId && w.EntityTypeId == entityType).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetAllDealContacts")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DealContact>>> GetAllDealContacts()
        {
            try
            {
                return await _context.DealContact.Where(w => w.StartDate != null).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetContactNextStep")]
        [HttpGet]
        public async Task<ActionResult<DealContactNextStep>> GetContactNextStep(int nextStepId)
        {
            try
            {
                return await _context.DealContactNextStep.FirstOrDefaultAsync(w => w.DealContactId == nextStepId);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetVendorContactSteps")]
        [HttpGet]
        public async Task<ActionResult<StepsContactNextStep>> GetVendorContactSteps(int nextStepId)
        {
            try
            {
                return await _context.StepsContactNextStep.Where(w => w.StepsContactId == nextStepId).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("UpdateOppStepsSchedule")]
        [HttpPatch]
        public async Task<ActionResult<DealContact>> UpdateOppStepsSchedule(int id, [FromBody] EventSchedule eventSchedule)
        {
            var dealContact = await _context.DealContact.FindAsync(id);
            dealContact.StartDate = eventSchedule.Start;
            dealContact.EndDate = eventSchedule.End;
            _context.DealContact.Update(dealContact);
            await _context.SaveChangesAsync();
            return Ok(dealContact);
        }
        [Route("GetLeadOpportunities")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetLeadOpportunities(int leadId)
        {
            try
            {
                return await _context.Deal.Where(w => w.LeadId == leadId).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetPartnerEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartnerEntity(int vendorId)
        {
            try
            {
                return await _context.Partner.Where(w => w.VendorId == vendorId).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetEventPartnerEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetEventPartnerEntity(int eventId)
        {
            try
            {
                return await _context.Partner.Where(w => w.EventId == eventId).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetNetworkEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetNetworkEntity(int networkingId)
        {
            try
            {
                return await _context.Partner.Where(w => w.NetworkingId == networkingId).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetReferralNetworkEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralNetworkEntity(int networkingId)
        {
            try
            {
                return await _context.Referral.Where(w => w.NetworkingId == networkingId).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetReferralEventEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralEventEntity(int eventId)
        {
            try
            {
                return await _context.Referral.Where(w => w.EventId == eventId).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }


        [Route("GetContactsByName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetContactsByName(string contactName)
        {
            try
            {
                return await _context.ContactInformation.Where(w => w.ContactName.Contains(contactName)).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetContactById")]
        [HttpGet]
        public async Task<ActionResult<ContactInformation>> GetContactById(int contactId)
        {
            try
            {
                return await _context.ContactInformation.FirstOrDefaultAsync(w => w.Id == contactId);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("AddContactInfo")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> AddContactInfo(ContactInformation contactInfo, bool isFromK9Erp = false)
        {
            try
            {
                if (contactInfo != null)
                {
                    if (contactInfo.Id <= 0)
                    {
                        _context.ContactInformation.Add(contactInfo);
                        await _context.SaveChangesAsync();
                    }
                    try
                    {
                        var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault();
                        if (isK9ErpSync != null && !isFromK9Erp && Convert.ToBoolean(isK9ErpSync.Value))
                        {
                            var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                            var result = await k9ErpSyncHelper.IntegrateK9ErpContact(contactInfo);
                        }
                    }
                    catch (Exception ex)
                    {

                    }

                    //if (contactInfo.Type == Convert.ToInt32(LeadGenType.Deal))
                    //{
                    //    var dealContact = new DealContact
                    //    {UpdateDealContact
                    //        DealId = contactInfo.EntityId,
                    //        ContactId = contactInfo.Id,
                    //        ContactName = contactInfo.ContactName,
                    //        CreatedBy = User.Identity.Name,
                    //        CreatedOn = DateTime.Now
                    //    };
                    //    _context.DealContact.Add(dealContact);
                    //    await _context.SaveChangesAsync();
                    //}
                    if (contactInfo.Type == Convert.ToInt32(LeadGenType.Lead))
                    {
                        var leadContact = new LeadContact
                        {
                            LeadId = contactInfo.EntityId,
                            ContactId = contactInfo.Id,
                            CreatedBy = User != null ? User.Identity.Name : null,
                            CreatedOn = DateTime.Now
                        };
                        _context.LeadContact.Add(leadContact);
                        await _context.SaveChangesAsync();
                    }
                }
                return Ok(contactInfo);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("UpdateVendorContact")]
        [HttpPost]
        public async Task<ActionResult<StepsContact>> UpdateVendorContact(StepsContact vendorContact)
        {
            vendorContact.CreatedBy = User.Identity.Name;
            vendorContact.CreatedOn = DateTime.Now;
            vendorContact.Notes = (!string.IsNullOrEmpty(vendorContact.Notes)) ? ("CreatedBy:" + User.Identity.Name + " CreatedOn:" + DateTime.Now + " Note:" + vendorContact.Notes) : "";
            try
            {
                _context.StepsContact.Add(vendorContact);
                await _context.SaveChangesAsync();
                return Ok(vendorContact);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("UpdateDealContact")]
        [HttpPost]
        public async Task<ActionResult<DealContact>> UpdateDealContact(DealContact dealContact)
        {
            var colorCode = _context.Deal.Find(dealContact.DealId)?.Color;
            var contactName = _context.ContactInformation.Find(dealContact.ContactId)?.ContactName;
            dealContact.Notes = (!string.IsNullOrEmpty(dealContact.Notes)) ? (User.Identity.Name + "|~data~|" + DateTime.Now + "|~data~|" + dealContact.Notes) : "";
            try
            {
                dealContact.ContactName = !string.IsNullOrEmpty(contactName) ? contactName : "";
                dealContact.Color = !string.IsNullOrEmpty(colorCode) ? colorCode : "";
                if (dealContact.Id > 0)
                    _context.DealContact.Update(dealContact);
                else
                    _context.DealContact.Add(dealContact);
                await _context.SaveChangesAsync();
                return Ok(dealContact);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("UpdateDealContactNote")]
        [HttpGet]
        public async Task<ActionResult<DealContact>> UpdateDealContactNote(int dealContactId, string note)
        {
            try
            {
                var dealContact = await _context.DealContact.FindAsync(dealContactId);
                if (dealContact != null)
                {
                    dealContact.Notes = (!string.IsNullOrEmpty(dealContact.Notes) ? (dealContact.Notes + "^|^") : (dealContact.Notes + "")) + User.Identity.Name + "|~data~|" + DateTime.Now + "|~data~|" + note;
                    await _context.SaveChangesAsync();
                }
                return Ok(dealContact);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        //[Route("UpdateVendorContactNote")]
        //[HttpGet]
        //public async Task<ActionResult<VendorContact>> UpdateVendorContactNote(int vendorContactId, string note)
        //{
        //    try
        //    {
        //        var vendorContact = await _context.VendorContact.FindAsync(vendorContactId);
        //        if (vendorContact != null)
        //        {
        //            vendorContact.Notes = (!string.IsNullOrEmpty(vendorContact.Notes) ? (vendorContact.Notes + "<br/>") : (vendorContact.Notes + "")) + " CreatedBy:" + User.Identity.Name + " CreatedOn:" + DateTime.Now + " Note:" + note;
        //            await _context.SaveChangesAsync();
        //        }
        //        return Ok(vendorContact);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NoContent();
        //    }
        //}
        [Route("SaveDealContact")]
        [HttpPost]
        public async Task<ActionResult<DealContact>> SaveDealContact(DealContact dealContact)
        {
            dealContact.CreatedBy = User.Identity.Name;
            dealContact.CreatedOn = DateTime.Now;
            try
            {
                _context.DealContact.Add(dealContact);
                await _context.SaveChangesAsync();
                return Ok(dealContact);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("AddDealContactNextStep")]
        [HttpPost]
        public async Task<ActionResult<DealContactNextStep>> AddDealContactNextStep(DealContactNextStep dealContactNextStep, int dealContactId)
        {
            //dealContactNextStep.CreatedBy = User.Identity.Name;
            //dealContactNextStep.CreatedOn = DateTime.Now;
            var DealContact = await _context.DealContact.FindAsync(dealContactId);
            if(DealContact != null)
            {
                var colorCode = _context.Deal.Find(DealContact.DealId)?.Color;
                var contactName = _context.ContactInformation.Find(dealContactNextStep.ContactId != null ? dealContactNextStep.ContactId : DealContact.ContactId)?.ContactName;
                dealContactNextStep.ContactName = contactName;
                dealContactNextStep.ColorCode = colorCode;
                dealContactNextStep.DealId = DealContact.DealId;
            }
            dealContactNextStep.DealContactId = dealContactId;
            dealContactNextStep.Notes = (!string.IsNullOrEmpty(dealContactNextStep.Notes)) ? (User.Identity.Name + "|~data~|" + DateTime.Now + "|~data~|" + dealContactNextStep.Notes) : "";

            try
            {
                if (dealContactNextStep.Id > 0) 
                {
                    _context.DealContactNextStep.Update(dealContactNextStep);
                }
                else
                {
                    _context.DealContactNextStep.Add(dealContactNextStep);
                }
                await _context.SaveChangesAsync();
                //var dealContact = await _context.DealContact.FindAsync(dealContactId);
                //if (dealContact != null)
                //{
                //    dealContact.NextStepId = dealContactNextStep.Id;
                //    _context.DealContact.Update(dealContact);
                //    await _context.SaveChangesAsync();
                //}
                return Ok(dealContactNextStep);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        //[Route("AddVendorContactNextStep")]
        //[HttpPost]
        //public async Task<ActionResult<StepsContactNextStep>> AddVendorContactNextStep(StepsContactNextStep vendorContactNextStep, int vendorContactId)
        //{
        //    vendorContactNextStep.CreatedBy = User.Identity.Name;
        //    vendorContactNextStep.CreatedOn = DateTime.Now;
        //    vendorContactNextStep.VendorContactId = vendorContactId;
        //    try
        //    {
        //        _context.StepsContactNextStep.Add(vendorContactNextStep);
        //        await _context.SaveChangesAsync();
        //        //var vendorContact = await _context.VendorContact.FindAsync(vendorContactId);
        //        //if (vendorContact != null)
        //        //{
        //        //    vendorContact.NextStepId = vendorContactNextStep.Id;
        //        //    _context.VendorContact.Update(vendorContact);
        //        //    await _context.SaveChangesAsync();
        //        //}
        //        return Ok(vendorContactNextStep);
        //    }
        //    catch (Exception ex)
        //    {
        //        return NoContent();
        //    }
        //}
        [Route("UpdateContact")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> UpdateContact(ContactInformation contactInfo, bool isFromK9Erp = false)
        {
            try
            {
                if (contactInfo.Id > 0)
                {
                    _context.ContactInformation.Update(contactInfo);
                    await _context.SaveChangesAsync();

                    var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault().Value;
                    if (!isFromK9Erp && Convert.ToBoolean(isK9ErpSync))
                    {
                        var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                        var result = await k9ErpSyncHelper.IntegrateK9ErpContact(contactInfo);
                    }
                    return Ok(contactInfo);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("SaveContactInfos")]
        [HttpPost]
        public async Task<ActionResult> SaveContactInfos(List<ContactInformation> contactInfos)
        {
            try
            {
                if (contactInfos.Count > 0)
                {
                    List<ContactInformation> existingInfo = await _context.ContactInformation.Where(w => w.Type == contactInfos.FirstOrDefault().Type && w.EntityId == contactInfos.FirstOrDefault().EntityId).ToListAsync();
                    if (existingInfo.Count > 0)
                        contactInfos.RemoveAll(x => existingInfo.Exists(e => e.Id == x.Id));
                    _context.ContactInformation.AddRange(contactInfos);
                    await _context.SaveChangesAsync();
                    List<DealContact> dealContacts = new List<DealContact>();
                    List<LeadContact> leadContacts = new List<LeadContact>();
                    foreach (var data in contactInfos)
                    {
                        if (data.Type == Convert.ToInt32(LeadGenType.Deal))
                        {
                            var dealContact = new DealContact
                            {
                                DealId = data.EntityId,
                                ContactId = data.Id,
                                ContactName = data.ContactName,
                                CreatedBy = User.Identity.Name,
                                CreatedOn = DateTime.Now
                            };
                            dealContacts.Add(dealContact);
                        }
                        if (data.Type == Convert.ToInt32(LeadGenType.Lead))
                        {
                            var leadContact = new LeadContact
                            {
                                LeadId = data.EntityId,
                                ContactId = data.Id,
                                CreatedBy = User.Identity.Name,
                                CreatedOn = DateTime.Now
                            };
                            leadContacts.Add(leadContact);
                        }
                    }
                    if (leadContacts.Count > 0)
                    {
                        _context.LeadContact.AddRange(leadContacts);
                        await _context.SaveChangesAsync();
                    }
                    if (dealContacts.Count > 0)
                    {
                        _context.DealContact.AddRange(dealContacts);
                        await _context.SaveChangesAsync();
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetAllContactTitle")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactTitle>>> GetAllContactTitle()
        {
            return await _context.ContactTitle.ToListAsync();
        }

        [Route("GetGenderEntityType")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Gender>, IEnumerable<LeadGenEntityType>, IEnumerable<Category>, IEnumerable<CategoryValues>>>> GetGenderEntityType()
        {
            try
            {
                List<Gender> lstGenders = await _context.Gender.ToListAsync();
                List<LeadGenEntityType> lstLeadGenEntityType = await _context.LeadGenEntityType.ToListAsync();
                List<Category> lstCategory = await _context.Category.ToListAsync();
                List<CategoryValues> lstCategoryValues = await _context.CategoryValues.Where(w => w.EntityTypeId == 7).ToListAsync();
                return new Tuple<IEnumerable<Gender>, IEnumerable<LeadGenEntityType>, IEnumerable<Category>, IEnumerable<CategoryValues>>(lstGenders, lstLeadGenEntityType, lstCategory, lstCategoryValues);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        //[Route("GetAffilateAndSkills")]
        //[HttpGet]
        //public async Task<ActionResult<Tuple<IEnumerable<Category>>>> GetAffilateAndSkills()
        //{
        //    try
        //    {
        //        List<Category> lstCategory = await _context.Category.ToListAsync();
        //        return new Tuple<IEnumerable<Category>>(lstCategory);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Problem(ex.Message);
        //    }
        //}

        [Route("GetIndustryEntityType")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<IndustryType>, IEnumerable<LeadOriginType>>>> GetIndustryEntityType()
        {
            try
            {
                List<IndustryType> lstIndustries = await _context.IndustryType.ToListAsync();
                List<LeadOriginType> lstOriginType = await _context.LeadOriginType.ToListAsync();
                return new Tuple<IEnumerable<IndustryType>, IEnumerable<LeadOriginType>>(lstIndustries, lstOriginType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("GetToDoStatus")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Users>, IEnumerable<CompletedStatus>>>> GetToDoStatus()
        {
            try
            {
                List<Users> lstUsers = await _context.Users.ToListAsync();
                List<CompletedStatus> lstToDoStatus = await _context.CompletedStatus.ToListAsync();
                return new Tuple<IEnumerable<Users>, IEnumerable<CompletedStatus>>(lstUsers, lstToDoStatus);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("GetUOMName")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Uom>>>> GetUOMName()
        {
            try
            {
                List<Uom> lstUom = await _context.Uom.ToListAsync();
                return new Tuple<IEnumerable<Uom>>(lstUom);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("GetQuoteName")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<CustomerDropdown>, IEnumerable<StatusDropdown>>>> GetQuoteName()
        {
            try
            {
                List<CustomerDropdown> lstCustomers = await _context.CustomerDropdown.ToListAsync();
                List<StatusDropdown> lstStatus = await _context.StatusDropdown.ToListAsync();
                return new Tuple<IEnumerable<CustomerDropdown>, IEnumerable<StatusDropdown>>(lstCustomers, lstStatus);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveOrUpdateGroup")]
        [HttpPost]
        public async Task<ActionResult<ContactGroup>> SaveOrUpdateGroup(ContactGroupModel contactGroupModel)
        {
            try
            {
                //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
                if (contactGroupModel != null && contactGroupModel.Group != null)
                {
                    if(contactGroupModel.Group.Id > 0) 
                    {
                        _context.Group.Update(contactGroupModel.Group);
                        await _context.SaveChangesAsync();
                    }
                    else 
                    {
                        _context.Group.Add(contactGroupModel.Group);
                        await _context.SaveChangesAsync();
                    }
                    if (contactGroupModel.ContactInformations.Count > 0)
                    {
                        //ResetContactGroupId(contactGroupModel.ContactGroup.Id);
                        //DetachAllEntities();
                        List<ContactGroup> lstContactGroups = new List<ContactGroup>();
                        var contactGroups = _context.ContactGroup.Where(w => w.GroupId == contactGroupModel.Group.Id).ToList();
                        if (contactGroups.Count > 0)
                            _context.ContactGroup.RemoveRange(contactGroups);
                        foreach(var _data in contactGroupModel.ContactInformations)
                        {
                            var oContactGroup = new ContactGroup
                            {
                                GroupId = contactGroupModel.Group.Id,
                                ContactId = _data.Id
                            };
                            lstContactGroups.Add(oContactGroup);
                        }
                        _context.ContactGroup.AddRange(lstContactGroups);
                        await _context.SaveChangesAsync();
                    }
                }
                return Ok(contactGroupModel);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        //private void DetachAllEntities()
        //{
        //    var changedEntriesCopy = _context.ChangeTracker.Entries()
        //        .Where(e => e.State == EntityState.Added ||
        //                    e.State == EntityState.Modified ||
        //                    e.State == EntityState.Deleted)
        //        .ToList();

        //    foreach (var entry in changedEntriesCopy)
        //        entry.State = EntityState.Detached;
        //}
        //private void ResetContactGroupId(int groupId)
        //{
        //    var contacts = _context.ContactInformation.AsNoTracking().Where(w => w.ContactGroupId == groupId).ToList();
        //    if (contacts.Count > 0)
        //    {
        //        contacts.ForEach(x => x.ContactGroupId = null);
        //        _context.ContactInformation.UpdateRange(contacts);
        //        _context.SaveChanges();
        //        var changeTrackerEntries = _context.ChangeTracker.Entries();
        //        foreach(var data in changeTrackerEntries)
        //        {
        //            data.State = EntityState.Detached;
        //        }
        //    }
        //}
        [Route("GetContactGroups")]
        [HttpGet]
        public async Task<ActionResult<List<ContactInformation>>> GetContactGroups(int groupId)
        {
            try
            {
                var contactIds = await _context.ContactGroup.Where(w => w.GroupId == groupId).Select(s => s.ContactId).ToArrayAsync();
                if (contactIds != null)
                {
                    return Ok(await _context.ContactInformation.Where(w => contactIds.Contains(w.Id)).ToListAsync());
                }
                else
                {
                    return Ok();
                }
                
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }



        [Route("SaveSelectedContact")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> SaveSelectedContact(SelectedContact contactInfo)
            {
            ContactInformation contactInformation = new ContactInformation();
            List<CategoryValues> categoryValues = new List<CategoryValues>();
            contactInformation = _context.ContactInformation.Where(x => x.Id == contactInfo.Id).FirstOrDefault();
            categoryValues = await _context.CategoryValues.Where(x => x.EntityId == contactInfo.Id).ToListAsync();
            try
            {
                contactInformation.Id = 0;
                contactInformation.Type = contactInfo.EntityType;
                contactInformation.EntityId = contactInfo.EntityId;
                contactInformation.UpdatedBy = null;
                contactInformation.UpdatedOn = null;
                _context.ContactInformation.Add(contactInformation);
                await _context.SaveChangesAsync();
                if (categoryValues.Count > 0)
                {
                    List<CategoryValues> lstOfCategryValue = new List<CategoryValues>();
                    foreach (var data in categoryValues)
                    {
                        data.Id = 0;
                        data.UpdatedOn = null;
                        data.UpdatedBy = null;
                        data.EntityId = contactInformation.Id;
                        data.EntityTypeId = 7;
                        lstOfCategryValue.Add(data);
                    }
                    _context.CategoryValues.AddRange(lstOfCategryValue);
                    await _context.SaveChangesAsync();
                }
                
                return Ok(contactInformation);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }



        [Route("SaveContactInfoEmail")]
        [HttpPost]
        public async Task<ActionResult> SaveContactInfoEmail(List<ContactInformationEmailMapping> contactInformationEmailMappings)
        {
            try
            {
                var contactInfoId = contactInformationEmailMappings.FirstOrDefault().ContactInformationId;
                if (contactInformationEmailMappings.Count > 0)
                {
                    List<ContactInformationEmailMapping> existingInfo = await _context.ContactInformationEmailMapping.Where(w => w.ContactInformationId == contactInfoId).ToListAsync();
                    if (existingInfo.Count > 0)
                        _context.ContactInformationEmailMapping.RemoveRange(existingInfo);
                    var contactInfo = contactInformationEmailMappings.Where(x => x.Email != null && x.Email != "").ToList();
                    if (contactInfo.Count > 0)
                    {
                        _context.ContactInformationEmailMapping.AddRange(contactInfo);
                    }
                    else
                    {
                        _context.ContactInformationEmailMapping.RemoveRange(existingInfo);
                    }
                    await _context.SaveChangesAsync();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetContactInfoEmail")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformationEmailMapping>>> GetContactInfoEmail(int id)
        {
            try
            {
                return await _context.ContactInformationEmailMapping.Where(w => w.ContactInformationId == id).ToListAsync();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetEntityByOrigin")]
        [HttpGet]
        public async Task<IActionResult> GetEntityByOrigin(int originId)
        {
            try
            {
                switch (originId)
                {
                    case 1:
                        return Ok(await _context.Lead.Select(s => new { s.LeadId, s.LeadName }).ToArrayAsync());
                    case 2:
                        return Ok(await _context.Vendor.Select(s => new { s.VendorId, s.Name }).ToArrayAsync());
                    case 3:
                        return Ok(await _context.Partner.Select(s=> new { s.PartnerId, s.Name}).ToArrayAsync());
                    case 4:
                        return Ok(await _context.Referral.Where(w => w.ReferralDropdownId == 1).Select(s => new { s.ReferralId, s.Name }).ToArrayAsync());
                    case 5:
                        return Ok(await _context.Referral.Where(w => w.ReferralDropdownId == 2).Select(s => new { ConsultantId = s.ReferralId, s.Name }).ToArrayAsync());
                    default:
                        return NoContent();
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetAffiliateName")]
        [HttpGet]
        public async Task<IActionResult> GetAffiliateName(int type, int entityId)
        {
            try
            {
                switch (type)
                {
                    case 1:
                        return Ok(await _context.Lead.Where(w=>w.LeadId == entityId).Select(s => new {  Id = s.LeadId, Name = s.LeadName }).SingleOrDefaultAsync());
                    case 4:
                        return Ok(await _context.Vendor.Where(w => w.VendorId == entityId).Select(s => new { Id = s.VendorId, Name = s.Name }).SingleOrDefaultAsync());
                    case 19:
                        return Ok(await _context.Partner.Where(w => w.PartnerId == entityId).Select(s => new { Id = s.PartnerId, Name = s.Name }).SingleOrDefaultAsync());
                    case 20:
                        return Ok(await _context.Referral.Where(w => w.ReferralId == entityId).Select(s => new { Id = s.ReferralId, Name = s.Name }).SingleOrDefaultAsync());
                    case 99:
                        return Ok(await _context.Referral.Where(w => w.ReferralId == entityId).Select(s => new { Id = s.ReferralId, Name = s.Name }).SingleOrDefaultAsync());
                    default:
                        return Ok(null);
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

    }
}
