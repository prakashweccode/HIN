using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ContactGroup
    {
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public int? ContactId { get; set; }
    }
}
