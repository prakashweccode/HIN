using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Permissions
    {
        public Permissions()
        {
            RolePermissions = new HashSet<RolePermissions>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        [StringLength(256)]
        public string Description { get; set; }
        public bool? IsActive { get; set; }

        [InverseProperty("Permission")]
        public virtual ICollection<RolePermissions> RolePermissions { get; set; }
    }
}
