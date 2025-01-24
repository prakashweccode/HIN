using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class NetworkingCost
    {
        public int NetworkingCostId { get; set; }
        public decimal? Yearly { get; set; }
        public decimal? Monthly { get; set; }
        public decimal? Weekly { get; set; }
        public decimal? PerEvent { get; set; }
        public decimal? TravelCost { get; set; }
        public string YearlyNote { get; set; }
        public string MonthlyNote { get; set; }
        public string WeeklyNote { get; set; }
        public string PerEventNote { get; set; }
        public string TravelCostNote { get; set; }
        public string Note { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
