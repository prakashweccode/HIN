using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class DealReportsDto
    {
        public int DealId { get; set; }
        public string DealName { get; set; }
        public string LeadName { get; set; }
        public string ExpectedRevenue { get; set; }
        public string DealStatus { get; set; }
        public DateTime? EstimationDate { get; set; }
        public string DealPipeline { get; set; }
        public string LeadProvider { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
