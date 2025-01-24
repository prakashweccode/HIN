using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class FunnelUserList
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? FunnelId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(150)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "date")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(150)]
        public string UpdatedBy { get; set; }

        [ForeignKey(nameof(FunnelId))]
        [InverseProperty(nameof(PipelineGroup.FunnelUserList))]
        public virtual PipelineGroup Funnel { get; set; }
    }
}
