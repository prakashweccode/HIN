using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class LeadGenEntityType
    {
        public LeadGenEntityType()
        {
            ContactInformation = new HashSet<ContactInformation>();
            CustomProperty = new HashSet<CustomProperty>();
            NotesInformation = new HashSet<NotesInformation>();
        }

        public int Id { get; set; }
        public string EntityType { get; set; }
        public string Description { get; set; }
        public bool? IsShowScreen { get; set; }
        public virtual ICollection<ContactInformation> ContactInformation { get; set; }
        public virtual ICollection<CustomProperty> CustomProperty { get; set; }
        public virtual ICollection<NotesInformation> NotesInformation { get; set; }
    }
}
