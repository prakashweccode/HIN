using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class DashBoardQueries
    {
        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string FieldName { get; set; }
        [StringLength(150)]
        public string CriteriaName { get; set; }
        [StringLength(250)]
        public string FromValue { get; set; }
        [StringLength(250)]
        public string ToValue { get; set; }
        [StringLength(100)]
        public string FieldType { get; set; }
        public int? DashboardConfigId { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }

        [ForeignKey(nameof(DashboardConfigId))]
        [InverseProperty(nameof(DashboardUserConfig.DashBoardQueries))]
        public virtual DashboardUserConfig DashboardConfig { get; set; }
    }
}
