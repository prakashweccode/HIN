using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    [Table("K9ERPSetting")]
    public partial class K9erpsetting
    {
        [Key]
        public int Id { get; set; }
        [Column("ERPCompanyName")]
        [StringLength(250)]
        public string ErpcompanyName { get; set; }
        [Column("ERPPassword")]
        [StringLength(250)]
        public string Erppassword { get; set; }
        [Column("ERPName")]
        [StringLength(250)]
        public string Erpname { get; set; }
    }
}
