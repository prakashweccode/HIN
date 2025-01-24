using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class ForgotPassword
    {
        public string EmailId { get; set; }
        public string Token { get; set; }
    }
}
