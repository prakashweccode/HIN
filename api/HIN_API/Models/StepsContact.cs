using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class StepsContact
    {
        public StepsContact()
        {
            StepsContactNextStep = new HashSet<StepsContactNextStep>();
        }

        [Key]
        public int Id { get; set; }
        public int? EntityId { get; set; }
        public int? EntityTypeId { get; set; }
        public int? ContactId { get; set; }
        [StringLength(200)]
        public string ContactName { get; set; }
        public int? CalendarInviteType { get; set; }
        [StringLength(200)]
        public string ZoomId { get; set; }
        [StringLength(50)]
        public string CellNumber { get; set; }
        [StringLength(50)]
        public string OfficeNumber { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndDate { get; set; }
        [StringLength(250)]
        public string Email { get; set; }
        public int? AssignedTo { get; set; }
        public int? SalesMan { get; set; }
        public string Notes { get; set; }
        public string ContactTitle { get; set; }
        public int? CompletedStatusId { get; set; }
        public int? StepsTimeCostId { get; set; }
        public int? StepsMaterialCostId { get; set; }
        [StringLength(50)]
        public string Color { get; set; }
        public int? StepTypeId { get; set; }
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
        [InverseProperty(nameof(ChooseMethod.StepsContact))]
        public virtual ChooseMethod CalendarInviteTypeNavigation { get; set; }
        [ForeignKey(nameof(CompletedStatusId))]
        [InverseProperty("StepsContact")]
        public virtual CompletedStatus CompletedStatus { get; set; }
        [ForeignKey(nameof(ContactId))]
        [InverseProperty(nameof(ContactInformation.StepsContact))]
        public virtual ContactInformation Contact { get; set; }
        [ForeignKey(nameof(StepTypeId))]
        [InverseProperty(nameof(StepTypes.StepsContact))]
        public virtual StepTypes StepType { get; set; }
        [ForeignKey(nameof(StepsMaterialCostId))]
        [InverseProperty("StepsContact")]
        public virtual StepsMaterialCost StepsMaterialCost { get; set; }
        [ForeignKey(nameof(StepsTimeCostId))]
        [InverseProperty("StepsContact")]
        public virtual StepsTimeCost StepsTimeCost { get; set; }
        [InverseProperty("StepsContact")]
        public virtual ICollection<StepsContactNextStep> StepsContactNextStep { get; set; }
    }
}
