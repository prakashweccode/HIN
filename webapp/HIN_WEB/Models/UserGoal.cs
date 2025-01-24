using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class UserGoal
    {
        public int Id { get; set; }
        public decimal? AvarageSalePrice { get; set; }
        public decimal? MinimalGoalAmount { get; set; }
        public decimal? GoodRevenueGoalAmount { get; set; }
        public decimal? GreatRevenueGoalAmount { get; set; }
        public int? MinimalGoalLead { get; set; }
        public int? GoodRevenueGoalLead { get; set; }
        public int? GreatRevenueGoalLead { get; set; }
        public int? UserId { get; set; }
        public int? ClosingRatioInterval { get; set; }
    }
}
