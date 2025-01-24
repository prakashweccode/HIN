using System;

namespace HIN_API.Models.DTO
{
    public class EventResponseDto
    {
        public int Id { get; set; }
        public int EventType { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Color { get; set; }
        public string IdentNumber { get; set; }
        public bool IsRecurrence { get; set; }
        public int RecurrenceId { get; set; }
    }
}
