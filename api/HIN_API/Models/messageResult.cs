using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class messageResult
    {
        public bool error { get; set; }
        public int errorValue { get; set; }
        public string description { get; set; }
        public Object data { get; set; }

        public messageResult()
        {
            error = false;
            errorValue = 1;
            description = "Saved";
        }
    }
}
