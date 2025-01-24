using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class UserChartMapping
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ChartId { get; set; }
    }
}
