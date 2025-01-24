using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EntityListOptions
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        [StringLength(150)]
        public string Title { get; set; }
        public int? Type { get; set; }
        public bool? Inactive { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        public int? CreatedById { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        public int? UpdatedById { get; set; }
    }
}
