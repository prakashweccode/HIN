using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class VwEvent
    {
        public int Id { get; set; }
        [StringLength(200)]
        public string EventName { get; set; }
        [StringLength(50)]
        public string EventNumber { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
    }
}
