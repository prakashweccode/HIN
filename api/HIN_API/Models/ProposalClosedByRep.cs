using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class ProposalClosedByRep
    {
        public string AssignedUser { get; set; }
        public int ProposalCost { get; set; }
        public int FinalPrice { get; set; }
    }

}
