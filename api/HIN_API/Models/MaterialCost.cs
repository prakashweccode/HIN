using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class MaterialCost
    {
        [Key]
        public int Id { get; set; }
        public int? Quantity { get; set; }
        public int? Price { get; set; }
        public string Notes { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? ProductId { get; set; }
        public int? DealContactId { get; set; }

        [ForeignKey(nameof(DealContactId))]
        [InverseProperty("MaterialCost")]
        public virtual DealContact DealContact { get; set; }
        [ForeignKey(nameof(ProductId))]
        [InverseProperty(nameof(PartCatalog.MaterialCost))]
        public virtual PartCatalog Product { get; set; }
    }
}
