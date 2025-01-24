using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserGroupMapping
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? GroupId { get; set; }

        [ForeignKey(nameof(GroupId))]
        [InverseProperty(nameof(UserGroups.UserGroupMapping))]
        public virtual UserGroups Group { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserGroupMapping))]
        public virtual Users User { get; set; }
    }
}
