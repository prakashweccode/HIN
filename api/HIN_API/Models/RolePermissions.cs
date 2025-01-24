﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class RolePermissions
    {
        [Key]
        public int Id { get; set; }
        public int PermissionId { get; set; }
        public int RoleId { get; set; }
        public bool? IsEnabled { get; set; }

        [ForeignKey(nameof(PermissionId))]
        [InverseProperty(nameof(Permissions.RolePermissions))]
        public virtual Permissions Permission { get; set; }
        [ForeignKey(nameof(RoleId))]
        [InverseProperty(nameof(Roles.RolePermissions))]
        public virtual Roles Role { get; set; }
    }
}
