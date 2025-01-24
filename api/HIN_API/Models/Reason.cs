using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Reason
    {
        public Reason()
        {
            Deal = new HashSet<Deal>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [InverseProperty("Reason")]
        public virtual ICollection<Deal> Deal { get; set; }
    }
}
