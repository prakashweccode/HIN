using System.Security.Cryptography;
using System.Text;

namespace Admin_API.Helper
{
    public static class DataCryptoHelper
    {
        public const string _secretKey = "k9leadgen";
        public const string _publicKey = "appkeyid";
        public const string _securityKey = "K246L8DF278GN5931069A001P695P4F9";
        public static string DecryptString(string data)
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
        public static string EncryptString(string data)
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

        public static string GeneratePracticeCode()
        {
            string rString = System.IO.Path.GetRandomFileName();
            return rString.Remove(1, 3).Replace(".", "").ToUpper(); // Remove one character and period.
        }
    }
}
