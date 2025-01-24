using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class TwoFactorType
    {
        public TwoFactorType()
        {
            Users = new HashSet<Users>();
        }

        [Key]
        public int TwoFactorId { get; set; }
        [StringLength(50)]
        public string TwoFactorName { get; set; }
        public bool? Status { get; set; }

        [InverseProperty("TwoFactorTypeNavigation")]
        public virtual ICollection<Users> Users { get; set; }
    }
}
