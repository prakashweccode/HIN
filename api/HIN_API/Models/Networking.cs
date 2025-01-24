using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Networking
    {
        [Key]
        public int NetworkingId { get; set; }
        [StringLength(150)]
        public string NetworkingName { get; set; }
        [StringLength(150)]
        public string NetworkingNumber { get; set; }
        [StringLength(150)]
        public string Address { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(50)]
        public string Zipcode { get; set; }
        [StringLength(150)]
        public string Website { get; set; }
        [StringLength(50)]
        public string Telephone { get; set; }
        [StringLength(150)]
        public string Fax { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        public bool? Inactive { get; set; }
        [StringLength(150)]
        public string Industry { get; set; }
        public int? CostId { get; set; }
        public int? EventMeetId { get; set; }
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

        [ForeignKey(nameof(CostId))]
        [InverseProperty(nameof(NetworkingCost.Networking))]
        public virtual NetworkingCost Cost { get; set; }
        [ForeignKey(nameof(EventMeetId))]
        [InverseProperty(nameof(NetworkingEventMeet.Networking))]
        public virtual NetworkingEventMeet EventMeet { get; set; }
    }
}
