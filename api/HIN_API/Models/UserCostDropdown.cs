using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserCostDropdown
    {
        public UserCostDropdown()
        {
            UserCost = new HashSet<UserCost>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [InverseProperty("UserCostDropdown")]
        public virtual ICollection<UserCost> UserCost { get; set; }
    }
}
