using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Services
    {
        [Key]
        public int Id { get; set; }
        [StringLength(20)]
        public string ServiceNumber { get; set; }
        [StringLength(150)]
        public string ServiceName { get; set; }
        public int? Type { get; set; }
        public int? StatusId { get; set; }
        public int? AssignedTo { get; set; }
        public int? Owner { get; set; }
        [StringLength(20)]
        public string Color { get; set; }
        public int? SecurityGroup { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? CancelReason { get; set; }
        public string Remarks { get; set; }
        public int? DealId { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? Percentage { get; set; }
        [StringLength(250)]
        public string Address { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        [StringLength(20)]
        public string Zipcode { get; set; }
        public string Website { get; set; }
        [StringLength(150)]
        public string ApplicationNeeded { get; set; }
        public string ApplicationRequirements { get; set; }
        public string ApplicationRemarks { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ExpectedCost { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? ActualCost { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(150)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(150)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public int? ProrityId { get; set; }
        public int? TicketTypeId { get; set; }
        public int? SubIssueTypeId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndDate { get; set; }
        public int? LeadId { get; set; }
        public int? EventId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ScheduleStart { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ScheduleEnd { get; set; }
        public int? RecurrenceId { get; set; }
        public bool? IsRecurrence { get; set; }
        public int? ScheduleHour { get; set; }
        public int? ScheduleMinute { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ServiceDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ServiceScheduleDate { get; set; }
        public bool? IsServiceCustom { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ServiceStartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ServiceEndDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? WindowDate { get; set; }
        public bool? IsWindowCustom { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? WindowStartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? ScheduleRemainderDate { get; set; }
        public TimeSpan? ScheduleRemainderTime { get; set; }

        [ForeignKey(nameof(AssignedTo))]
        [InverseProperty(nameof(Users.ServicesAssignedToNavigation))]
        public virtual Users AssignedToNavigation { get; set; }
        [ForeignKey(nameof(DealId))]
        [InverseProperty("Services")]
        public virtual Deal Deal { get; set; }
        [ForeignKey(nameof(LeadId))]
        [InverseProperty("Services")]
        public virtual Lead Lead { get; set; }
        [ForeignKey(nameof(Owner))]
        [InverseProperty(nameof(Users.ServicesOwnerNavigation))]
        public virtual Users OwnerNavigation { get; set; }
    }
}
