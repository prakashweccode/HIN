using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Models
{
    public class DirectoryInfos
    {
        public string FolderName { get; set; }
        public string ParentFolderName { get; set; }
        public string RootPath { get; set; }
        public List<FileInfos> FileInfos { get; set; }
        public DirectoryInfos(List<FileInfos> lstFileInfos)
        {
            FileInfos = lstFileInfos;
        }
    }
}
