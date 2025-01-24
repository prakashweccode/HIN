using Org.BouncyCastle.Asn1.Mozilla;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public class DbColumnUpdate
    {
        public string TableName { get; set; }
        public string ColumnName { get; set; }
        public string ColumnValue { get; set; }
        public string ValueType { get; set; }
        public string KeyName { get; set; }
        public string KeyValue { get; set; }
        public string KeyValueType { get; set; }
    }
}
