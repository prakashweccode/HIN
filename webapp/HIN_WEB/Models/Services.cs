using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Services
    {
        public int Id { get; set; }
        public string ServiceNumber { get; set; }
        public string ServiceName { get; set; }
        public int? Type { get; set; }
        public int? StatusId { get; set; }
        public int? AssignedTo { get; set; }
        public int? Owner { get; set; }
        public string Color { get; set; }
        public int? SecurityGroup { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public int? CancelReason { get; set; }
        public string Remarks { get; set; }
        public int? LeadId { get; set; }
        public decimal? Percentage { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Zipcode { get; set; }
        public string Website { get; set; }
        public string ApplicationNeeded { get; set; }
        public string ApplicationRequirements { get; set; }
        public string ApplicationRemarks { get; set; }
        public decimal? ExpectedCost { get; set; }
        public decimal? ActualCost { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public int? ProrityId { get; set; }
        public int? TicketTypeId { get; set; }
        public int? SubIssueTypeId { get; set; }
        public int? DealId { get; set; }
        public int? EventId { get; set; }
    }
}
