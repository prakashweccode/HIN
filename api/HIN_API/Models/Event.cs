using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Event
    {
        [Key]
        public int Id { get; set; }
        [StringLength(200)]
        public string EventName { get; set; }
        [StringLength(50)]
        public string EventNumber { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? EventFunnelStatus { get; set; }
        [StringLength(50)]
        public string PatientNumber { get; set; }
        [StringLength(200)]
        public string PatientName { get; set; }
        public int? EventType { get; set; }
        public int? SecurityGroupId { get; set; }
        public string Remarks { get; set; }
        public int? Owner { get; set; }
        public int? StatusId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        [StringLength(50)]
        public string Color { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EventCreated { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EventClosedDate { get; set; }
        public int? PracticeId { get; set; }
        public int? PatientBatchNumber { get; set; }
        public int? PaperworkCompletion { get; set; }
        [StringLength(50)]
        public string CaseNumber { get; set; }
    }
}
