using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class TemplateList
    {
        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string TemplateName { get; set; }
        public string TemplateHtml { get; set; }
        public string TemplatePage { get; set; }
    }
}
