using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class Proposalsclosedbycustomer
    {
        public string DealName { get; set; }
        public int FinalPrice { get; set; }
        public int Cost { get; set; }
        public string AssignedUser { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Description { get; set; }
    }
}
