using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HIN_API.Helpers;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadsController : ControllerBase
    {
        private readonly TenantContext _context;
        public LeadsController(TenantContext context)
        {
            _context = context;
        }

        [Route("GetLeadById")]
        [HttpGet]
        public async Task<ActionResult<Lead>> GetLeadById(int leadId)
        {
            var leadDetails = new Lead();
            leadDetails = await _context.Lead.FindAsync(leadId);
            if (leadDetails.FirstName != null)
            {
                var contactinfo = new ContactInformation();
                contactinfo = await _context.ContactInformation.Where(x => x.Type == 1 && x.EntityId == leadDetails.LeadId && x.IsPrimary == true).FirstOrDefaultAsync();
                if (contactinfo != null)
                {
                    leadDetails.FirstName = contactinfo.FirstName;
                    leadDetails.LastName = contactinfo.LastName;
                    leadDetails.ContactTitle = contactinfo.ContactTitle;
                    leadDetails.EmailAddress = contactinfo.Email;
                    leadDetails.CellNumber = contactinfo.CellNumber;
                }
            }
            return leadDetails;
        }

        [Route("GetUserLeadIds")]
        [HttpGet]
        public async Task<ActionResult<int?[]>> GetUserLeadIds(int userId)
        {
            var lstUserGroups = await _context.UserGroupMapping.Where(w => w.UserId == userId).Select(s => s.GroupId).ToArrayAsync();
            return lstUserGroups.Length > 0 ? lstUserGroups : null;
            //if (lstUserGroups.Length > 0)
            //{
            //    var leadIds = _context.LeadGroupMapping.Where(w => lstUserGroups.Contains(w.GroupId)).Select(s => s.LeadId).ToArray();
            //    return leadIds.Length > 0 ? leadIds : null;
            //}
            //else
            //    return null;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
        {
            return await _context.Lead.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Lead>> GetLeads(int id)
        {
            var leads = await _context.Lead.FindAsync(id);

            if (leads == null)
            {
                return NotFound();
            }

            return leads;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeads(int id, Lead lead)
        {
            if (id != lead.LeadId)
            {
                return BadRequest();
            }

            _context.Entry(lead).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeadsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Lead>> PostLeads(Lead lead, bool isFromK9Erp = false)
        {
            try
            {
                if (lead.OrganizationId == null || lead.OrganizationId == 0)
                {
                    var organization = new Organization();
                    organization.Name = lead.CompanyName;
                    _context.Organization.Add(organization);
                    await _context.SaveChangesAsync();
                    lead.OrganizationId = organization.Id;
                }
                if (lead.LeadId == null || lead.LeadId == 0)
                {
                    var leadLabelss = lead.LeadLabels;
                    lead.LeadLabels = null;
                    lead.Status = 1;
                    _context.Lead.Add(lead);
                    await _context.SaveChangesAsync();
                    try
                    {
                        var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault();
                        if (isK9ErpSync != null && !isFromK9Erp && Convert.ToBoolean(isK9ErpSync.Value))
                        {
                            var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                            var result = await k9ErpSyncHelper.IntegrateK9ErpCustomer(lead);
                        }
                    }
                    catch (Exception ex)
                    {

                    }

                    if (leadLabelss != null)
                    {
                        foreach (var leadLabel in leadLabelss)
                        {
                            leadLabel.LeadId = lead.LeadId;
                            leadLabel.LeadTypeId = leadLabel.Id;
                            leadLabel.Id = 0;
                        }
                        _context.LeadLabels.AddRange(leadLabelss);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(lead);
                }
                else
                {
                    var leadLabelss = lead.LeadLabels;
                    lead.LeadLabels = null;
                    _context.Lead.Update(lead);
                    await _context.SaveChangesAsync();
                    try
                    {
                        var isK9ErpSync = _context.Config.Where(x => x.Name == "IsSyncK9Erp").FirstOrDefault();

                        if (isK9ErpSync != null && !isFromK9Erp && Convert.ToBoolean(isK9ErpSync.Value))
                        {
                            var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
                            var result = await k9ErpSyncHelper.IntegrateK9ErpCustomer(lead);
                        }

                    }
                    catch (Exception ex)
                    {

                    }

                    if (leadLabelss != null)
                    {
                        foreach (var leadLabel in leadLabelss)
                        {
                            leadLabel.LeadId = lead.LeadId;
                            leadLabel.LeadTypeId = leadLabel.Id;
                            leadLabel.Id = 0;
                        }
                        _context.LeadLabels.UpdateRange(leadLabelss);
                        await _context.SaveChangesAsync();
                    }
                    return Ok(lead);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Lead>> DeleteLeads(int id)
        {
            var lead = await _context.Lead.FindAsync(id);
            if (lead == null)
            {
                return NotFound();
            }

            _context.Lead.Remove(lead);
            await _context.SaveChangesAsync();

            return lead;
        }


        [Route("GetLeadOriginType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadOriginType>>> GetLeadOriginType()
        {
            return await _context.LeadOriginType.ToListAsync();
        }

        [Route("GetIndustryType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IndustryType>>> GetIndustryType()
        {
            return await _context.IndustryType.ToListAsync();
        }


        [Route("GetLeadStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadStatus>>> GetLeadStatus()
        {
            return await _context.LeadStatus.ToListAsync();
        }


        [Route("GetLeadsByEntityOrigin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadsByEntityOrigin(int entityId, int originId)
        {
            switch (originId)
            {
                case 1:
                    return await _context.Lead.Where(w => w.OriginId == originId && w.EventId == entityId).ToListAsync();
                case 4:
                    return await _context.Lead.Where(w => w.OriginId == originId && w.VendorId == entityId).ToListAsync();
                case 6:
                    return await _context.Lead.Where(w => w.OriginId == originId && w.NetworkingId == entityId).ToListAsync();
                case 7:
                    return await _context.Lead.Where(w => w.OriginId == originId && w.PartnerId == entityId).ToListAsync();
                case 8:
                    return await _context.Lead.Where(w => w.OriginId == originId && w.ReferralId == entityId).ToListAsync();
                default:
                    return null;
            }
        }

        [Route("GetLeadsByPartnerId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadsByPartnerId(int partnerId)
        {
            return await _context.Lead.Where(w => w.PartnerId == partnerId).ToListAsync();
        }
        [Route("GetLeadsByReferralId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadsByReferralId(int referralId)
        {
            return await _context.Lead.Where(w => w.ReferralId == referralId).ToListAsync();
        }

        [Route("GetSocialMediaType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialMediaType>>> GetSocialMediaType()
        {
            return await _context.SocialMediaType.ToListAsync();
        }

        [Route("GetLeadByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadByPipeLineGroupId(int id)
        {
            return await _context.Lead.Where(x => x.PipelineGroupId == id).ToListAsync();
        }

        [Route("UpdateLeadPipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Lead>> UpdateLeadPipelineId(int id, [FromBody] Pipeline pipelineId)
        {
            var lead = await _context.Lead.FindAsync(id);
            lead.PipelineId = pipelineId.PipelineId;
            _context.Lead.Update(lead);
            await _context.SaveChangesAsync();
            return Ok(lead);
        }

        [Route("UpdateStatus")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> UpdateStatus(Bulkassign bulkassign)
        {
            List<Lead> lstLead = new List<Lead>();
            foreach (var lead in bulkassign.ArrayOfData)
            {
                var objLead = await _context.Lead.FindAsync(lead.Id);
                objLead.LeadFunnelStatus = bulkassign.LeadFunnelStatusId;
                objLead.Reason = !string.IsNullOrEmpty(bulkassign.Reason) ? bulkassign.Reason : objLead.Reason;
                _context.Lead.Update(objLead);
                await _context.SaveChangesAsync();
            }
            lstLead = await _context.Lead.ToListAsync();
            return Ok(lstLead);
        }

        [Route("UpdateSecurityGroup")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> UpdateSecurityGroup(Bulkassign bulkassign)
        {
            List<Lead> lstLead = new List<Lead>();
            foreach (var lead in bulkassign.ArrayOfData)
            {
                var objLead = await _context.Lead.FindAsync(lead.Id);
                objLead.SecurityGroupId = bulkassign.SecurityGroup;
                _context.Lead.Update(objLead);
                await _context.SaveChangesAsync();
            }
            lstLead = await _context.Lead.ToListAsync();
            return Ok(lstLead);
        }

        [Route("UpdateAssignedToId")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> UpdateAssignedToId(Bulkassign bulkassign)
        {
            List<Lead> lstLead = new List<Lead>();
            foreach (var lead in bulkassign.ArrayOfData)
            {
                var objLead = await _context.Lead.FindAsync(lead.Id);
                objLead.Owner = bulkassign.AssignedToId;
                _context.Lead.Update(objLead);
                await _context.SaveChangesAsync();
            }
            lstLead = await _context.Lead.ToListAsync();
            return Ok(lstLead);
        }


        private bool LeadsExists(int id)
        {
            return _context.Lead.Any(e => e.LeadId == id);
        }

        [Route("ApprovePatient")]
        [HttpPost]
        public async Task<ActionResult<TempPatient>> ApprovePatient(TempPatient tempPatient)
        {
            if (tempPatient.Id > 0)
            {
                var leadData = MappingLead(tempPatient);
                _context.Lead.Add(leadData);
                await _context.SaveChangesAsync();
                _context.TempPatient.Update(tempPatient);
                await _context.SaveChangesAsync();
            }

            return Ok(tempPatient);
        }

        private Lead MappingLead(TempPatient tempPatient)
        {
            Lead lead = new Lead();
            lead.LeadName = tempPatient.PatientName;
            lead.Dob = tempPatient.Dob;
            lead.Address = tempPatient.Address;
            lead.Age = tempPatient.Age;
            lead.State = tempPatient.State;
            lead.City = tempPatient.City;
            lead.SecurityGroupId = 1;
            lead.PipelineGroupId = 7;
            lead.PipelineId = 19;
            return lead;
        }

        [HttpGet]
        [Route("GetTempPatientById")]
        public async Task<TempPatient> GetTempPatientById(int id)
        {
            try
            {
                return await _context.TempPatient.Where(w => w.Id == id).SingleOrDefaultAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}