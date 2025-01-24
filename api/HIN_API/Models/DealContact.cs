using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class DealContact
    {
        public DealContact()
        {
            DealContactNextStep = new HashSet<DealContactNextStep>();
            MaterialCost = new HashSet<MaterialCost>();
            TimeCost = new HashSet<TimeCost>();
        }

        [Key]
        public int Id { get; set; }
        public int? DealId { get; set; }
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
        public int? QuickNotes { get; set; }
        public string Other { get; set; }

        [ForeignKey(nameof(CalendarInviteType))]
        [InverseProperty(nameof(ChooseMethod.DealContact))]
        public virtual ChooseMethod CalendarInviteTypeNavigation { get; set; }
        [ForeignKey(nameof(CompletedStatusId))]
        [InverseProperty("DealContact")]
        public virtual CompletedStatus CompletedStatus { get; set; }
        [ForeignKey(nameof(ContactId))]
        [InverseProperty(nameof(ContactInformation.DealContact))]
        public virtual ContactInformation Contact { get; set; }
        [ForeignKey(nameof(StepTypeId))]
        [InverseProperty(nameof(StepTypes.DealContact))]
        public virtual StepTypes StepType { get; set; }
        [InverseProperty("DealContact")]
        public virtual ICollection<DealContactNextStep> DealContactNextStep { get; set; }
        [InverseProperty("DealContact")]
        public virtual ICollection<MaterialCost> MaterialCost { get; set; }
        [InverseProperty("DealContact")]
        public virtual ICollection<TimeCost> TimeCost { get; set; }
    }
}
