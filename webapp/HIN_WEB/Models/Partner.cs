using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Partner
    {
        public int PartnerId { get; set; }
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
        [CsvImport]
        public string Website { get; set; }
        [CsvImport]
        [CsvRequired]
        public string Name { get; set; }
        public bool? IsReferral { get; set; }
        public int? ReferralTypeId { get; set; }
        public decimal? ReferralFees { get; set; }
        public int? ReccuringTypeId { get; set; }
        public int? ReferralFeeId { get; set; }
        public int? PaymentModelId { get; set; }
        public string PartnerNumber { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        [CsvImport]
        public string Telephone { get; set; }
        public int? Industry { get; set; }
        public DateTime? EndOfContract { get; set; }
        public bool? Inactive { get; set; }
        public bool? IsNotPayReferral { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? OriginId { get; set; }
        public int? SocialMediaId { get; set; }
        public string SocialMediaLink { get; set; }
        public int? EventId { get; set; }
        public string OriginsWebsite { get; set; }
        public int? NetworkingId { get; set; }
        public int? NetworkContactId { get; set; }
        public int? NotPayReferralId { get; set; }
        public DateTime? OriginsDate { get; set; }
        public string OriginNotes { get; set; }
        public int? LeadId { get; set; }
        public int? ProviderTypeId { get; set; }
        public bool? IsPerReferralFee { get; set; }
        public int? ReferralDropdownId { get; set; }
        public int? VendorId { get; set; }
        public int? SecurityGroupId { get; set; }
        public int? AssignedTo { get; set; }
        public string Reason { get; set; }
        public int? PartnerStatus { get; set; }
        public string CompanyName { get; set; }
    }
}
