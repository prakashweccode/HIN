using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Helpers;
using MimeKit.Text;
using System.Net.Mail;
using System.Text;
using System.Net;
using System.Web;
using HIN_API.Models;

namespace HIN_API.Services
{
    public interface IEmailSender
    {

        Task SendEmailAsync(string email, string subject, string message);
        Task SendMailMessage(string email, string subject, string message);
        Task SendForgotEmail(string email, int userId, string secretKey, string publicKey);
    }
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;
        private readonly IHostingEnvironment _env;
        public EmailSender(IOptions<EmailSettings> emailSettings, IHostingEnvironment env)
        {
            _emailSettings = emailSettings.Value;
            _env = env;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.Sender));

                mimeMessage.To.Add(new MailboxAddress(email));

                mimeMessage.Subject = subject;
                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = message;
                mimeMessage.Body = bodyBuilder.ToMessageBody();

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    //client.CheckCertificateRevocation = false;
                    //client.SslProtocols = SslProtocols.Ssl3 | SslProtocols.Tls | SslProtocols.Tls11 | SslProtocols.Tls12 | SslProtocols.Tls13;
                    if (_env.IsDevelopment())
                    {
                        // The third parameter is useSSL (true if the client should make an SSL-wrapped
                        // connection to the server; otherwise, false).
                        await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, false);
                    }
                    else
                    {
                        await client.ConnectAsync(_emailSettings.MailServer);
                    }

                    // Note: only needed if the SMTP server requires authentication

                    await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);

                    await client.SendAsync(mimeMessage);

                    await client.DisconnectAsync(true);
                }

            }
            catch (Exception ex)
            {
                // TODO: handle exception
                throw new InvalidOperationException(ex.Message);
            }
        }

        public async Task SendMailMessage(string email, string subject, string content)
        {
            try
            {
                var toAddress = new MailAddress(email);
                var fromAddress = new MailAddress(_emailSettings.Sender, _emailSettings.DisplayName);
                var smtp = new System.Net.Mail.SmtpClient
                {
                    Host = _emailSettings.MailServer,
                    Port = _emailSettings.MailPort,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, _emailSettings.Password, "hotmail.com")
                };
                using (var emailMessage = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = content,
                    IsBodyHtml = true
                })
                {
                    System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s,
                    System.Security.Cryptography.X509Certificates.X509Certificate certificate,
                    System.Security.Cryptography.X509Certificates.X509Chain chain,
                    System.Net.Security.SslPolicyErrors sslPolicyErrors)
                    {
                        return true;
                    };
                    await smtp.SendMailAsync(emailMessage);
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }

        public async Task SendForgotEmail(string email, int userId, string secretKey, string publicKey)
        {
            var message = GetForgotMailContent(email, userId, _emailSettings, secretKey, publicKey);
            var subject = "K9-CRM Reset Password Link";
            try
            {
                var mimeMessage = new MimeMessage();

                mimeMessage.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.Sender));

                mimeMessage.To.Add(new MailboxAddress(email));

                mimeMessage.Subject = subject;
                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = message;
                mimeMessage.Body = bodyBuilder.ToMessageBody();

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    //client.CheckCertificateRevocation = false;
                    //client.SslProtocols = SslProtocols.Ssl3 | SslProtocols.Tls | SslProtocols.Tls11 | SslProtocols.Tls12 | SslProtocols.Tls13;
                    if (_env.IsDevelopment())
                    {
                        // The third parameter is useSSL (true if the client should make an SSL-wrapped
                        // connection to the server; otherwise, false).
                        await client.ConnectAsync(_emailSettings.MailServer, _emailSettings.MailPort, false);
                    }
                    else
                    {
                        await client.ConnectAsync(_emailSettings.MailServer);
                    }

                    // Note: only needed if the SMTP server requires authentication

                    await client.AuthenticateAsync(_emailSettings.Sender, _emailSettings.Password);

                    await client.SendAsync(mimeMessage);

                    await client.DisconnectAsync(true);
                }

            }
            catch (Exception ex)
            {
                // TODO: handle exception
                throw new InvalidOperationException(ex.Message);
            }
        }

        private string GetForgotMailContent(string email, int userId, EmailSettings emailSettings, string secretKey, string publicKey)
        {
            var defaultTenant = "https://k9-crm.com/";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if (!string.IsNullOrEmpty(tenantHeader))
            {
                defaultTenant = string.Format("https://{0}.k9-crm.com/", tenantHeader);
            }
            var baseUrl = defaultTenant;
            var oSB = new StringBuilder();
            oSB.Append("<p>Below is the link to reset your password</P><br/>");
            oSB.Append("<a href='" + baseUrl + "reset?userid=" + HttpUtility.UrlEncode(DataCryptoHelper.EncryptString(Convert.ToString(userId), secretKey, publicKey)) + "&email=" + HttpUtility.UrlEncode(DataCryptoHelper.EncryptString(email, secretKey, publicKey)) + "' target='_blank'>Reset Password</a>");
            return oSB.ToString();
        }


    }
}
