using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Settings
    {
        public Settings()
        {
            CompanySettings = new HashSet<CompanySettings>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        [StringLength(150)]
        public string Type { get; set; }

        [InverseProperty("Settings")]
        public virtual ICollection<CompanySettings> CompanySettings { get; set; }
    }
}
