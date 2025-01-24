using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class RecurrenceDays
    {
        [Key]
        public int Id { get; set; }
        public int? DayId { get; set; }
        public int? RecurrenceId { get; set; }

        [ForeignKey(nameof(DayId))]
        [InverseProperty(nameof(Days.RecurrenceDays))]
        public virtual Days Day { get; set; }
        [ForeignKey(nameof(RecurrenceId))]
        [InverseProperty("RecurrenceDays")]
        public virtual Recurrence Recurrence { get; set; }
    }
}
