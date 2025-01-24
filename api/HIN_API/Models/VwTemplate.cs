using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class VwTemplate
    {
        public int Id { get; set; }
        [StringLength(20)]
        public string AppointmentNumber { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        public int? Status { get; set; }
    }
}
