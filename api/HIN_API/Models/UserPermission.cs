using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class UserPermission
    {
        [StringLength(20)]
        public string Parent { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(20)]
        public string IdHtml { get; set; }
        public bool? IsMenuEntry { get; set; }
        [StringLength(100)]
        public string UrlPath { get; set; }
        public int? MenuOrder { get; set; }
        [Key]
        [StringLength(40)]
        public string Id { get; set; }
        public string UrlPathForm { get; set; }
    }
}
