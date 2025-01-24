using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class VwContactInformation
    {
        public int Id { get; set; }
        [StringLength(150)]
        public string FirstName { get; set; }
        [StringLength(150)]
        public string LastName { get; set; }
        [StringLength(10)]
        public string Extension { get; set; }
        [StringLength(15)]
        public string FaxNumber { get; set; }
        public int? EntityId { get; set; }
        public int? Type { get; set; }
        [StringLength(256)]
        public string LinkedInProfile { get; set; }
        public string Notes { get; set; }
        public bool? IsAdditionalInfo { get; set; }
        public bool? IsMember { get; set; }
        public bool? IsGuest { get; set; }
        public int? Gender { get; set; }
        public bool? Inactive { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }
        [StringLength(50)]
        public string BatchNumber { get; set; }
        public string Address { get; set; }
        [StringLength(50)]
        public string ContactInfoNumber { get; set; }
        [StringLength(200)]
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        [StringLength(15)]
        public string OfficeNumber { get; set; }
        [StringLength(15)]
        public string CellNumber { get; set; }
        [StringLength(256)]
        public string Email { get; set; }
        [StringLength(250)]
        public string EntityType { get; set; }
        [StringLength(50)]
        public string GenderName { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }
        public string Affiliates { get; set; }
        public string Skills { get; set; }
        public string AffiliateIds { get; set; }
        public string SkillIds { get; set; }
        public string Groups { get; set; }
        public string GroupIds { get; set; }
    }
}
