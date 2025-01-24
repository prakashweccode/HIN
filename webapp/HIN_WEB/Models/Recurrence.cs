using System;
using System.Collections.Generic;

namespace HIN_WEB.Models
{
    public partial class Recurrence
    { 
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public DateTime? EndDate { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? Duration { get; set; }
        public int? RecurrenceTypeId { get; set; }
        public DateTime? RecursOn { get; set; }
    }
}
