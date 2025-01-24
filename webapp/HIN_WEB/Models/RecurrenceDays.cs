using System;
using System.Collections.Generic;

namespace HIN_WEB.Models
{
    public partial class RecurrenceDays
    {
        public int Id { get; set; }
        public int? DayId { get; set; }
        public int? RecurrenceId { get; set; }
    }
}
