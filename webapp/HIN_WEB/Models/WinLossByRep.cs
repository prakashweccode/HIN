using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class WinLossByRep
    {
        public string AssignedUser { get; set; }
        public int TotalDeals { get; set; }
        public int ExpectedRevenue { get; set; }
        public int DealsWon { get; set; }
        public int DealsLost { get; set; }
        public int PercentWon { get; set; }
        public int PercentLost { get; set; }
        public int ActualWon { get; set; }
    }
}
