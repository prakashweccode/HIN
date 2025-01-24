using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Models
{
    public class TenantUserDto
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? AdminPassword { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsUser { get; set; }
        public bool IsActive { get; set; }
        public string? Tenant { get; set; }
    }
}
