using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CustomProperty
    {
        public CustomProperty()
        {
            CustomFieldListItems = new HashSet<CustomFieldListItems>();
            CustomPropertyValues = new HashSet<CustomPropertyValues>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string PropertyName { get; set; }
        public string PropertyValue { get; set; }
        public int? PropertyType { get; set; }
        public bool? IsRequired { get; set; }
        public bool? IsImportant { get; set; }
        public bool? IsVisible { get; set; }
        public int? EntityTypeId { get; set; }
        public bool? IsRight { get; set; }
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
        public int? ColumnSize { get; set; }
        [StringLength(30)]
        public string IdHtml { get; set; }

        [InverseProperty("CustomProperty")]
        public virtual ICollection<CustomFieldListItems> CustomFieldListItems { get; set; }
        [InverseProperty("CustomProperty")]
        public virtual ICollection<CustomPropertyValues> CustomPropertyValues { get; set; }
    }
}
