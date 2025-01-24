using Newtonsoft.Json;
using System;
using ODataHttpClient;
using ODataHttpClient.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HIN_WEB.Helper
{
    public static class HttpHelper
    {
        private static IHttpContextAccessor _accessor;
        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            _accessor = httpContextAccessor;
        }

        public static HttpContext HttpContext => _accessor.HttpContext;
    }
    public static class DataManager
    {

        public static async Task<HttpResponseMessage> GetData(string apiPath, string token = "")
        {

            var client = new HttpClient();
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            var response = await client.GetAsync(new Uri(cMgr.DataApiUrl + apiPath)).ConfigureAwait(false);
            return response;
        }

        public static async Task<HttpResponseMessage> PutData<T>(string apiPath, T apiObject, string token = "")
        {

            var client = new HttpClient();
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var json = JsonConvert.SerializeObject(apiObject);
            var contentDetails = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(new Uri(cMgr.DataApiUrl + apiPath), contentDetails).ConfigureAwait(false);
            return response;

        }

        public static async Task<Response> GetOData(string apiPath, string token = "")
        {
            var client = new HttpClient();
            var odata = new ODataClient(client);
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            var request = Request.Get($"{cMgr.oDataApiUrl + apiPath}");
            //var response = await client.GetAsync(new Uri(cMgr.DataApiUrl + apiPath)).ConfigureAwait(false);
            var response = await odata.SendAsync(request);
            return response;
        }
        public static async Task<HttpResponseMessage> PostData<T>(string apiPath, T apiObject, string token = "")
        {

            var client = new HttpClient();
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var json = JsonConvert.SerializeObject(apiObject);
            var contentDetails = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(new Uri(cMgr.DataApiUrl + apiPath), contentDetails).ConfigureAwait(false);
            return response;

        }

        public static async Task<HttpResponseMessage> PatchData(string apiPath, string token = "")
        {
            var client = new HttpClient();
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.PatchAsync(new Uri(cMgr.DataApiUrl + apiPath), null).ConfigureAwait(false);
            return response;
        }

        public static async Task<HttpResponseMessage> PatchData<T>(string apiPath, T apiObject, string token = "")
        {

            var client = new HttpClient();
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var json = JsonConvert.SerializeObject(apiObject);
            var contentDetails = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PatchAsync(new Uri(cMgr.DataApiUrl + apiPath), contentDetails).ConfigureAwait(false);

            return response;
        }

        public static async Task<HttpResponseMessage> DeleteData(string apiPath, string token = "")
        {
            HttpClient client = new HttpClient();
            var cMgr = new ConfigManager();
            SetHeader(token, client);
            var response = await client.DeleteAsync(new Uri(cMgr.DataApiUrl + apiPath)).ConfigureAwait(false); ;
            return response;


        }
        static void SetHeader(string token, HttpClient client)
        {
            var context = HttpHelper.HttpContext;
            if (!string.IsNullOrEmpty(token))
            {
                client.DefaultRequestHeaders.Authorization
                             = new AuthenticationHeaderValue("Bearer", token);
            }
            else
            {
                if (context.Request.Headers["Authorization"].Count > 0 && context.Request.Headers["Authorization"][0].Contains("Bearer"))
                    token = context.Request.Headers["Authorization"][0].Split(' ')[1];
                client.DefaultRequestHeaders.Authorization
                             = new AuthenticationHeaderValue("Bearer", token);
            }
           
            var host = context.Request.Host.HasValue ? context.Request.Host.Host : "";
            var domains = host.Split('.');
            var tenant = "";
            if(domains.Length>2)
            {
                tenant = domains[0];
            }
            client.DefaultRequestHeaders.Add("tenant", tenant);
        }
    }
}
