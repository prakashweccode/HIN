using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class FunnelProgress
    {
        public string Stage { get; set; }
        public int DealInStage { get; set; }
        public int TotalValue { get; set; }
        public int ExpectedRevenue { get; set; }
    }
}
