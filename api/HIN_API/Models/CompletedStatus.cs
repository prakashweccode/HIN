using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CompletedStatus
    {
        public CompletedStatus()
        {
            DealContact = new HashSet<DealContact>();
            StepsContact = new HashSet<StepsContact>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }

        [InverseProperty("CompletedStatus")]
        public virtual ICollection<DealContact> DealContact { get; set; }
        [InverseProperty("CompletedStatus")]
        public virtual ICollection<StepsContact> StepsContact { get; set; }
    }
}
