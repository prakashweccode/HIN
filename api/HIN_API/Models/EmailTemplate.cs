using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EmailTemplate
    {
        [Key]
        public int TemplateId { get; set; }
        [StringLength(150)]
        public string TemplateName { get; set; }
        [Column("TemplateHTML")]
        public string TemplateHtml { get; set; }
        [Column("TemplateJSON")]
        public string TemplateJson { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
    }
}
