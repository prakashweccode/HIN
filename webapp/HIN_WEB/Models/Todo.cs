using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string TodoName { get; set; }
        public string Subject { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Color { get; set; }
        public int? VendorId { get; set; }
        public int? AssignedTo { get; set; }
        public int? CompletedBy { get; set; }
        public string Notes { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? RecurrenceId { get; set; }
        public bool? IsRecurrence { get; set; }
        public int? ImportanceId { get; set; }
        public string LocationTitle { get; set; }
        public int? EntityTypeId { get; set; }
        public int? EntityId { get; set; }
        public int? SecurityGroupId { get; set; }
        public string TodoNumber { get; set; }
        public bool? IsDone { get; set; }
    }
}
