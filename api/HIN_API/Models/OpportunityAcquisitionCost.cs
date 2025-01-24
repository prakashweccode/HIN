using Microsoft.OData.Edm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class OpportunityAcquisitionCost
    {
        public List<Users> UserList { get; set; }
        public List<Deal> OpportunityList { get; set; }
        public int? OpportunityStatusId { get; set; }
        public DateTime? OppCreatedFrom { get; set; }
        public DateTime? OppCreatedTo { get; set; }
        public int? OppClosingPercentFrom { get; set; }
        public int? OppClosingPercentTo { get; set; }
        public int? OppFunnelPercentFrom { get; set; }
        public int? OppFunnelPercentTo { get; set; }
        public DateTime? OppEstimateFrom { get; set; }
        public DateTime? OppEstimateTo { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public int? OppActualAmountFrom { get; set; }
        public int? OppActualAmountTo { get; set; }
        
    }
}
