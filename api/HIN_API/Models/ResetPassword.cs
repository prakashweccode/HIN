using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class ResetPassword
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
