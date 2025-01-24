using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DTO.Models
{
    public class CompanyRegisterDataModel
    {
        public int RegisterId { get; set; }
        public string CompanyName { get; set; }
        public long? PhoneNumber { get; set; }
        public string Extension { get; set; }
        public string FaxNumber { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactMiddleName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactTitle { get; set; }
        public long? CellNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public string Password { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? MaximumUser { get; set; }
        public string UserName { get; set; }
    }
    public class CompanyRegisterListDTO
    {
        public int RegisterId { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
       
    }
    public class CompanyRegister
    {
        public int RegisterId { get; set; }
        public string? CompanyName { get; set; }
        public long? PhoneNumber { get; set; }
        [StringLength(50)]
        public string? Extension { get; set; }
        [StringLength(50)]
        public string? FaxNumber { get; set; }
        [StringLength(50)]
        public string? ContactFirstName { get; set; }
        [StringLength(50)]
        public string? ContactMiddleName { get; set; }
        [StringLength(50)]
        public string? ContactLastName { get; set; }
        public string? ContactTitle { get; set; }
        public long? CellNumber { get; set; }
        [StringLength(256)]
        public string? Email { get; set; }
        public string? Address { get; set; }
        [StringLength(50)]
        public string? City { get; set; }
        [StringLength(50)]
        public string? State { get; set; }
        [StringLength(50)]
        public string? ZipCode { get; set; }
        [StringLength(50)]
        public string? Country { get; set; }
        public string? Password { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string? UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string? CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? MaximumUser { get; set; }
        [StringLength(256)]
        public string? UserName { get; set; }
        [StringLength(60)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        [StringLength(256)]
        public string? EncryptedKey { get; set; }
        [StringLength(256)]
        public string? OfflineAppKey { get; set; }
        [StringLength(250)]
        public string? SupportEmail { get; set; }
        public string? CompanyLogo { get; set; }
        public string? CompanyPracticeCode { get; set; }
    }
}