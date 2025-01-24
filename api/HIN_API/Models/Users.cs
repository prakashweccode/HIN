using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class Users
    {
        public Users()
        {
            DashboardChartMapping = new HashSet<DashboardChartMapping>();
            DashboardUserConfig = new HashSet<DashboardUserConfig>();
            HeaderChartMapping = new HashSet<HeaderChartMapping>();
            Lead = new HashSet<Lead>();
            ServicesAssignedToNavigation = new HashSet<Services>();
            ServicesOwnerNavigation = new HashSet<Services>();
            Todo = new HashSet<Todo>();
            UserCost = new HashSet<UserCost>();
            UserGoal = new HashSet<UserGoal>();
            UserGroupMapping = new HashSet<UserGroupMapping>();
            UserQuoteChartMapping = new HashSet<UserQuoteChartMapping>();
        }

        [Key]
        public int UserId { get; set; }
        [StringLength(256)]
        public string Email { get; set; }
        public bool? IsEmailConfirmed { get; set; }
        [StringLength(75)]
        public string FirstName { get; set; }
        [StringLength(75)]
        public string LastName { get; set; }
        [StringLength(100)]
        public string UserName { get; set; }
        public string Password { get; set; }
        public long? PhoneNumber { get; set; }
        public bool? IsPhoneNumberVerified { get; set; }
        public int? AccessFailedCount { get; set; }
        public bool? IsLocked { get; set; }
        public bool? IsTwoFactorEnabled { get; set; }
        [StringLength(100)]
        public string TwoFactorCode { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? TwoFactorExpiryTime { get; set; }
        public int? TwoFactorType { get; set; }
        public int? RoleId { get; set; }
        public bool? IsActive { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? LastLogin { get; set; }
        public long? CellNumber { get; set; }
        [StringLength(150)]
        public string Skills { get; set; }
        public long? CostPerHour { get; set; }
        public int? GroupId { get; set; }
        public string UserTheme { get; set; }
        public int? EmployeeTypeId { get; set; }
        public int? CountryId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(256)]
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedOn { get; set; }
        [StringLength(256)]
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? Commission { get; set; }
        public string Address { get; set; }
        [StringLength(150)]
        public string City { get; set; }
        [StringLength(150)]
        public string State { get; set; }
        [StringLength(10)]
        public string ZipCode { get; set; }
        public int? StateId { get; set; }
        [StringLength(150)]
        public string Country { get; set; }
        public int? CityId { get; set; }
        public bool? IsSales { get; set; }
        public bool? IsAdmin { get; set; }
        public string AboutMe { get; set; }
        public string EmailSignature { get; set; }
        [StringLength(50)]
        public string AdminPassword { get; set; }
        [Column("ImageURL")]
        public string ImageUrl { get; set; }
        [StringLength(256)]
        public string GmailUserName { get; set; }
        public string GmailPassword { get; set; }
        public int? BranchId { get; set; }
        public string Signature { get; set; }

        [ForeignKey(nameof(EmployeeTypeId))]
        [InverseProperty("Users")]
        public virtual EmployeeType EmployeeType { get; set; }
        [ForeignKey(nameof(GroupId))]
        [InverseProperty(nameof(UserGroups.Users))]
        public virtual UserGroups Group { get; set; }
        [ForeignKey(nameof(RoleId))]
        [InverseProperty(nameof(Roles.Users))]
        public virtual Roles Role { get; set; }
        [ForeignKey(nameof(TwoFactorType))]
        [InverseProperty("Users")]
        public virtual TwoFactorType TwoFactorTypeNavigation { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<DashboardChartMapping> DashboardChartMapping { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<DashboardUserConfig> DashboardUserConfig { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<HeaderChartMapping> HeaderChartMapping { get; set; }
        [InverseProperty("OwnerNavigation")]
        public virtual ICollection<Lead> Lead { get; set; }
        [InverseProperty(nameof(Services.AssignedToNavigation))]
        public virtual ICollection<Services> ServicesAssignedToNavigation { get; set; }
        [InverseProperty(nameof(Services.OwnerNavigation))]
        public virtual ICollection<Services> ServicesOwnerNavigation { get; set; }
        [InverseProperty("AssignedToNavigation")]
        public virtual ICollection<Todo> Todo { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserCost> UserCost { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserGoal> UserGoal { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserGroupMapping> UserGroupMapping { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserQuoteChartMapping> UserQuoteChartMapping { get; set; }
    }
}
