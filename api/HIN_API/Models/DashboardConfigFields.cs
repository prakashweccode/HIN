using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class DashboardConfigFields
    {
        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string FieldName { get; set; }
        [StringLength(100)]
        public string Type { get; set; }
        public bool? Inactive { get; set; }
        public int? Entity { get; set; }
    }
}
