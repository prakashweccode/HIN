using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public partial class Deal
    {
        public int DealId { get; set; }
        public string OrganizationName { get; set; }
        public string Title { get; set; }
        public string Value { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public DateTime? ExpectedCloseDate { get; set; }
        public int? Owner { get; set; }
        public string VisibleTo { get; set; }
        public int? Phone { get; set; }
        public string Email { get; set; }
        public int? ContactId { get; set; }
        public int? LeadId { get; set; }
        public int? OrganizationId { get; set; }
        public int? CurrencyId { get; set; }
        public int? StatusId { get; set; }
        [CsvImport]
        [CsvRequired]
        public string DealName { get; set; }
        public string Percentage { get; set; }
        public string Color { get; set; }
        public DateTime? NextStepDate { get; set; }
        public DateTime? EstimationDate { get; set; }
        public string LeadProvider { get; set; }
        public string LeadCost { get; set; }
        public string ExpectedRevenue { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string Website { get; set; }
        public string CompanyName { get; set; }
        public string TradeShowName { get; set; }
        public DateTime? TradeShowDate { get; set; }
        public string OriginsWebsite { get; set; }
        public string OriginsLinkedIn { get; set; }
        public bool? IsFromExistingCustomer { get; set; }
        public bool? IsFromExistingLead { get; set; }
        public string NoOfEmployee { get; set; }
        public string AnnualRevenue { get; set; }
        public string Industry { get; set; }
        public int? AssignedTo { get; set; }
        public string AssignedName { get; set; }
        public string AssignedType { get; set; }
        public string Application { get; set; }
        public string KeyFeatures { get; set; }
        public int? PriceExpectation { get; set; }
        public string TimeFrame { get; set; }
        public string Evaluated { get; set; }
        public string Deployment { get; set; }
        public string Shopping { get; set; }
        public int? EventId { get; set; }
        public string CancelReason { get; set; }
        public string DealNumber { get; set; }

        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? SecurityGroupId { get; set; }
        public decimal? ActualAmount { get; set; }
        public int? ReasonId { get; set; }
        public string OriginalPercentage { get; set; }
        public DateTime? StatusDate { get; set; }

        public int? OpportunityProviderId { get; set; }
        public int? ProviderEvenShowId { get; set; }
        public int? ProviderSocialMediaId { get; set; }
        public string ProviderInstagram { get; set; }
        public string ProviderFaceBook { get; set; }
        public string ProviderYoutube { get; set; }
        public string ProviderWeChat { get; set; }
        public string ProviderTwitter { get; set; }
        public string ProviderLikedIn { get; set; }
        public string ProviderSnapChat { get; set; }
        public int? ProviderVendorId { get; set; }
        public string ProviderWebsite { get; set; }
        public int? ProviderNetworkingId { get; set; }
        public int? ProviderNetworkingContactId { get; set; }
        public int? ProviderParterId { get; set; }
        public int? ProviderReferralId { get; set; }
        public int? ProviderLeadId { get; set; }
        public int? ProviderInternalSalesId { get; set; }
        public string Notes { get; set; }
        public bool? IsRecurrence { get; set; }
        public int? ExpectedRevenuId { get; set; }
        public int? ExpectedRevenuDuration { get; set; }
        public decimal? ExpectedRevenuPerDuration { get; set; }
        public string OppRequirements { get; set; }
        public string OppRequirementRemarks { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
