using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LeadGenEntityType
    {
        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string EntityType { get; set; }
        public string Description { get; set; }
        [StringLength(40)]
        public string UserPermissionParentId { get; set; }
        public bool? IsShowScreen { get; set; }
    }
}
