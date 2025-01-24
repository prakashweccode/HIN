using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CostCenterDropdown
    {
        public CostCenterDropdown()
        {
            Quote = new HashSet<Quote>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [InverseProperty("CostCenterNavigation")]
        public virtual ICollection<Quote> Quote { get; set; }
    }
}
