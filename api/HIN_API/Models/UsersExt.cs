using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class UsersExt:Users
    {
        [Key]
        public new int UserId { get; set; }
    }
}
