using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserCost
    {
        [Key]
        public int Id { get; set; }
        public bool? IsPerHour { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? PerHourCost { get; set; }
        public bool? IsPerMonth { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? PerMonthCost { get; set; }
        public int? PerMonthTotalHours { get; set; }
        public bool? IsPerLead { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? PerLeadCost { get; set; }
        public bool? IsPerPaidInvoice { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? PerPaidInvoiceCost { get; set; }
        public bool? IsFullTime { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? FullTimeCost { get; set; }
        public int? FullTimeHours { get; set; }
        public bool? IsPartTime { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? PartTimeCost { get; set; }
        public int? PartTimeHours { get; set; }
        public int? UserId { get; set; }
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
        public int? VendorId { get; set; }
        public int? PartnerId { get; set; }
        public int? ReferralId { get; set; }
        public int? UserCostDropdownId { get; set; }

        [ForeignKey(nameof(PartnerId))]
        [InverseProperty("UserCost")]
        public virtual Partner Partner { get; set; }
        [ForeignKey(nameof(ReferralId))]
        [InverseProperty("UserCost")]
        public virtual Referral Referral { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserCost))]
        public virtual Users User { get; set; }
        [ForeignKey(nameof(UserCostDropdownId))]
        [InverseProperty("UserCost")]
        public virtual UserCostDropdown UserCostDropdown { get; set; }
        [ForeignKey(nameof(VendorId))]
        [InverseProperty("UserCost")]
        public virtual Vendor Vendor { get; set; }
    }
}
