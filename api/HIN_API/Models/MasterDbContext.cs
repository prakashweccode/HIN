using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace HIN_API.Models
{
    public partial class MasterDbContext : HinDbContext
    {
        public MasterDbContext()
        {
        }

        public MasterDbContext(DbContextOptions<HinDbContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var tenant = "healthinformation";
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant));
        }

    }
}
