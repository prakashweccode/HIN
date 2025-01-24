using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class EmployeeType
    {
        public EmployeeType()
        {
            Users = new HashSet<Users>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(150)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }

        [InverseProperty("EmployeeType")]
        public virtual ICollection<Users> Users { get; set; }
    }
}
