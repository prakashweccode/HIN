using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class PaymentTermsDropdown
    {
        public PaymentTermsDropdown()
        {
            Quote = new HashSet<Quote>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [InverseProperty("PaymentTermsNavigation")]
        public virtual ICollection<Quote> Quote { get; set; }
    }
}
