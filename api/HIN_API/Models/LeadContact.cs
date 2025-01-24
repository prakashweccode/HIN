using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class LeadContact
    {
        [Key]
        public int Id { get; set; }
        public int? LeadId { get; set; }
        public int? ContactId { get; set; }
        [StringLength(200)]
        public string ContactName { get; set; }
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

        [ForeignKey(nameof(ContactId))]
        [InverseProperty(nameof(ContactInformation.LeadContact))]
        public virtual ContactInformation Contact { get; set; }
        [ForeignKey(nameof(LeadId))]
        [InverseProperty("LeadContact")]
        public virtual Lead Lead { get; set; }
    }
}
