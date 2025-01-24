using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class CompanySettings
    {
        [Key]
        public int Id { get; set; }
        public int? CompanyId { get; set; }
        public int? SettingsId { get; set; }
        [StringLength(150)]
        public string Value { get; set; }

        [ForeignKey(nameof(CompanyId))]
        [InverseProperty(nameof(CompanyRegister.CompanySettings))]
        public virtual CompanyRegister Company { get; set; }
        [ForeignKey(nameof(SettingsId))]
        [InverseProperty("CompanySettings")]
        public virtual Settings Settings { get; set; }
    }
}
