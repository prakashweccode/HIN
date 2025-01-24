using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Models
{
    public class DashboardStatsDto
    {
        public int RegisteredCompanies { get; set; }
        public int ActiveCompanies { get; set; }
        public int InactiveCompanies { get; set; }
        public int TenantUsers { get; set; }
        public int ActiveTenantUsers { get; set; }
        public int InactiveTenantUsers { get; set; }
    }
}
