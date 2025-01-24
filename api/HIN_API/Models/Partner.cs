using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Partner
    {
        public Partner()
        {
            EventShow = new HashSet<EventShow>();
            UserCost = new HashSet<UserCost>();
        }

        [Key]
        public int PartnerId { get; set; }
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
        public string Name { get; set; }
        public bool? IsReferral { get; set; }
        public int? ReferralTypeId { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ReferralFees { get; set; }
        public int? ReccuringTypeId { get; set; }
        public int? ReferralFeeId { get; set; }
        public int? PaymentModelId { get; set; }
        [StringLength(50)]
        public string PartnerNumber { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        [StringLength(50)]
        public string Telephone { get; set; }
        public int? Industry { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndOfContract { get; set; }
        public bool? Inactive { get; set; }
        public bool? IsNotPayReferral { get; set; }
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
        public int? OriginId { get; set; }
        public int? SocialMediaId { get; set; }
        public string SocialMediaLink { get; set; }
        public int? EventId { get; set; }
        public string OriginsWebsite { get; set; }
        public int? NetworkingId { get; set; }
        public int? NetworkContactId { get; set; }
        public int? NotPayReferralId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? OriginsDate { get; set; }
        public string OriginNotes { get; set; }
        public int? LeadId { get; set; }
        public int? ProviderTypeId { get; set; }
        public bool? IsPerReferralFee { get; set; }
        public int? VendorId { get; set; }
        public int? ReferralDropdownId { get; set; }
        public int? SecurityGroupId { get; set; }
        public int? AssignedTo { get; set; }
        public string Reason { get; set; }
        public int? PartnerStatus { get; set; }
        [StringLength(150)]
        public string CompanyName { get; set; }

        [ForeignKey(nameof(EventId))]
        [InverseProperty("PartnerNavigation")]
        public virtual EventShow Event { get; set; }
        [ForeignKey(nameof(LeadId))]
        [InverseProperty("Partner")]
        public virtual Lead Lead { get; set; }
        [ForeignKey(nameof(OriginId))]
        [InverseProperty(nameof(LeadOriginType.Partner))]
        public virtual LeadOriginType Origin { get; set; }
        [ForeignKey(nameof(PaymentModelId))]
        [InverseProperty(nameof(PaymentMode.Partner))]
        public virtual PaymentMode PaymentModel { get; set; }
        [ForeignKey(nameof(ProviderTypeId))]
        [InverseProperty("Partner")]
        public virtual ProviderType ProviderType { get; set; }
        [ForeignKey(nameof(ReferralDropdownId))]
        [InverseProperty("Partner")]
        public virtual ReferralDropdown ReferralDropdown { get; set; }
        [ForeignKey(nameof(ReferralFeeId))]
        [InverseProperty("Partner")]
        public virtual ReferralFee ReferralFee { get; set; }
        [ForeignKey(nameof(SecurityGroupId))]
        [InverseProperty(nameof(UserGroups.Partner))]
        public virtual UserGroups SecurityGroup { get; set; }
        [ForeignKey(nameof(SocialMediaId))]
        [InverseProperty(nameof(SocialMediaType.Partner))]
        public virtual SocialMediaType SocialMedia { get; set; }
        [ForeignKey(nameof(VendorId))]
        [InverseProperty("Partner")]
        public virtual Vendor Vendor { get; set; }
        [InverseProperty("Partner")]
        public virtual ICollection<EventShow> EventShow { get; set; }
        [InverseProperty("Partner")]
        public virtual ICollection<UserCost> UserCost { get; set; }
    }
}
