using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EmailHistory
    {
        [Key]
        public int EmailId { get; set; }
        [StringLength(250)]
        public string EmailFrom { get; set; }
        [StringLength(250)]
        public string EmailTo { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        [Column("EmailCC")]
        [StringLength(250)]
        public string EmailCc { get; set; }
    }
}
