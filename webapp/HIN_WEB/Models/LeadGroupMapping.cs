using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class LeadGroupMapping
    {
        public int Id { get; set; }
        public int? LeadId { get; set; }
        public int? GroupId { get; set; }
    }
}
