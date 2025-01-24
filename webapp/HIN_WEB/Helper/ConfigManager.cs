using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Helper
{
    public class ConfigManager
    {
        public IConfiguration Configuration { get; }
        public ConfigManager()
        {
            var builder = new ConfigurationBuilder()
                                    .SetBasePath(Directory.GetCurrentDirectory())
                                    .AddJsonFile("appsettings.json");
            Configuration = builder.Build();
        }
        public string DataApiUrl => Configuration["AppVariables:DataApi"];
        public string oDataApiUrl => Configuration["AppVariables:ODataApi"];
    }
}
