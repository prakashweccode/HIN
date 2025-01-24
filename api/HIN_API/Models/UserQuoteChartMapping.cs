using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserQuoteChartMapping
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ChartId { get; set; }

        [ForeignKey(nameof(ChartId))]
        [InverseProperty(nameof(ChartName.UserQuoteChartMapping))]
        public virtual ChartName Chart { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserQuoteChartMapping))]
        public virtual Users User { get; set; }
    }
}
