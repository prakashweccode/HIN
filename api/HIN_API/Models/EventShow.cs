using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EventShow
    {
        public EventShow()
        {
            EventCost = new HashSet<EventCost>();
            Lead = new HashSet<Lead>();
            PartnerNavigation = new HashSet<Partner>();
            ReferralNavigation = new HashSet<Referral>();
            VendorNavigation = new HashSet<Vendor>();
        }

        [Key]
        public int Id { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        public int? VendorId { get; set; }
        [StringLength(200)]
        public string Location { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndDate { get; set; }
        public bool? IsWalkin { get; set; }
        [StringLength(50)]
        public string EventNumber { get; set; }
        public int? EventModeId { get; set; }
        [StringLength(50)]
        public string Telephone { get; set; }
        public string Industry { get; set; }
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
        public int? PartnerId { get; set; }
        public int? ReferralId { get; set; }
        public int? EventStatusId { get; set; }
        public int? EntityTypeId { get; set; }
        public int? EntityId { get; set; }

        [ForeignKey(nameof(EventModeId))]
        [InverseProperty("EventShow")]
        public virtual EventMode EventMode { get; set; }
        [ForeignKey(nameof(EventStatusId))]
        [InverseProperty("EventShow")]
        public virtual EventStatus EventStatus { get; set; }
        [ForeignKey(nameof(PartnerId))]
        [InverseProperty("EventShow")]
        public virtual Partner Partner { get; set; }
        [ForeignKey(nameof(ReferralId))]
        [InverseProperty("EventShow")]
        public virtual Referral Referral { get; set; }
        [ForeignKey(nameof(VendorId))]
        [InverseProperty("EventShow")]
        public virtual Vendor Vendor { get; set; }
        [InverseProperty("Event")]
        public virtual ICollection<EventCost> EventCost { get; set; }
        [InverseProperty("Event")]
        public virtual ICollection<Lead> Lead { get; set; }
        [InverseProperty("Event")]
        public virtual ICollection<Partner> PartnerNavigation { get; set; }
        [InverseProperty("Event")]
        public virtual ICollection<Referral> ReferralNavigation { get; set; }
        [InverseProperty("Event")]
        public virtual ICollection<Vendor> VendorNavigation { get; set; }
    }
}
