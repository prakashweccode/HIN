using System;
using System.Collections.Generic;

namespace HIN_WEB.Models
{
    public partial class Days
    {
        public int Id { get; set; }
        public string DayName { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
