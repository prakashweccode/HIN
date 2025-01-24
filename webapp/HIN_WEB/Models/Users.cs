using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public string Name { get { return FirstName + " " + LastName; } }
        public string Email { get; set; }
        public bool? IsEmailConfirmed { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public long? PhoneNumber { get; set; }
        public bool? IsPhoneNumberVerified { get; set; }
        public int? AccessFailedCount { get; set; }
        public bool? IsLocked { get; set; }
        public bool? IsTwoFactorEnabled { get; set; }
        public string TwoFactorCode { get; set; }
        public DateTime? TwoFactorExpiryTime { get; set; }
        public int? TwoFactorType { get; set; }
        public int? RoleId { get; set; }
        public bool? IsActive { get; set; }
        public long? CellNumber { get; set; }
        public long? CostPerHour { get; set; }
        public string Skills { get; set; }
        public int? GroupId { get; set; }
        public string UserTheme { get; set; }
        public int? EmployeeTypeId { get; set; }
        public int? CountryId { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? Commission { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public int? StateId { get; set; }
        public string Country { get; set; }
        public int? CityId { get; set; }
        public bool? IsSales { get; set; }
        public bool? IsAdmin { get; set; }
        public string AboutMe { get; set; }
        public string EmailSignature { get; set; }
        public string AdminPassword { get; set; }
        public string ImageUrl { get; set; }
        public string GmailUserName { get; set; }
        public string GmailPassword { get; set; }
        public string Signature { get; set; }
    }

}
