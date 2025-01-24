using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Currency
    {
        public Currency()
        {
            Deal = new HashSet<Deal>();
            Lead = new HashSet<Lead>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(50)]
        public string Symbol { get; set; }
        public int? DecimalPoints { get; set; }
        [StringLength(50)]
        public string Code { get; set; }

        [InverseProperty("Currency")]
        public virtual ICollection<Deal> Deal { get; set; }
        [InverseProperty("Currency")]
        public virtual ICollection<Lead> Lead { get; set; }
    }
}
