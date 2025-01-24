using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using HIN_WEB.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : Controller
    {
        [Route("GetOpportunitiesByDate")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Deal>>> GetOpportunitiesByDate(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetOpportunitiesByDate";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetDealClosedbyMonth")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Deal>>> GetDealClosedbyMonth(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetDealClosedbyMonth";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }





        [Route("ExportOpportunitiesByDate")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Deal>>> ExportOpportunitiesByDate(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByPartner";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                byte[] fileContent = ExportCSVHelper.ExportJsonToCsv(content, ",");
                return File(fileContent, "text/csv", "LeadReportByPartner_" + DateTime.Now.Date + ".csv");
            }
            else
            {
                var content = new List<Deal>();
                content.Add(new Deal());
                var jsonContent = JsonConvert.SerializeObject(content);
                byte[] fileContent = ExportCSVHelper.ExportJsonToCsv(jsonContent, ",");
                return File(fileContent, "text/csv", ("NoRecordsFound.csv"));
            }
        }
        [Route("ExportOpportunityCostReport")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Deal>>> ExportOpportunityCostReport(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByPartner";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                byte[] fileContent = ExportCSVHelper.ExportJsonToCsv(content, ",");
                return File(fileContent, "text/csv", "LeadReportByPartner_" + DateTime.Now.Date + ".csv");
            }
            else
            {
                var content = new List<Deal>();
                content.Add(new Deal());
                var jsonContent = JsonConvert.SerializeObject(content);
                byte[] fileContent = ExportCSVHelper.ExportJsonToCsv(jsonContent, ",");
                return File(fileContent, "text/csv", ("NoRecordsFound.csv"));
            }
        }




        [Route("GetLeadReportByDate")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<LeadUserReport>>> GetLeadReportByDate(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByDate";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<LeadUserReport>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetLeadReportByVendor")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadReportByVendor(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByVendor";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Lead>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetLeadReportByPartner")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadReportByPartner(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByPartner";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Lead>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("ExportLeadReportByPartner")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> ExportLeadReportByPartner(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByPartner";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                byte[] fileContent = ExportCSVHelper.ExportJsonToCsv(content, ",");
                return File(fileContent, "text/csv", "LeadReportByPartner_" + DateTime.Now.Date + ".csv");
            }
            else
            {
                var content = new List<Lead>();
                content.Add(new Lead());
                var jsonContent = JsonConvert.SerializeObject(content);
                byte[] fileContent = ExportCSVHelper.ExportJsonToCsv(jsonContent, ",");
                return File(fileContent, "text/csv", ("NoRecordsFound.csv"));
            }
        }

        [Route("GetOpportunitiesByVendor")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Deal>>> GetOpportunitiesByVendor(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            opportunityAcquisitionCost.OppEstimateFrom = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppEstimateFrom));
            opportunityAcquisitionCost.OppEstimateTo = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppEstimateTo));
            opportunityAcquisitionCost.OppCreatedFrom = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppCreatedFrom));
            opportunityAcquisitionCost.OppCreatedTo = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppCreatedTo));
            string apiPath = "Report/GetOpportunitiesByVendor";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetOpportunityCostReport")]
        [HttpPost]
        public async Task<ActionResult<List<Tuple<Deal, List<MaterialCost>, List<TimeCost>>>>> GetOpportunityCostReport(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            opportunityAcquisitionCost.OppEstimateFrom = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppEstimateFrom));
            opportunityAcquisitionCost.OppEstimateTo = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppEstimateTo));
            opportunityAcquisitionCost.OppCreatedFrom = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppCreatedFrom));
            opportunityAcquisitionCost.OppCreatedTo = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.OppCreatedTo));
            string apiPath = "Report/GetOpportunityCostReport";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<List<Tuple<Deal, List<MaterialCost>, List<TimeCost>>>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetOpenDeals")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<OpenDeals>>> GetOpenDeals(DealRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetOpenDeals";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<OpenDeals>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetWinLossByRep")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<WinLossByRep>>> GetWinLossByRep(WinLossRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetWinLossByRep";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<WinLossByRep>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetWonDealsByRep")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<WonDealsByRep>>> GetWonDealsByRep(WonDealsRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetWonDealsByRep";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<WonDealsByRep>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetDealsLostByReason")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<DealsLostByReason>>> GetDealsLostByReason(DealsLostByReasonRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetDealsLostByReason";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<DealsLostByReason>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetRevenueforecastbyrep")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Revenueforecastbyrep>>> GetRevenueforecastbyrep(RevenueforecastbyrepRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetRevenueforecastbyrep";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Revenueforecastbyrep>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetLeadConversion")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<LeadConversion>>> GetLeadConversion(RevenueforecastbyrepRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetLeadConversion";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<LeadConversion>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetProposalClosedByRep")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<ProposalClosedByRep>>> GetProposalClosedByRep(ProposalClosedByRepRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetProposalClosedByRep";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<ProposalClosedByRep>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetOpportunitieswonovertime")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Opportunitiesovertime>>> GetOpportunitieswonovertime(OpportunitiesovertimeRepRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetOpportunitieswonovertime";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Opportunitiesovertime>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetOpportunitieslostbyreason")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Opportunitiesovertime>>> GetOpportunitieslostbyreason(OpportunitiesovertimeRepRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetOpportunitieslostbyreason";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Opportunitiesovertime>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetProposalsclosedbycustomer")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Proposalsclosedbycustomer>>> GetProposalsclosedbycustomer(ProposalsclosedbycustomerRequest request)
        {
            request.From = SetStartTime(request.From);
            request.To = SetEndTime(request.To);
            string apiPath = "Report/GetProposalsclosedbycustomer";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Proposalsclosedbycustomer>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("GetFunnelProgress")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<FunnelProgress>>> GetFunnelProgress(FunnelProgressRequest request)
        {

            string apiPath = "Report/GetFunnelProgress";
            HttpResponseMessage response = await DataManager.PostData(apiPath, request).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<FunnelProgress>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetOpportunitiesByPartner")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetOpportunitiesByPartner(DateTime? from, DateTime? to, int assignto)
        {
            from = SetStartTime(from);
            to = SetEndTime(to);
            string apiPath = "Report/GetOpportunitiesByPartner?from=" + from + "&to=" + to + "&assignto=" + assignto;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetOpportunitiesByReferral")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetOpportunitiesByReferral(DateTime? from, DateTime? to, int assignto)
        {
            from = SetStartTime(from);
            to = SetEndTime(to);
            string apiPath = "Report/GetOpportunitiesByReferral?from=" + from + "&to=" + to + "&assignto=" + assignto;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetOpportunitiesByEvent")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetOpportunitiesByEvent(DateTime? from, DateTime? to, int assignto)
        {
            from = SetStartTime(from);
            to = SetEndTime(to);
            string apiPath = "Report/GetOpportunitiesByEvent?from=" + from + "&to=" + to + "&assignto=" + assignto;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetOpportunitiesByNetwork")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetOpportunitiesByNetwork(DateTime? from, DateTime? to, int assignto)
        {
            from = SetStartTime(from);
            to = SetEndTime(to);
            string apiPath = "Report/GetOpportunitiesByNetwork?from=" + from + "&to=" + to + "&assignto=" + assignto;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetUserOpportunityReport")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDealReport>>> GetUserOpportunityReport(string from, string to, int statusId)
        {
            string api = "Deals/GetUserOpportunityReport?from=" + from + "&to=" + to + "&statusId=" + statusId;
            var response = await DataManager.GetData(api).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var listDeal = JsonConvert.DeserializeObject<List<UserDealReport>>(content);
                return Ok(listDeal);
            }
            else
            {
                return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
            }
        }

        [Route("GetLeadReportByReferral")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadReportByReferral(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByReferral";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Lead>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetLeadReportByEvent")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadReportByEvent(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByEvent";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Lead>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetLeadReportByNetworking")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeadReportByNetworking(OpportunityAcquisitionCost opportunityAcquisitionCost)
        {
            opportunityAcquisitionCost.From = SetStartTime(Convert.ToDateTime(opportunityAcquisitionCost.From));
            opportunityAcquisitionCost.To = SetEndTime(Convert.ToDateTime(opportunityAcquisitionCost.To));
            string apiPath = "Report/GetLeadReportByNetworking";
            HttpResponseMessage response = await DataManager.PostData(apiPath, opportunityAcquisitionCost).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Lead>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }





        [Route("GetUserByDate")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUserByDate(DateTime from, DateTime to)
        {
            string apiPath = "Report/GetUserByDate?from=" + from + "&to=" + to;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var reports = JsonConvert.DeserializeObject<IEnumerable<Users>>(content);
                return Ok(reports);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetUserQuotaReports")]
        [HttpGet]
        public async Task<ActionResult<Tuple<UserGoal, List<Deal>, List<Deal>, List<Deal>, List<Lead>, List<Lead>, List<Lead>, Tuple<int,int>>>> GetUserQuotaReports(int userId)
        {
            string apiPath = "Report/GetUserQuotaReports?userId=" + userId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<Tuple<UserGoal, List<Deal>, List<Deal>, List<Deal>, List<Lead>, List<Lead>, List<Lead>, Tuple<int, int>>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }




        private static DateTime? SetStartTime(DateTime? inputDate)
        {
            if (inputDate != null && inputDate.Value.Year > 1900)
            {
                TimeSpan ts = new TimeSpan(00, 00, 0);
                inputDate = inputDate.Value.Date + ts;
                return inputDate;
            }
            else
            {
                return null;
            }
        }
        private static DateTime? SetEndTime(DateTime? inputDate)
        {
            if (inputDate != null && inputDate.Value.Year > 1900)
            {
                TimeSpan ts = new TimeSpan(23, 59, 1);
                inputDate = inputDate.Value.Date + ts;
                return inputDate;
            }
            else
            {
                return null;
            }
        }
    }

}