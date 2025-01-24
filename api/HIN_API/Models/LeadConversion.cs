using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class LeadConversion
    {
        public string AssignedUser { get; set; }
        public int BeginningLeads { get; set; }
        public int LeadToProspect { get; set; }
        public int ProspectToCustomer { get; set; }
       
        
    }
}
