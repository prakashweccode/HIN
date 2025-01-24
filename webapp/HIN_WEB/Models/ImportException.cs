using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class ImportException
    {
        public int Id { get; set; }
        public int? RowNumber { get; set; }
        public string ErrorDescription { get; set; }
        public string BatchNumber { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string EntityName { get; set; }
    }
}
