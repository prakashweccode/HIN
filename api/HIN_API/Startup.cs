using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HIN_API.Extensions;
using HIN_API.Helpers;
using HIN_API.Models;
using HIN_API.Services;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Formatter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OData.Edm;
using Microsoft.OpenApi.Models;

namespace HIN_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
            services.ConfigureIISIntegration();
            services.AddDbContext<HinDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DbContextConnection")));
            services.AddDbContext<TenantContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DbContextConnection")));
            services.AddDbContext<MasterDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DbContextConnection")));
            var emailSettingSection = Configuration.GetSection("EmailSettings");
            services.Configure<EmailSettings>(emailSettingSection);
            var emailSettings = emailSettingSection.Get<EmailSettings>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddControllersWithViews().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            services.AddControllers(mvcOptions =>
                mvcOptions.EnableEndpointRouting = false).AddNewtonsoftJson(options => {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
            //services.AddSingleton<IEmailSender, EmailSender>();
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();
            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(appSettings.SecurityKey);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });
            services.AddOData();
            services.AddMvcCore(options =>
            {
                foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
                {
                    outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
                foreach (var inputFormatter in options.InputFormatters.OfType<ODataInputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
                {
                    inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }


        IEdmModel GetEdmModel()
        {
            var odataBuilder = new ODataConventionModelBuilder();
            odataBuilder.EntitySet<Users>("ODataUser");
            odataBuilder.EntitySet<Lead>("ODataLead");
            odataBuilder.EntitySet<Deal>("ODataDeal");
            odataBuilder.EntitySet<UserGroups>("ODataUserGroups");
            odataBuilder.EntitySet<Organization>("ODataOrganization");
            odataBuilder.EntitySet<Currency>("ODataCurrency");
            odataBuilder.EntitySet<CustomProperty>("LeadCustomColumns");
            odataBuilder.EntitySet<Vendor>("ODataVendor");
            odataBuilder.EntitySet<Networking>("ODataNetworking");
            odataBuilder.EntitySet<EventShow>("ODataEventShow");
            odataBuilder.EntitySet<Todo>("ODataTodoList");
            odataBuilder.EntitySet<CompanyRegister>("ODataCompanyRegister");
            odataBuilder.EntitySet<ContactInformation>("ODataContactInfo");
            odataBuilder.EntitySet<Partner>("ODataPartner");
            odataBuilder.EntitySet<Referral>("ODataReferral");
            odataBuilder.EntitySet<EmailHistory>("ODataEmailHistory");
            odataBuilder.EntitySet<PartCatalog>("ODataPartCatalog");
            odataBuilder.EntitySet<Quote>("ODataQuote");
            odataBuilder.EntitySet<VwContactInformation>("ODataVwContacts");
            odataBuilder.EntitySet<VwServices>("ODataServices");
            odataBuilder.EntitySet<VwEvent>("ODataEvent");
            odataBuilder.EntitySet<VwTemplate>("ODataTemplate");
            odataBuilder.EntitySet<ContactGroup>("ODataContactGroup");
            odataBuilder.EntitySet<DashboardUserConfig>("ODataDashboardConfigs");
            odataBuilder.EntitySet<TempPatient>("ODataPatient");
            return odataBuilder.GetEdmModel();
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseMvc(routeBuilder =>
            {
                routeBuilder.Select().Expand().Filter().OrderBy().MaxTop(500).Count();
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
                //routeBuilder.SetTimeZoneInfo(TimeZoneInfo.Utc);
            });
            HttpHelper.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
        }
    }
}
