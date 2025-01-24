using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class ServiceStatus
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
