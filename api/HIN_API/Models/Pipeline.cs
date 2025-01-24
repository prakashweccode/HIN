using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Pipeline
    {
        [Key]
        public int PipelineId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public int? Probability { get; set; }
        public bool? IsRotting { get; set; }
        public int? RottingDays { get; set; }
        public bool? IsDefault { get; set; }
        public int? DisplayOrder { get; set; }
        public int? PipelineGroupId { get; set; }
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
    }
}
