using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Template
    {
        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string PatientName { get; set; }
        public int? AppointmentId { get; set; }
        [StringLength(25)]
        public string Sex { get; set; }
        [StringLength(25)]
        public string Age { get; set; }
        public string ChiefCompliant { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Date { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateOfAccident { get; set; }
        public string HistoryOfIllness { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? TemplateId { get; set; }
        public string DraftHtml { get; set; }
        public int? Status { get; set; }
    }
}
