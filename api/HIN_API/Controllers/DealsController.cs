using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealsController : ControllerBase
    {

        private readonly TenantContext _context;
        public DealsController(TenantContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetDeals()
        {
            return await _context.Deal.ToListAsync();
        }
        [Route("GetDealById")]
        [HttpGet]
        public async Task<ActionResult<Deal>> GetDealById(int dealId)
        {
                return await _context.Deal.FindAsync(dealId);
        }

        [HttpPost]
        public async Task<ActionResult<Deal>> PostDeals(Deal deal)
        {
            if (deal.OrganizationId == null || deal.OrganizationId == 0)
            {
                var organization = new Organization();
                organization.Name = deal.OrganizationName;
                _context.Organization.Add(organization);
                await _context.SaveChangesAsync();
                deal.OrganizationId = organization.Id;
            }
            if (deal.ContactId == null || deal.ContactId == 0)
            {
                var user = new Users();
                user.FirstName = deal.DealName;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                deal.ContactId = user.UserId;
            }
            //var lead = await _context.Lead.FindAsync(deal.LeadId);
            //if(lead != null)
            //{
            //    lead.Status = 2;
            //    lead.OpportunityCount = lead.OpportunityCount == null ? (1) : (lead.OpportunityCount + 1);
            //    _context.Lead.Update(lead);
            //}
            _context.Deal.Add(deal);
            await _context.SaveChangesAsync();

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetDeals", new { id = deal.DealId }, deal);
        }
        [Route("GetAllOpportunitiesByStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetAllOpportunitiesByStatus(string from, string to, int statusId)
        {
            //from = SetStartTime(from);
            //to = SetEndTime(to);
            string sql = @"EXEC	[dbo].[GetOpportunitiesByStatus] @statusId = " + statusId + ", @from = N'" + from + " 00:00:01', @to = N'" + to + " 23:59:59'";
            List<DealReportsDto> deals = await _context.Query<DealReportsDto>().FromSqlRaw(sql).ToListAsync();
            return Ok(deals);
        }
        private static DateTime SetEndTime(DateTime inputDate)
        {
            TimeSpan ts = new TimeSpan(23, 59, 1);
            inputDate = inputDate.Date + ts;
            return inputDate;
        }
        private static DateTime SetStartTime(DateTime inputDate)
        {
            TimeSpan ts = new TimeSpan(00, 00, 0);
            inputDate = inputDate.Date + ts;
            return inputDate;
        }
        [Route("GetAllOpportunity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetAllOpportunity()
        {
            return await _context.Deal.ToListAsync();
        }

        [Route("GetDealStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetDealStatus()
        {
            return await _context.Status.ToListAsync();
        }


        [Route("GetDealByPipeLineGroupId")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Deal>,IEnumerable<DealContact>,IEnumerable<DealContactNextStep>>>> GetDealByPipeLineGroupId(int id)
        {
            var deals = await _context.Deal.Where(x => x.PipelineGroupId == id).ToListAsync();
            int?[] dealIds = deals.Select(s => (int?)s.DealId).ToArray();
            var dealContactSteps = await _context.DealContact.Where(w => dealIds.Contains(w.DealId)).ToListAsync(); 
            int?[] dealContactIds = dealContactSteps.Select(s => (int?)s.Id).ToArray();
            var dealContactNextSteps = await _context.DealContactNextStep.Where(w => dealContactIds.Contains(w.DealContactId)).ToListAsync();
            return Ok(new Tuple<IEnumerable<Deal>, IEnumerable<DealContact>, IEnumerable<DealContactNextStep>>(deals, dealContactSteps, dealContactNextSteps));
        }

        [Route("UpdatePipelineId")]
        [HttpPatch]
        public async Task<ActionResult<Deal>> UpdatePipelineId(int dealId, [FromBody] Pipeline pipelineId)
        {
            var deal = await _context.Deal.FindAsync(dealId);
            deal.PipelineId = pipelineId.PipelineId;
            deal.Percentage = pipelineId.Probability == null ? "" : Convert.ToString(pipelineId.Probability);
            _context.Deal.Update(deal);
            await _context.SaveChangesAsync();
            return Ok(deal);
        }
        [Route("SaveCancelReason")]
        [HttpPost]
        public async Task<ActionResult<Deal>> SaveCancelReason(Deal deal)
        {
            //var deal = await _context.Deal.FindAsync(dealId);
            //deal.StatusId = 4;
            //deal.CancelReason = cancelReason;
            _context.Deal.Update(deal);
            await _context.SaveChangesAsync();
            return Ok(deal);
        }
        [Route("UpdateStatusId")]
        [HttpPatch]
        public async Task<ActionResult<Deal>> UpdateStatusId(int dealId, int statusId)
        {
            var deal = await _context.Deal.FindAsync(dealId);
            if (statusId == 5)
            {
                deal.ActualAmount = 0;
                deal.Percentage = "";
            }
            deal.StatusId = statusId;
            _context.Deal.Update(deal);
            await _context.SaveChangesAsync();
            return Ok(deal);
        }


        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<List<Deal>>> search(string id)
        {
            var org = await _context.Deal.Where(x => x.DealName.Contains(id)).ToListAsync();

            if (org == null)
            {
                return NotFound();
            }

            return org;
        }

        [Route("SaveDeal")]
        [HttpPost]
        public async Task<ActionResult<Deal>> SaveDeal(Deal deal)
        {

            if (deal.OrganizationId == null || deal.OrganizationId == 0)
            {
                var organization = new Organization();
                organization.Name = deal.CompanyName;
                _context.Organization.Add(organization);
                await _context.SaveChangesAsync();
                deal.OrganizationId = organization.Id;
            }
            if (deal.AssignedTo == null || deal.AssignedTo == 0)
            {
                var user = new Users();
                user.FirstName = deal.AssignedName;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                deal.AssignedTo = user.UserId;
            }

            if (deal.DealId == null || deal.DealId == 0)
            {
                _context.Deal.Add(deal);
                await _context.SaveChangesAsync();
                var lead = await _context.Lead.FindAsync(deal.LeadId);
                if (lead != null)
                {
                    lead.Status = 2;
                    lead.OpportunityCount = _context.Deal.Count(x => x.LeadId == lead.LeadId);
                    //lead.OpportunityCount = lead.OpportunityCount == null ? (1) : (lead.OpportunityCount + 1);
                    _context.Lead.Update(lead);
                    await _context.SaveChangesAsync();
                }
                return Ok(deal);
            }
            else
            {
                _context.Deal.Update(deal);
                await _context.SaveChangesAsync();
                return Ok(deal);
            }
        }


        [HttpPost]
        [Route("SaveTimeCost")]
        public async Task<ActionResult<TimeCost>> SaveTimeCost(TimeCost timeCost, int dealContactId)
        {
            if (timeCost.Id == null || timeCost.Id == 0)
            {
                _context.TimeCost.Add(timeCost);
                await _context.SaveChangesAsync();
                return Ok(timeCost);
            }
            else
            {
                _context.TimeCost.Update(timeCost);
                await _context.SaveChangesAsync();
                return Ok();
            }
            //var deal = _context.DealContact.Where(x => x.Id == dealContactId).FirstOrDefault();
            //if (deal != null)
            //{
            //    deal.TimeCostId = timeCost.Id;
            //}
            //return CreatedAtAction("GetTimeCost", new { id = timeCost.Id }, timeCost);
        }

        [HttpGet]
        [Route("GetTimeCost")]
        public async Task<ActionResult<List<TimeCost>>> GetTimeCost(int dealContactId)
        {
            var deal = _context.DealContact.Where(x => x.Id == dealContactId).FirstOrDefault();
            var timeCost = _context.TimeCost.Where(x => x.DealContactId == dealContactId).ToList();
            return timeCost;
        }
        [HttpPost]
        [Route("SaveMaterialCost")]
        public async Task<ActionResult<MaterialCost>> SaveMaterialCost(MaterialCost materialcost, int dealContactId)
        {
            if (materialcost.Id == null || materialcost.Id == 0)
            {
                _context.MaterialCost.Add(materialcost);
                await _context.SaveChangesAsync();
                return Ok(materialcost);
            }
            else
            {
                _context.MaterialCost.Update(materialcost);
                await _context.SaveChangesAsync();
                return Ok();
            }
            //var deal = _context.DealContact.Where(x => x.Id == dealContactId).FirstOrDefault();
            //if (deal != null)
            //{
            //    deal.MaterialCostId = materialcost.Id;
            //}

            //return CreatedAtAction("GetMaterialCost", new { id = materialcost.Id }, materialcost);
        }
        [HttpGet]
        [Route("GetMaterialCost")]
        public async Task<ActionResult<List<MaterialCost>>> GetMaterialCost(int dealContactId)
        {
            var deal = _context.DealContact.Where(x => x.Id == dealContactId).FirstOrDefault();
            var materialcost = _context.MaterialCost.Where(x => x.DealContactId == dealContactId).ToList();
            return materialcost;
        }


        [Route("SaveActualAmount")]
        [HttpPost]
        public async Task<ActionResult<Deal>> SaveActualAmount(Deal deal)
        {
            var dealInfo = await _context.Deal.FindAsync(deal.DealId);
            dealInfo.StatusId = 1;
            dealInfo.ActualAmount = deal.ActualAmount;
            _context.Deal.Update(dealInfo);
            await _context.SaveChangesAsync();
            return Ok(dealInfo);
        }


        [Route("GetStepDetails")]
        [HttpPost]
        public Tuple<Deal, List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>>> GetStepDetails(Deal deal)
        {
            var dealContacts = _context.DealContact.Where(x => x.DealId == deal.DealId && x.EntityTypeId == 2).ToList();
            var materialCost = new List<MaterialCost>();
            var timeCost = new List<TimeCost>();

            List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>> lstDealContacts = new List<Tuple<DealContact, List<MaterialCost>, List<TimeCost>>>();

            foreach (var dealContact in dealContacts)
            {

                // var materialCost = _context.MaterialCost.Where(x => x.DealContact.Any(x => x.DealId == deal.DealId));
                materialCost = _context.MaterialCost.Where(x => x.DealContactId == dealContact.Id).ToList();
                timeCost = _context.TimeCost.Where(x => x.DealContactId == dealContact.Id).ToList();
                lstDealContacts.Add(Tuple.Create(dealContact, materialCost, timeCost));
            }
            return (Tuple.Create(deal, lstDealContacts));
        }


        [Route("UpdateDealProbability")]
        [HttpGet]
        public void UpdateDealProbability()
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var query = $@"update Deal
set [Percentage] = P.Probability
from Deal D
join (select PG.Probability, DC.PipelineId from Deal DC
inner join Pipeline PG on PG.PipelineId = DC.PipelineId) P on D.PipelineId=P.PipelineId";

                con.Query(query);

            }
        }

        [HttpGet]
        [Route("GetProviderStatus")]
        public async Task<List<ProviderStatus>> GetProviderStatus()
        {
            try
            {
                var result = await _context.ProviderStatus.ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}