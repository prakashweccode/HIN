using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CustomerPriceList
    {
        [Key]
        public int Id { get; set; }
        public int? LeadId { get; set; }
        public int? PriceListId { get; set; }

        [ForeignKey(nameof(LeadId))]
        [InverseProperty("CustomerPriceList")]
        public virtual Lead Lead { get; set; }
        [ForeignKey(nameof(PriceListId))]
        [InverseProperty("CustomerPriceList")]
        public virtual PriceList PriceList { get; set; }
    }
}
