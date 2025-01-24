using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class StepTypes
    {
        public StepTypes()
        {
            DealContact = new HashSet<DealContact>();
            DealContactNextStep = new HashSet<DealContactNextStep>();
            StepsContact = new HashSet<StepsContact>();
            StepsContactNextStep = new HashSet<StepsContactNextStep>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }

        [InverseProperty("StepType")]
        public virtual ICollection<DealContact> DealContact { get; set; }
        [InverseProperty("StepType")]
        public virtual ICollection<DealContactNextStep> DealContactNextStep { get; set; }
        [InverseProperty("StepType")]
        public virtual ICollection<StepsContact> StepsContact { get; set; }
        [InverseProperty("StepType")]
        public virtual ICollection<StepsContactNextStep> StepsContactNextStep { get; set; }
    }
}
