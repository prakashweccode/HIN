using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Deal
    {
        public Deal()
        {
            Quote = new HashSet<Quote>();
            Services = new HashSet<Services>();
        }

        [Key]
        public int DealId { get; set; }
        [StringLength(100)]
        public string OrganizationName { get; set; }
        [StringLength(150)]
        public string Title { get; set; }
        [StringLength(50)]
        public string Value { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ExpectedCloseDate { get; set; }
        public int? LeadId { get; set; }
        public int? Owner { get; set; }
        [StringLength(150)]
        public string VisibleTo { get; set; }
        public int? Phone { get; set; }
        [StringLength(150)]
        public string Email { get; set; }
        public int? ContactId { get; set; }
        public int? OrganizationId { get; set; }
        public int? CurrencyId { get; set; }
        [StringLength(150)]
        public string DealName { get; set; }
        [StringLength(50)]
        public string Percentage { get; set; }
        [StringLength(50)]
        public string Color { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? NextStepDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EstimationDate { get; set; }
        [StringLength(150)]
        public string LeadProvider { get; set; }
        [StringLength(150)]
        public string LeadCost { get; set; }
        [StringLength(50)]
        public string ExpectedRevenue { get; set; }
        public string Address { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }
        public string Website { get; set; }
        [StringLength(200)]
        public string CompanyName { get; set; }
        [StringLength(200)]
        public string TradeShowName { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? TradeShowDate { get; set; }
        public string OriginsWebsite { get; set; }
        public string OriginsLinkedIn { get; set; }
        public bool? IsFromExistingCustomer { get; set; }
        public bool? IsFromExistingLead { get; set; }
        [StringLength(150)]
        public string NoOfEmployee { get; set; }
        [StringLength(150)]
        public string AnnualRevenue { get; set; }
        [StringLength(200)]
        public string Industry { get; set; }
        public int? AssignedTo { get; set; }
        [StringLength(150)]
        public string AssignedName { get; set; }
        public int? StatusId { get; set; }
        [StringLength(250)]
        public string Application { get; set; }
        [StringLength(250)]
        public string KeyFeatures { get; set; }
        public int? PriceExpectation { get; set; }
        [StringLength(150)]
        public string TimeFrame { get; set; }
        [StringLength(250)]
        public string Evaluated { get; set; }
        [StringLength(250)]
        public string Deployment { get; set; }
        [StringLength(250)]
        public string Shopping { get; set; }
        public int? EventId { get; set; }
        public string CancelReason { get; set; }
        [StringLength(50)]
        public string DealNumber { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        [StringLength(250)]
        public string AssignedType { get; set; }
        public int? SecurityGroupId { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ActualAmount { get; set; }
        public int? ReasonId { get; set; }
        [StringLength(50)]
        public string OriginalPercentage { get; set; }
        [Column(TypeName = "datetime")]
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
        public bool? IsRecurrence { get; set; }
        public int? ExpectedRevenuId { get; set; }
        public int? ExpectedRevenuDuration { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ExpectedRevenuPerDuration { get; set; }
        public string Notes { get; set; }
        public string OppRequirements { get; set; }
        public string OppRequirementRemarks { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndDate { get; set; }

        [ForeignKey(nameof(CurrencyId))]
        [InverseProperty("Deal")]
        public virtual Currency Currency { get; set; }
        [ForeignKey(nameof(LeadId))]
        [InverseProperty("Deal")]
        public virtual Lead Lead { get; set; }
        [ForeignKey(nameof(ReasonId))]
        [InverseProperty("Deal")]
        public virtual Reason Reason { get; set; }
        [ForeignKey(nameof(SecurityGroupId))]
        [InverseProperty(nameof(UserGroups.Deal))]
        public virtual UserGroups SecurityGroup { get; set; }
        [ForeignKey(nameof(StatusId))]
        [InverseProperty("Deal")]
        public virtual Status Status { get; set; }
        [InverseProperty("Deal")]
        public virtual ICollection<Quote> Quote { get; set; }
        [InverseProperty("Deal")]
        public virtual ICollection<Services> Services { get; set; }
    }
}
