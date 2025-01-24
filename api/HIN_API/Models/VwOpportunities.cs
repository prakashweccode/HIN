using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class VwOpportunities
    {
        public int DealId { get; set; }
        [StringLength(50)]
        public string DealNumber { get; set; }
        [StringLength(150)]
        public string DealName { get; set; }
        [StringLength(100)]
        public string AssignedTo { get; set; }
        [StringLength(150)]
        public string DealStatus { get; set; }
        [StringLength(100)]
        public string Pipeline { get; set; }
        [StringLength(100)]
        public string PipelineGroup { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
    }
}
