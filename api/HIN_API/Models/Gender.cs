using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Gender
    {
        [Key]
        public int GenderId { get; set; }
        [StringLength(50)]
        public string GenderName { get; set; }
    }
}
