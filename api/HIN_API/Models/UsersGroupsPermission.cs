using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UsersGroupsPermission
    {
        public int IdGroup { get; set; }
        [StringLength(20)]
        public string IdPermis { get; set; }
        public bool StatGrant { get; set; }
        public bool StatRead { get; set; }
        public bool StatHide { get; set; }
        [Key]
        public int Id { get; set; }
    }
}
