using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class NetworkingEventMeet
    {
        public NetworkingEventMeet()
        {
            Networking = new HashSet<Networking>();
        }

        [Key]
        public int Id { get; set; }
        [Column(TypeName = "date")]
        public DateTime? YearlyDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? MonthlyDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? WeeklyDate { get; set; }
        public TimeSpan? YearlyTime { get; set; }
        public TimeSpan? MonthlyTime { get; set; }
        public TimeSpan? WeeklyTime { get; set; }
        public string Notes { get; set; }
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

        [InverseProperty("EventMeet")]
        public virtual ICollection<Networking> Networking { get; set; }
    }
}
