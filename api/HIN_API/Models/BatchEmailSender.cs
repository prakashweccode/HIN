using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class BatchEmailSender
    {
        public int? TemplateId { get; set; }
        public List<ContactInformation> Contacts { get; set; }
        public string ContentHtml { get; set; }
        public string Subject { get; set; }
        public List<Group> Groups { get; set; }
    }
}
