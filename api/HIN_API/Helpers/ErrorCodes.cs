using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace HIN_API.Helpers
{
    public static class EnumerationHelper
    {
        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];

            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }

            return value.ToString();
        }
    }
    public enum ErrorCodes
    {
        [Description("Required field validation failed")]
        RequiredValidation = 3001,
        [Description("Data entered is not valid")]
        InvalidData = 3002,
        [Description("Internal server error")]
        InternalError = 3003,
        [Description("Record not found")]
        NotFound = 3004,
        [Description("Invalid user request")]
        InvalidRequest = 3005,
        [Description("Invalid login attempt")]
        InvalidLogin = 3006,
        [Description("User is not active")]
        InactiveUser = 3007,
        [Description("Code entered is not valid")]
        InvalidCode = 3008,
        [Description("Service unavailable")]
        ServiceNotAvailable = 3009,
        [Description("User already exist")]
        UserExist = 3010,
        [Description("CodeExpired")]
        CodeExpired = 3011,
        [Description("Company is not active")]
        CompanyInactive = 3012,
        [Description("Maximum users exist")]
        MaximumUser = 3013
    }
    public enum TemplateStatus
    {
        Draft = 0,
        Sent = 1
    }
}
