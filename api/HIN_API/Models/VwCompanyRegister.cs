using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class VwCompanyRegister
    {
        public int RegisterId { get; set; }
        public string CompanyName { get; set; }
        [StringLength(256)]
        public string Email { get; set; }
    }
}
