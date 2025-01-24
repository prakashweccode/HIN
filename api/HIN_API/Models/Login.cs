using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class Login
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool? IsMicrosoftAuth { get; set; }
    }
    public class TwoFactor
    {
        public Login Login { get; set; }
        public string AccessCode { get; set; }
    }
    
    public class UserDetail
    {
        public Users User { get; set; }
        public JArray Permissions { get; set; }
        public bool? isValid { get; set; }
        public string Token { get; set; }
    }
}
