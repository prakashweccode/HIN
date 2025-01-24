using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LinePart
    {
        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        public int? QuoteId { get; set; }
        public int? PartCatalogId { get; set; }
        public string PartDescription { get; set; }
        public int? Quantity { get; set; }
        public int? UnitPrice { get; set; }
        public bool? Tax { get; set; }
        public int? TotalPrice { get; set; }
        public int? DiscountByLine { get; set; }
        public int? Available { get; set; }
        public int? ProfitPercentage { get; set; }
        public int? ProfitDollar { get; set; }
        public int? Profit { get; set; }
        public int? PriceDiscount { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ExpectedShipDate { get; set; }

        [ForeignKey(nameof(PartCatalogId))]
        [InverseProperty("LinePart")]
        public virtual PartCatalog PartCatalog { get; set; }
        [ForeignKey(nameof(QuoteId))]
        [InverseProperty("LinePart")]
        public virtual Quote Quote { get; set; }
    }
}
