using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace HIN_API.Models
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
    public partial class TenantContext : HinDbContext
    {
        public TenantContext()
        {
        }

        public TenantContext(DbContextOptions<HinDbContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }

        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            //var auditEntries = OnBeforeSaveChanges();
            var entries = ChangeTracker.Entries().Where(E => E.State == EntityState.Added || E.State == EntityState.Modified).ToList();

            foreach (var entityEntry in entries)
            {
                if (entityEntry.State == EntityState.Modified)
                {
                    if(EntityHasValue(entityEntry, "UpdatedOn", "UpdatedBy", "UpdatedById"))
                    {
                        entityEntry.Property("UpdatedOn").CurrentValue = DateTime.Now;
                        entityEntry.Property("UpdatedBy").CurrentValue = HttpHelper.HttpContext.User?.Identity?.Name;
                        if (HttpHelper.HttpContext != null && HttpHelper.HttpContext.User !=null && HttpHelper.HttpContext.User.Claims !=null)
                        {
                            var sid = HttpHelper.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid)?.Value;
                            entityEntry.Property("UpdatedById").CurrentValue = Convert.ToInt32(sid);
                        }
                    }
                }
                else if (entityEntry.State == EntityState.Added)
                {
                    if (EntityHasValue(entityEntry, "CreatedOn", "CreatedBy", "CreatedById"))
                    {
                        entityEntry.Property("CreatedOn").CurrentValue = DateTime.Now;
                        entityEntry.Property("CreatedBy").CurrentValue = HttpHelper.HttpContext.User?.Identity?.Name;
                        if (HttpHelper.HttpContext != null && HttpHelper.HttpContext.User != null && HttpHelper.HttpContext.User.Claims != null)
                        {
                            var sid = HttpHelper.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid)?.Value;
                            entityEntry.Property("CreatedById").CurrentValue = Convert.ToInt32(sid);
                        }
                    }
                }

            }
            var result = await base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
            return result;
        }

        private bool EntityHasValue(EntityEntry entityEntry, params string[] names)
        {
            try
            {
                foreach (var name in names)
                {
                    entityEntry.Property(name);
                }
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IConfiguration Configuration { get; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var tenant = "HIN_QA";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if(!string.IsNullOrEmpty(tenantHeader))
            {
                tenant = tenantHeader;
            }
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant));
        }



        public void changeAdminConnectionString(DbContextOptionsBuilder optionsBuilder)
        {
            var tenant = "HIN_QA";
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant));
        }

        public void changedTenentConnectionString(DbContextOptionsBuilder optionsBuilder)
        {
            var tenant = "HIN_QA";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if (!string.IsNullOrEmpty(tenantHeader))
            {
                tenant = tenantHeader;
            }
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant));

        }

        public string getConnectionString()
        {
            var tenant = "HIN_QA";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if (!string.IsNullOrEmpty(tenantHeader))
            {
                tenant = tenantHeader;
            }
            return Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant);

        }

        public string masterConnectionString()
        {
            return Configuration.GetConnectionString("MasterConnectionString");

        }

        public string getSubDomainName()
        {
            var tenant = "HIN_QA";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if (!string.IsNullOrEmpty(tenantHeader))
            {
                tenant = tenantHeader;
            }
            return tenant;
        }

        public string getConnectionString(string companyName)
        {
            var tenant = companyName;
            return Configuration.GetConnectionString("DbContextConnection").Replace("{tenant}", tenant);

        }

        public string isTenent()
        {
            var tenant = "HIN_QA";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if (!string.IsNullOrEmpty(tenantHeader))
            {
                tenant = tenantHeader;
                return tenant;
            }
            else
            {
                return tenant;
            }
        }

    }
}
