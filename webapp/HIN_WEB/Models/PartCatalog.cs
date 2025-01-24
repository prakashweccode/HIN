using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class PartCatalog
    {
        public int Id { get; set; }
        public string PartCode { get; set; }
        public string PartDescription { get; set; }
        public string Uom { get; set; }
        public decimal? EstimateCost { get; set; }
        public decimal? SalesPrice { get; set; }
        public bool? IsNonTaxable { get; set; }
        public int? Uomid { get; set; }
        public int? QuoteId { get; set; }
        public int? LeadId { get; set; }
        public int? DealId { get; set; }
    }
}
