using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Opportunitiesovertime
    {
        public string DealName { get; set; }
        public int Value { get; set; }
        public int Funnel { get; set; }
        public string AssignedUser { get; set; }
        public string Reason { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime WonDate { get; set; }
    }
}
