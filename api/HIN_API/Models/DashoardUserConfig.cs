using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class DashoardUserConfig
    {
        public DashoardUserConfig()
        {
            DashBoardQueries = new HashSet<DashBoardQueries>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        public string Query { get; set; }
        public bool? Inactive { get; set; }
        public int? UserId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? CreatedOn { get; set; }
        [Column(TypeName = "date")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }

        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.DashboardUserConfig))]
        public virtual Users User { get; set; }
        [InverseProperty("DashboardUserConfig")]
        public virtual ICollection<DashBoardQueries> DashBoardQueries { get; set; }
    }
}
