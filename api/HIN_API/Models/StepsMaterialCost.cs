using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class StepsMaterialCost
    {
        public StepsMaterialCost()
        {
            StepsContact = new HashSet<StepsContact>();
        }

        [Key]
        public int MaterialCostId { get; set; }
        public string Product { get; set; }
        public int? Quantity { get; set; }
        public int? Price { get; set; }
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

        [InverseProperty("StepsMaterialCost")]
        public virtual ICollection<StepsContact> StepsContact { get; set; }
    }
}
