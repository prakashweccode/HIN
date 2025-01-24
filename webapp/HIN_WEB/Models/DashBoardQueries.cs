using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class DashBoardQueries
    {
        public int Id { get; set; }
        public string FieldName { get; set; }
        public string CriteriaName { get; set; }
        public string FromValue { get; set; }
        public string ToValue { get; set; }
        public string FieldType { get; set; }
        public int? DashboardConfigId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }
    }
}
