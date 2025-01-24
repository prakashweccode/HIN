using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class PipelineGroup
    {
        public PipelineGroup()
        {
            FunnelUserList = new HashSet<FunnelUserList>();
        }

        [Key]
        public int PipelineGroupId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public bool? IsDefault { get; set; }
        public int? PipelineGroupType { get; set; }

        [ForeignKey(nameof(PipelineGroupType))]
        [InverseProperty("PipelineGroup")]
        public virtual PipelineGroupType PipelineGroupTypeNavigation { get; set; }
        [InverseProperty("Funnel")]
        public virtual ICollection<FunnelUserList> FunnelUserList { get; set; }
    }
}
