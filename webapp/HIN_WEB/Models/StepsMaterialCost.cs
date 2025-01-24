using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class StepsMaterialCost
    {
        public int MaterialCostId { get; set; }
        public string Product { get; set; }
        public int? Quantity { get; set; }
        public int? Price { get; set; }
        public string Notes { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
