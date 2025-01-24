using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ContactInformation
    {
        public ContactInformation()
        {
            ContactGroup = new HashSet<ContactGroup>();
            ContactInformationEmailMapping = new HashSet<ContactInformationEmailMapping>();
            DealContact = new HashSet<DealContact>();
            DealContactNextStep = new HashSet<DealContactNextStep>();
            LeadContact = new HashSet<LeadContact>();
            StepsContact = new HashSet<StepsContact>();
            StepsContactNextStep = new HashSet<StepsContactNextStep>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string FirstName { get; set; }
        [StringLength(150)]
        public string LastName { get; set; }
        [StringLength(200)]
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        [StringLength(15)]
        public string OfficeNumber { get; set; }
        [StringLength(10)]
        public string Extension { get; set; }
        [StringLength(15)]
        public string FaxNumber { get; set; }
        [StringLength(15)]
        public string CellNumber { get; set; }
        [StringLength(256)]
        public string Email { get; set; }
        public int? Type { get; set; }
        public int? EntityId { get; set; }
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
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        [StringLength(50)]
        public string BatchNumber { get; set; }
        public string Address { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }
        public int? ContactGroupId { get; set; }
        [StringLength(50)]
        public string ContactInfoNumber { get; set; }
        public string ContactImage { get; set; }
        public int? OrginId { get; set; }
        public int? LeadId { get; set; }
        public int? VendorId { get; set; }
        public int? PartnerId { get; set; }
        public bool? IsPrimary { get; set; }
        public string Website { get; set; }
        public int? ReferralId { get; set; }
        public int? ConsultantId { get; set; }
        [StringLength(150)]
        public string MiddleName { get; set; }
        [StringLength(150)]
        public string SecondMiddleName { get; set; }
        [StringLength(150)]
        public string SecondLastName { get; set; }

        [ForeignKey(nameof(ContactGroupId))]
        [InverseProperty(nameof(Group.ContactInformation))]
        public virtual Group ContactGroupNavigation { get; set; }
        [InverseProperty("Contact")]
        public virtual ICollection<ContactGroup> ContactGroup { get; set; }
        [InverseProperty("ContactInformation")]
        public virtual ICollection<ContactInformationEmailMapping> ContactInformationEmailMapping { get; set; }
        [InverseProperty("Contact")]
        public virtual ICollection<DealContact> DealContact { get; set; }
        [InverseProperty("Contact")]
        public virtual ICollection<DealContactNextStep> DealContactNextStep { get; set; }
        [InverseProperty("Contact")]
        public virtual ICollection<LeadContact> LeadContact { get; set; }
        [InverseProperty("Contact")]
        public virtual ICollection<StepsContact> StepsContact { get; set; }
        [InverseProperty("Contact")]
        public virtual ICollection<StepsContactNextStep> StepsContactNextStep { get; set; }
    }
}
