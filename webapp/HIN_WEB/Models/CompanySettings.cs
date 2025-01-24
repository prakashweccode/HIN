using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class CompanySettings
    {
        public int Id { get; set; }
        public int? CompanyId { get; set; }
        public int? SettingsId { get; set; }
        public string Value { get; set; }
    }
}
