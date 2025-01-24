using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class VwServices
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string ServiceNumber { get; set; }
        [StringLength(150)]
        public string ServiceName { get; set; }
        public int? Type { get; set; }
        [StringLength(100)]
        public string AssignedTo { get; set; }
        [StringLength(200)]
        public string CompanyName { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(150)]
        public string CreatedBy { get; set; }
        [StringLength(200)]
        public string LeadName { get; set; }
        [StringLength(50)]
        public string LeadNumber { get; set; }
    }
}
