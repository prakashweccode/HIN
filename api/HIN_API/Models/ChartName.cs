using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ChartName
    {
        public ChartName()
        {
            DashboardChartMapping = new HashSet<DashboardChartMapping>();
            HeaderChartMapping = new HashSet<HeaderChartMapping>();
            UserQuoteChartMapping = new HashSet<UserQuoteChartMapping>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [InverseProperty("Chart")]
        public virtual ICollection<DashboardChartMapping> DashboardChartMapping { get; set; }
        [InverseProperty("Chart")]
        public virtual ICollection<HeaderChartMapping> HeaderChartMapping { get; set; }
        [InverseProperty("Chart")]
        public virtual ICollection<UserQuoteChartMapping> UserQuoteChartMapping { get; set; }
    }
}
