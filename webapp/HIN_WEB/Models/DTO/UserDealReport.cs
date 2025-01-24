using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models.DTO
{
    public class UserDealReport
    {
        public int DealId { get; set; }
        public string DealName { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int StatusId { get; set; }
        public string ExpectedRevenue { get; set; }
        public decimal? ActualAmount { get; set; }
        public string AnnualRevenue { get; set; }
        public string LeadProvider { get; set; }
        public string AssignedUser { get; set; }
        public string OpportunityStatus { get; set; }
    }
}
