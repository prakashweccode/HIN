using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ImportLeads
    {
        public Lead OLead { get; set; }
        public Deal ODeal { get; set; }
        public ContactInformation OContact { get; set; }
    }
}
