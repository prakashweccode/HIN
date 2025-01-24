using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class PipelineGroup
    {
        public string Name { get; set; }
        public int PipelineGroupId { get; set; }
        public int? PipelineGroupType { get; set; }
        public bool? IsDefault { get; set; }
        public List<Pipeline> Pipelines { get; set; }
    }
}
