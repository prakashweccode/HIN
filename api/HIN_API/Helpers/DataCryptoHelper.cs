using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HIN_API.Helpers
{
    public static class DataCryptoHelper
    {
        public static string DecryptString(string data, string _secretKey, string _publicKey)
        {
            string result = string.Empty;
            var secretKey = Encoding.UTF8.GetBytes(_secretKey);
            var publicKey = Encoding.UTF8.GetBytes(_publicKey);
            var encryptByteArray = Convert.FromBase64String(data.Replace(" ", "+"));
            using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
            {
                var ms = new MemoryStream();
                var cs = new CryptoStream(ms, des.CreateDecryptor(publicKey, secretKey), CryptoStreamMode.Write);
                cs.Write(encryptByteArray, 0, encryptByteArray.Length);
                cs.FlushFinalBlock();
                Encoding encoding = Encoding.UTF8;
                result = encoding.GetString(ms.ToArray());
            }
            return result;
        }
        public static string EncryptString(string data, string _secretKey, string _publicKey)
        {
            string result = string.Empty;
            var secretKey = Encoding.UTF8.GetBytes(_secretKey);
            var publicKey = Encoding.UTF8.GetBytes(_publicKey);
            var _key = Encoding.UTF8.GetBytes(data);
            using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
            {
                var ms = new MemoryStream();
                var cs = new CryptoStream(ms, des.CreateEncryptor(publicKey, secretKey), CryptoStreamMode.Write);
                cs.Write(_key, 0, _key.Length);
                cs.FlushFinalBlock();
                result = Convert.ToBase64String(ms.ToArray());
            }
            return result;
        }
    }
}
