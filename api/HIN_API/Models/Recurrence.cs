using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Recurrence
    {
        public Recurrence()
        {
            RecurrenceDays = new HashSet<RecurrenceDays>();
            Todo = new HashSet<Todo>();
        }

        [Key]
        public int Id { get; set; }
        [Column(TypeName = "date")]
        public DateTime? StartDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        [Column(TypeName = "date")]
        public DateTime? EndDate { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? Duration { get; set; }
        public int? RecurrenceTypeId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? RecursOn { get; set; }
        public int? RecurrenceInterval { get; set; }
        public int? RecurrenceIntervalDay { get; set; }
        public int? RecurrenceIntervalMonth { get; set; }
        public int? RecurrenceEndType { get; set; }
        public int? RecurrenceEndInterval { get; set; }
        public int? RecurrenceIntervalHour { get; set; }
        public int? RecurrenceIntervalMinutes { get; set; }

        [ForeignKey(nameof(RecurrenceTypeId))]
        [InverseProperty("Recurrence")]
        public virtual RecurrenceType RecurrenceType { get; set; }
        [InverseProperty("Recurrence")]
        public virtual ICollection<RecurrenceDays> RecurrenceDays { get; set; }
        [InverseProperty("Recurrence")]
        public virtual ICollection<Todo> Todo { get; set; }
    }
}
