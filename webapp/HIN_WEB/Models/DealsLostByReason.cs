using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class DealsLostByReason
    {
        public string AssignedUser { get; set; }
        public int TotalDeals { get; set; }
        public int DealValue { get; set; }
        public string LostReason { get; set; }
    }
}
