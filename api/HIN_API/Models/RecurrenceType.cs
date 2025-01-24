using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class RecurrenceType
    {
        public RecurrenceType()
        {
            Recurrence = new HashSet<Recurrence>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }

        [InverseProperty("RecurrenceType")]
        public virtual ICollection<Recurrence> Recurrence { get; set; }
    }
}
