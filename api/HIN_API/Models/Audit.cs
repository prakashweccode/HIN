using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Audit
    {
        [Key]
        public int AuditId { get; set; }
        public int KeyId { get; set; }
        [StringLength(100)]
        public string TableName { get; set; }
        [StringLength(150)]
        public string KeyValues { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? AuditDate { get; set; }
        public string OldValues { get; set; }
        public string NewValues { get; set; }
        [StringLength(75)]
        public string UpdatedBy { get; set; }
    }
}
