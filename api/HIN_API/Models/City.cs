using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class City
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int StateId { get; set; }
    }
}
