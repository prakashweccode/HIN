using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HIN_WEB.Helper
{
    public static class ExportCSVHelper
    {
        public static byte[] ExportJsonToCsv(string jsonContent, string delimiter)
        {
            var data = JsonStringToTable(jsonContent);
            var headers = ((IEnumerable<dynamic>)((IEnumerable<dynamic>)data).First()).Select((prop) => prop.Name).ToArray();
            var csvList = new List<string>
            {
                string.Join(delimiter, headers.Select((prop) => string.Format(@"""{0}""", prop)).ToArray())
            };

            var lines = ((IEnumerable<dynamic>)data)
                .Select(row => row)
                .Cast<IEnumerable<dynamic>>()
                .Select((instance) => string.Join(delimiter, instance.Select((v) => string.Format(@"""{0}""", v.Value))))
                .ToArray();

            csvList.AddRange(lines);
            StringBuilder oSB = new StringBuilder();
            oSB.Append(string.Join(Environment.NewLine, csvList));
            byte[] FileContent = Encoding.UTF8.GetBytes(oSB.ToString());
            return FileContent;
        }
        static private dynamic JsonStringToTable(string jsonContent)
        {
            var json = jsonContent.Split(new[] { '=' }).Last();
            return JsonConvert.DeserializeObject<dynamic>(json);
        }
    }
}
