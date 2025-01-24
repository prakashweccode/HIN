using System;
using HIN_API.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HIN_API.Models
{
    public partial class HinDbContext : DbContext
    {
        public HinDbContext()
        {
        }

        public HinDbContext(DbContextOptions<HinDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AssignedToDropdown> AssignedToDropdown { get; set; }
        public virtual DbSet<Audit> Audit { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<CategoryValues> CategoryValues { get; set; }
        public virtual DbSet<ChartConfig> ChartConfig { get; set; }
        public virtual DbSet<ChartName> ChartName { get; set; }
        public virtual DbSet<ChooseMethod> ChooseMethod { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<CompanyRegister> CompanyRegister { get; set; }
        public virtual DbSet<CompanySettings> CompanySettings { get; set; }
        public virtual DbSet<CompletedStatus> CompletedStatus { get; set; }
        public virtual DbSet<Config> Config { get; set; }
        public virtual DbSet<ContactGroup> ContactGroup { get; set; }
        public virtual DbSet<ContactInformation> ContactInformation { get; set; }
        public virtual DbSet<ContactInformationEmailMapping> ContactInformationEmailMapping { get; set; }
        public virtual DbSet<ContactTitle> ContactTitle { get; set; }
        public virtual DbSet<CostCenterDropdown> CostCenterDropdown { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<Currency> Currency { get; set; }
        public virtual DbSet<CustomFieldListItems> CustomFieldListItems { get; set; }
        public virtual DbSet<CustomProperty> CustomProperty { get; set; }
        public virtual DbSet<CustomPropertyValues> CustomPropertyValues { get; set; }
        public virtual DbSet<CustomerDropdown> CustomerDropdown { get; set; }
        public virtual DbSet<DashBoardQueries> DashBoardQueries { get; set; }
        public virtual DbSet<DashboardChartMapping> DashboardChartMapping { get; set; }
        public virtual DbSet<DashboardConfigFields> DashboardConfigFields { get; set; }
        public virtual DbSet<DashboardUserConfig> DashboardUserConfig { get; set; }
        public virtual DbSet<Days> Days { get; set; }
        public virtual DbSet<DbPropertyTypes> DbPropertyTypes { get; set; }
        public virtual DbSet<Deal> Deal { get; set; }
        public virtual DbSet<DealContact> DealContact { get; set; }
        public virtual DbSet<DealContactNextStep> DealContactNextStep { get; set; }
        public virtual DbSet<DiscountDropdown> DiscountDropdown { get; set; }
        public virtual DbSet<EmailGroup> EmailGroup { get; set; }
        public virtual DbSet<EmailHistory> EmailHistory { get; set; }
        public virtual DbSet<EmailTemplate> EmailTemplate { get; set; }
        public virtual DbSet<EmailType> EmailType { get; set; }
        public virtual DbSet<EmployeeType> EmployeeType { get; set; }
        public virtual DbSet<EntityListOptions> EntityListOptions { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<EventCost> EventCost { get; set; }
        public virtual DbSet<EventMode> EventMode { get; set; }
        public virtual DbSet<EventShow> EventShow { get; set; }
        public virtual DbSet<EventStatus> EventStatus { get; set; }
        public virtual DbSet<EventType> EventType { get; set; }
        public virtual DbSet<Gender> Gender { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<HeaderChartMapping> HeaderChartMapping { get; set; }
        public virtual DbSet<ImportException> ImportException { get; set; }
        public virtual DbSet<ImportSuccess> ImportSuccess { get; set; }
        public virtual DbSet<Importance> Importance { get; set; }
        public virtual DbSet<IndustryType> IndustryType { get; set; }
        public virtual DbSet<K9ErpEntityDocSync> K9ErpEntityDocSync { get; set; }
        public virtual DbSet<K9LeadEntityDocSync> K9LeadEntityDocSync { get; set; }
        public virtual DbSet<K9erpsetting> K9erpsetting { get; set; }
        public virtual DbSet<LabelType> LabelType { get; set; }
        public virtual DbSet<Lead> Lead { get; set; }
        public virtual DbSet<LeadContact> LeadContact { get; set; }
        public virtual DbSet<LeadEmail> LeadEmail { get; set; }
        public virtual DbSet<LeadGenEntityType> LeadGenEntityType { get; set; }
        public virtual DbSet<LeadGroupMapping> LeadGroupMapping { get; set; }
        public virtual DbSet<LeadLabels> LeadLabels { get; set; }
        public virtual DbSet<LeadOriginType> LeadOriginType { get; set; }
        public virtual DbSet<LeadPhoneNumber> LeadPhoneNumber { get; set; }
        public virtual DbSet<LeadStatus> LeadStatus { get; set; }
        public virtual DbSet<LeadTypes> LeadTypes { get; set; }
        public virtual DbSet<LinePart> LinePart { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<MaterialCost> MaterialCost { get; set; }
        public virtual DbSet<Networking> Networking { get; set; }
        public virtual DbSet<NetworkingCost> NetworkingCost { get; set; }
        public virtual DbSet<NetworkingEventMeet> NetworkingEventMeet { get; set; }
        public virtual DbSet<NoteTemplate> NoteTemplate { get; set; }
        public virtual DbSet<NotesInformation> NotesInformation { get; set; }
        public virtual DbSet<Organization> Organization { get; set; }
        public virtual DbSet<PaperworkCompletion> PaperworkCompletion { get; set; }
        public virtual DbSet<PartCatalog> PartCatalog { get; set; }
        public virtual DbSet<Partner> Partner { get; set; }
        public virtual DbSet<PaymentMode> PaymentMode { get; set; }
        public virtual DbSet<PaymentTermsDropdown> PaymentTermsDropdown { get; set; }
        public virtual DbSet<Permissions> Permissions { get; set; }
        public virtual DbSet<PhoneNumberType> PhoneNumberType { get; set; }
        public virtual DbSet<Pipeline> Pipeline { get; set; }
        public virtual DbSet<PipelineGroup> PipelineGroup { get; set; }
        public virtual DbSet<PipelineGroupType> PipelineGroupType { get; set; }
        public virtual DbSet<PipelineMap> PipelineMap { get; set; }
        public virtual DbSet<Prority> Prority { get; set; }
        public virtual DbSet<ProviderStatus> ProviderStatus { get; set; }
        public virtual DbSet<ProviderType> ProviderType { get; set; }
        public virtual DbSet<Quote> Quote { get; set; }
        public virtual DbSet<Reason> Reason { get; set; }
        public virtual DbSet<Recurrence> Recurrence { get; set; }
        public virtual DbSet<RecurrenceDays> RecurrenceDays { get; set; }
        public virtual DbSet<RecurrenceType> RecurrenceType { get; set; }
        public virtual DbSet<Referral> Referral { get; set; }
        public virtual DbSet<ReferralDropdown> ReferralDropdown { get; set; }
        public virtual DbSet<ReferralFee> ReferralFee { get; set; }
        public virtual DbSet<RolePermissions> RolePermissions { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<SearchCriteria> SearchCriteria { get; set; }
        public virtual DbSet<ServiceActionTypes> ServiceActionTypes { get; set; }
        public virtual DbSet<ServiceStatus> ServiceStatus { get; set; }
        public virtual DbSet<Services> Services { get; set; }
        public virtual DbSet<Settings> Settings { get; set; }
        public virtual DbSet<SocialMediaType> SocialMediaType { get; set; }
        public virtual DbSet<State> State { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<StatusDropdown> StatusDropdown { get; set; }
        public virtual DbSet<StepTypes> StepTypes { get; set; }
        public virtual DbSet<StepsContact> StepsContact { get; set; }
        public virtual DbSet<StepsContactNextStep> StepsContactNextStep { get; set; }
        public virtual DbSet<StepsMaterialCost> StepsMaterialCost { get; set; }
        public virtual DbSet<StepsTimeCost> StepsTimeCost { get; set; }
        public virtual DbSet<SubIssueType> SubIssueType { get; set; }
        public virtual DbSet<TaxDropdown> TaxDropdown { get; set; }
        public virtual DbSet<Template> Template { get; set; }
        public virtual DbSet<TemplateList> TemplateList { get; set; }
        public virtual DbSet<TempPatient> TempPatient { get; set; }
        public virtual DbSet<TicketType> TicketType { get; set; }
        public virtual DbSet<TimeCost> TimeCost { get; set; }
        public virtual DbSet<Todo> Todo { get; set; }
        public virtual DbSet<TwoFactorType> TwoFactorType { get; set; }
        public virtual DbSet<TypeSaleDropdown> TypeSaleDropdown { get; set; }
        public virtual DbSet<Uom> Uom { get; set; }
        public virtual DbSet<UserCost> UserCost { get; set; }
        public virtual DbSet<UserCostDropdown> UserCostDropdown { get; set; }
        public virtual DbSet<UserGoal> UserGoal { get; set; }
        public virtual DbSet<UserGroupMapping> UserGroupMapping { get; set; }
        public virtual DbSet<UserGroups> UserGroups { get; set; }
        public virtual DbSet<UserPermission> UserPermission { get; set; }
        public virtual DbSet<UserQuoteChartMapping> UserQuoteChartMapping { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UsersGroupsPermission> UsersGroupsPermission { get; set; }
        public virtual DbSet<Vendor> Vendor { get; set; }
        public virtual DbSet<VwContactInformation> VwContactInformation { get; set; }
        public virtual DbSet<VwDashboardChartConfig> VwDashboardChartConfig { get; set; }
        public virtual DbSet<VwOpportunities> VwOpportunities { get; set; }
        public virtual DbSet<VwServices> VwServices { get; set; }
        public virtual DbSet<VwEvent> VwEvent { get; set; }
        public virtual DbSet<VwTemplate> VwTemplate { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-LJVJ5EC\\SQLEXPRESS;Database=healthinformation;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Audit>(entity =>
            {
                entity.Property(e => e.KeyValues).IsUnicode(false);

                entity.Property(e => e.NewValues).IsUnicode(false);

                entity.Property(e => e.OldValues).IsUnicode(false);

                entity.Property(e => e.TableName).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.DisplayName).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<CategoryValues>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<ChartConfig>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.DashboardConfig)
                    .WithMany(p => p.ChartConfig)
                    .HasForeignKey(d => d.DashboardConfigId)
                    .HasConstraintName("FK_ChartConfig_DashboardUserConfig");
            });

            modelBuilder.Entity<ChartName>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<CompanyRegister>(entity =>
            {
                entity.HasKey(e => e.RegisterId)
                    .HasName("PK_UserRegister");

                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.ContactFirstName).IsUnicode(false);

                entity.Property(e => e.ContactLastName).IsUnicode(false);

                entity.Property(e => e.ContactMiddleName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.UserName).IsUnicode(false);

                entity.Property(e => e.ZipCode).IsUnicode(false);
            });

            modelBuilder.Entity<CompanySettings>(entity =>
            {
                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanySettings)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_CompanySettings_CompanyRegister");

                entity.HasOne(d => d.Settings)
                    .WithMany(p => p.CompanySettings)
                    .HasForeignKey(d => d.SettingsId)
                    .HasConstraintName("FK_CompanySettings_Settings");
            });

            modelBuilder.Entity<Config>(entity =>
            {
                entity.Property(e => e.IsProtected).HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<ContactGroup>(entity =>
            {
                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.ContactGroup)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_ContactGroup_ContactInformation");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.ContactGroup)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_ContactGroup_Group");
            });

            modelBuilder.Entity<ContactInformation>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.BatchNumber).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.ContactImage).IsUnicode(false);

                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.LinkedInProfile).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.Website).IsUnicode(false);

                entity.Property(e => e.ZipCode).IsUnicode(false);

                entity.HasOne(d => d.ContactGroupNavigation)
                    .WithMany(p => p.ContactInformation)
                    .HasForeignKey(d => d.ContactGroupId)
                    .HasConstraintName("FK__ContactIn__Conta__1E6F845E");

                //entity.HasOne(d => d.TypeNavigation)
                //    .WithMany(p => p.ContactInformation)
                //    .HasForeignKey(d => d.Type)
                //    .HasConstraintName("FK_ContactInformation_LeadGenEntityType");
            });

            modelBuilder.Entity<ContactInformationEmailMapping>(entity =>
            {
                entity.HasOne(d => d.ContactInformation)
                    .WithMany(p => p.ContactInformationEmailMapping)
                    .HasForeignKey(d => d.ContactInformationId)
                    .HasConstraintName("FK_ContactInformationEmailMapping_ContactInformation");
            });

            modelBuilder.Entity<ContactTitle>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.SortName).IsUnicode(false);
            });

            modelBuilder.Entity<CustomFieldListItems>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.CustomProperty)
                    .WithMany(p => p.CustomFieldListItems)
                    .HasForeignKey(d => d.CustomPropertyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_CustomFieldListItems_CustomProperty");
            });

            modelBuilder.Entity<CustomProperty>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.IdHtml).IsUnicode(false);

                entity.Property(e => e.PropertyName).IsUnicode(false);

                entity.Property(e => e.PropertyValue).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                //entity.HasOne(d => d.EntityType)
                //    .WithMany(p => p.CustomProperty)
                //    .HasForeignKey(d => d.EntityTypeId)
                //    .HasConstraintName("FK_LeadCustomProperty_DbPropertyTypes");
            });

            modelBuilder.Entity<CustomPropertyValues>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.CustomProperty)
                    .WithMany(p => p.CustomPropertyValues)
                    .HasForeignKey(d => d.CustomPropertyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_CustomPropertyValues_CustomProperty");
            });

            modelBuilder.Entity<DashBoardQueries>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.CriteriaName).IsUnicode(false);

                entity.Property(e => e.FieldName).IsUnicode(false);

                entity.Property(e => e.FieldType).IsUnicode(false);

                entity.Property(e => e.FromValue).IsUnicode(false);

                entity.Property(e => e.ToValue).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.DashboardConfig)
                    .WithMany(p => p.DashBoardQueries)
                    .HasForeignKey(d => d.DashboardConfigId)
                    .HasConstraintName("FK_DashBoardQueries_DashboardUserConfig");
            });

            modelBuilder.Entity<DashboardChartMapping>(entity =>
            {
                entity.HasOne(d => d.Chart)
                    .WithMany(p => p.DashboardChartMapping)
                    .HasForeignKey(d => d.ChartId)
                    .HasConstraintName("FK_DashboardChartMapping_ChartName");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DashboardChartMapping)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_DashboardChartMapping_Users");
            });

            modelBuilder.Entity<DashboardConfigFields>(entity =>
            {
                entity.Property(e => e.FieldName).IsUnicode(false);

                entity.Property(e => e.Type).IsUnicode(false);
            });

            modelBuilder.Entity<DashboardUserConfig>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.Query).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.DashboardUserConfig)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_DashoardUserConfig_Users");
            });

            modelBuilder.Entity<Days>(entity =>
            {
                entity.Property(e => e.DayName).IsUnicode(false);
            });

            modelBuilder.Entity<DbPropertyTypes>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<Deal>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.AnnualRevenue).IsUnicode(false);

                entity.Property(e => e.AssignedName).IsUnicode(false);

                entity.Property(e => e.CancelReason).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.DealName).IsUnicode(false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Industry).IsUnicode(false);

                entity.Property(e => e.LeadCost).IsUnicode(false);

                entity.Property(e => e.LeadProvider).IsUnicode(false);

                entity.Property(e => e.NoOfEmployee).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.OppRequirementRemarks).IsUnicode(false);

                entity.Property(e => e.OppRequirements).IsUnicode(false);

                entity.Property(e => e.OrganizationName).IsUnicode(false);

                entity.Property(e => e.ProviderFaceBook).IsUnicode(false);

                entity.Property(e => e.ProviderInstagram).IsUnicode(false);

                entity.Property(e => e.ProviderLikedIn).IsUnicode(false);

                entity.Property(e => e.ProviderSnapChat).IsUnicode(false);

                entity.Property(e => e.ProviderTwitter).IsUnicode(false);

                entity.Property(e => e.ProviderWeChat).IsUnicode(false);

                entity.Property(e => e.ProviderWebsite).IsUnicode(false);

                entity.Property(e => e.ProviderYoutube).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.TimeFrame).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);

                entity.Property(e => e.TradeShowName).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.Value).IsUnicode(false);

                entity.Property(e => e.VisibleTo).IsUnicode(false);

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.CurrencyId)
                    .HasConstraintName("FK_Deal_Currency");

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_Deal_Lead");

                entity.HasOne(d => d.Reason)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.ReasonId)
                    .HasConstraintName("FK__Deal__ReasonId__27F8EE98");

                entity.HasOne(d => d.SecurityGroup)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.SecurityGroupId)
                    .HasConstraintName("FK__Deal__SecurityGr__28ED12D1");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Deal)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_Deal_Status");
            });

            modelBuilder.Entity<DealContact>(entity =>
            {
                entity.Property(e => e.Color).IsUnicode(false);

                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZoomId).IsUnicode(false);

                entity.HasOne(d => d.CalendarInviteTypeNavigation)
                    .WithMany(p => p.DealContact)
                    .HasForeignKey(d => d.CalendarInviteType)
                    .HasConstraintName("FK_DealContact_ChooseMethod");

                entity.HasOne(d => d.CompletedStatus)
                    .WithMany(p => p.DealContact)
                    .HasForeignKey(d => d.CompletedStatusId)
                    .HasConstraintName("FK_DealContact_CompletedStatus");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.DealContact)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_DealContact_ContactInformation");

                entity.HasOne(d => d.StepType)
                    .WithMany(p => p.DealContact)
                    .HasForeignKey(d => d.StepTypeId)
                    .HasConstraintName("FK_DealContact_StepTypes");
            });

            modelBuilder.Entity<DealContactNextStep>(entity =>
            {
                entity.Property(e => e.ColorCode).IsUnicode(false);

                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZoomId).IsUnicode(false);

                entity.HasOne(d => d.CalendarInviteTypeNavigation)
                    .WithMany(p => p.DealContactNextStep)
                    .HasForeignKey(d => d.CalendarInviteType)
                    .HasConstraintName("FK_DealContactNextStep_ChooseMethod");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.DealContactNextStep)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_DealContactNextStep_ContactInformation");

                entity.HasOne(d => d.DealContact)
                    .WithMany(p => p.DealContactNextStep)
                    .HasForeignKey(d => d.DealContactId)
                    .HasConstraintName("FK_DealContactNextStep_DealContact");

                entity.HasOne(d => d.StepType)
                    .WithMany(p => p.DealContactNextStep)
                    .HasForeignKey(d => d.StepTypeId)
                    .HasConstraintName("FK_DealContactNextStep_StepTypes");
            });

            modelBuilder.Entity<EmailGroup>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.EmailGroupName).IsUnicode(false);

                entity.Property(e => e.Emails).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<EmailTemplate>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.TemplateHtml).IsUnicode(false);

                entity.Property(e => e.TemplateJson).IsUnicode(false);

                entity.Property(e => e.TemplateName).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<EmailType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<EmployeeType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<EntityListOptions>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<EventCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.EventCost)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK_EventCost_EventShow");
            });

            modelBuilder.Entity<EventShow>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Industry).IsUnicode(false);

                entity.Property(e => e.Location).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.EventMode)
                    .WithMany(p => p.EventShow)
                    .HasForeignKey(d => d.EventModeId)
                    .HasConstraintName("FK_EventShow_EventMode");

                entity.HasOne(d => d.EventStatus)
                    .WithMany(p => p.EventShow)
                    .HasForeignKey(d => d.EventStatusId)
                    .HasConstraintName("FK__EventShow__Event__3552E9B6");

                entity.HasOne(d => d.Partner)
                    .WithMany(p => p.EventShow)
                    .HasForeignKey(d => d.PartnerId)
                    .HasConstraintName("FK_EventShow_Partner");

                entity.HasOne(d => d.Referral)
                    .WithMany(p => p.EventShow)
                    .HasForeignKey(d => d.ReferralId)
                    .HasConstraintName("FK_EventShow_Referral");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.EventShow)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK_EventShow_Vendor");
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.Property(e => e.GenderName).IsUnicode(false);
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.GroupName).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<HeaderChartMapping>(entity =>
            {
                entity.HasOne(d => d.Chart)
                    .WithMany(p => p.HeaderChartMapping)
                    .HasForeignKey(d => d.ChartId)
                    .HasConstraintName("FK_HeaderChartMapping_ChartName");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.HeaderChartMapping)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_HeaderChartMapping_Users");
            });

            modelBuilder.Entity<ImportException>(entity =>
            {
                entity.Property(e => e.BatchNumber).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.EntityName).IsUnicode(false);

                entity.Property(e => e.ErrorDescription).IsUnicode(false);

                entity.Property(e => e.FileName).IsUnicode(false);
            });

            modelBuilder.Entity<ImportSuccess>(entity =>
            {
                entity.Property(e => e.BatchNumber).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.EntityName).IsUnicode(false);

                entity.Property(e => e.FileName).IsUnicode(false);
            });

            modelBuilder.Entity<IndustryType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<K9ErpEntityDocSync>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<K9LeadEntityDocSync>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<LabelType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Lead>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.AnnualRevenue).IsUnicode(false);

                entity.Property(e => e.BatchNumber).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.EmailAddress).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.LeadName).IsUnicode(false);

                entity.Property(e => e.LeadProvider).IsUnicode(false);

                entity.Property(e => e.NoOfEmployee).IsUnicode(false);

                entity.Property(e => e.OrganizationName).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Currency)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.CurrencyId)
                    .HasConstraintName("FK_Lead_Currency");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK_Lead_EventShow");

                entity.HasOne(d => d.IndustryNavigation)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.Industry)
                    .HasConstraintName("FK_Lead_IndustryType");

                entity.HasOne(d => d.LeadStatusNavigation)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.LeadStatus)
                    .HasConstraintName("FK_Lead_LeadStatus");

                entity.HasOne(d => d.NotPayReferralNavigation)
                    .WithMany(p => p.LeadNotPayReferralNavigation)
                    .HasForeignKey(d => d.NotPayReferralId)
                    .HasConstraintName("FK_Lead_Vendor1");

                entity.HasOne(d => d.Origin)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.OriginId)
                    .HasConstraintName("FK_Lead_LeadOriginType");

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.Owner)
                    .HasConstraintName("FK_Lead_Users");

                entity.HasOne(d => d.Referral)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.ReferralId)
                    .HasConstraintName("FK_Lead_Referral");

                entity.HasOne(d => d.SecurityGroup)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.SecurityGroupId)
                    .HasConstraintName("FK__Lead__SecurityGr__3BFFE745");

                entity.HasOne(d => d.SocialMedia)
                    .WithMany(p => p.Lead)
                    .HasForeignKey(d => d.SocialMediaId)
                    .HasConstraintName("FK_Lead_SocialMediaType");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.LeadVendor)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK_Lead_Vendor");
            });

            modelBuilder.Entity<LeadContact>(entity =>
            {
                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.LeadContact)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_LeadContact_ContactInformation");

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.LeadContact)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_LeadContact_Lead");
            });

            modelBuilder.Entity<LeadEmail>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.LeadEmail)
                    .HasForeignKey(d => d.LeadId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Email_Lead");
            });

            modelBuilder.Entity<LeadGenEntityType>(entity =>
            {
                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.EntityType).IsUnicode(false);

                entity.Property(e => e.UserPermissionParentId).IsUnicode(false);
            });

            modelBuilder.Entity<LeadGroupMapping>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.LeadGroupMapping)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_LeadGroupMapping_UserGroups");

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.LeadGroupMapping)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_LeadGroupMapping_Leads");
            });

            modelBuilder.Entity<LeadLabels>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.LeadLabels)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_LeadLabels_Lead");

                entity.HasOne(d => d.LeadType)
                    .WithMany(p => p.LeadLabels)
                    .HasForeignKey(d => d.LeadTypeId)
                    .HasConstraintName("FK_LeadLabels_LeadLabels");
            });

            modelBuilder.Entity<LeadOriginType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<LeadPhoneNumber>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.LeadPhoneNumber)
                    .HasForeignKey(d => d.LeadId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PhoneNumber_PhoneNumber");
            });

            modelBuilder.Entity<LeadStatus>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<LeadTypes>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<LinePart>(entity =>
            {
                entity.HasOne(d => d.PartCatalog)
                    .WithMany(p => p.LinePart)
                    .HasForeignKey(d => d.PartCatalogId)
                    .HasConstraintName("FK__LinePart__PartCa__4E1E9780");

                entity.HasOne(d => d.Quote)
                    .WithMany(p => p.LinePart)
                    .HasForeignKey(d => d.QuoteId)
                    .HasConstraintName("FK__LinePart__QuoteI__4F12BBB9");
            });

            modelBuilder.Entity<MaterialCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.DealContact)
                    .WithMany(p => p.MaterialCost)
                    .HasForeignKey(d => d.DealContactId)
                    .HasConstraintName("FK_MaterialCost_DealContact");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.MaterialCost)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__MaterialC__Produ__5006DFF2");
            });

            modelBuilder.Entity<Networking>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Industry).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Cost)
                    .WithMany(p => p.Networking)
                    .HasForeignKey(d => d.CostId)
                    .HasConstraintName("FK_Networking_NetworkingCost");

                entity.HasOne(d => d.EventMeet)
                    .WithMany(p => p.Networking)
                    .HasForeignKey(d => d.EventMeetId)
                    .HasConstraintName("FK_Networking_NetworkingEventMeet");
            });

            modelBuilder.Entity<NetworkingCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<NetworkingEventMeet>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<NotesInformation>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                //entity.HasOne(d => d.EntityType)
                //    .WithMany(p => p.NotesInformation)
                //    .HasForeignKey(d => d.EntityTypeId)
                //    .HasConstraintName("FK_NotesInformation_LeadGenEntityType");
            });

            modelBuilder.Entity<Organization>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Label)
                    .WithMany(p => p.Organization)
                    .HasForeignKey(d => d.LabelId)
                    .HasConstraintName("FK_Organization_Lead");
            });

            modelBuilder.Entity<PartCatalog>(entity =>
            {
                entity.HasOne(d => d.Quote)
                    .WithMany(p => p.PartCatalog)
                    .HasForeignKey(d => d.QuoteId)
                    .HasConstraintName("FK__PartCatal__Quote__55BFB948");

                entity.HasOne(d => d.UomNavigation)
                    .WithMany(p => p.PartCatalog)
                    .HasForeignKey(d => d.Uomid)
                    .HasConstraintName("FK__PartCatal__UOMId__56B3DD81");
            });

            modelBuilder.Entity<Partner>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.SocialMediaLink).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZipCode).IsUnicode(false);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.PartnerNavigation)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK_Partner_EventShow");

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_Partner_Lead");

                entity.HasOne(d => d.Origin)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.OriginId)
                    .HasConstraintName("FK_Partner_LeadOriginType");

                entity.HasOne(d => d.PaymentModel)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.PaymentModelId)
                    .HasConstraintName("FK_Partner_PaymentMode");

                entity.HasOne(d => d.ProviderType)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.ProviderTypeId)
                    .HasConstraintName("FK_Partner_ProviderType");

                entity.HasOne(d => d.ReferralDropdown)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.ReferralDropdownId)
                    .HasConstraintName("FK__Partner__Referra__57A801BA");

                entity.HasOne(d => d.ReferralFee)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.ReferralFeeId)
                    .HasConstraintName("FK_Partner_ReferralFee");

                entity.HasOne(d => d.SecurityGroup)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.SecurityGroupId)
                    .HasConstraintName("FK__Partner__Securit__589C25F3");

                entity.HasOne(d => d.SocialMedia)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.SocialMediaId)
                    .HasConstraintName("FK_Partner_SocialMediaType");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.Partner)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK__Partner__VendorI__59904A2C");
            });

            modelBuilder.Entity<Permissions>(entity =>
            {
                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<PhoneNumberType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Pipeline>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<PipelineGroup>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.HasOne(d => d.PipelineGroupTypeNavigation)
                    .WithMany(p => p.PipelineGroup)
                    .HasForeignKey(d => d.PipelineGroupType)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PipelineGroup_PipelineGroupType");
            });

            modelBuilder.Entity<PipelineGroupType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Prority>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Quote>(entity =>
            {
                entity.Property(e => e.DocumentNumber).IsUnicode(false);

                entity.HasOne(d => d.AssignedToNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.AssignedToId)
                    .HasConstraintName("FK__Quote__AssignedT__6225902D");

                entity.HasOne(d => d.CostCenterNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.CostCenterId)
                    .HasConstraintName("FK__Quote__CostCente__6319B466");

                entity.HasOne(d => d.CustomerNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Quote__CustomerI__640DD89F");

                entity.HasOne(d => d.Deal)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.DealId)
                    .HasConstraintName("FK__Quote__DealId__6501FCD8");

                entity.HasOne(d => d.Discount)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.DiscountId)
                    .HasConstraintName("FK__Quote__DiscountI__65F62111");

                entity.HasOne(d => d.PaymentTermsNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.PaymentTermsId)
                    .HasConstraintName("FK__Quote__PaymentTe__66EA454A");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK__Quote__StatusId__67DE6983");

                entity.HasOne(d => d.TaxNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.TaxId)
                    .HasConstraintName("FK__Quote__TaxId__68D28DBC");

                entity.HasOne(d => d.TypeOfSaleNavigation)
                    .WithMany(p => p.Quote)
                    .HasForeignKey(d => d.TypeOfSaleId)
                    .HasConstraintName("FK__Quote__TypeOfSal__69C6B1F5");
            });

            modelBuilder.Entity<Recurrence>(entity =>
            {
                entity.HasOne(d => d.RecurrenceType)
                    .WithMany(p => p.Recurrence)
                    .HasForeignKey(d => d.RecurrenceTypeId)
                    .HasConstraintName("FK_Recurrence_RecurrenceType");
            });

            modelBuilder.Entity<RecurrenceDays>(entity =>
            {
                entity.HasOne(d => d.Day)
                    .WithMany(p => p.RecurrenceDays)
                    .HasForeignKey(d => d.DayId)
                    .HasConstraintName("FK_RecurrenceDays_Days");

                entity.HasOne(d => d.Recurrence)
                    .WithMany(p => p.RecurrenceDays)
                    .HasForeignKey(d => d.RecurrenceId)
                    .HasConstraintName("FK_RecurrenceDays_Recurrence");
            });

            modelBuilder.Entity<RecurrenceType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Referral>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.SocialMediaLink).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZipCode).IsUnicode(false);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.ReferralNavigation)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK_Referral_EventShow");

                entity.HasOne(d => d.LeadNavigation)
                    .WithMany(p => p.ReferralNavigation)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_Referral_Lead");

                entity.HasOne(d => d.Origin)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.OriginId)
                    .HasConstraintName("FK_Referral_LeadOriginType");

                entity.HasOne(d => d.PaymentModel)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.PaymentModelId)
                    .HasConstraintName("FK_Referral_PaymentMode");

                entity.HasOne(d => d.ProviderType)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.ProviderTypeId)
                    .HasConstraintName("FK_Referral_ProviderType");

                entity.HasOne(d => d.ReferralDropdown)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.ReferralDropdownId)
                    .HasConstraintName("FK__Referral__Referr__6D9742D9");

                entity.HasOne(d => d.ReferralFee)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.ReferralFeeId)
                    .HasConstraintName("FK_Referral_ReferralFee");

                entity.HasOne(d => d.SecurityGroup)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.SecurityGroupId)
                    .HasConstraintName("FK__Referral__Securi__6E8B6712");

                entity.HasOne(d => d.SocialMedia)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.SocialMediaId)
                    .HasConstraintName("FK_Referral_SocialMediaType");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.Referral)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK__Referral__Vendor__6F7F8B4B");
            });

            modelBuilder.Entity<RolePermissions>(entity =>
            {
                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolePermissions_Permissions");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolePermissions_Roles");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.Property(e => e.RoleName).IsUnicode(false);
            });

            modelBuilder.Entity<SearchCriteria>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<ServiceActionTypes>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<ServiceStatus>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Services>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.ApplicationNeeded).IsUnicode(false);

                entity.Property(e => e.ApplicationRemarks).IsUnicode(false);

                entity.Property(e => e.ApplicationRequirements).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.Color).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Remarks).IsUnicode(false);

                entity.Property(e => e.ServiceName).IsUnicode(false);

                entity.Property(e => e.ServiceNumber).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.Website).IsUnicode(false);

                entity.Property(e => e.Zipcode).IsUnicode(false);

                entity.HasOne(d => d.AssignedToNavigation)
                    .WithMany(p => p.ServicesAssignedToNavigation)
                    .HasForeignKey(d => d.AssignedTo)
                    .HasConstraintName("FK_Services_Users");

                entity.HasOne(d => d.Deal)
                    .WithMany(p => p.Services)
                    .HasForeignKey(d => d.DealId)
                    .HasConstraintName("FK__Services__DealId__7908F585");

                //entity.HasOne(d => d.Lead)
                //    .WithMany(p => p.Services)
                //    .HasForeignKey(d => d.LeadId)
                //    .HasConstraintName("FK_Services_Lead");

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.ServicesOwnerNavigation)
                    .HasForeignKey(d => d.Owner)
                    .HasConstraintName("FK_Services_Users1");
            });

            modelBuilder.Entity<Settings>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.Type).IsUnicode(false);
            });

            modelBuilder.Entity<SocialMediaType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<StepTypes>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<StepsContact>(entity =>
            {
                entity.Property(e => e.Color).IsUnicode(false);

                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZoomId).IsUnicode(false);

                entity.HasOne(d => d.CalendarInviteTypeNavigation)
                    .WithMany(p => p.StepsContact)
                    .HasForeignKey(d => d.CalendarInviteType)
                    .HasConstraintName("FK_StepsContact_ChooseMethod");

                entity.HasOne(d => d.CompletedStatus)
                    .WithMany(p => p.StepsContact)
                    .HasForeignKey(d => d.CompletedStatusId)
                    .HasConstraintName("FK_StepsContact_CompletedStatus");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.StepsContact)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_StepsContact_ContactInformation");

                entity.HasOne(d => d.StepType)
                    .WithMany(p => p.StepsContact)
                    .HasForeignKey(d => d.StepTypeId)
                    .HasConstraintName("FK_StepsContact_StepTypes");

                entity.HasOne(d => d.StepsMaterialCost)
                    .WithMany(p => p.StepsContact)
                    .HasForeignKey(d => d.StepsMaterialCostId)
                    .HasConstraintName("FK_StepsContact_StepsMaterialCost");

                entity.HasOne(d => d.StepsTimeCost)
                    .WithMany(p => p.StepsContact)
                    .HasForeignKey(d => d.StepsTimeCostId)
                    .HasConstraintName("FK_StepsContact_StepsTimeCost");
            });

            modelBuilder.Entity<StepsContactNextStep>(entity =>
            {
                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZoomId).IsUnicode(false);

                entity.HasOne(d => d.CalendarInviteTypeNavigation)
                    .WithMany(p => p.StepsContactNextStep)
                    .HasForeignKey(d => d.CalendarInviteType)
                    .HasConstraintName("FK_StepsContactNextStep_ChooseMethod");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.StepsContactNextStep)
                    .HasForeignKey(d => d.ContactId)
                    .HasConstraintName("FK_StepsContactNextStep_ContactInformation");

                entity.HasOne(d => d.StepType)
                    .WithMany(p => p.StepsContactNextStep)
                    .HasForeignKey(d => d.StepTypeId)
                    .HasConstraintName("FK_StepsContactNextStep_StepTypes");

                entity.HasOne(d => d.StepsContact)
                    .WithMany(p => p.StepsContactNextStep)
                    .HasForeignKey(d => d.StepsContactId)
                    .HasConstraintName("FK_StepsContactNextStep_StepsContact");
            });

            modelBuilder.Entity<StepsMaterialCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<StepsTimeCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<SubIssueType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<TemplateList>(entity =>
            {
                entity.Property(e => e.TemplateHtml).IsUnicode(false);

                entity.Property(e => e.TemplateName).IsUnicode(false);
            });

            modelBuilder.Entity<TicketType>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<TimeCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.DealContact)
                    .WithMany(p => p.TimeCost)
                    .HasForeignKey(d => d.DealContactId)
                    .HasConstraintName("FK_TimeCost_DealContact");
            });

            modelBuilder.Entity<Todo>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.Subject).IsUnicode(false);

                entity.Property(e => e.TodoName).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.AssignedToNavigation)
                    .WithMany(p => p.Todo)
                    .HasForeignKey(d => d.AssignedTo)
                    .HasConstraintName("FK_Todo_Assigned_Users");

                entity.HasOne(d => d.Importance)
                    .WithMany(p => p.Todo)
                    .HasForeignKey(d => d.ImportanceId)
                    .HasConstraintName("FK__Todo__Importance__093F5D4E");

                entity.HasOne(d => d.Recurrence)
                    .WithMany(p => p.Todo)
                    .HasForeignKey(d => d.RecurrenceId)
                    .HasConstraintName("FK_Todo_Recurrence");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.Todo)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK_Todo_Vendor");
            });

            modelBuilder.Entity<TwoFactorType>(entity =>
            {
                entity.Property(e => e.TwoFactorName).IsUnicode(false);
            });
            modelBuilder.Entity<TempPatient>(entity =>
            {
                entity.Property(e => e.AtencionDate).IsUnicode(false);

                entity.Property(e => e.AttenDate).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.ColonoscopyData).IsUnicode(false);

                entity.Property(e => e.EmergencyContact).IsUnicode(false);

                entity.Property(e => e.FatherHealthProblem).IsUnicode(false);

                entity.Property(e => e.FirmaDelPaciente).IsUnicode(false);

                entity.Property(e => e.HomePhone).IsUnicode(false);

                entity.Property(e => e.MaritalStatus).IsUnicode(false);

                entity.Property(e => e.Medication).IsUnicode(false);

                entity.Property(e => e.MotherHealthPproblem).IsUnicode(false);

                entity.Property(e => e.NombreDelPaciente).IsUnicode(false);

                entity.Property(e => e.OtherMedicalProblems).IsUnicode(false);

                entity.Property(e => e.PastSurgeriesAndHospitalization).IsUnicode(false);

                entity.Property(e => e.PatientName).IsUnicode(false);

                entity.Property(e => e.PatientPrintedName).IsUnicode(false);

                entity.Property(e => e.PatientSignature).IsUnicode(false);

                entity.Property(e => e.SiblingHealthProblem).IsUnicode(false);

                entity.Property(e => e.Telephone).IsUnicode(false);

                entity.Property(e => e.Type).IsUnicode(false);

                entity.Property(e => e.Zipcode).IsUnicode(false);
            });

            modelBuilder.Entity<UserCost>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Partner)
                    .WithMany(p => p.UserCost)
                    .HasForeignKey(d => d.PartnerId)
                    .HasConstraintName("FK_UserCost_Partner");

                entity.HasOne(d => d.Referral)
                    .WithMany(p => p.UserCost)
                    .HasForeignKey(d => d.ReferralId)
                    .HasConstraintName("FK_UserCost_Referral");

                entity.HasOne(d => d.UserCostDropdown)
                    .WithMany(p => p.UserCost)
                    .HasForeignKey(d => d.UserCostDropdownId)
                    .HasConstraintName("FK__UserCost__UserCo__0D0FEE32");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCost)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserCost_Users");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.UserCost)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK_UserCost_Vendor");
            });

            modelBuilder.Entity<UserGoal>(entity =>
            {
                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserGoal)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserGoal_Users");
            });

            modelBuilder.Entity<UserGroupMapping>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.UserGroupMapping)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_UserGroupMapping_UserGroups");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserGroupMapping)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserGroupMapping_Users");
            });

            modelBuilder.Entity<UserGroups>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);
            });

            modelBuilder.Entity<UserQuoteChartMapping>(entity =>
            {
                entity.HasOne(d => d.Chart)
                    .WithMany(p => p.UserQuoteChartMapping)
                    .HasForeignKey(d => d.ChartId)
                    .HasConstraintName("FK_UserQuoteChartMapping_ChartName");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserQuoteChartMapping)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserQuoteChartMapping_Users");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.AboutMe).IsUnicode(false);

                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.EmailSignature).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.GmailPassword).IsUnicode(false);

                entity.Property(e => e.GmailUserName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.Skills).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.UserName).IsUnicode(false);

                entity.Property(e => e.UserTheme).IsUnicode(false);

                entity.HasOne(d => d.EmployeeType)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.EmployeeTypeId)
                    .HasConstraintName("FK_Users_EmployeeType");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_Users_UserGroups");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_Users_Roles");

                entity.HasOne(d => d.TwoFactorTypeNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.TwoFactorType)
                    .HasConstraintName("FK_Users_TwoFactorType");
            });

            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.SocialMediaLink).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.VendorNavigation)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK_Vendor_EventShow");

                entity.HasOne(d => d.Lead)
                    .WithMany(p => p.VendorNavigation)
                    .HasForeignKey(d => d.LeadId)
                    .HasConstraintName("FK_Vendor_Lead");

                entity.HasOne(d => d.Origin)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.OriginId)
                    .HasConstraintName("FK_Vendor_LeadOriginType");

                entity.HasOne(d => d.PaymentModel)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.PaymentModelId)
                    .HasConstraintName("FK_Vendor_PaymentMode");

                entity.HasOne(d => d.ProviderType)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.ProviderTypeId)
                    .HasConstraintName("FK_Vendor_ProviderType");

                entity.HasOne(d => d.ReferralDropdown)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.ReferralDropdownId)
                    .HasConstraintName("FK__Vendor__Referral__1A69E950");

                entity.HasOne(d => d.ReferralFee)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.ReferralFeeId)
                    .HasConstraintName("FK_Vendor_ReferralFee");

                entity.HasOne(d => d.SecurityGroup)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.SecurityGroupId)
                    .HasConstraintName("FK__Vendor__Security__1B5E0D89");

                entity.HasOne(d => d.SocialMedia)
                    .WithMany(p => p.Vendor)
                    .HasForeignKey(d => d.SocialMediaId)
                    .HasConstraintName("FK_Vendor_SocialMediaType");
            });

            modelBuilder.Entity<VwContactInformation>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VwContactInformation");

                entity.Property(e => e.Address).IsUnicode(false);

                entity.Property(e => e.BatchNumber).IsUnicode(false);

                entity.Property(e => e.City).IsUnicode(false);

                entity.Property(e => e.ContactName).IsUnicode(false);

                entity.Property(e => e.ContactTitle).IsUnicode(false);

                entity.Property(e => e.Country).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.EntityType).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.GenderName).IsUnicode(false);

                entity.Property(e => e.LastName).IsUnicode(false);

                entity.Property(e => e.LinkedInProfile).IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.State).IsUnicode(false);

                entity.Property(e => e.UpdatedBy).IsUnicode(false);

                entity.Property(e => e.ZipCode).IsUnicode(false);
            });

            modelBuilder.Entity<VwDashboardChartConfig>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VwDashboardChartConfig");

                entity.Property(e => e.ChartConfigName).IsUnicode(false);

                entity.Property(e => e.DashboardConfigName).IsUnicode(false);

                entity.Property(e => e.Query).IsUnicode(false);
            });

            modelBuilder.Entity<VwOpportunities>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VwOpportunities");

                entity.Property(e => e.AssignedTo).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.DealName).IsUnicode(false);

                entity.Property(e => e.DealStatus).IsUnicode(false);

                entity.Property(e => e.Pipeline).IsUnicode(false);

                entity.Property(e => e.PipelineGroup).IsUnicode(false);
            });

            modelBuilder.Entity<VwServices>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VwServices");

                entity.Property(e => e.AssignedTo).IsUnicode(false);

                entity.Property(e => e.CompanyName).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.ServiceName).IsUnicode(false);

                entity.Property(e => e.ServiceNumber).IsUnicode(false);

                entity.Property(e=>e.LeadName).IsUnicode(false);

                entity.Property(e => e.LeadNumber).IsUnicode(false);
            });

            modelBuilder.Entity<VwEvent>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VwEvent");

                entity.Property(e => e.EventName).IsUnicode(false);

                //entity.Property(e => e.Owner).IsUnicode(false);
            });
            modelBuilder.Entity<VwTemplate>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("VwTemplate");

                entity.Property(e => e.AppointmentNumber).IsUnicode(false);

            });

            modelBuilder.Query<EventRecurrenceDto>();
            modelBuilder.Query<CodeIndent>();
            modelBuilder.Query<AssignedNameDto>();
            modelBuilder.Query<EntityNameDto>();
            modelBuilder.Query<DealReportsDto>();
            modelBuilder.Query<UserDealReport>();
            modelBuilder.Query<EmailTemplateName>();
            modelBuilder.Query<SearchValues>();
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
