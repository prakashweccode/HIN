using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ContactInformation
    {
        public int Id { get; set; }
        [CsvImport]
        [CsvRequired]
        public string FirstName { get; set; }
        [CsvImport]
        public string LastName { get; set; }
        public string ContactName { get { return FirstName + " " + LastName; } }
        [CsvImport]
        public string ContactTitle { get; set; }
        public string OfficeNumber { get; set; }
        public string Extension { get; set; }
        public string FaxNumber { get; set; }
        public string CellNumber { get; set; }
        [CsvImport]
        public int? Gender { get; set; }
        public bool? Inactive { get; set; }
        public string Email { get; set; }
        public int? Type { get; set; }
        public int? EntityId { get; set; }
        public string Notes { get; set; }
        public string LinkedInProfile { get; set; }
        public bool? IsAdditionalInfo { get; set; }
        public bool? IsMember { get; set; }
        public bool? IsGuest { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public string BatchNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public int? ContactGroupId { get; set; }
        public string ContactInfoNumber { get; set; }
        public string ContactImage { get; set; }
        public int? OrginId { get; set; }
        public int? LeadId { get; set; }
        public int? VendorId { get; set; }
        public int? PartnerId { get; set; }
        public bool? IsPrimary { get; set; }
        public string Website { get; set; }
        public string MiddleName { get; set; }
        public string SecondMiddleName { get; set; }
        public string SecondLastName { get; set; }
    }
}
