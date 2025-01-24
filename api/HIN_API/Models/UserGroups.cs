using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserGroups
    {
        public UserGroups()
        {
            Deal = new HashSet<Deal>();
            Lead = new HashSet<Lead>();
            LeadGroupMapping = new HashSet<LeadGroupMapping>();
            Partner = new HashSet<Partner>();
            Referral = new HashSet<Referral>();
            UserGroupMapping = new HashSet<UserGroupMapping>();
            Users = new HashSet<Users>();
            Vendor = new HashSet<Vendor>();
        }

        [Key]
        public int UserGroupId { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        [StringLength(256)]
        public string Description { get; set; }
        public bool? IsActive { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }

        [InverseProperty("SecurityGroup")]
        public virtual ICollection<Deal> Deal { get; set; }
        [InverseProperty("SecurityGroup")]
        public virtual ICollection<Lead> Lead { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<LeadGroupMapping> LeadGroupMapping { get; set; }
        [InverseProperty("SecurityGroup")]
        public virtual ICollection<Partner> Partner { get; set; }
        [InverseProperty("SecurityGroup")]
        public virtual ICollection<Referral> Referral { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<UserGroupMapping> UserGroupMapping { get; set; }
        [InverseProperty("Group")]
        public virtual ICollection<Users> Users { get; set; }
        [InverseProperty("SecurityGroup")]
        public virtual ICollection<Vendor> Vendor { get; set; }
    }
}
