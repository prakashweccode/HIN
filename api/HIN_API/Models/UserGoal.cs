using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserGoal
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? AvarageSalePrice { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? MinimalGoalAmount { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? GoodRevenueGoalAmount { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? GreatRevenueGoalAmount { get; set; }
        public int? MinimalGoalLead { get; set; }
        public int? GoodRevenueGoalLead { get; set; }
        public int? GreatRevenueGoalLead { get; set; }
        public int? UserId { get; set; }
        public int? ClosingRatioInterval { get; set; }

        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserGoal))]
        public virtual Users User { get; set; }
    }
}
