using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CustomPropertyValues
    {
        [Key]
        public int Id { get; set; }
        public int? CustomPropertyId { get; set; }
        public string PropertyValue { get; set; }
        public int? EntityId { get; set; }
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

        [ForeignKey(nameof(CustomPropertyId))]
        [InverseProperty("CustomPropertyValues")]
        public virtual CustomProperty CustomProperty { get; set; }
    }
}
