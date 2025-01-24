using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class FolderInfos
    {
        public string FolderName { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Size { get; set; }
        public bool IsRootFolder { get; set; }
        public string Type { get; set; }
    }
}
