using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LabelType
    {
        public LabelType()
        {
            Organization = new HashSet<Organization>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }

        [InverseProperty("Label")]
        public virtual ICollection<Organization> Organization { get; set; }
    }
}
