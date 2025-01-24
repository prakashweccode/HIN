using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class UserCost
    {
        public int Id { get; set; }
        public bool? IsPerHour { get; set; }
        public decimal? PerHourCost { get; set; }
        public bool? IsPerMonth { get; set; }
        public decimal? PerMonthCost { get; set; }
        public int? PerMonthTotalHours { get; set; }
        public bool? IsPerLead { get; set; }
        public decimal? PerLeadCost { get; set; }
        public bool? IsPerPaidInvoice { get; set; }
        public decimal? PerPaidInvoiceCost { get; set; }
        public bool? IsFullTime { get; set; }
        public decimal? FullTimeCost { get; set; }
        public int? FullTimeHours { get; set; }
        public bool? IsPartTime { get; set; }
        public decimal? PartTimeCost { get; set; }
        public int? PartTimeHours { get; set; }
        public int? UserId { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? VendorId { get; set; }
        public int? PartnerId { get; set; }
        public int? ReferralId { get; set; }
        public int? UserCostDropdownId { get; set; }
    }
}
