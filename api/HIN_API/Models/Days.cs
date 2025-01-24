using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Days
    {
        public Days()
        {
            RecurrenceDays = new HashSet<RecurrenceDays>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string DayName { get; set; }
        public int? DisplayOrder { get; set; }

        [InverseProperty("Day")]
        public virtual ICollection<RecurrenceDays> RecurrenceDays { get; set; }
    }
}
