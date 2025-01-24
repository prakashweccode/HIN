using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class DashboardSettingsModel
    {
        public List<DashBoardQueries> DashBoardQueries { set; get; }
        public DashboardUserConfig DashoardUserConfig { set; get; }
        public string EntityName { get; set; }
    }
}
