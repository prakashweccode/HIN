using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ContactInformationEmailMapping
    {
        public int Id { get; set; }
        public int? ContactInformationId { get; set; }
        public string Email { get; set; }
    }
}
