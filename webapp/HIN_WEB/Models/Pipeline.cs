using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Pipeline
    {
        public int PipelineId { get; set; }
        public string Name { get; set; }
        public int Probability { get; set; }
        public bool? IsRotting { get; set; }
        public int? RottingDays { get; set; }
        public int? DisplayOrder { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }   
}
