using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public partial class ProviderType
    {
        public ProviderType()
        {
            Vendor = new HashSet<Vendor>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Vendor> Vendor { get; set; }
    }
}
