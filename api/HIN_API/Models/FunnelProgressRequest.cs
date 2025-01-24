using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class FunnelProgressRequest
    {
        public List<PipelineGroup> Funnels { get; set; }
    }
}
