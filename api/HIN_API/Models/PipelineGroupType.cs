using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class PipelineGroupType
    {
        public PipelineGroupType()
        {
            PipelineGroup = new HashSet<PipelineGroup>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Name { get; set; }

        [InverseProperty("PipelineGroupTypeNavigation")]
        public virtual ICollection<PipelineGroup> PipelineGroup { get; set; }
    }
}
