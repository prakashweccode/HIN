using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class PartCatalog
    {
        public PartCatalog()
        {
            LinePart = new HashSet<LinePart>();
            MaterialCost = new HashSet<MaterialCost>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string PartCode { get; set; }
        [StringLength(250)]
        public string PartDescription { get; set; }
        [Column("UOM")]
        [StringLength(250)]
        public string Uom { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? EstimateCost { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? SalesPrice { get; set; }
        public bool? IsNonTaxable { get; set; }
        [Column("UOMId")]
        public int? Uomid { get; set; }
        public int? QuoteId { get; set; }

        [ForeignKey(nameof(QuoteId))]
        [InverseProperty("PartCatalog")]
        public virtual Quote Quote { get; set; }
        [ForeignKey(nameof(Uomid))]
        [InverseProperty("PartCatalog")]
        public virtual Uom UomNavigation { get; set; }
        [InverseProperty("PartCatalog")]
        public virtual ICollection<LinePart> LinePart { get; set; }
        [InverseProperty("Product")]
        public virtual ICollection<MaterialCost> MaterialCost { get; set; }
    }
}
