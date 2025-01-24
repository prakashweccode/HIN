using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class NetworkingEventMeet
    {
        public int Id { get; set; }
        public DateTime? YearlyDate { get; set; }
        public DateTime? MonthlyDate { get; set; }
        public DateTime? WeeklyDate { get; set; }
        public TimeSpan? YearlyTime { get; set; }
        public TimeSpan? MonthlyTime { get; set; }
        public TimeSpan? WeeklyTime { get; set; }
        public string Notes { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
