using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    [Table("CompanyEFileConfig")]
    public partial class CompanyEfileConfig
    {
        [Key]
        public int Id { get; set; }
        public int? CompanyId { get; set; }
        [StringLength(256)]
        public string HostName { get; set; }
        [StringLength(50)]
        public string GrantType { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        [StringLength(256)]
        public string Username { get; set; }
        public string Password { get; set; }
        [StringLength(256)]
        public string Domain { get; set; }
        public string Token { get; set; }

        [ForeignKey(nameof(CompanyId))]
        [InverseProperty(nameof(CompanyRegister.CompanyEfileConfig))]
        public virtual CompanyRegister Company { get; set; }
    }
}
