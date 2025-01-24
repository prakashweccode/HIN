using System;

namespace HIN_WEB.Models
{
    public class Template
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public int? AppointmentId { get; set; }
        public string Sex { get; set; }
        public string Age { get; set; }
        public string ChiefCompliant { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? DateOfAccident { get; set; }
        public string HistoryOfIllness { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? TemplateId { get; set; }
        public string DraftHtml { get; set; }
        public int? Status { get; set; }
    }
}
