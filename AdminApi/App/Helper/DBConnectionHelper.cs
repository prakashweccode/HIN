using Microsoft.Extensions;

namespace Admin_API.Helper
{
    public class DBConnectionHelper
    {
        public IConfiguration Configuration { get; }
        public DBConnectionHelper(IConfiguration _Configuration)
        {
            Configuration = _Configuration;
        }

        public string getConnectionString(string companyName)
        {
            var tenant = companyName;
            return Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant);

        }
        public string getConnectionString()
        {
            return getConnectionString("HINADMIN_QA");
        }
        public string getMasterConnectionString()
        {
            return getConnectionString("HIN_QA");
        }
        public string getConnectionStringByTenant(string Tenent)
        {
            return getConnectionString(Tenent);
        }
    }
}
