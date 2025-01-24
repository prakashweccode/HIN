using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class HeaderChartMapping
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ChartId { get; set; }

        [ForeignKey(nameof(ChartId))]
        [InverseProperty(nameof(ChartName.HeaderChartMapping))]
        public virtual ChartName Chart { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.HeaderChartMapping))]
        public virtual Users User { get; set; }
    }
}
