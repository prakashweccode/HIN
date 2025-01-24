using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Lead
    {
        public Lead()
        {
            CustomerPriceList = new HashSet<CustomerPriceList>();
            Deal = new HashSet<Deal>();
            LeadContact = new HashSet<LeadContact>();
            LeadEmail = new HashSet<LeadEmail>();
            LeadGroupMapping = new HashSet<LeadGroupMapping>();
            LeadLabels = new HashSet<LeadLabels>();
            LeadPhoneNumber = new HashSet<LeadPhoneNumber>();
            Partner = new HashSet<Partner>();
            ReferralNavigation = new HashSet<Referral>();
            Services = new HashSet<Services>();
            VendorNavigation = new HashSet<Vendor>();
        }

        [Key]
        public int LeadId { get; set; }
        [StringLength(200)]
        public string LeadName { get; set; }
        [StringLength(200)]
        public string CompanyName { get; set; }
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
        [StringLength(150)]
        public string AnnualRevenue { get; set; }
        [StringLength(150)]
        public string NoOfEmployee { get; set; }
        public int? Industry { get; set; }
        public int? Owner { get; set; }
        public int? ContactId { get; set; }
        [StringLength(150)]
        public string LeadProvider { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? LeadCost { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ExpectedRevenue { get; set; }
        public int? OrganizationId { get; set; }
        [StringLength(100)]
        public string OrganizationName { get; set; }
        public int? CurrencyId { get; set; }
        public bool? IsCommercial { get; set; }
        public int? Status { get; set; }
        public int? OriginId { get; set; }
        public int? SocialMediaId { get; set; }
        public string SocialMediaLink { get; set; }
        public int? NotPayReferralId { get; set; }
        public string NotPayReferral { get; set; }
        public string OriginsLinkedIn { get; set; }
        public string OriginNotes { get; set; }
        public string OriginsWebsite { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? OriginsDate { get; set; }
        public int? EventId { get; set; }
        public int? VendorId { get; set; }
        public int? OpportunityCount { get; set; }
        public int? NetworkingId { get; set; }
        public bool? Inactive { get; set; }
        public int? NetworkContactId { get; set; }
        [StringLength(50)]
        public string LeadNumber { get; set; }
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
        public int? LeadStatus { get; set; }
        public int? PartnerId { get; set; }
        public int? ReferralId { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? SecurityGroupId { get; set; }
        public string Reason { get; set; }
        public int? LeadFunnelStatus { get; set; }
        public int? OriginLeadId { get; set; }
        public int? InternalSales { get; set; }
        [StringLength(50)]
        public string BatchNumber { get; set; }
        [StringLength(150)]
        public string FirstName { get; set; }
        [StringLength(150)]
        public string LastName { get; set; }
        [StringLength(150)]
        public string ContactTitle { get; set; }
        [StringLength(256)]
        public string EmailAddress { get; set; }
        [StringLength(15)]
        public string CellNumber { get; set; }
        [StringLength(15)]
        public string OfficeNumber { get; set; }
        [StringLength(150)]
        public string MiddleName { get; set; }
        [StringLength(150)]
        public string PatientLastName { get; set; }
        [StringLength(150)]
        public string SecondMiddleName { get; set; }
        [StringLength(150)]
        public string SecondLastName { get; set; }
        public int? GenderId { get; set; }
        [Column("DOB", TypeName = "date")]
        public DateTime? Dob { get; set; }
        public string Occupation { get; set; }
        public int? Age { get; set; }

        [ForeignKey(nameof(CurrencyId))]
        [InverseProperty("Lead")]
        public virtual Currency Currency { get; set; }
        [ForeignKey(nameof(EventId))]
        [InverseProperty(nameof(EventShow.Lead))]
        public virtual EventShow Event { get; set; }
        [ForeignKey(nameof(Industry))]
        [InverseProperty(nameof(IndustryType.Lead))]
        public virtual IndustryType IndustryNavigation { get; set; }
        [ForeignKey(nameof(LeadStatus))]
        [InverseProperty("Lead")]
        public virtual LeadStatus LeadStatusNavigation { get; set; }
        [ForeignKey(nameof(NotPayReferralId))]
        [InverseProperty("LeadNotPayReferralNavigation")]
        public virtual Vendor NotPayReferralNavigation { get; set; }
        [ForeignKey(nameof(OriginId))]
        [InverseProperty(nameof(LeadOriginType.Lead))]
        public virtual LeadOriginType Origin { get; set; }
        [ForeignKey(nameof(Owner))]
        [InverseProperty(nameof(Users.Lead))]
        public virtual Users OwnerNavigation { get; set; }
        [ForeignKey(nameof(ReferralId))]
        [InverseProperty("Lead")]
        public virtual Referral Referral { get; set; }
        [ForeignKey(nameof(SecurityGroupId))]
        [InverseProperty(nameof(UserGroups.Lead))]
        public virtual UserGroups SecurityGroup { get; set; }
        [ForeignKey(nameof(SocialMediaId))]
        [InverseProperty(nameof(SocialMediaType.Lead))]
        public virtual SocialMediaType SocialMedia { get; set; }
        [ForeignKey(nameof(VendorId))]
        [InverseProperty("LeadVendor")]
        public virtual Vendor Vendor { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<CustomerPriceList> CustomerPriceList { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<Deal> Deal { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<LeadContact> LeadContact { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<LeadEmail> LeadEmail { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<LeadGroupMapping> LeadGroupMapping { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<LeadLabels> LeadLabels { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<LeadPhoneNumber> LeadPhoneNumber { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<Partner> Partner { get; set; }
        [InverseProperty("LeadNavigation")]
        public virtual ICollection<Referral> ReferralNavigation { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<Services> Services { get; set; }
        [InverseProperty("Lead")]
        public virtual ICollection<Vendor> VendorNavigation { get; set; }
    }
}
