using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class PriceList
    {
        public PriceList()
        {
            CustomerPriceList = new HashSet<CustomerPriceList>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Code { get; set; }
        [StringLength(250)]
        public string Description { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndDate { get; set; }

        [InverseProperty("PriceList")]
        public virtual ICollection<CustomerPriceList> CustomerPriceList { get; set; }
    }
}
