using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class Networking
    {
        public int NetworkingId { get; set; }
        public string NetworkingName { get; set; }
        public string NetworkingNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public string Website { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public string Country { get; set; }
        public string Industry { get; set; }
        public int? CostId { get; set; }
        public int? EventMeetId { get; set; }
        public bool? Inactive { get; set; }
        public NetworkingCost Cost { get; set; }
        public NetworkingEventMeet EventMeet { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public int? UpdatedById { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public int? CreatedById { get; set; }
    }
}
