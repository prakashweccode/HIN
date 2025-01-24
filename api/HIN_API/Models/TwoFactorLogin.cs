using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class TwoFactorLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string TwoFactorCode { get; set; }
        public string Token { get; set; }
    }
}
