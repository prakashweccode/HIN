using System;
using System.Collections.Generic;

namespace HIN_WEB.Models
{
    public partial class LeadLabels
    {
        public int Id { get; set; }
        public int? LeadId { get; set; }
        public int? LeadTypeId { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
