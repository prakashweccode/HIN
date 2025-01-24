using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class DashboardConfigFields
    {
        public int Id { get; set; }
        public string FieldName { get; set; }
        public string Type { get; set; }
        public bool? Inactive { get; set; }
        public int? Entity { get; set; }
    }
}
