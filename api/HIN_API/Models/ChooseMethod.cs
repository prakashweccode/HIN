using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ChooseMethod
    {
        public ChooseMethod()
        {
            DealContact = new HashSet<DealContact>();
            DealContactNextStep = new HashSet<DealContactNextStep>();
            StepsContact = new HashSet<StepsContact>();
            StepsContactNextStep = new HashSet<StepsContactNextStep>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }

        [InverseProperty("CalendarInviteTypeNavigation")]
        public virtual ICollection<DealContact> DealContact { get; set; }
        [InverseProperty("CalendarInviteTypeNavigation")]
        public virtual ICollection<DealContactNextStep> DealContactNextStep { get; set; }
        [InverseProperty("CalendarInviteTypeNavigation")]
        public virtual ICollection<StepsContact> StepsContact { get; set; }
        [InverseProperty("CalendarInviteTypeNavigation")]
        public virtual ICollection<StepsContactNextStep> StepsContactNextStep { get; set; }
    }
}
