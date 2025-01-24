using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Organization
    {
        [Key]
        public int Id { get; set; }
        public int? LeadId { get; set; }
        public string Name { get; set; }
        public int? LabelId { get; set; }
        public string Address { get; set; }
        public string Website { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }
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

        [ForeignKey(nameof(LabelId))]
        [InverseProperty(nameof(LabelType.Organization))]
        public virtual LabelType Label { get; set; }
    }
}
