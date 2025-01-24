using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public partial class LinePart
    {
        public int Id { get; set; }
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
        public DateTime? ExpectedShipDate { get; set; }

      
        public virtual PartCatalog PartCatalog { get; set; }
    
        public virtual Quote Quote { get; set; }
    }
}
