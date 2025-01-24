using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class PipelineMap
    {
        [Key]
        public int PipelineMapId { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
