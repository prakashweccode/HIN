using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Config
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        [StringLength(100)]
        public string Name { get; set; }
        [Column("description")]
        [StringLength(200)]
        public string Description { get; set; }
        [Column("value")]
        public string Value { get; set; }
        [Column("isProtected")]
        public bool? IsProtected { get; set; }
    }
}
