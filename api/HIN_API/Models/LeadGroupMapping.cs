using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LeadGroupMapping
    {
        [Key]
        public int Id { get; set; }
        public int? LeadId { get; set; }
        public int? GroupId { get; set; }

        [ForeignKey(nameof(GroupId))]
        [InverseProperty(nameof(UserGroups.LeadGroupMapping))]
        public virtual UserGroups Group { get; set; }
        [ForeignKey(nameof(LeadId))]
        [InverseProperty("LeadGroupMapping")]
        public virtual Lead Lead { get; set; }
    }
}
