using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ReferralFee
    {
        public ReferralFee()
        {
            Partner = new HashSet<Partner>();
            Referral = new HashSet<Referral>();
            Vendor = new HashSet<Vendor>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }

        [InverseProperty("ReferralFee")]
        public virtual ICollection<Partner> Partner { get; set; }
        [InverseProperty("ReferralFee")]
        public virtual ICollection<Referral> Referral { get; set; }
        [InverseProperty("ReferralFee")]
        public virtual ICollection<Vendor> Vendor { get; set; }
    }
}
