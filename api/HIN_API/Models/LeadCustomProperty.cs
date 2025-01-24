using System;
using System.Collections.Generic;

namespace HIN_API.Models
{
    public partial class LeadCustomProperty
    {
        public int Id { get; set; }
        public string PropertyName { get; set; }
        public string PropertyValue { get; set; }
        public int? PropertyType { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public bool? IsRequired { get; set; }
        public bool? IsImportant { get; set; }
        public virtual DbPropertyTypes PropertyTypeNavigation { get; set; }
    }
}
