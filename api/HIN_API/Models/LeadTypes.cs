using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LeadTypes
    {
        public LeadTypes()
        {
            LeadLabels = new HashSet<LeadLabels>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }

        [InverseProperty("LeadType")]
        public virtual ICollection<LeadLabels> LeadLabels { get; set; }
    }
}
