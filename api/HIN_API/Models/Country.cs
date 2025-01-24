using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Country
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(5)]
        public string SortName { get; set; }
        [Required]
        public string Name { get; set; }
        public int PhoneCode { get; set; }
    }
}
