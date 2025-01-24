using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class EventShow
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string Website { get; set; }
        public int? VendorId { get; set; }
        public string Telephone { get; set; }
        public string Industry { get; set; }
        public bool? Inactive { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsWalkin { get; set; }
        public string EventNumber { get; set; }
        public int? EventModeId { get; set; }
        public string Location { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? PartnerId { get; set; }
        public int? ReferralId { get; set; }
        public int? EventStatusId { get; set; }
        public int? EntityTypeId { get; set; }
        public int? EntityId { get; set; }
    }

}
