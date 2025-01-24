using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ContactInformationEmailMapping
    {
        [Key]
        public int Id { get; set; }
        public int? ContactInformationId { get; set; }
        public string Email { get; set; }

        [ForeignKey(nameof(ContactInformationId))]
        [InverseProperty("ContactInformationEmailMapping")]
        public virtual ContactInformation ContactInformation { get; set; }
    }
}
