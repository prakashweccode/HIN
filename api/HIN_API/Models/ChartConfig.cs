using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ChartConfig
    {
        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        public int? ChartType { get; set; }
        public int? DashboardConfigId { get; set; }
        public int? GroupById { get; set; }
        public int? AggregateOneId { get; set; }
        public int? AggregateTwoId { get; set; }
        public int? AggregateOperationId { get; set; }
        public int? Size { get; set; }
        public bool? DisplayChart { get; set; }
        public bool? DisplayLabel { get; set; }

        [ForeignKey(nameof(DashboardConfigId))]
        [InverseProperty(nameof(DashboardUserConfig.ChartConfig))]
        public virtual DashboardUserConfig DashboardConfig { get; set; }
    }
}
