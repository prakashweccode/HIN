using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class FileInfos
    {
        public string Name { get; set; }
        public string Size { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string ContentType { get; set; }
        public string Extension { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int Entity { get; set; }
        public string RootPath { get; set; }
    }
}
