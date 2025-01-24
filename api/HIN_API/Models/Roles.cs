using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Roles
    {
        public Roles()
        {
            RolePermissions = new HashSet<RolePermissions>();
            Users = new HashSet<Users>();
        }

        [Key]
        public int RoleId { get; set; }
        [StringLength(50)]
        public string RoleName { get; set; }
        public bool? Status { get; set; }

        [InverseProperty("Role")]
        public virtual ICollection<RolePermissions> RolePermissions { get; set; }
        [InverseProperty("Role")]
        public virtual ICollection<Users> Users { get; set; }
    }
}
