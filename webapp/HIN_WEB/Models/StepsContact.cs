using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class StepsContact
    {
        public int Id { get; set; }
        public int? EntityId { get; set; }
        public int? EntityTypeId { get; set; }
        public int? ContactId { get; set; }
        public string ContactName { get; set; }
        public int? CalendarInviteType { get; set; }
        public string ZoomId { get; set; }
        public string CellNumber { get; set; }
        public string OfficeNumber { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Email { get; set; }
        public int? AssignedTo { get; set; }
        public int? SalesMan { get; set; }
        public string Notes { get; set; }
        public string ContactTitle { get; set; }
        public int? CompletedStatusId { get; set; }
        public int? StepsTimeCostId { get; set; }
        public int? StepsMaterialCostId { get; set; }
        public string Color { get; set; }
        public int? StepTypeId { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
