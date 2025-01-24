using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Models
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public long? PhoneNumber { get; set; }
        public string? Extension { get; set; }
        public string? FaxNumber { get; set; }
        public string? ContactFirstName { get; set; }
        public string? ContactMiddleName { get; set; }
        public string? ContactLastName { get; set; }
        public string? ContactTitle { get; set; }
        public long? CellNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public int? MaximumUser { get; set; }
        public string? UserName { get; set; }
        public string? Name { get; set; }
        public bool? IsActive { get; set; }
        public string? SupportEmail { get; set; }
        public string? CompanyLogo { get; set; }
        public string? CompanyPracticeCode { get; set; }
    }
}
