using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_WEB.Helper
{
    public static class CodeIndentHelper
    {
        public static string ProcessLastIdByEntity(string entity, string prefix, int lastId)
        {
            switch (lastId.ToString().Length)
            {
                case 1:
                    return prefix + "000000" + (lastId + 1);
                case 2:
                    return prefix + "00000" + (lastId + 1);
                case 3:
                    return prefix + "0000" + (lastId + 1);
                case 4:
                    return prefix + "000" + (lastId + 1);
                case 5:
                    return prefix + "00" + (lastId + 1);
                case 6:
                    return prefix + "0" + (lastId + 1);
                default:
                    return prefix + (lastId + 1);
            }
        }
        public static string ProcessLastQuoteIdentity(string prefix, int lastId)
        {
            switch (lastId.ToString().Length)
            {
                case 1:
                    return prefix + DateTime.Now.Year.ToString().Substring(2,2) + "-0000" + (lastId + 1);
                case 2:
                    return prefix + DateTime.Now.Year.ToString().Substring(2, 2) + "-000" + (lastId + 1);
                case 3:
                    return prefix + DateTime.Now.Year.ToString().Substring(2, 2)+ "-00" + (lastId + 1);
                case 4:
                    return prefix +DateTime.Now.Year.ToString().Substring(2, 2) + "-0" + (lastId + 1);
                default:
                    return prefix + DateTime.Now.Year.ToString().Substring(2, 2) + "-" + (lastId + 1);
            }
        }
        public static string GenerateBatchNumber(string prefix)
        {
            //var dateTimeNow = DateTime.Now;
            return prefix + DateTime.Now.Ticks;
        }
    }
}
