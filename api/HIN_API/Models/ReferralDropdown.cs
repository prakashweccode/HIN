using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ReferralDropdown
    {
        public ReferralDropdown()
        {
            Partner = new HashSet<Partner>();
            Referral = new HashSet<Referral>();
            Vendor = new HashSet<Vendor>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [InverseProperty("ReferralDropdown")]
        public virtual ICollection<Partner> Partner { get; set; }
        [InverseProperty("ReferralDropdown")]
        public virtual ICollection<Referral> Referral { get; set; }
        [InverseProperty("ReferralDropdown")]
        public virtual ICollection<Vendor> Vendor { get; set; }
    }
}
