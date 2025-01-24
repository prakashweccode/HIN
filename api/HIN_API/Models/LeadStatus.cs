using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LeadStatus
    {
        public LeadStatus()
        {
            Lead = new HashSet<Lead>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [InverseProperty("LeadStatusNavigation")]
        public virtual ICollection<Lead> Lead { get; set; }
    }
}
