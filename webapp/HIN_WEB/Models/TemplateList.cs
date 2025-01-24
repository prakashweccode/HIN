using System.ComponentModel.DataAnnotations;

namespace HIN_WEB.Models
{
    public class TemplateList
    {
        public int Id { get; set; }
        public string TemplateName { get; set; }
        public string TemplateHtml { get; set; }
    }
}
