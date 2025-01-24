using HIN_WEB.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace HIN_WEB.Helper
{
    public static class ImportCsvHelper
    {
        public static IEnumerable<PropertyInfo> GetCsvProperties(Type t)
        {
            var properties = t.GetProperties().Where(prop => prop.IsDefined(typeof(CsvImportAttribute), true));
            return properties;
        }
        public static IEnumerable<PropertyInfo> GetCsvRequiredProperties(Type t)
        {
            var properties = t.GetProperties().Where(prop => prop.IsDefined(typeof(CsvRequiredAttribute), true));
            return properties;
        }
        public static T CsvMapping<T>(Type instance, dynamic fileData, List<MappedColumns> mappedColumns)
        {
            T t = (T)Activator.CreateInstance(instance);
            var dynamicRow = fileData as ExpandoObject;
            //var keys = dynamicRow.Select(a => a.Key).ToList();
            foreach (var data in mappedColumns)
            {
                var value = dynamicRow.Where(w => w.Key == data.FileColumn).Select(a => a.Value).FirstOrDefault();
                PropertyInfo property = t.GetType().GetProperty(data.TableColumn);
                if (property != null && property.CanWrite)
                {
                    if (data.FileColumn.ToLower() != "!import")
                    {
                        System.TypeCode typeCode = Type.GetTypeCode(property.PropertyType);
                        switch (typeCode)
                        {
                            case TypeCode.Boolean:
                                property.SetValue(t, Convert.ToBoolean(value), null);
                                break;
                            case TypeCode.String:
                                property.SetValue(t, Convert.ToString(value), null);
                                break;
                            case TypeCode.DateTime:
                                property.SetValue(t, Convert.ToDateTime(value), null);
                                break;
                            case TypeCode.Int16:
                                property.SetValue(t, Convert.ToInt16(value), null);
                                break;
                            case TypeCode.Int32:
                                property.SetValue(t, Convert.ToInt32(value), null);
                                break;
                            case TypeCode.Int64:
                                property.SetValue(t, Convert.ToInt64(value), null);
                                break;
                            case TypeCode.Decimal:
                                property.SetValue(t, Convert.ToDecimal(value), null);
                                break;
                            case TypeCode.Byte:
                                property.SetValue(t, Convert.ToByte(value), null);
                                break;
                            case TypeCode.Double:
                                property.SetValue(t, Convert.ToDouble(value), null);
                                break;
                        }
                    }
                }
            }
            return t;
        }
    }
}
