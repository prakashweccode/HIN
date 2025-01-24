using System;
using System.Collections.Generic;

namespace HIN_API.Models
{
    public class FunnelDetailsDto
    {
        public List<Pipeline> PipeLines { get; set; }
        public List<FunnelDataDTO> FunnelData { get; set; }
    }
    public class FunnelDataDTO
    {
        public int? Id { get; set; }
        public int? EntityTypeId { get; set; }
        public string Name { get; set; }
        public int? PipelineGroupId { get; set; }
        public int? PipelineId { get; set; }
        public DateTime? FunnelDate { get; set; }
        public string Color { get; set; }
        public string Percentage { get; set; }
        public int Type { get; set; }
        public int? AssignedTo { get; set; }
        public string EmailId { get; set; }
        public string CategoryDescription { get; set; }
    }
}
