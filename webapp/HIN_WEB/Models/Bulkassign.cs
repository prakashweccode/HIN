using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Bulkassign
    {
        public int? LeadFunnelStatusId { get; set; }
        public int? SecurityGroup { get; set; }
        public int? AssignedToId { get; set; }
        public string AssignedToName { get; set; }
        public List<AssignedInput> ArrayOfData { get; set; }
        public int? WonActualAmount { get; set; }
        public string Reason { get; set; }
    }
}
