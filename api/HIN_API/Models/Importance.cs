using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Importance
    {
        public Importance()
        {
            Todo = new HashSet<Todo>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(250)]
        public string Name { get; set; }

        [InverseProperty("Importance")]
        public virtual ICollection<Todo> Todo { get; set; }
    }
}
