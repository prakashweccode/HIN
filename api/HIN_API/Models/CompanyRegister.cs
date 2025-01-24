using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CompanyRegister
    {
        public CompanyRegister()
        {
            CompanyEfileConfig = new HashSet<CompanyEfileConfig>();
            CompanySettings = new HashSet<CompanySettings>();
        }

        [Key]
        public int RegisterId { get; set; }
        public string CompanyName { get; set; }
        public long? PhoneNumber { get; set; }
        [StringLength(50)]
        public string Extension { get; set; }
        [StringLength(50)]
        public string FaxNumber { get; set; }
        [StringLength(50)]
        public string ContactFirstName { get; set; }
        [StringLength(50)]
        public string ContactMiddleName { get; set; }
        [StringLength(50)]
        public string ContactLastName { get; set; }
        public string ContactTitle { get; set; }
        public long? CellNumber { get; set; }
        [StringLength(256)]
        public string Email { get; set; }
        public string Address { get; set; }
        [StringLength(50)]
        public string City { get; set; }
        [StringLength(50)]
        public string State { get; set; }
        [StringLength(50)]
        public string ZipCode { get; set; }
        [StringLength(50)]
        public string Country { get; set; }
        public string Password { get; set; }
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
        public int? MaximumUser { get; set; }
        [StringLength(256)]
        public string UserName { get; set; }
        [StringLength(60)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        [StringLength(256)]
        public string EncryptedKey { get; set; }
        [StringLength(256)]
        public string OfflineAppKey { get; set; }
        [StringLength(250)]
        public string SupportEmail { get; set; }
        public string CompanyLogo { get; set; }

        [InverseProperty("Company")]
        public virtual ICollection<CompanyEfileConfig> CompanyEfileConfig { get; set; }
        [InverseProperty("Company")]
        public virtual ICollection<CompanySettings> CompanySettings { get; set; }
    }
}
