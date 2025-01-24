using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class CustomProperty
    {
        public int Id { get; set; }
        public string PropertyName { get; set; }
        public string PropertyValue { get; set; }
        public int? PropertyType { get; set; }
        public bool? IsRequired { get; set; }
        public bool? IsImportant { get; set; }
        public bool? IsVisible { get; set; }
        public int? EntityTypeId { get; set; }
        public bool? IsRight { get; set; }
        public string IdHtml { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? ColumnSize { get; set; }
    }
}
