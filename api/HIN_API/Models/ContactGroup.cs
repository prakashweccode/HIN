using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ContactGroup
    {
        [Key]
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public int? ContactId { get; set; }

        [ForeignKey(nameof(ContactId))]
        [InverseProperty(nameof(ContactInformation.ContactGroup))]
        public virtual ContactInformation Contact { get; set; }
        [ForeignKey(nameof(GroupId))]
        [InverseProperty("ContactGroup")]
        public virtual Group Group { get; set; }
    }
}
