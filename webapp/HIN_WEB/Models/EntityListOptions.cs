using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class EntityListOptions
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int? Type { get; set; }
        public bool? Inactive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? CreatedById { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedById { get; set; }
    }
}
