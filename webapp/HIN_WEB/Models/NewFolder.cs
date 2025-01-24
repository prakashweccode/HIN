using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class NewFolder
    {
        public string FolderName { get; set; }
        public string RootName { get; set; }
        public int Entity { get; set; }
        public string EntityNumber { get; set; }
    }
    public class SelectedNode
    {
        public string Name { get; set; }
        public string ContentType { get; set; }
        public string RootName { get; set; }
        public string Entity { get; set; }
        public string EntityNumber { get; set; }
    }
}
