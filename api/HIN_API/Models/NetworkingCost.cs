using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class NetworkingCost
    {
        public NetworkingCost()
        {
            Networking = new HashSet<Networking>();
        }

        [Key]
        public int NetworkingCostId { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? Yearly { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? Monthly { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? Weekly { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? PerEvent { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal? TravelCost { get; set; }
        [StringLength(500)]
        public string YearlyNote { get; set; }
        [StringLength(500)]
        public string MonthlyNote { get; set; }
        [StringLength(500)]
        public string WeeklyNote { get; set; }
        [StringLength(500)]
        public string PerEventNote { get; set; }
        [StringLength(500)]
        public string TravelCostNote { get; set; }
        [StringLength(500)]
        public string Note { get; set; }
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

        [InverseProperty("Cost")]
        public virtual ICollection<Networking> Networking { get; set; }
    }
}
