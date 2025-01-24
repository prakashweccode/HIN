using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Group
    {
        public Group()
        {
            ContactGroup = new HashSet<ContactGroup>();
            ContactInformation = new HashSet<ContactInformation>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string GroupName { get; set; }
        public bool? Inactive { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }

        [InverseProperty("Group")]
        public virtual ICollection<ContactGroup> ContactGroup { get; set; }
        [InverseProperty("ContactGroupNavigation")]
        public virtual ICollection<ContactInformation> ContactInformation { get; set; }
    }
}
