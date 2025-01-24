using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class SearchCriteria
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? Inactive { get; set; }
        public int? Type { get; set; }
    }
}
