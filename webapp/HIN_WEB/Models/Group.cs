using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public bool? Inactive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }
    }
}
