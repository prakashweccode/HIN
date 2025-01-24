using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;

namespace HIN_WEB.Models
{
    public partial class Lead
    {
        public int LeadId { get; set; }
        [CsvImport]
        [CsvRequired]
        public string LeadName { get; set; }
        [CsvImport]
        [CsvRequired]
        public string CompanyName { get; set; }
        [CsvImport]
        public string Address { get; set; }
        [CsvImport]
        public string City { get; set; }
        [CsvImport]
        public string State { get; set; }
        [CsvImport]
        public string Country { get; set; }
        [CsvImport]
        public string ZipCode { get; set; }
        public string Website { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public string AnnualRevenue { get; set; }
        public string NoOfEmployee { get; set; }
        public int? Industry { get; set; }
        public int? Owner { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? ContactId { get; set; }
        public string LeadProvider { get; set; }
        public decimal? LeadCost { get; set; }
        public decimal? ExpectedRevenue { get; set; }
        public int? OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public int? CurrencyId { get; set; }
        public bool? IsCommercial { get; set; }
        public int? Status { get; set; }
        public int? OriginId { get; set; }
        public int? SocialMediaId { get; set; }
        public string SocialMediaLink { get; set; }
        public string NotPayReferral { get; set; }
        public int? NotPayReferralId { get; set; }
        public string OriginsLinkedIn { get; set; }
        public string OriginsWebsite { get; set; }
        public DateTime? OriginsDate { get; set; }
        public string OriginNotes { get; set; }
        public int? EventId { get; set; }
        public int? VendorId { get; set; }
        public int? OpportunityCount { get; set; }
        public int? NetworkingId { get; set; }
        public bool? Inactive { get; set; }
        public int? NetworkContactId { get; set; }
        public string LeadNumber { get; set; }
        [CsvImport]
        public int? LeadStatus { get; set; }
        public int? PartnerId { get; set; }
        public int? ReferralId { get; set; }
        [CsvImport]
        public int? SecurityGroupId { get; set; }
        public string Reason { get; set; }
        public int? LeadFunnelStatus { get; set; }
        public int? OriginLeadId { get; set; }
        public int? InternalSales { get; set; }
        public string BatchNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [CsvImport]
        public string EmailAddress { get; set; }
        [CsvImport]
        public string CellNumber { get; set; }
        public string OfficeNumber { get; set; }
        public string ContactTitle { get; set; }
        public string MiddleName { get; set; }
        public string PatientLastName { get; set; }
        public string SecondMiddleName { get; set; }
        public string SecondLastName { get; set; }
        public int? GenderId { get; set; }
        public DateTime? Dob { get; set; }
        public string Occupation { get; set; }
        public int? Age { get; set; }
        public virtual ICollection<LeadEmail> LeadEmail { get; set; }
        public virtual ICollection<LeadLabels> LeadLabels { get; set; }
        public virtual ICollection<LeadPhoneNumber> LeadPhoneNumber { get; set; }
        
    }
}
