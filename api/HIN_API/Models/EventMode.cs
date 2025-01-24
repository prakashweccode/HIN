using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EventMode
    {
        public EventMode()
        {
            EventShow = new HashSet<EventShow>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }

        [InverseProperty("EventMode")]
        public virtual ICollection<EventShow> EventShow { get; set; }
    }
}
