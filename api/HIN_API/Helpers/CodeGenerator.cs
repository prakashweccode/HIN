using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace HIN_API.Helpers
{
    public static class CodeGenerator
    {
        private static readonly Regex regex = new Regex("[^0-9]");
        public static string VerificationCodeGenerator()
        {
            Guid objGuid = Guid.NewGuid();
            string code = regex.Replace(objGuid.ToString(), string.Empty).Substring(0, 6);
            return code;
        }
    }
    public enum LeadGenType
    {
        Lead = 1,
        Deal = 2,
        Organization = 3,
        Vendor = 4,
        Contact = 5,
        Partner = 6,
        Referral = 7
    }
}
