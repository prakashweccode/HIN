using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Todo
    {
        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string TodoName { get; set; }
        [StringLength(250)]
        public string Subject { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndDate { get; set; }
        [StringLength(20)]
        public string Color { get; set; }
        public int? VendorId { get; set; }
        public int? AssignedTo { get; set; }
        public int? CompletedBy { get; set; }
        public string Notes { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public bool? IsRecurrence { get; set; }
        public int? RecurrenceId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? ImportanceId { get; set; }
        public string LocationTitle { get; set; }
        public int? EntityTypeId { get; set; }
        public int? EntityId { get; set; }
        public int? SecurityGroupId { get; set; }
        [StringLength(50)]
        public string TodoNumber { get; set; }
        public bool? IsDone { get; set; }
        public bool? IsCopied { get; set; }

        [ForeignKey(nameof(AssignedTo))]
        [InverseProperty(nameof(Users.Todo))]
        public virtual Users AssignedToNavigation { get; set; }
        [ForeignKey(nameof(ImportanceId))]
        [InverseProperty("Todo")]
        public virtual Importance Importance { get; set; }
        [ForeignKey(nameof(RecurrenceId))]
        [InverseProperty("Todo")]
        public virtual Recurrence Recurrence { get; set; }
        [ForeignKey(nameof(VendorId))]
        [InverseProperty("Todo")]
        public virtual Vendor Vendor { get; set; }
    }
}
