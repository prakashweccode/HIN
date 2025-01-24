using System;

namespace HIN_WEB.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string EventNumber { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? EventFunnelStatus { get; set; }
        public string PatientNumber { get; set; }
        public string PatientName { get; set; }
        public int? EventType { get; set; }
        public int? SecurityGroupId { get; set; }
        public string Remarks { get; set; }
        public int? Owner { get; set; }
        public int? StatusId { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string Color { get; set; }
        public DateTime? EventCreated { get; set; }
        public DateTime? EventClosedDate { get; set; }
        public int? PracticeId { get; set; }
        public int? PatientBatchNumber { get; set; }
        public int? PaperworkCompletion { get; set; }
        public string CaseNumber { get; set; }

    }
}
