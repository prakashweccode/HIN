namespace HIN_API.Models.DTO
{
    public class TemplateMailRequest
    {
        public string MailId { set; get; }
        public string HtmlBody { set; get; }
        public string Appointment { get; set; }
    }
}
