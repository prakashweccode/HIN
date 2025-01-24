using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    [Table("k9ErpEntityDocSync")]
    public partial class K9ErpEntityDocSync
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("K9ErpId")]
        public int K9erpId { get; set; }
        [Column("K9LeadId")]
        public int K9leadId { get; set; }
        [Column("type")]
        public int Type { get; set; }
        [Required]
        [Column("category")]
        [StringLength(20)]
        public string Category { get; set; }
        [Column("status")]
        public int? Status { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
