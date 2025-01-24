using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class EventRecurrenceDto
    {
        public int? Id { get; set; }
        public int? RecurrenceId { get; set; }
        public string EventColor { get; set; }
        public string EventName { get; set; }
        public string EventNumber { get; set; }
        public DateTime? EventStartDate { get; set; }
        public DateTime? RecurrenceStartDate { get; set; }
        public TimeSpan? RecurrenceStartTime { get; set; }
        public DateTime? EventEndDate { get; set; }
        public DateTime? RecurrenceEndDate { get; set; }
        public TimeSpan? RecurrenceEndTime { get; set; }
        public DateTime? RecursOn { get; set; }
        public int? RecurrenceIntervalHour { get; set; }
        public int? RecurrenceEndInterval { get; set; }
        public int? RecurrenceEndType { get; set; }
        public int? RecurrenceInterval { get; set; }
        public int? RecurrenceIntervalDay { get; set; }
        public int? RecurrenceIntervalMonth { get; set; }
        public int? RecurrenceIntervalMinutes { get; set; }
        public int? RecurrenceTypeId { get; set; }
        public string RecurrenceType { get; set; }
        public bool? IsRecurrence { get; set; }
    }
}
