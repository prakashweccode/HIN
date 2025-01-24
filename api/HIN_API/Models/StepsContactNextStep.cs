using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class StepsContactNextStep
    {
        [Key]
        public int Id { get; set; }
        public int? ContactId { get; set; }
        [StringLength(200)]
        public string ContactName { get; set; }
        public int? CalendarInviteType { get; set; }
        [StringLength(200)]
        public string ZoomId { get; set; }
        [StringLength(50)]
        public string CellNumber { get; set; }
        [StringLength(250)]
        public string Email { get; set; }
        [StringLength(50)]
        public string OfficeNumber { get; set; }
        public int? AssignedTo { get; set; }
        public string Notes { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateTime { get; set; }
        public string ContactTitle { get; set; }
        public int? StepTypeId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        public int? StatusId { get; set; }
        public int? Salesman { get; set; }
        public int? StepsContactId { get; set; }
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

        [ForeignKey(nameof(CalendarInviteType))]
        [InverseProperty(nameof(ChooseMethod.StepsContactNextStep))]
        public virtual ChooseMethod CalendarInviteTypeNavigation { get; set; }
        [ForeignKey(nameof(ContactId))]
        [InverseProperty(nameof(ContactInformation.StepsContactNextStep))]
        public virtual ContactInformation Contact { get; set; }
        [ForeignKey(nameof(StepTypeId))]
        [InverseProperty(nameof(StepTypes.StepsContactNextStep))]
        public virtual StepTypes StepType { get; set; }
        [ForeignKey(nameof(StepsContactId))]
        [InverseProperty("StepsContactNextStep")]
        public virtual StepsContact StepsContact { get; set; }
    }
}
