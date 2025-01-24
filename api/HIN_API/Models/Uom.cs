using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    [Table("UOM")]
    public partial class Uom
    {
        public Uom()
        {
            PartCatalog = new HashSet<PartCatalog>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }

        [InverseProperty("UomNavigation")]
        public virtual ICollection<PartCatalog> PartCatalog { get; set; }
    }
}
