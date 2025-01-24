using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EventCost
    {
        [Key]
        public int Id { get; set; }
        public int? EventId { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? Travel { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? Show { get; set; }
        public string Notes { get; set; }
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

        [ForeignKey(nameof(EventId))]
        [InverseProperty(nameof(EventShow.EventCost))]
        public virtual EventShow Event { get; set; }
    }
}
