namespace HIN_WEB.Models.DTO
{
    public class TemplateMailRequest
    {
        public string MailId { set; get; }
        public string Appointment { get; set; }
        public string HtmlBody { set; get; }
    }
}
