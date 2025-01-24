using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ContactGroupModel
    {
        public Group Group { get; set; } 
        public List<ContactInformation> ContactInformations { get; set; }
    }
}
