using Dapper;
using DapperQueryBuilder;
using HIN_API.Models;
using HIN_API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly TenantContext _context;
        public ReportController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetLeads")]
        [HttpGet]
        public List<Lead> GetLeads(DateTime start, DateTime end)
        {
            return _context.Lead.Where(x => x.CreatedOn > start && x.CreatedOn < end).ToList();
        }
        [Route("GetLeadsBySalesman")]
        [HttpGet]
        public List<Lead> GetLeadsBySalesman(string salesManName)
        {
            return _context.Lead.Where(x => x.CreatedBy == salesManName).ToList();
        }
        [Route("GetWonOpportunity")]
        [HttpGet]
        public List<Deal> GetWonOpportunity(DateTime start, DateTime end)
        {
            return _context.Deal.Where(x => x.CreatedOn > start && x.CreatedOn < end && x.StatusId == 1).ToList();
        }
        [Route("GetLostOpportunity")]
        [HttpGet]
        public List<Deal> GetLostOpportunity(DateTime start, DateTime end)
        {
            return _context.Deal.Where(x => x.CreatedOn > start && x.CreatedOn < end && x.StatusId == 3).ToList();
        }
        [Route("GetCancelOpportunity")]
        [HttpGet]
        public List<Deal> GetCancelOpportunity(DateTime start, DateTime end)
        {
            return _context.Deal.Where(x => x.CreatedOn > start && x.CreatedOn < end && x.StatusId == 4).ToList();
        }
        [Route("GetLeadByDate")]
        [HttpGet]
        public List<Lead> GetLeadByDate(DateTime from, DateTime to, int assignto)
        {
            return _context.Lead.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.CreatedById == assignto).ToList();
        }
        [Route("GetVendorByDate")]
        [HttpGet]
        public List<Vendor> GetVendorByDate(DateTime from, DateTime to, int assignto)
        {
            return _context.Vendor.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.CreatedById == assignto).ToList();
        }

        [Route("GetUserOpportunityReport")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDealReport>>> GetUserOpportunityReport(string from, string to, int statusId)
        {
            string sql = $@"
            EXEC [dbo].[GetOpportunityReportForUsers]
		    @statusId = {statusId},
		    @from = N'{from} 00:00:01',
		    @to = N'{to} 23:59:59'";
            List<UserDealReport> lstUserDeals = await _context.Query<UserDealReport>().FromSqlRaw(sql).ToListAsync();
            return lstUserDeals;
        }

        [Route("GetOpportunitiesByDate")]
        [HttpPost]
        public IEnumerable<Deal> GetOpportunitiesByDate(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {

            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Deal D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[AssignedTo] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OpportunityList != null)
                {
                    var dealIds = opportunityAcquisitionCost.OpportunityList.Select(x => x.DealId).ToArray();
                    q.Append($" AND D.[DealId] IN {dealIds}");
                }
                if (opportunityAcquisitionCost.OpportunityStatusId != null)
                {
                    q.Append($" AND D.[StatusId] = {opportunityAcquisitionCost.OpportunityStatusId}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }
                if (opportunityAcquisitionCost.OppEstimateFrom != null && (opportunityAcquisitionCost.OppEstimateTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[EstimationDate] >= {opportunityAcquisitionCost.OppEstimateFrom} AND D.[EstimationDate] <= {opportunityAcquisitionCost.OppEstimateTo})");
                    else
                        q.Append($" AND (D.[EstimationDate] >= {opportunityAcquisitionCost.OppEstimateFrom} AND D.[EstimationDate] <= {opportunityAcquisitionCost.OppEstimateTo})");
                }
                if (opportunityAcquisitionCost.OppFunnelPercentFrom != null && (opportunityAcquisitionCost.OppFunnelPercentTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[Percentage] >= {opportunityAcquisitionCost.OppFunnelPercentFrom} AND D.[Percentage] <= {opportunityAcquisitionCost.OppFunnelPercentTo})");
                    else
                        q.Append($" AND (D.[Percentage] >= {opportunityAcquisitionCost.OppFunnelPercentFrom} AND D.[Percentage] <= {opportunityAcquisitionCost.OppFunnelPercentTo})");
                }
                if (opportunityAcquisitionCost.OppClosingPercentFrom != null && (opportunityAcquisitionCost.OppClosingPercentTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[OriginalPercentage] >= {opportunityAcquisitionCost.OppClosingPercentFrom} AND D.[OriginalPercentage] <= {opportunityAcquisitionCost.OppClosingPercentTo})");
                    else
                        q.Append($" AND (D.[OriginalPercentage] >= {opportunityAcquisitionCost.OppClosingPercentFrom} AND D.[OriginalPercentage] <= {opportunityAcquisitionCost.OppClosingPercentTo})");
                }
                if (opportunityAcquisitionCost.OppActualAmountFrom != null && (opportunityAcquisitionCost.OppActualAmountTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[ActualAmount] >= {opportunityAcquisitionCost.OppActualAmountFrom} AND D.[ActualAmount] <= {opportunityAcquisitionCost.OppActualAmountTo})");
                    else
                        q.Append($" AND (D.[ActualAmount] >= {opportunityAcquisitionCost.OppActualAmountFrom} AND D.[ActualAmount] <= {opportunityAcquisitionCost.OppActualAmountTo})");
                }

                var listDeal = q.Query<Deal>();
                return listDeal;
            }
        }

        [Route("GetDealClosedbyMonth")]
        [HttpPost]
        public IEnumerable<Deal> GetDealClosedbyMonth(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Deal D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[AssignedTo] IN {userIds}");
                }

                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }
                var listDeal = q.Query<Deal>();
                return listDeal;
            }
        }




        [Route("GetLeadReportByDate")]
        [HttpPost]
        public IEnumerable<LeadUserReport> GetLeadReportByDate(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select D.*, U.UserName from Lead D INNER JOIN Users U ON D.Owner = U.UserId WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[PartnerId] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }


                var listLead = q.Query<LeadUserReport>();
                return listLead;
            }
        }

        [Route("GetLeadReportByVendor")]
        [HttpPost]
        public IEnumerable<Lead> GetLeadReportByVendor(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Lead D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[PartnerId] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }


                var listLead = q.Query<Lead>();
                return listLead;
            }
        }
        [Route("GetLeadReportByPartner")]
        [HttpPost]
        public IEnumerable<Lead> GetLeadReportByPartner(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Lead D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[PartnerId] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }


                var listLead = q.Query<Lead>();
                return listLead;
            }
        }
        [Route("GetLeadReportByReferral")]
        [HttpPost]
        public IEnumerable<Lead> GetLeadReportByReferral(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Lead D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[PartnerId] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }


                var listLead = q.Query<Lead>();
                return listLead;
            }
        }

        [Route("GetLeadReportByEvent")]
        [HttpPost]
        public IEnumerable<Lead> GetLeadReportByEvent(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Lead D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[PartnerId] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }


                var listLead = q.Query<Lead>();
                return listLead;
            }
        }
        [Route("GetLeadReportByNetworking")]
        [HttpPost]
        public IEnumerable<Lead> GetLeadReportByNetworking(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Lead D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[PartnerId] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }


                var listLead = q.Query<Lead>();
                return listLead;
            }
        }

        [Route("GetOpportunityCostReport")]
        [HttpPost]
        public List<Tuple<Deal, List<MaterialCost>, List<TimeCost>>> GetOpportunityCostReport(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"Select * from Deal D WHERE 1=1");
                if (opportunityAcquisitionCost.UserList != null)
                {
                    var userIds = opportunityAcquisitionCost.UserList.Select(x => x.UserId).ToArray();
                    q.Append($" AND D.[AssignedTo] IN {userIds}");
                }
                if (opportunityAcquisitionCost.OpportunityList != null)
                {
                    var dealIds = opportunityAcquisitionCost.OpportunityList.Select(x => x.DealId).ToArray();
                    q.Append($" AND D.[DealId] IN {dealIds}");
                }
                if (opportunityAcquisitionCost.OpportunityStatusId != null)
                {
                    q.Append($" AND D.[StatusId] = {opportunityAcquisitionCost.OpportunityStatusId}");
                }
                if (opportunityAcquisitionCost.OppCreatedFrom != null && (opportunityAcquisitionCost.OppCreatedTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.OppCreatedFrom} AND D.[CreatedOn] <= {opportunityAcquisitionCost.OppCreatedTo})");
                }
                else if (opportunityAcquisitionCost.From != null && (opportunityAcquisitionCost.To != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                    else
                        q.Append($" AND (D.[CreatedOn] >= {opportunityAcquisitionCost.From} AND D.[CreatedOn] <= {opportunityAcquisitionCost.To})");
                }
                if (opportunityAcquisitionCost.OppEstimateFrom != null && (opportunityAcquisitionCost.OppEstimateTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[EstimationDate] >= {opportunityAcquisitionCost.OppEstimateFrom} AND D.[EstimationDate] <= {opportunityAcquisitionCost.OppEstimateTo})");
                    else
                        q.Append($" AND (D.[EstimationDate] >= {opportunityAcquisitionCost.OppEstimateFrom} AND D.[EstimationDate] <= {opportunityAcquisitionCost.OppEstimateTo})");
                }
                if (opportunityAcquisitionCost.OppFunnelPercentFrom != null && (opportunityAcquisitionCost.OppFunnelPercentTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[Percentage] >= {opportunityAcquisitionCost.OppFunnelPercentFrom} AND D.[Percentage] <= {opportunityAcquisitionCost.OppFunnelPercentTo})");
                    else
                        q.Append($" AND (D.[Percentage] >= {opportunityAcquisitionCost.OppFunnelPercentFrom} AND D.[Percentage] <= {opportunityAcquisitionCost.OppFunnelPercentTo})");
                }
                if (opportunityAcquisitionCost.OppClosingPercentFrom != null && (opportunityAcquisitionCost.OppClosingPercentTo != null))
                {
                    var logicalOpp = q.Parameters.Count > 0 ? "OR" : "AND";
                    if (q.Parameters.Count > 0)
                        q.Append($" OR (D.[OriginalPercentage] >= {opportunityAcquisitionCost.OppClosingPercentFrom} AND D.[OriginalPercentage] <= {opportunityAcquisitionCost.OppClosingPercentTo})");
                    else
                        q.Append($" AND (D.[OriginalPercentage] >= {opportunityAcquisitionCost.OppClosingPercentFrom} AND D.[OriginalPercentage] <= {opportunityAcquisitionCost.OppClosingPercentTo})");
                }

                List<Tuple<Deal, List<MaterialCost>, List<TimeCost>>> lstTuple = new List<Tuple<Deal, List<MaterialCost>, List<TimeCost>>>();

                //string sql = "SELECT * FROM Deal WHERE AssignedTo IN @ids";
                //var listDeal = con.Query(sql, new { ids = userIds });

                var listDeal = q.Query<Deal>();
                foreach (var deal in listDeal)
                {
                    var dealContacts = _context.DealContact.Where(x => x.DealId == deal.DealId && x.EntityTypeId == 2).ToList();
                    var materialCost = new List<MaterialCost>();
                    var timeCost = new List<TimeCost>();
                    foreach (var dealContact in dealContacts)
                    {
                        // var materialCost = _context.MaterialCost.Where(x => x.DealContact.Any(x => x.DealId == deal.DealId));
                        materialCost = _context.MaterialCost.Where(x => x.DealContactId == dealContact.Id).ToList();
                        timeCost = _context.TimeCost.Where(x => x.DealContactId == dealContact.Id).ToList();

                    }
                    lstTuple.Add(Tuple.Create(deal, materialCost, timeCost));
                }
                return lstTuple;
                // return listDeal;
            }
        }

        [Route("GetOpportunitiesByVendor")]
        [HttpPost]
        public List<Deal> GetOpportunitiesByVendor(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            var user = opportunityAcquisitionCost.UserList.FirstOrDefault();
            return _context.Deal.Where(x => x.CreatedOn > opportunityAcquisitionCost.From && x.CreatedOn < opportunityAcquisitionCost.To && x.Lead.VendorId == user.UserId).ToList();
        }
        [Route("GetOpenDeals")]
        [HttpPost]
        public IEnumerable<OpenDeals> GetOpenDeals(DealRequest request)
        {
            var year = request.To.Value.Year;
            var statusId = 1;
            var userIds = request.users == null ? null : request.users.Select(x => x.UserId).ToArray();
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"SELECT AssignedUser, Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,[Dec] FROM   
(SELECT (U.FirstName +' '+ U.LastName) as AssignedUser, D.DealId,FORMAT(dateadd(MM, 1, D.CreatedOn),'MMM') AS MonthColumn
from Deal D left join Users U on D.AssignedTo = U.UserId where StatusId = {statusId}");
                if (userIds != null && userIds.Length > 0)
                {
                    q.Append($@" and U.UserId in {userIds}");
                }
                q.Append($@" and FORMAT(dateadd(MM, 1, D.CreatedOn),'yyyy') = {year})Tab1  
PIVOT  
(  
Count(DealId) FOR MonthColumn IN (Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,[Dec])) AS Tab2  
ORDER BY [Tab2].[AssignedUser]");


                List<int> intArray = new List<int>();
                var lstOpenDeals = q.Query<OpenDeals>();
                return lstOpenDeals;
            }
            return null;

        }
        [Route("GetFunnelProgress")]
        [HttpPost]
        public IEnumerable<FunnelProgress> GetFunnelProgress(FunnelProgressRequest request)
        {

            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"select COUNT(*) as DealInStage, SUM( CONVERT(int, D.ExpectedRevenue)) as ExpectedRevenue, P.[Name] as Stage  from Deal D
                                            join  Pipeline P on p.PipelineId = D.PipelineId
                                           ");

                if (request.Funnels != null)
                {
                    var funnelIds = request.Funnels.Select(x => x.PipelineGroupId).ToArray();
                    q.Append($@" where D.PipelineGroupId in ({funnelIds}) ");
                }
                q.Append($@" Group by P.[Name]");
                var results = q.Query<FunnelProgress>();
                return results;
            }
            return null;
        }

        [Route("GetWinLossByRep")]
        [HttpPost]
        public IEnumerable<WinLossByRep> GetWinLossByRep(WinLossRequest request)
        {
          

            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"SELECT 
UserName as AssignedUser, TotalDeals,ExpectedRevenue, WonDeal as DealsWon, ActualAmount as ActualWon
FROM

(select Count(AssignedTo) as TotalDeals, 
Sum(Convert(int,D.ExpectedRevenue)) as ExpectedRevenue, Sum(Convert(int,D.ActualAmount)) as ActualAmount, 
AssignedTo, U.UserName
from Deal D
inner join Users U on U.UserId = D.AssignedTo where 1=1 ");

                if (request.users != null)
                {
                    var userIds = request.users.Select(x => x.UserId).ToArray();
                    q.Append($@" and D.AssignedTo in ({userIds})");
                }

                if (request.From != null && request.To != null)
                {
                    q.Append($@" and (D.CreatedOn >= {request.From} and D.CreatedOn <= {request.To})");
                }





                q.Append($@" 
group by D.AssignedTo, U.UserName) t1 
INNER JOIN
(select 
SUM(CASE D.StatusId
	WHEN 1 THEN Convert(int,D.ExpectedRevenue) 
END) as Won
,
SUM(CASE D.StatusId
	WHEN 3 THEN Convert(int,D.ExpectedRevenue) 
END) as Lost
,
SUM(CASE D.StatusId
	WHEN 4 THEN Convert(int,D.[Percentage]) 
END) as Cancel,
SUM(CASE D.StatusId
	WHEN 5 THEN Convert(int,D.ExpectedRevenue) 
END) as InProgress
, 
Count(CASE D.StatusId
	WHEN 1 THEN D.AssignedTo 
END) as WonDeal

, AssignedTo
from Deal D  where 1=1 ");

                if (request.users != null)
                {
                    var userIds = request.users.Select(x => x.UserId).ToArray();
                    q.Append($@" and D.AssignedTo in ({userIds})");
                }

                if (request.From != null && request.To != null)
                {
                    q.Append($@" and (D.CreatedOn >= {request.From} and D.CreatedOn <= {request.To})");
                }



                q.Append($@" 
group by AssignedTo) t2
ON t1.AssignedTo = t2.AssignedTo
                                           ");

               
                var results = q.Query<WinLossByRep>();
                return results;
            }
            return null;

            ////var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            //List<WinLossByRep> lstWinLossByRep = new List<WinLossByRep> {
            //    new WinLossByRep() { AssignedUser = "Sumanth1", TotalDeals = 200, ExpectedRevenue = 50, DealsWon = 150, DealsLost = 200, PercentWon =25, PercentLost= 10, ActualWon = 100},
            //    new WinLossByRep() { AssignedUser = "Sumanth2", TotalDeals = 200, ExpectedRevenue = 50, DealsWon = 150, DealsLost = 200, PercentWon =25, PercentLost= 10, ActualWon = 100},
            //    new WinLossByRep() { AssignedUser = "Sumanth3", TotalDeals = 200, ExpectedRevenue = 50, DealsWon = 150, DealsLost = 200, PercentWon =25, PercentLost= 10, ActualWon = 100},
            //    new WinLossByRep() { AssignedUser = "Sumanth4", TotalDeals = 200, ExpectedRevenue = 50, DealsWon = 150, DealsLost = 200, PercentWon =25, PercentLost= 10, ActualWon = 100},
            //    new WinLossByRep() { AssignedUser = "Sumanth5", TotalDeals = 200, ExpectedRevenue = 50, DealsWon = 150, DealsLost = 200, PercentWon =25, PercentLost= 10, ActualWon = 100}
            //};
            //return lstWinLossByRep;
        }
        [Route("GetWonDealsByRep")]
        [HttpPost]
        public IEnumerable<WonDealsByRep> GetWonDealsByRep(WonDealsRequest request)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"select U.UserName as AssignedUser, U.CostPerHour as Cost,  Sum(Convert(int,D.ActualAmount)) as Won, 0 as Profit from Users U
inner join Deal D
on D.AssignedTo = U.UserId and D.StatusId = 1 where 1=1 ");

                if (request.users != null)
                {
                    var userIds = request.users.Select(x => x.UserId).ToArray();
                    q.Append($@" and D.AssignedTo in ({userIds})");
                }

                if (request.From != null && request.To != null)
                {
                    q.Append($@" and (D.CreatedOn >= {request.From} and D.CreatedOn <= {request.To})");
                }





                q.Append($@" 
 group by D.AssignedTo, U.UserName, U.CostPerHour");


                var results = q.Query<WonDealsByRep>();
                return results;
            }
            return null;
        }
        [Route("GetDealsLostByReason")]
        [HttpPost]
        public IEnumerable<DealsLostByReason> GetDealsLostByReason(DealsLostByReasonRequest request)
        {
            using (IDbConnection con = new SqlConnection(_context.getConnectionString()))
            {
                var q = con.QueryBuilder($@"select R.[Name] as LostReason, Count(AssignedTo) as TotalDeals,U.UserName as AssignedUser, Sum(Convert(int,D.ExpectedRevenue)) as DealValue  from Deal D
inner join Reason R on R.Id = D.ReasonId
inner join Users U on U.UserId = D.AssignedTo

where StatusId = 3 ");

                if (request.reasons != null)
                {
                    var reasonIds = request.reasons.Select(x => x.Id).ToArray();
                    q.Append($@" and R.Id in ({reasonIds})");
                }

                if (request.From != null && request.To != null)
                {
                    q.Append($@" and (D.CreatedOn >= {request.From} and D.CreatedOn <= {request.To})");
                }





                q.Append($@" 
 group by r.Id, R.[Name], U.UserName");


                var results = q.Query<DealsLostByReason>();
                return results;
            }
            return null;
        }
        [Route("GetRevenueforecastbyrep")]
        [HttpPost]
        public IEnumerable<Revenueforecastbyrep> GetRevenueforecastbyrep(RevenueforecastbyrepRequest request)
        {
            //var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            List<Revenueforecastbyrep> lstRevenueforecastbyrep = new List<Revenueforecastbyrep> {
                new Revenueforecastbyrep() { AssignedUser = "Sumanth1", TotalDeals = 200, ExpectedRevenue = 150, Cost = 100, Profit = 50, Jan= 3, Feb=3, Mar=5, Apr = 4, May=5, Jun=5, Jul=5, Aug = 2, Sep=8, Oct=7, Nov=9,Dec = 11 },
                new Revenueforecastbyrep() { AssignedUser = "Sumanth2", TotalDeals = 200, ExpectedRevenue = 150, Cost = 100, Profit = 50, Jan= 3, Feb=3, Mar=5, Apr = 4, May=5, Jun=5, Jul=5, Aug = 2, Sep=8, Oct=7, Nov=9,Dec = 11 },
                new Revenueforecastbyrep() { AssignedUser = "Sumanth3", TotalDeals = 200, ExpectedRevenue = 150, Cost = 100, Profit = 50, Jan= 3, Feb=3, Mar=5, Apr = 4, May=5, Jun=5, Jul=5, Aug = 2, Sep=8, Oct=7, Nov=9,Dec = 11 },
                new Revenueforecastbyrep() { AssignedUser = "Sumanth4", TotalDeals = 200, ExpectedRevenue = 150, Cost = 100, Profit = 50, Jan= 3, Feb=3, Mar=5, Apr = 4, May=5, Jun=5, Jul=5, Aug = 2, Sep=8, Oct=7, Nov=9,Dec = 11 },
                new Revenueforecastbyrep() { AssignedUser = "Sumanth5", TotalDeals = 200, ExpectedRevenue = 150, Cost = 100, Profit = 50, Jan= 3, Feb=3, Mar=5, Apr = 4, May=5, Jun=5, Jul=5, Aug = 2, Sep=8, Oct=7, Nov=9,Dec = 11 }
            };
            return lstRevenueforecastbyrep;
        }

        [Route("GetLeadConversion")]
        [HttpPost]
        public IEnumerable<LeadConversion> GetLeadConversion(LeadConversionRequest request)
        {
            //var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            List<LeadConversion> lstLeadConversion = new List<LeadConversion> {
                new LeadConversion() { AssignedUser = "Sumanth1", BeginningLeads = 200, LeadToProspect = 150, ProspectToCustomer = 100},
                new LeadConversion() { AssignedUser = "Sumanth1", BeginningLeads = 200, LeadToProspect = 150, ProspectToCustomer = 100 },
                new LeadConversion() { AssignedUser = "Sumanth1", BeginningLeads = 200, LeadToProspect = 150, ProspectToCustomer = 100 },
                new LeadConversion() { AssignedUser = "Sumanth1", BeginningLeads = 200, LeadToProspect = 150, ProspectToCustomer = 100 },
                new LeadConversion() { AssignedUser = "Sumanth1", BeginningLeads = 200, LeadToProspect = 150, ProspectToCustomer = 100 }
            };
            return lstLeadConversion;
        }
        [Route("GetProposalClosedByRep")]
        [HttpPost]
        public IEnumerable<ProposalClosedByRep> GetProposalClosedByRep(ProposalClosedByRepRequest request)
        {
            //var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            List<ProposalClosedByRep> lstProposalClosedByRep = new List<ProposalClosedByRep> {
                new ProposalClosedByRep() { AssignedUser = "Sumanth1", ProposalCost = 2000000, FinalPrice = 1500000000},
                new ProposalClosedByRep() { AssignedUser = "Sumanth1", ProposalCost = 200, FinalPrice = 150 },
                new ProposalClosedByRep() { AssignedUser = "Sumanth1", ProposalCost = 200, FinalPrice = 150 },
                new ProposalClosedByRep() { AssignedUser = "Sumanth1", ProposalCost = 200, FinalPrice = 150 },
                new ProposalClosedByRep() { AssignedUser = "Sumanth1", ProposalCost = 200, FinalPrice = 150 }
            };
            return lstProposalClosedByRep;
        }

        [Route("GetOpportunitieswonovertime")]
        [HttpPost]
        public IEnumerable<Opportunitiesovertime> GetOpportunitieswonovertime(OpportunitiesovertimeRepRequest request)
        {
            //var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            List<Opportunitiesovertime> lstOpportunitiesovertime = new List<Opportunitiesovertime> {
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 2000000, Funnel = 1500000000, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now},
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now}
            };
            return lstOpportunitiesovertime;
        }

        [Route("GetOpportunitieslostbyreason")]
        [HttpPost]
        public IEnumerable<Opportunitiesovertime> GetOpportunitieslostbyreason(OpportunitieslostbyreasonRequest request)
        {
            //var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            List<Opportunitiesovertime> lstOpportunitieslostbyreason = new List<Opportunitiesovertime> {
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 2000000, Funnel = 1500000000, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now, Reason="Reason"},
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now, Reason="Reason" },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now, Reason="Reason" },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now, Reason="Reason" },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now, Reason="Reason" },
                new Opportunitiesovertime() { AssignedUser = "Sumanth1", Value = 200, Funnel = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now,WonDate = DateTime.Now, Reason="Reason"}
            };
            return lstOpportunitieslostbyreason;
        }

        [Route("GetProposalsclosedbycustomer")]
        [HttpPost]
        public IEnumerable<Proposalsclosedbycustomer> GetProposalsclosedbycustomer(ProposalsclosedbycustomerRequest request)
        {
            //var funnelIds = request.FunnelId[] array = new int[] { 3, 4 };
            List<Proposalsclosedbycustomer> lstProposalsclosedbycustomer = new List<Proposalsclosedbycustomer> {
                new Proposalsclosedbycustomer() { AssignedUser = "Sumanth1", Cost = 200, FinalPrice = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now, Description="Reason"},
                new Proposalsclosedbycustomer() { AssignedUser = "Sumanth1", Cost = 200, FinalPrice = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now, Description="Reason" },
                new Proposalsclosedbycustomer() { AssignedUser = "Sumanth1", Cost = 200, FinalPrice = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now, Description="Reason" },
                new Proposalsclosedbycustomer() { AssignedUser = "Sumanth1", Cost = 200, FinalPrice = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now, Description="Reason" },
                new Proposalsclosedbycustomer() { AssignedUser = "Sumanth1", Cost = 200, FinalPrice = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now, Description="Reason" },
                new Proposalsclosedbycustomer() { AssignedUser = "Sumanth1", Cost = 200, FinalPrice = 150, DealName="Deal",StatusName="Won", CreatedDate = DateTime.Now, Description="Reason"}
            };
            return lstProposalsclosedbycustomer;
        }


        [Route("GetOpportunitiesByPartner")]
        [HttpGet]
        public List<Deal> GetOpportunitiesByPartner(DateTime from, DateTime to, int assignto)
        {
            return _context.Deal.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.Lead.PartnerId == assignto).ToList();
        }
        [Route("GetOpportunitiesByReferral")]
        [HttpGet]
        public List<Deal> GetOpportunitiesByReferral(DateTime from, DateTime to, int assignto)
        {
            return _context.Deal.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.Lead.ReferralId == assignto).ToList();
        }
        [Route("GetOpportunitiesByEvent")]
        [HttpGet]
        public List<Deal> GetOpportunitiesByEvent(DateTime from, DateTime to, int assignto)
        {
            return _context.Deal.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.Lead.EventId == assignto).ToList();
        }
        [Route("GetOpportunitiesByNetwork")]
        [HttpGet]
        public List<Deal> GetOpportunitiesByNetwork(DateTime from, DateTime to, int assignto)
        {
            return _context.Deal.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.Lead.NetworkingId == assignto).ToList();
        }



        [Route("GetUserByDate")]
        [HttpGet]
        public List<Users> GetUserByDate(DateTime from, DateTime to)
        {
            return _context.Users.Where(x => x.CreatedOn > from && x.CreatedOn < to).ToList();
        }

        [Route("GetOpportunitiesByStatus")]
        [HttpGet]
        public List<Deal> GetOpportunitiesByStatus(DateTime from, DateTime to, int assignto, int status)
        {
            return _context.Deal.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.CreatedById == assignto && x.StatusId == status).ToList();
        }
        [Route("GetLeadByStatus")]
        [HttpGet]
        public List<Lead> GetLeadByStatus(DateTime from, DateTime to, int assignto, int status)
        {
            return _context.Lead.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.CreatedById == assignto && x.Status == status).ToList();
        }

        [Route("GetVendorByStatus")]
        [HttpGet]
        public List<Vendor> GetVendorByStatus(DateTime from, DateTime to, int assignto, int status)
        {
            return _context.Vendor.Where(x => x.CreatedOn > from && x.CreatedOn < to && x.CreatedById == assignto && x.VendorStatus == status).ToList();
        }
        [Route("GetSalesmanCost")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserCost>>> GetSalesmanCost()
        {
            return await _context.UserCost.ToListAsync();
        }
        [Route("GetSalesman")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetSalesman()
        {
            return await _context.Users.ToListAsync();
        }
        [Route("GetLeadByCompanyId")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadByCompanyId()
        {
            return await _context.Lead.ToListAsync();
        }
        [Route("GetUserQuotaReports")]
        [HttpGet]
        public async Task<IActionResult> GetUserQuotaReports(int userId)
        {
            //decimal monthlyGoalValue = 0;
            //decimal monthlyActualValue = 0;
            UserGoal userGoal = new UserGoal();
            int totalOpportunitiesCount = 0;
            int totalLeadsCount = 0;
            List<Deal> yearlyOpportunities = new List<Deal>();
            List<Deal> monthlyOpportunities = new List<Deal>();
            List<Deal> weeklyOpportunities = new List<Deal>();
            List<Lead> yearlyLeads = new List<Lead>();
            List<Lead> monthlyLeads = new List<Lead>();
            List<Lead> weeklyLeads = new List<Lead>();
            DayOfWeek day = DateTime.Now.DayOfWeek;
            int days = day - DayOfWeek.Monday;
            int year = DateTime.Now.Year;
            DateTime start = DateTime.Now.AddDays(-days);
            DateTime end = start.AddDays(6);
            DateTime yearStart = new DateTime(year, 1, 1);
            DateTime yeadEnd = yearStart.AddYears(1).AddTicks(-1);
            var myDate = DateTime.Now;
            DateTime monthStart = new DateTime(myDate.Year, myDate.Month, 1);
            DateTime monthEnd = start.AddMonths(1).AddDays(-1);
            userGoal = await _context.UserGoal.Where(w => w.UserId == userId).FirstOrDefaultAsync();
            if (userGoal != null)
            {
                totalLeadsCount = await _context.Lead.Where(w => w.Owner == userId).CountAsync();
                totalOpportunitiesCount = await _context.Deal.Where(w => w.AssignedTo == userId).CountAsync();
                yearlyLeads = await _context.Lead.Where(w=>w.Owner == userId && w.CreatedOn != null && (w.CreatedOn.Value.Date >= yearStart.Date && w.CreatedOn.Value.Date <= yeadEnd.Date)).ToListAsync();
                yearlyOpportunities = await _context.Deal.Where(w => w.AssignedTo == userId && w.CreatedOn != null && (w.CreatedOn.Value.Date >= yearStart.Date && w.CreatedOn.Value.Date <= yeadEnd.Date)).ToListAsync();
                //yearlyOpportunities = await _context.Deal.Where(w => w.AssignedTo == userId).Where(w => w.CreatedOn == null || (w.CreatedOn.Value.Date >= yearStart.Date && w.CreatedOn.Value.Date <= yeadEnd.Date)).ToListAsync();
                monthlyLeads = yearlyLeads.Where(w => w.CreatedOn.Value.Date >= monthStart.Date && w.CreatedOn.Value.Date <= monthEnd.Date).ToList();
                monthlyOpportunities = yearlyOpportunities.Where(w => w.CreatedOn.Value.Date >= monthStart.Date && w.CreatedOn.Value.Date <= monthEnd.Date).ToList();
                //monthlyGoalValue = monthlyOpportunities.Sum(s => Convert.ToDecimal(s.ExpectedRevenue));
                //monthlyActualValue = monthlyOpportunities.Where(w => w.StatusId == 1).Sum(s => Convert.ToDecimal(s.ExpectedRevenue));
                weeklyLeads = monthlyLeads.Where(w => w.CreatedOn.Value.Date >= start.Date && w.CreatedOn.Value.Date <= end.Date).ToList();
                weeklyOpportunities = monthlyOpportunities.Where(w => w.CreatedOn.Value.Date >= start.Date && w.CreatedOn.Value.Date <= end.Date).ToList();
            }
            return Ok(new Tuple<UserGoal, List<Deal>, List<Deal>, List<Deal>, List<Lead>, List<Lead>, List<Lead>, Tuple<int , int>>(userGoal, weeklyOpportunities, monthlyOpportunities, yearlyOpportunities, weeklyLeads, monthlyLeads, yearlyLeads, new Tuple<int,int>(totalLeadsCount, totalOpportunitiesCount)));
        }
        //[Route("GetUserQuotaReportsByRange")]
        //[HttpGet]
        //public async Task<IActionResult> GetUserQuotaReportsByRange(int userId, int reportType)
        //{
        //    DateTime start = new DateTime();
        //    DateTime end = new DateTime();
        //    UserGoal userGoal = new UserGoal();
        //    List<Deal> opportunities = new List<Deal>();
        //    if(reportType == 1)
        //    {
        //        var myDate = DateTime.Now;
        //        start = new DateTime(myDate.Year, myDate.Month, 1);
        //        end = start.AddMonths(1).AddDays(-1);
        //    }
        //    else
        //    {
        //        int year = DateTime.Now.Year;
        //        start = new DateTime(year, 1, 1);
        //        end = start.AddYears(1).AddTicks(-1);
        //    }
        //    userGoal = await _context.UserGoal.Where(w => w.UserId == userId).FirstOrDefaultAsync();
        //    if (userGoal != null)
        //    {
        //        opportunities = await _context.Deal.Where(w => w.AssignedTo == userId).Where(w => w.CreatedOn.Value.Date > start.Date && w.CreatedOn.Value.Date < end.Date).ToListAsync();
        //    }
        //    return Ok(new Tuple<UserGoal, List<Deal>>(userGoal, opportunities));
        //}
    }
}

