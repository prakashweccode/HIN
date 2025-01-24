using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ChartConfig
    {
        public int Id { get; set; }
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
    }
}
