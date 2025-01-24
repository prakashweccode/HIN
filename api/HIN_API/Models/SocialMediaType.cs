using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class SocialMediaType
    {
        public SocialMediaType()
        {
            Lead = new HashSet<Lead>();
            Partner = new HashSet<Partner>();
            Referral = new HashSet<Referral>();
            Vendor = new HashSet<Vendor>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [InverseProperty("SocialMedia")]
        public virtual ICollection<Lead> Lead { get; set; }
        [InverseProperty("SocialMedia")]
        public virtual ICollection<Partner> Partner { get; set; }
        [InverseProperty("SocialMedia")]
        public virtual ICollection<Referral> Referral { get; set; }
        [InverseProperty("SocialMedia")]
        public virtual ICollection<Vendor> Vendor { get; set; }
    }
}
