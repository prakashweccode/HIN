using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ImportException
    {
        [Key]
        public int Id { get; set; }
        public int? RowNumber { get; set; }
        public string ErrorDescription { get; set; }
        [StringLength(50)]
        public string BatchNumber { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(100)]
        public string EntityName { get; set; }
        public string FileName { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
    }
}
