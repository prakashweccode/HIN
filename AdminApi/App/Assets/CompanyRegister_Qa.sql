/*Dont remove this line*/
USE [#%dbName%#]


/****** Object:  Table [dbo].[DashboardUserConfig]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DashboardUserConfig](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[Query] [varchar](max) NULL,
	[Inactive] [bit] NULL,
	[UserId] [int] NULL,
	[CreatedOn] [date] NULL,
	[UpdatedOn] [date] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[UpdatedById] [int] NULL,
	[ReportId] [int] NULL,
 CONSTRAINT [PK_DashoardUserConfig] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChartConfig]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChartConfig](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[ChartType] [int] NULL,
	[DashboardConfigId] [int] NULL,
	[GroupById] [int] NULL,
	[AggregateOneId] [int] NULL,
	[AggregateTwoId] [int] NULL,
	[AggregateOperationId] [int] NULL,
	[Size] [int] NULL,
	[DisplayChart] [bit] NULL,
	[DisplayLabel] [bit] NULL,
 CONSTRAINT [PK_ChartConfig] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwDashboardChartConfig]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwDashboardChartConfig]
AS
select DC.Id, DC.Name as DashboardConfigName, DC.Query, DC.Inactive, DC.UserId, CC.ChartType,CC.Name as ChartConfigName,
CC.AggregateOneId, CC.AggregateTwoId, CC.AggregateOperationId,CC.GroupById, CC.Size, CC.DisplayChart from ChartConfig CC
left join DashboardUserConfig DC on
DC.Id = CC.DashboardConfigId
GO
/****** Object:  Table [dbo].[PipelineGroup]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PipelineGroup](
	[PipelineGroupId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[IsDefault] [bit] NULL,
	[PipelineGroupType] [int] NULL,
 CONSTRAINT [PK_PipelineGroup] PRIMARY KEY CLUSTERED 
(
	[PipelineGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pipeline]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pipeline](
	[PipelineId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Probability] [int] NULL,
	[IsRotting] [bit] NULL,
	[RottingDays] [int] NULL,
	[IsDefault] [bit] NULL,
	[DisplayOrder] [int] NULL,
	[PipelineGroupId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_Pipeline] PRIMARY KEY CLUSTERED 
(
	[PipelineId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Deal]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Deal](
	[DealId] [int] IDENTITY(1,1) NOT NULL,
	[OrganizationName] [varchar](100) NULL,
	[Title] [varchar](150) NULL,
	[Value] [varchar](50) NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[ExpectedCloseDate] [datetime] NULL,
	[LeadId] [int] NULL,
	[Owner] [int] NULL,
	[VisibleTo] [varchar](150) NULL,
	[Phone] [int] NULL,
	[Email] [varchar](150) NULL,
	[ContactId] [int] NULL,
	[OrganizationId] [int] NULL,
	[CurrencyId] [int] NULL,
	[DealName] [varchar](150) NULL,
	[Percentage] [nvarchar](50) NULL,
	[Color] [nvarchar](50) NULL,
	[NextStepDate] [datetime] NULL,
	[EstimationDate] [datetime] NULL,
	[LeadProvider] [varchar](150) NULL,
	[LeadCost] [varchar](150) NULL,
	[ExpectedRevenue] [nvarchar](50) NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[Website] [nvarchar](max) NULL,
	[CompanyName] [varchar](200) NULL,
	[TradeShowName] [varchar](200) NULL,
	[TradeShowDate] [datetime] NULL,
	[OriginsWebsite] [nvarchar](max) NULL,
	[OriginsLinkedIn] [nvarchar](max) NULL,
	[IsFromExistingCustomer] [bit] NULL,
	[IsFromExistingLead] [bit] NULL,
	[NoOfEmployee] [varchar](150) NULL,
	[AnnualRevenue] [varchar](150) NULL,
	[Industry] [varchar](200) NULL,
	[AssignedTo] [int] NULL,
	[AssignedName] [varchar](150) NULL,
	[StatusId] [int] NULL,
	[Application] [nvarchar](250) NULL,
	[KeyFeatures] [nvarchar](250) NULL,
	[PriceExpectation] [int] NULL,
	[TimeFrame] [varchar](150) NULL,
	[Evaluated] [nvarchar](250) NULL,
	[Deployment] [nvarchar](250) NULL,
	[Shopping] [nvarchar](250) NULL,
	[EventId] [int] NULL,
	[CancelReason] [varchar](max) NULL,
	[DealNumber] [nvarchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[AssignedType] [nvarchar](250) NULL,
	[SecurityGroupId] [int] NULL,
	[ActualAmount] [decimal](18, 0) NULL,
	[ReasonId] [int] NULL,
	[OriginalPercentage] [nvarchar](50) NULL,
	[StatusDate] [datetime] NULL,
	[OpportunityProviderId] [int] NULL,
	[ProviderEvenShowId] [int] NULL,
	[ProviderSocialMediaId] [int] NULL,
	[ProviderInstagram] [varchar](max) NULL,
	[ProviderFaceBook] [varchar](max) NULL,
	[ProviderYoutube] [varchar](max) NULL,
	[ProviderWeChat] [varchar](max) NULL,
	[ProviderTwitter] [varchar](max) NULL,
	[ProviderLikedIn] [varchar](max) NULL,
	[ProviderSnapChat] [varchar](max) NULL,
	[ProviderVendorId] [int] NULL,
	[ProviderWebsite] [varchar](max) NULL,
	[ProviderNetworkingId] [int] NULL,
	[ProviderNetworkingContactId] [int] NULL,
	[ProviderParterId] [int] NULL,
	[ProviderReferralId] [int] NULL,
	[ProviderLeadId] [int] NULL,
	[ProviderInternalSalesId] [int] NULL,
	[IsRecurrence] [bit] NULL,
	[ExpectedRevenuId] [int] NULL,
	[ExpectedRevenuDuration] [int] NULL,
	[ExpectedRevenuPerDuration] [decimal](18, 0) NULL,
	[Notes] [varchar](max) NULL,
	[OppRequirements] [varchar](max) NULL,
	[OppRequirementRemarks] [varchar](max) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
 CONSTRAINT [PK_Deal] PRIMARY KEY CLUSTERED 
(
	[DealId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](256) NULL,
	[IsEmailConfirmed] [bit] NULL,
	[FirstName] [varchar](75) NULL,
	[LastName] [varchar](75) NULL,
	[UserName] [varchar](100) NULL,
	[Password] [nvarchar](max) NULL,
	[PhoneNumber] [bigint] NULL,
	[IsPhoneNumberVerified] [bit] NULL,
	[AccessFailedCount] [int] NULL,
	[IsLocked] [bit] NULL,
	[IsTwoFactorEnabled] [bit] NULL,
	[TwoFactorCode] [nvarchar](100) NULL,
	[TwoFactorExpiryTime] [datetime] NULL,
	[TwoFactorType] [int] NULL,
	[RoleId] [int] NULL,
	[IsActive] [bit] NULL,
	[LastLogin] [datetime] NULL,
	[CellNumber] [bigint] NULL,
	[Skills] [varchar](150) NULL,
	[CostPerHour] [bigint] NULL,
	[GroupId] [int] NULL,
	[UserTheme] [varchar](max) NULL,
	[EmployeeTypeId] [int] NULL,
	[CountryId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[Commission] [int] NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[StateId] [int] NULL,
	[Country] [varchar](150) NULL,
	[CityId] [int] NULL,
	[IsSales] [bit] NULL,
	[IsAdmin] [bit] NULL,
	[AboutMe] [varchar](max) NULL,
	[EmailSignature] [varchar](max) NULL,
	[AdminPassword] [nvarchar](50) NULL,
	[ImageURL] [nvarchar](max) NULL,
	[GmailUserName] [varchar](256) NULL,
	[GmailPassword] [varchar](max) NULL,
	[BranchId] [int] NULL,
	[Signature] [varchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwOpportunities]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwOpportunities] AS
   SELECT DL.DealId, DL.DealNumber, DL.DealName, US.UserName  as AssignedTo, SS.Name as DealStatus,    
   P.Name as Pipeline, PG.Name as PipelineGroup, DL.CreatedOn, DL.CreatedBy FROM Deal DL   
   LEFT JOIN Users US ON DL.AssignedTo = US.UserId   LEFT JOIN [Status] SS ON DL.StatusId = SS.Id   
   LEFT JOIN [PipelineGroup] PG ON DL.PipelineGroupId = PG.PipelineGroupId   
   LEFT JOIN [Pipeline] P ON DL.PipelineId = P.PipelineId
GO
/****** Object:  Table [dbo].[Services]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Services](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ServiceNumber] [varchar](20) NULL,
	[ServiceName] [varchar](150) NULL,
	[Type] [int] NULL,
	[StatusId] [int] NULL,
	[AssignedTo] [int] NULL,
	[Owner] [int] NULL,
	[Color] [varchar](20) NULL,
	[SecurityGroup] [int] NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[CancelReason] [int] NULL,
	[Remarks] [varchar](max) NULL,
	[DealId] [int] NULL,
	[Percentage] [decimal](18, 0) NULL,
	[Address] [varchar](250) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[Zipcode] [varchar](20) NULL,
	[Website] [varchar](max) NULL,
	[ApplicationNeeded] [varchar](150) NULL,
	[ApplicationRequirements] [varchar](max) NULL,
	[ApplicationRemarks] [varchar](max) NULL,
	[ExpectedCost] [decimal](18, 0) NULL,
	[ActualCost] [decimal](18, 0) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](150) NULL,
	[CreatedById] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](150) NULL,
	[UpdatedById] [int] NULL,
	[ProrityId] [int] NULL,
	[TicketTypeId] [int] NULL,
	[SubIssueTypeId] [int] NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[LeadId] [int] NULL,
	[EventId] [int] NULL,
	[ScheduleStart] [datetime] NULL,
	[ScheduleEnd] [datetime] NULL,
	[RecurrenceId] [int] NULL,
	[IsRecurrence] [bit] NULL,
	[ScheduleHour] [int] NULL,
	[ScheduleMinute] [int] NULL,
	[ServiceDate] [datetime] NULL,
	[ServiceScheduleDate] [datetime] NULL,
	[IsServiceCustom] [bit] NULL,
	[ServiceStartDate] [datetime] NULL,
	[ServiceEndDate] [datetime] NULL,
	[WindowDate] [datetime] NULL,
	[IsWindowCustom] [bit] NULL,
	[WindowStartDate] [datetime] NULL,
	[ScheduleRemainderDate] [datetime] NULL,
	[ScheduleRemainderTime] [time](7) NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lead]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lead](
	[LeadId] [int] IDENTITY(1,1) NOT NULL,
	[LeadName] [varchar](200) NULL,
	[CompanyName] [varchar](200) NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[Website] [nvarchar](max) NULL,
	[AnnualRevenue] [varchar](150) NULL,
	[NoOfEmployee] [varchar](150) NULL,
	[Industry] [int] NULL,
	[Owner] [int] NULL,
	[ContactId] [int] NULL,
	[LeadProvider] [varchar](150) NULL,
	[LeadCost] [decimal](18, 0) NULL,
	[ExpectedRevenue] [decimal](18, 0) NULL,
	[OrganizationId] [int] NULL,
	[OrganizationName] [varchar](100) NULL,
	[CurrencyId] [int] NULL,
	[IsCommercial] [bit] NULL,
	[Status] [int] NULL,
	[OriginId] [int] NULL,
	[SocialMediaId] [int] NULL,
	[SocialMediaLink] [nvarchar](max) NULL,
	[NotPayReferralId] [int] NULL,
	[NotPayReferral] [nvarchar](max) NULL,
	[OriginsLinkedIn] [nvarchar](max) NULL,
	[OriginNotes] [nvarchar](max) NULL,
	[OriginsWebsite] [nvarchar](max) NULL,
	[OriginsDate] [datetime] NULL,
	[EventId] [int] NULL,
	[VendorId] [int] NULL,
	[OpportunityCount] [int] NULL,
	[NetworkingId] [int] NULL,
	[Inactive] [bit] NULL,
	[NetworkContactId] [int] NULL,
	[LeadNumber] [nvarchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[LeadStatus] [int] NULL,
	[PartnerId] [int] NULL,
	[ReferralId] [int] NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[SecurityGroupId] [int] NULL,
	[Reason] [nvarchar](max) NULL,
	[LeadFunnelStatus] [int] NULL,
	[OriginLeadId] [int] NULL,
	[InternalSales] [int] NULL,
	[BatchNumber] [varchar](50) NULL,
	[FirstName] [varchar](150) NULL,
	[LastName] [varchar](150) NULL,
	[ContactTitle] [varchar](150) NULL,
	[EmailAddress] [varchar](256) NULL,
	[CellNumber] [nvarchar](15) NULL,
	[OfficeNumber] [nvarchar](15) NULL,
	[MiddleName] [varchar](150) NULL,
	[PatientLastName] [varchar](150) NULL,
	[SecondMiddleName] [varchar](150) NULL,
	[SecondLastName] [varchar](150) NULL,
	[GenderId] [int] NULL,
	[DOB] [date] NULL,
	[Occupation] [varchar](max) NULL,
	[Age] [int] NULL,
 CONSTRAINT [PK_Lead] PRIMARY KEY CLUSTERED 
(
	[LeadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwServices]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[VwServices] AS
Select S.Id, S.ServiceNumber, S.ServiceName, S.Type, AU.UserName as AssignedTo, L.CompanyName, S.CreatedOn, S.CreatedBy, L.LeadName,L.LeadNumber from [Services] S 
Left Join Users AU On S.AssignedTo = AU.UserId
Left Join Users OU On S.Owner = OU.UserId
Left Join Pipeline P On S.PipelineId = P.PipelineId
Left Join PipelineGroup PG On S.PipelineGroupId = PG.PipelineGroupId
Left Join Lead L On S.LeadId = L.LeadId
GO
/****** Object:  Table [dbo].[Template]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Template](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PatientName] [varchar](250) NULL,
	[AppointmentId] [int] NULL,
	[Sex] [varchar](25) NULL,
	[Age] [varchar](25) NULL,
	[ChiefCompliant] [varchar](max) NULL,
	[Date] [datetime] NULL,
	[DateOfAccident] [datetime] NULL,
	[HistoryOfIllness] [varchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[TemplateId] [int] NULL,
	[DraftHtml] [varchar](max) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Template] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwTemplate]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[VwTemplate] AS
Select t.[Id],s.[ServiceNumber] as AppointmentNumber,t.CreatedBy,t.CreatedOn,t.Status from [Template] t
left Join Services S on t.AppointmentId = s.Id
GO
/****** Object:  Table [dbo].[LeadGenEntityType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadGenEntityType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EntityType] [varchar](250) NULL,
	[Description] [varchar](max) NULL,
	[UserPermissionParentId] [varchar](40) NULL,
	[IsShowScreen] [bit] NULL,
 CONSTRAINT [PK_LeadGenEntityType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[DisplayName] [varchar](256) NULL,
	[IsActive] [bit] NULL,
	[EntityTypeId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoryValues]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoryValues](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryId] [int] NULL,
	[EntityId] [int] NULL,
	[EntityTypeId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_CategoryValues] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Group]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Group](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [varchar](150) NULL,
	[Inactive] [bit] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK_ContactGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContactInformation]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContactInformation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](150) NULL,
	[LastName] [varchar](150) NULL,
	[ContactName] [varchar](200) NULL,
	[ContactTitle] [varchar](max) NULL,
	[OfficeNumber] [nvarchar](15) NULL,
	[Extension] [nvarchar](10) NULL,
	[FaxNumber] [nvarchar](15) NULL,
	[CellNumber] [nvarchar](15) NULL,
	[Email] [nvarchar](256) NULL,
	[Type] [int] NULL,
	[EntityId] [int] NULL,
	[LinkedInProfile] [varchar](256) NULL,
	[Notes] [varchar](max) NULL,
	[IsAdditionalInfo] [bit] NULL,
	[IsMember] [bit] NULL,
	[IsGuest] [bit] NULL,
	[Gender] [int] NULL,
	[Inactive] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[BatchNumber] [varchar](50) NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[ZipCode] [varchar](10) NULL,
	[ContactGroupId] [int] NULL,
	[ContactInfoNumber] [nvarchar](50) NULL,
	[ContactImage] [varchar](max) NULL,
	[OrginId] [int] NULL,
	[LeadId] [int] NULL,
	[VendorId] [int] NULL,
	[PartnerId] [int] NULL,
	[IsPrimary] [bit] NULL,
	[Website] [varchar](max) NULL,
	[ReferralId] [int] NULL,
	[ConsultantId] [int] NULL,
	[MiddleName] [varchar](150) NULL,
	[SecondMiddleName] [varchar](150) NULL,
	[SecondLastName] [varchar](150) NULL,
 CONSTRAINT [PK_ContactInformation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gender]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gender](
	[GenderId] [int] IDENTITY(1,1) NOT NULL,
	[GenderName] [varchar](50) NULL,
 CONSTRAINT [PK_Gender] PRIMARY KEY CLUSTERED 
(
	[GenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContactGroup]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContactGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupId] [int] NULL,
	[ContactId] [int] NULL,
 CONSTRAINT [PK_ContactGroup_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwContactInformation]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[VwContactInformation]
AS
select CI.Id, CI.FirstName, CI.LastName, CI.Extension, CI.FaxNumber, CI.EntityId, CI.Type, CI.LinkedInProfile, CI.Notes, CI.IsAdditionalInfo,
CI.IsMember, CI.IsGuest, CI.Gender, CI.Inactive, CI.UpdatedOn, CI.UpdatedBy, CI.CreatedOn, CI.CreatedBy, CI.CreatedById, CI.UpdatedById,
CI.BatchNumber, CI.Address, CI.ContactInfoNumber,
CI.ContactName, CI.ContactTitle, CI.OfficeNumber, CI.CellNumber, CI.Email, LT.EntityType, G.GenderName, CI.City, CI.State, CI.Country, CI.ZipCode,
STUFF((SELECT ',' + (Convert(varchar(Max), C.Name)) from CategoryValues CV LEFT JOIN Category C ON C.Id = CV.CategoryId
WHERE CI.Id = CV.EntityId and C.EntityTypeId = 1
FOR XML PATH('')), 1,1,'') as Affiliates,
STUFF((SELECT ',' + (Convert(varchar(Max), C.Name)) from CategoryValues CV LEFT JOIN Category C ON C.Id = CV.CategoryId
WHERE CI.Id = CV.EntityId and C.EntityTypeId = 2
FOR XML PATH('')), 1,1,'') as Skills,
STUFF((SELECT ',' + (Convert(varchar(Max), C.Id)) from CategoryValues CV LEFT JOIN Category C ON C.Id = CV.CategoryId
WHERE CI.Id = CV.EntityId and C.EntityTypeId = 1
FOR XML PATH('')), 1,1,'') as AffiliateIds,
STUFF((SELECT ',' + (Convert(varchar(Max), C.Id)) from CategoryValues CV LEFT JOIN Category C ON C.Id = CV.CategoryId
WHERE CI.Id = CV.EntityId and C.EntityTypeId = 2
FOR XML PATH('')), 1,1,'') as SkillIds,
STUFF((SELECT ',' + (Convert(varchar(Max), G.GroupName)) from ContactGroup CG LEFT JOIN [Group] G ON G.Id = CG.GroupId
WHERE CG.ContactId = CI.Id
FOR XML PATH('')), 1,1,'') as Groups,
STUFF((SELECT ',' + (Convert(varchar(Max), G.Id)) from ContactGroup CG LEFT JOIN [Group] G ON G.Id = CG.GroupId
WHERE CG.ContactId = CI.Id
FOR XML PATH('')), 1,1,'') as GroupIds
from ContactInformation CI
left join LeadGenEntityType LT on CI.Type = LT.Id
left join Gender G on CI.Gender = G.GenderId

GO
/****** Object:  Table [dbo].[Event]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Event](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EventName] [varchar](200) NULL,
	[EventNumber] [nvarchar](50) NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[EventFunnelStatus] [int] NULL,
	[PatientNumber] [nvarchar](50) NULL,
	[PatientName] [varchar](200) NULL,
	[EventType] [int] NULL,
	[SecurityGroupId] [int] NULL,
	[Remarks] [nvarchar](max) NULL,
	[Owner] [int] NULL,
	[StatusId] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[Color] [nvarchar](50) NULL,
	[EventCreated] [datetime] NULL,
	[EventClosedDate] [datetime] NULL,
	[PracticeId] [int] NULL,
	[PatientBatchNumber] [int] NULL,
	[PaperworkCompletion] [int] NULL,
	[CaseNumber] [varchar](50) NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VwEvent]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VwEvent] AS
Select e.[Id],e.[EventName],e.[EventNumber],e.[CreatedOn], e.CreatedBy from [Event] e


GO
/****** Object:  Table [dbo].[CompanyRegister]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompanyRegister](
	[RegisterId] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [varchar](max) NULL,
	[PhoneNumber] [bigint] NULL,
	[Extension] [nvarchar](50) NULL,
	[FaxNumber] [nvarchar](50) NULL,
	[ContactFirstName] [varchar](50) NULL,
	[ContactMiddleName] [varchar](50) NULL,
	[ContactLastName] [varchar](50) NULL,
	[ContactTitle] [varchar](max) NULL,
	[CellNumber] [bigint] NULL,
	[Email] [nvarchar](256) NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[ZipCode] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[Password] [nvarchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[MaximumUser] [int] NULL,
	[UserName] [varchar](256) NULL,
	[Name] [varchar](60) NULL,
	[IsActive] [bit] NULL,
	[EncryptedKey] [varchar](256) NULL,
	[OfflineAppKey] [varchar](256) NULL,
	[SupportEmail] [varchar](250) NULL,
	[CompanyLogo] [varchar](max) NULL,
	[CompanyPracticeCode] [varchar](150) NULL,
 CONSTRAINT [PK_UserRegister] PRIMARY KEY CLUSTERED 
(
	[RegisterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[VW_CompanyRegister]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE View  [dbo].[VW_CompanyRegister] as
select cr.RegisterId, cr.CompanyName, cr.Email from CompanyRegister cr
GO
/****** Object:  Table [dbo].[AssignedToDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssignedToDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_AssignedToDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Audit]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Audit](
	[AuditId] [int] IDENTITY(1,1) NOT NULL,
	[KeyId] [int] NOT NULL,
	[TableName] [varchar](100) NULL,
	[KeyValues] [varchar](150) NULL,
	[AuditDate] [datetime] NULL,
	[OldValues] [varchar](max) NULL,
	[NewValues] [varchar](max) NULL,
	[UpdatedBy] [varchar](75) NULL,
 CONSTRAINT [PK_Audit_Users] PRIMARY KEY CLUSTERED 
(
	[AuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChartName]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChartName](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_ChartName] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ChooseMethod]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChooseMethod](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
 CONSTRAINT [PK_ChooseMethod] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[StateId] [int] NOT NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompanyEFileConfig]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompanyEFileConfig](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NULL,
	[HostName] [varchar](256) NULL,
	[GrantType] [varchar](50) NULL,
	[ClientId] [varchar](max) NULL,
	[ClientSecret] [varchar](max) NULL,
	[Username] [varchar](256) NULL,
	[Password] [varchar](max) NULL,
	[Domain] [varchar](256) NULL,
	[Token] [varchar](max) NULL,
 CONSTRAINT [PK_CompanyEFileConfig] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompanySettings]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompanySettings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CompanyId] [int] NULL,
	[SettingsId] [int] NULL,
	[Value] [nvarchar](150) NULL,
 CONSTRAINT [PK_CompanySettings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CompletedStatus]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CompletedStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_CompletedStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Config]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Config](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[description] [nvarchar](200) NULL,
	[value] [nvarchar](max) NULL,
	[isProtected] [bit] NULL,
 CONSTRAINT [PK_Config] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContactInformationEmailMapping]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContactInformationEmailMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactInformationId] [int] NULL,
	[Email] [nvarchar](max) NULL,
 CONSTRAINT [PK_ContactInformationEmailMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContactTitle]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContactTitle](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_ContactTitle] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CostCenterDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CostCenterDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_CostCenterDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Country]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Country](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[SortName] [varchar](5) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[PhoneCode] [int] NOT NULL,
 CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Currency]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Currency](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Symbol] [nvarchar](50) NULL,
	[DecimalPoints] [int] NULL,
	[Code] [nvarchar](50) NULL,
 CONSTRAINT [PK_Currency] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomerDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_CustomerDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomerPriceList]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomerPriceList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NULL,
	[PriceListId] [int] NULL,
 CONSTRAINT [PK_CustomerPriceList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomFieldListItems]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomFieldListItems](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomPropertyId] [int] NULL,
	[Description] [varchar](250) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_CustomFieldListItems] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomProperty]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomProperty](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PropertyName] [varchar](250) NULL,
	[PropertyValue] [varchar](max) NULL,
	[PropertyType] [int] NULL,
	[IsRequired] [bit] NULL,
	[IsImportant] [bit] NULL,
	[IsVisible] [bit] NULL,
	[EntityTypeId] [int] NULL,
	[IsRight] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[ColumnSize] [int] NULL,
	[IdHtml] [varchar](30) NULL,
 CONSTRAINT [PK_LeadCustomProperty] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomPropertyValues]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomPropertyValues](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CustomPropertyId] [int] NULL,
	[PropertyValue] [nvarchar](max) NULL,
	[EntityId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_CustomPropertyValues] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DashboardChartMapping]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DashboardChartMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[ChartId] [int] NULL,
 CONSTRAINT [PK_DashboardChartMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DashboardConfigFields]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DashboardConfigFields](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FieldName] [varchar](150) NULL,
	[Type] [varchar](100) NULL,
	[Inactive] [bit] NULL,
	[Entity] [int] NULL,
 CONSTRAINT [PK_DashboardConfigFields] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DashBoardQueries]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DashBoardQueries](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FieldName] [varchar](150) NULL,
	[CriteriaName] [varchar](150) NULL,
	[FromValue] [varchar](250) NULL,
	[ToValue] [varchar](250) NULL,
	[FieldType] [varchar](100) NULL,
	[DashboardConfigId] [int] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[CreatedById] [int] NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK_UserDashBoardQueries] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Days]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Days](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DayName] [varchar](50) NULL,
	[DisplayOrder] [int] NULL,
 CONSTRAINT [PK_Days] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DbPropertyTypes]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DbPropertyTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[Description] [varchar](max) NULL,
	[IsActive] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_DbPropertyTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DealContact]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DealContact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DealId] [int] NULL,
	[EntityTypeId] [int] NULL,
	[ContactId] [int] NULL,
	[ContactName] [varchar](200) NULL,
	[CalendarInviteType] [int] NULL,
	[ZoomId] [varchar](200) NULL,
	[CellNumber] [nvarchar](50) NULL,
	[OfficeNumber] [nvarchar](50) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Email] [nvarchar](250) NULL,
	[AssignedTo] [int] NULL,
	[SalesMan] [int] NULL,
	[Notes] [varchar](max) NULL,
	[ContactTitle] [varchar](max) NULL,
	[CompletedStatusId] [int] NULL,
	[Color] [varchar](50) NULL,
	[StepTypeId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[QuickNotes] [int] NULL,
	[Other] [nvarchar](max) NULL,
 CONSTRAINT [PK_DealContact] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DealContactNextStep]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DealContactNextStep](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactId] [int] NULL,
	[ContactName] [varchar](200) NULL,
	[CalendarInviteType] [int] NULL,
	[ZoomId] [varchar](200) NULL,
	[CellNumber] [nvarchar](50) NULL,
	[Email] [nvarchar](250) NULL,
	[OfficeNumber] [nvarchar](50) NULL,
	[AssignedTo] [int] NULL,
	[Notes] [varchar](max) NULL,
	[ContactTitle] [varchar](max) NULL,
	[StepTypeId] [int] NULL,
	[StartDate] [datetime] NULL,
	[StatusId] [int] NULL,
	[Salesman] [int] NULL,
	[DealContactId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[QuickNotes] [int] NULL,
	[ColorCode] [varchar](25) NULL,
	[DealId] [int] NULL,
	[EndDate] [datetime] NULL,
	[Other] [nvarchar](max) NULL,
 CONSTRAINT [PK_DealContactNextStep] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiscountDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiscountDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_DiscountDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailGroup]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailGroup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EmailGroupName] [varchar](150) NULL,
	[Emails] [varchar](max) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK_EmailGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailHistory]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailHistory](
	[EmailId] [int] IDENTITY(1,1) NOT NULL,
	[EmailFrom] [nvarchar](250) NULL,
	[EmailTo] [nvarchar](250) NULL,
	[EmailSubject] [nvarchar](max) NULL,
	[EmailBody] [nvarchar](max) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [nvarchar](max) NULL,
	[EmailCC] [nvarchar](250) NULL,
 CONSTRAINT [PK_EmailHistory] PRIMARY KEY CLUSTERED 
(
	[EmailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailTemplate]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailTemplate](
	[TemplateId] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](150) NULL,
	[TemplateHTML] [varchar](max) NULL,
	[TemplateJSON] [varchar](max) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK_EmailTemplate] PRIMARY KEY CLUSTERED 
(
	[TemplateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmailType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmailType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_EmailType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmployeeType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmployeeType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_EmployeeType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EntityListOptions]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntityListOptions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](max) NULL,
	[Title] [varchar](150) NULL,
	[Type] [int] NULL,
	[Inactive] [bit] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedById] [int] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedById] [int] NULL,
 CONSTRAINT [PK_EntityListOptions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventCost]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventCost](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EventId] [int] NULL,
	[Travel] [decimal](18, 0) NULL,
	[Show] [decimal](18, 0) NULL,
	[Notes] [varchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_EventCost] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventMode]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventMode](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_EventMode] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventShow]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventShow](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Address] [varchar](max) NULL,
	[Website] [nvarchar](max) NULL,
	[City] [nvarchar](150) NULL,
	[State] [nvarchar](150) NULL,
	[Country] [nvarchar](150) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[Name] [nvarchar](150) NULL,
	[VendorId] [int] NULL,
	[Location] [varchar](200) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[IsWalkin] [bit] NULL,
	[EventNumber] [nvarchar](50) NULL,
	[EventModeId] [int] NULL,
	[Telephone] [nvarchar](50) NULL,
	[Industry] [varchar](max) NULL,
	[Inactive] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[PartnerId] [int] NULL,
	[ReferralId] [int] NULL,
	[EventStatusId] [int] NULL,
	[EntityTypeId] [int] NULL,
	[EntityId] [int] NULL,
 CONSTRAINT [PK_EventShow] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventStatus]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_EventStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_EventType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FunnelUserList]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FunnelUserList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[FunnelId] [int] NULL,
	[CreatedOn] [date] NULL,
	[CreatedBy] [varchar](150) NULL,
	[UpdatedOn] [date] NULL,
	[UpdatedBy] [varchar](150) NULL,
 CONSTRAINT [PK_FunnelUserList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HeaderChartMapping]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HeaderChartMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[ChartId] [int] NULL,
 CONSTRAINT [PK_HeaderChartMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Importance]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Importance](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_Importance] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportException]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportException](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RowNumber] [int] NULL,
	[ErrorDescription] [varchar](max) NULL,
	[BatchNumber] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[EntityName] [varchar](100) NULL,
	[FileName] [varchar](max) NULL,
	[CreatedBy] [varchar](256) NULL,
 CONSTRAINT [PK_ImportException] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImportSuccess]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImportSuccess](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RowNumber] [int] NULL,
	[Description] [varchar](max) NULL,
	[BatchNumber] [varchar](50) NULL,
	[CreatedOn] [datetime] NULL,
	[EntityName] [varchar](100) NULL,
	[FileName] [varchar](max) NULL,
	[CreatedBy] [varchar](256) NULL,
 CONSTRAINT [PK_ImportSuccess] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IndustryType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IndustryType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
 CONSTRAINT [PK_IndustryType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[k9ErpEntityDocSync]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[k9ErpEntityDocSync](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[K9ErpId] [int] NOT NULL,
	[K9LeadId] [int] NOT NULL,
	[type] [int] NOT NULL,
	[category] [nvarchar](20) NOT NULL,
	[status] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[K9ERPSetting]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[K9ERPSetting](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ERPCompanyName] [nvarchar](250) NULL,
	[ERPPassword] [nvarchar](250) NULL,
	[ERPName] [nvarchar](250) NULL,
 CONSTRAINT [PK_K9ERPSetting] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[k9LeadEntityDocSync]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[k9LeadEntityDocSync](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[K9ErpId] [int] NOT NULL,
	[K9LeadId] [int] NOT NULL,
	[type] [int] NOT NULL,
	[category] [nvarchar](20) NOT NULL,
	[status] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LabelType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LabelType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_LabelType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadContact]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadContact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NULL,
	[ContactId] [int] NULL,
	[ContactName] [varchar](200) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_LeadContact] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadEmail]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadEmail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NOT NULL,
	[Email] [nvarchar](256) NULL,
	[TypeId] [int] NOT NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_Email] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadGroupMapping]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadGroupMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NULL,
	[GroupId] [int] NULL,
 CONSTRAINT [PK_LeadGroupMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadLabels]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadLabels](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NULL,
	[LeadTypeId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_LeadLabels_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadOriginType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadOriginType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_LeadOriginType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadPhoneNumber]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadPhoneNumber](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NOT NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[TypeId] [int] NOT NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_PhoneNumber] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadStatus]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_LeadStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LeadTypes]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LeadTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_LeadLabels] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LinePart]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LinePart](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[QuoteId] [int] NULL,
	[PartCatalogId] [int] NULL,
	[PartDescription] [nvarchar](max) NULL,
	[Quantity] [int] NULL,
	[UnitPrice] [int] NULL,
	[Tax] [bit] NULL,
	[TotalPrice] [int] NULL,
	[DiscountByLine] [int] NULL,
	[Available] [int] NULL,
	[ProfitPercentage] [int] NULL,
	[ProfitDollar] [int] NULL,
	[Profit] [int] NULL,
	[PriceDiscount] [int] NULL,
	[ExpectedShipDate] [datetime] NULL,
 CONSTRAINT [PK_LinePart] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Location]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Location](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
 CONSTRAINT [PK_Location] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MaterialCost]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MaterialCost](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NULL,
	[Price] [int] NULL,
	[Notes] [nvarchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[ProductId] [int] NULL,
	[DealContactId] [int] NULL,
 CONSTRAINT [PK_MaterialCost] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Networking]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Networking](
	[NetworkingId] [int] IDENTITY(1,1) NOT NULL,
	[NetworkingName] [nvarchar](150) NULL,
	[NetworkingNumber] [nvarchar](150) NULL,
	[Address] [nvarchar](150) NULL,
	[City] [nvarchar](150) NULL,
	[State] [nvarchar](150) NULL,
	[Zipcode] [nvarchar](50) NULL,
	[Website] [nvarchar](150) NULL,
	[Telephone] [nvarchar](50) NULL,
	[Fax] [nvarchar](150) NULL,
	[Country] [nvarchar](150) NULL,
	[Inactive] [bit] NULL,
	[Industry] [varchar](150) NULL,
	[CostId] [int] NULL,
	[EventMeetId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_Networking] PRIMARY KEY CLUSTERED 
(
	[NetworkingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NetworkingCost]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NetworkingCost](
	[NetworkingCostId] [int] IDENTITY(1,1) NOT NULL,
	[Yearly] [decimal](18, 0) NULL,
	[Monthly] [decimal](18, 0) NULL,
	[Weekly] [decimal](18, 0) NULL,
	[PerEvent] [decimal](18, 0) NULL,
	[TravelCost] [decimal](18, 0) NULL,
	[YearlyNote] [nvarchar](500) NULL,
	[MonthlyNote] [nvarchar](500) NULL,
	[WeeklyNote] [nvarchar](500) NULL,
	[PerEventNote] [nvarchar](500) NULL,
	[TravelCostNote] [nvarchar](500) NULL,
	[Note] [nvarchar](500) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_NetworkingCost] PRIMARY KEY CLUSTERED 
(
	[NetworkingCostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NetworkingEventMeet]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NetworkingEventMeet](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[YearlyDate] [date] NULL,
	[MonthlyDate] [date] NULL,
	[WeeklyDate] [date] NULL,
	[YearlyTime] [time](7) NULL,
	[MonthlyTime] [time](7) NULL,
	[WeeklyTime] [time](7) NULL,
	[Notes] [varchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_NetworkingEventMeet] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NotesInformation]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NotesInformation](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](max) NULL,
	[EntityTypeId] [int] NULL,
	[EntityId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_NotesInformation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NoteTemplate]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NoteTemplate](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[NoteContent] [nvarchar](500) NULL,
 CONSTRAINT [PK_NoteTemplate] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Organization]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organization](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LeadId] [int] NULL,
	[Name] [varchar](max) NULL,
	[LabelId] [int] NULL,
	[Address] [varchar](max) NULL,
	[Website] [nvarchar](max) NULL,
	[City] [nvarchar](150) NULL,
	[State] [nvarchar](150) NULL,
	[Country] [nvarchar](150) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_Organization] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaperworkCompletion]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaperworkCompletion](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_PaperworkCompletion] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PartCatalog]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartCatalog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PartCode] [nvarchar](250) NULL,
	[PartDescription] [nvarchar](250) NULL,
	[UOM] [nvarchar](250) NULL,
	[EstimateCost] [decimal](18, 0) NULL,
	[SalesPrice] [decimal](18, 0) NULL,
	[IsNonTaxable] [bit] NULL,
	[UOMId] [int] NULL,
	[QuoteId] [int] NULL,
 CONSTRAINT [PK_PartCatalog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Partner]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partner](
	[PartnerId] [int] IDENTITY(1,1) NOT NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[ZipCode] [varchar](10) NULL,
	[Website] [nvarchar](max) NULL,
	[Name] [nvarchar](150) NULL,
	[IsReferral] [bit] NULL,
	[ReferralTypeId] [int] NULL,
	[ReferralFees] [decimal](18, 0) NULL,
	[ReccuringTypeId] [int] NULL,
	[ReferralFeeId] [int] NULL,
	[PaymentModelId] [int] NULL,
	[PartnerNumber] [nvarchar](50) NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[Telephone] [nvarchar](50) NULL,
	[Industry] [int] NULL,
	[EndOfContract] [datetime] NULL,
	[Inactive] [bit] NULL,
	[IsNotPayReferral] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[OriginId] [int] NULL,
	[SocialMediaId] [int] NULL,
	[SocialMediaLink] [varchar](max) NULL,
	[EventId] [int] NULL,
	[OriginsWebsite] [nvarchar](max) NULL,
	[NetworkingId] [int] NULL,
	[NetworkContactId] [int] NULL,
	[NotPayReferralId] [int] NULL,
	[OriginsDate] [datetime] NULL,
	[OriginNotes] [nvarchar](max) NULL,
	[LeadId] [int] NULL,
	[ProviderTypeId] [int] NULL,
	[IsPerReferralFee] [bit] NULL,
	[VendorId] [int] NULL,
	[ReferralDropdownId] [int] NULL,
	[SecurityGroupId] [int] NULL,
	[AssignedTo] [int] NULL,
	[Reason] [nvarchar](max) NULL,
	[PartnerStatus] [int] NULL,
	[CompanyName] [varchar](150) NULL,
 CONSTRAINT [PK_Partner] PRIMARY KEY CLUSTERED 
(
	[PartnerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentMode]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentMode](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_PaymentMode] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentTermsDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentTermsDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_PaymentTermsDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[Description] [varchar](256) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Permissions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PhoneNumberType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PhoneNumberType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_PhoneNumberType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PipelineGroupType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PipelineGroupType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_PipelineGroupType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PipelineMap]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PipelineMap](
	[PipelineMapId] [int] IDENTITY(1,1) NOT NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[DisplayOrder] [int] NULL,
 CONSTRAINT [PK_PipelineMap] PRIMARY KEY CLUSTERED 
(
	[PipelineMapId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PriceList]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PriceList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](250) NULL,
	[Description] [varchar](250) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
 CONSTRAINT [PK_PriceList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prority]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prority](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_Prority] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProviderStatus]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProviderStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_ProviderStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProviderType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProviderType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_ProviderType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Quote]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Quote](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Customer] [nvarchar](250) NULL,
	[Date] [datetime] NULL,
	[QuoteDescription] [nvarchar](250) NULL,
	[DocumentNumber] [varchar](50) NULL,
	[Status] [nvarchar](250) NULL,
	[AssignedTo] [int] NULL,
	[SalesRep] [int] NULL,
	[PaymentTerms] [int] NULL,
	[TypeOfSale] [int] NULL,
	[Tax] [int] NULL,
	[ProfitDollar] [int] NULL,
	[Total] [int] NULL,
	[ProfitPercentage] [int] NULL,
	[TotalAfterDiscount] [int] NULL,
	[TotalTax] [int] NULL,
	[FinalPrice] [int] NULL,
	[Pieces] [int] NULL,
	[ExpectedClose] [int] NULL,
	[ExpirationDate] [datetime] NULL,
	[Probability] [int] NULL,
	[CostCenter] [int] NULL,
	[CustomerId] [int] NULL,
	[PaymentTermsId] [int] NULL,
	[TypeOfSaleId] [int] NULL,
	[DiscountId] [int] NULL,
	[CostCenterId] [int] NULL,
	[StatusId] [int] NULL,
	[TaxId] [int] NULL,
	[AssignedToId] [int] NULL,
	[DealId] [int] NULL,
	[IdentYear] [int] NULL,
	[LastIdentNo] [int] NULL,
	[DiscountValue] [decimal](18, 0) NULL,
	[DiscountType] [int] NULL,
 CONSTRAINT [PK_Quote] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reason]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reason](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_Reason] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recurrence]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recurrence](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [date] NULL,
	[StartTime] [time](7) NULL,
	[EndDate] [date] NULL,
	[EndTime] [time](7) NULL,
	[Duration] [int] NULL,
	[RecurrenceTypeId] [int] NULL,
	[RecursOn] [date] NULL,
	[RecurrenceInterval] [int] NULL,
	[RecurrenceIntervalDay] [int] NULL,
	[RecurrenceIntervalMonth] [int] NULL,
	[RecurrenceEndType] [int] NULL,
	[RecurrenceEndInterval] [int] NULL,
	[RecurrenceIntervalHour] [int] NULL,
	[RecurrenceIntervalMinutes] [int] NULL,
 CONSTRAINT [PK_Reccurence] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecurrenceDays]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecurrenceDays](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DayId] [int] NULL,
	[RecurrenceId] [int] NULL,
 CONSTRAINT [PK_RecurrenceDays] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecurrenceType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecurrenceType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
 CONSTRAINT [PK_RecurrenceType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Referral]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Referral](
	[ReferralId] [int] IDENTITY(1,1) NOT NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[ZipCode] [varchar](10) NULL,
	[Website] [nvarchar](max) NULL,
	[Name] [nvarchar](150) NULL,
	[IsReferral] [bit] NULL,
	[ReferralTypeId] [int] NULL,
	[ReferralFees] [decimal](18, 0) NULL,
	[ReccuringTypeId] [int] NULL,
	[ReferralFeeId] [int] NULL,
	[PaymentModelId] [int] NULL,
	[ReferralNumber] [nvarchar](50) NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[Telephone] [nvarchar](50) NULL,
	[Industry] [int] NULL,
	[EndOfContract] [datetime] NULL,
	[Inactive] [bit] NULL,
	[IsNotPayReferral] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[OriginId] [int] NULL,
	[SocialMediaId] [int] NULL,
	[SocialMediaLink] [varchar](max) NULL,
	[EventId] [int] NULL,
	[OriginsWebsite] [nvarchar](max) NULL,
	[NetworkingId] [int] NULL,
	[NetworkContactId] [int] NULL,
	[NotPayReferralId] [int] NULL,
	[OriginsDate] [datetime] NULL,
	[OriginNotes] [nvarchar](max) NULL,
	[LeadId] [int] NULL,
	[ProviderTypeId] [int] NULL,
	[IsPerReferralFee] [bit] NULL,
	[VendorId] [int] NULL,
	[ReferralDropdownId] [int] NULL,
	[SecurityGroupId] [int] NULL,
	[AssignedTo] [int] NULL,
	[Reason] [nvarchar](max) NULL,
	[ReferralStatus] [int] NULL,
	[Email] [nvarchar](max) NULL,
	[IsPayCommission] [bit] NULL,
	[CompanyName] [varchar](150) NULL,
 CONSTRAINT [PK_Referral] PRIMARY KEY CLUSTERED 
(
	[ReferralId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReferralDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReferralDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_ReferralDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReferralFee]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReferralFee](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
 CONSTRAINT [PK_ReferralFee] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolePermissions]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolePermissions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PermissionId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[IsEnabled] [bit] NULL,
 CONSTRAINT [PK_RolePermissions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SearchCriteria]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SearchCriteria](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[Inactive] [bit] NULL,
	[Type] [int] NULL,
 CONSTRAINT [PK_SearchCriteria] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceActionTypes]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceActionTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_ServiceActionTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceStatus]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceStatus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_ServiceStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Settings]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Settings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[Type] [varchar](150) NULL,
 CONSTRAINT [PK_Settings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SocialMediaType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SocialMediaType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_SocialMediaType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[State]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[State](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NOT NULL,
	[CountryId] [int] NOT NULL,
 CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StatusDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_StatusDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepsContact]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepsContact](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EntityId] [int] NULL,
	[EntityTypeId] [int] NULL,
	[ContactId] [int] NULL,
	[ContactName] [varchar](200) NULL,
	[CalendarInviteType] [int] NULL,
	[ZoomId] [varchar](200) NULL,
	[CellNumber] [nvarchar](50) NULL,
	[OfficeNumber] [nvarchar](50) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Email] [nvarchar](250) NULL,
	[AssignedTo] [int] NULL,
	[SalesMan] [int] NULL,
	[Notes] [varchar](max) NULL,
	[ContactTitle] [varchar](max) NULL,
	[CompletedStatusId] [int] NULL,
	[StepsTimeCostId] [int] NULL,
	[StepsMaterialCostId] [int] NULL,
	[Color] [varchar](50) NULL,
	[StepTypeId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_VendorContact] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepsContactNextStep]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepsContactNextStep](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactId] [int] NULL,
	[ContactName] [varchar](200) NULL,
	[CalendarInviteType] [int] NULL,
	[ZoomId] [varchar](200) NULL,
	[CellNumber] [nvarchar](50) NULL,
	[Email] [nvarchar](250) NULL,
	[OfficeNumber] [nvarchar](50) NULL,
	[AssignedTo] [int] NULL,
	[Notes] [varchar](max) NULL,
	[DateTime] [datetime] NULL,
	[ContactTitle] [varchar](max) NULL,
	[StepTypeId] [int] NULL,
	[StartDate] [datetime] NULL,
	[StatusId] [int] NULL,
	[Salesman] [int] NULL,
	[StepsContactId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_VendorContactNextStep] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepsMaterialCost]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepsMaterialCost](
	[MaterialCostId] [int] IDENTITY(1,1) NOT NULL,
	[Product] [nvarchar](max) NULL,
	[Quantity] [int] NULL,
	[Price] [int] NULL,
	[Notes] [nvarchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_StepsMaterialCost] PRIMARY KEY CLUSTERED 
(
	[MaterialCostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepsTimeCost]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepsTimeCost](
	[TimeCostId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
	[Skill] [nvarchar](150) NULL,
	[Cost] [int] NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[TotalTime] [decimal](18, 0) NULL,
	[Notes] [nvarchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_StepsTimeCost] PRIMARY KEY CLUSTERED 
(
	[TimeCostId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StepTypes]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StepTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_StepTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubIssueType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubIssueType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_SubIssueType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaxDropdown]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaxDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_TaxDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TemplateList]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TemplateList](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](250) NULL,
	[TemplateHtml] [varchar](max) NULL,
	[TemplatePage] [varchar](max) NULL,
 CONSTRAINT [PK_TemplateList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TempPatient]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TempPatient](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PatientName] [varchar](100) NULL,
	[Address] [nvarchar](max) NULL,
	[City] [varchar](100) NULL,
	[State] [nvarchar](50) NULL,
	[Zipcode] [varchar](50) NULL,
	[Age] [int] NULL,
	[Gender] [bit] NULL,
	[DOB] [date] NULL,
	[HomePhone] [varchar](25) NULL,
	[CellPhone] [nvarchar](25) NULL,
	[MaritalStatus] [varchar](25) NULL,
	[EmailAddress] [nvarchar](100) NULL,
	[EmergencyContact] [varchar](100) NULL,
	[Telephone] [varchar](25) NULL,
	[Allergies] [nvarchar](max) NULL,
	[NKA] [bit] NULL,
	[Hypertension] [bit] NULL,
	[Liverdisease] [bit] NULL,
	[Diabetes] [bit] NULL,
	[InsulinDependent] [bit] NULL,
	[Cancer] [bit] NULL,
	[HeartDisease] [bit] NULL,
	[KidneyDisease] [bit] NULL,
	[ThyroidDisease] [bit] NULL,
	[Type] [varchar](250) NULL,
	[OtherMedicalProblems] [varchar](max) NULL,
	[PastSurgeriesAndHospitalization] [varchar](max) NULL,
	[Medication] [varchar](300) NULL,
	[BloodTransfusion] [bit] NULL,
	[Sedentary] [bit] NULL,
	[MildExercise] [bit] NULL,
	[RegularVigorius] [bit] NULL,
	[DrinkAlcohol] [bit] NULL,
	[ConvernedDrink] [bit] NULL,
	[UseTobocco] [bit] NULL,
	[StreetDrugs] [bit] NULL,
	[StreetDrugNeedle] [bit] NULL,
	[SexuallyActive] [bit] NULL,
	[Contraception] [bit] NULL,
	[LiveAlone] [bit] NULL,
	[FrequentlyFalls] [bit] NULL,
	[Colonoscopy] [bit] NULL,
	[ColonoscopyData] [varchar](max) NULL,
	[FatherHealthProblem] [varchar](250) NULL,
	[FatherAge] [int] NULL,
	[MotherHealthPProblem] [varchar](250) NULL,
	[MotherAge] [int] NULL,
	[siblingHealthProblem] [varchar](250) NULL,
	[siblingAge] [int] NULL,
	[PatientPrintedName] [varchar](250) NULL,
	[Date] [date] NULL,
	[PatientSignature] [varchar](max) NULL,
	[NombreDelPaciente] [varchar](100) NULL,
	[Fecha] [date] NULL,
	[FirmaDelPaciente] [varchar](max) NULL,
	[PatientAttenSign] [varchar](max) NULL,
	[AttenDate] [varchar](25) NULL,
	[FirmaDelAtencion] [varchar](max) NULL,
	[AtencionDate] [varchar](100) NULL,
	[CreatedOn] [date] NULL,
	[UpdatedOn] [date] NULL,
	[CreatedBy] [nvarchar](250) NULL,
	[UpdatedBy] [nvarchar](250) NULL,
	[CreatedById] [int] NULL,
	[UpdatedById] [int] NULL,
	[IsPatientApproved] [bit] NULL,
	[G] [varchar](150) NULL,
	[P] [varchar](150) NULL,
	[A] [varchar](150) NULL,
	[LMP] [varchar](150) NULL,
	[Mamogram] [varchar](150) NULL,
	[PapSmear] [varchar](150) NULL,
	[LastName] [varchar](150) NULL,
	[PacksPerDay] [varchar](150) NULL,
	[Years] [varchar](150) NULL,
	[YearsToQuit] [varchar](150) NULL,
	[ContraceptionData] [varchar](150) NULL,
	[BloodTransfusionData] [varchar](250) NULL,
	[DrinkAlcoholData] [varchar](250) NULL,
	[Asthma] [bit] NULL,
	[MentalDisorder] [bit] NULL,
	[AttentionAgree] [bit] NULL,
	[AtencionAgree] [bit] NULL,
	[IsConsentEn] [bit] NULL,
	[IsCONSENTIMIENTO] [bit] NULL,
 CONSTRAINT [PK_TempPatient] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TicketType]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TicketType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](max) NULL,
 CONSTRAINT [PK_TicketType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TimeCost]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeCost](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
	[Skill] [nvarchar](150) NULL,
	[Cost] [int] NULL,
	[StartTime] [datetime] NULL,
	[EndTime] [datetime] NULL,
	[TotalTime] [decimal](18, 0) NULL,
	[Notes] [nvarchar](max) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[DealContactId] [int] NULL,
 CONSTRAINT [PK_TimeCost] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Todo]    Script Date: 9/8/2023 3:48:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Todo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TodoName] [varchar](150) NULL,
	[Subject] [varchar](250) NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Color] [nvarchar](20) NULL,
	[VendorId] [int] NULL,
	[AssignedTo] [int] NULL,
	[CompletedBy] [int] NULL,
	[Notes] [varchar](max) NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[IsRecurrence] [bit] NULL,
	[RecurrenceId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[ImportanceId] [int] NULL,
	[LocationTitle] [nvarchar](max) NULL,
	[EntityTypeId] [int] NULL,
	[EntityId] [int] NULL,
	[SecurityGroupId] [int] NULL,
	[TodoNumber] [nvarchar](50) NULL,
	[IsDone] [bit] NULL,
	[IsCopied] [bit] NULL,
 CONSTRAINT [PK_Todo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TwoFactorType]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TwoFactorType](
	[TwoFactorId] [int] IDENTITY(1,1) NOT NULL,
	[TwoFactorName] [varchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_TwoFactorType] PRIMARY KEY CLUSTERED 
(
	[TwoFactorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TypeSaleDropdown]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TypeSaleDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_TypeSaleDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UOM]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UOM](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_UOM] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCost]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCost](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsPerHour] [bit] NULL,
	[PerHourCost] [decimal](18, 0) NULL,
	[IsPerMonth] [bit] NULL,
	[PerMonthCost] [decimal](18, 0) NULL,
	[PerMonthTotalHours] [int] NULL,
	[IsPerLead] [bit] NULL,
	[PerLeadCost] [decimal](18, 0) NULL,
	[IsPerPaidInvoice] [bit] NULL,
	[PerPaidInvoiceCost] [decimal](18, 0) NULL,
	[IsFullTime] [bit] NULL,
	[FullTimeCost] [decimal](18, 0) NULL,
	[FullTimeHours] [int] NULL,
	[IsPartTime] [bit] NULL,
	[PartTimeCost] [decimal](18, 0) NULL,
	[PartTimeHours] [int] NULL,
	[UserId] [int] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[VendorId] [int] NULL,
	[PartnerId] [int] NULL,
	[ReferralId] [int] NULL,
	[UserCostDropdownId] [int] NULL,
 CONSTRAINT [PK_UserCost] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserCostDropdown]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserCostDropdown](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
 CONSTRAINT [PK_UserCostDropdown] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGoal]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGoal](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AvarageSalePrice] [decimal](18, 0) NULL,
	[MinimalGoalAmount] [decimal](18, 0) NULL,
	[GoodRevenueGoalAmount] [decimal](18, 0) NULL,
	[GreatRevenueGoalAmount] [decimal](18, 0) NULL,
	[MinimalGoalLead] [int] NULL,
	[GoodRevenueGoalLead] [int] NULL,
	[GreatRevenueGoalLead] [int] NULL,
	[UserId] [int] NULL,
	[ClosingRatioInterval] [int] NULL,
 CONSTRAINT [PK_UserGoal] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGroupMapping]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroupMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[GroupId] [int] NULL,
 CONSTRAINT [PK_UserGroupMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGroups]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroups](
	[UserGroupId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
	[Description] [varchar](256) NULL,
	[IsActive] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
 CONSTRAINT [PK_UserGroups] PRIMARY KEY CLUSTERED 
(
	[UserGroupId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserPermission]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserPermission](
	[Parent] [nvarchar](20) NULL,
	[Name] [nvarchar](100) NULL,
	[IdHtml] [nvarchar](20) NULL,
	[IsMenuEntry] [bit] NULL,
	[UrlPath] [nvarchar](100) NULL,
	[MenuOrder] [int] NULL,
	[Id] [nvarchar](40) NOT NULL,
	[UrlPathForm] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserQuoteChartMapping]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserQuoteChartMapping](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[ChartId] [int] NULL,
 CONSTRAINT [PK_UserQuoteChartMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRole]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](150) NULL,
 CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersGroupsPermission]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersGroupsPermission](
	[IdGroup] [int] NOT NULL,
	[IdPermis] [nvarchar](20) NULL,
	[StatGrant] [bit] NOT NULL,
	[StatRead] [bit] NOT NULL,
	[StatHide] [bit] NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendor]    Script Date: 9/8/2023 3:48:15 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendor](
	[VendorId] [int] IDENTITY(1,1) NOT NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](150) NULL,
	[State] [varchar](150) NULL,
	[Country] [varchar](150) NULL,
	[ZipCode] [nvarchar](10) NULL,
	[Website] [nvarchar](max) NULL,
	[Name] [nvarchar](150) NULL,
	[IsReferral] [bit] NULL,
	[ReferralTypeId] [int] NULL,
	[ReferralFees] [decimal](18, 0) NULL,
	[ReccuringTypeId] [int] NULL,
	[ReferralFeeId] [int] NULL,
	[PaymentModelId] [int] NULL,
	[VendorNumber] [nvarchar](50) NULL,
	[PipelineGroupId] [int] NULL,
	[PipelineId] [int] NULL,
	[Telephone] [nvarchar](50) NULL,
	[Industry] [int] NULL,
	[EndOfContract] [datetime] NULL,
	[Inactive] [bit] NULL,
	[IsNotPayReferral] [bit] NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [varchar](256) NULL,
	[UpdatedById] [int] NULL,
	[CreatedOn] [datetime] NULL,
	[CreatedBy] [varchar](256) NULL,
	[CreatedById] [int] NULL,
	[OriginId] [int] NULL,
	[SocialMediaId] [int] NULL,
	[SocialMediaLink] [varchar](max) NULL,
	[EventId] [int] NULL,
	[OriginsWebsite] [nvarchar](max) NULL,
	[NetworkingId] [int] NULL,
	[NetworkContactId] [int] NULL,
	[NotPayReferralId] [int] NULL,
	[OriginsDate] [datetime] NULL,
	[OriginNotes] [nvarchar](max) NULL,
	[LeadId] [int] NULL,
	[ProviderTypeId] [int] NULL,
	[IsPerReferralFee] [bit] NULL,
	[ReferralDropdownId] [int] NULL,
	[SecurityGroupId] [int] NULL,
	[AssignedTo] [int] NULL,
	[Reason] [nvarchar](max) NULL,
	[VendorStatus] [int] NULL,
	[CompanyName] [varchar](150) NULL,
 CONSTRAINT [PK_Vendor] PRIMARY KEY CLUSTERED 
(
	[VendorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CompletedStatus] ON 
GO
INSERT [dbo].[CompletedStatus] ([Id], [Name]) VALUES (1, N'InProgress')
GO
SET IDENTITY_INSERT [dbo].[CompletedStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[ContactTitle] ON 
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (1, N'C.E.O')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (2, N'Vice-President')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (3, N'I.T')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (4, N'Owner')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (5, N'Manager')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (6, N'President & Co-founder')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (7, N'Business Intelligence Analyst')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (8, N'Son')
GO
INSERT [dbo].[ContactTitle] ([Id], [Name]) VALUES (9, N'Lawyer')
GO
SET IDENTITY_INSERT [dbo].[ContactTitle] OFF
GO
SET IDENTITY_INSERT [dbo].[DbPropertyTypes] ON 
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (1, N'Text', N'Text field with no character restriction', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (2, N'Number', N'Numbers without special character and decimal value', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (3, N'Decimal', N'Decimal value to handle price or negotiation details', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (4, N'Boolean', N'True or fase value', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (5, N'Datetime', N'Handles date time value like created on updated on', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (6, N'Dropdown', N'Select one option', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[DbPropertyTypes] ([Id], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (7, N'MultiSelect', N'Multiple selection option', 1, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[DbPropertyTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Deal] ON 
GO
INSERT [dbo].[Deal] ([DealId], [OrganizationName], [Title], [Value], [PipelineGroupId], [PipelineId], [ExpectedCloseDate], [LeadId], [Owner], [VisibleTo], [Phone], [Email], [ContactId], [OrganizationId], [CurrencyId], [DealName], [Percentage], [Color], [NextStepDate], [EstimationDate], [LeadProvider], [LeadCost], [ExpectedRevenue], [Address], [City], [State], [Country], [ZipCode], [Website], [CompanyName], [TradeShowName], [TradeShowDate], [OriginsWebsite], [OriginsLinkedIn], [IsFromExistingCustomer], [IsFromExistingLead], [NoOfEmployee], [AnnualRevenue], [Industry], [AssignedTo], [AssignedName], [StatusId], [Application], [KeyFeatures], [PriceExpectation], [TimeFrame], [Evaluated], [Deployment], [Shopping], [EventId], [CancelReason], [DealNumber], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById], [AssignedType], [SecurityGroupId], [ActualAmount], [ReasonId], [OriginalPercentage], [StatusDate], [OpportunityProviderId], [ProviderEvenShowId], [ProviderSocialMediaId], [ProviderInstagram], [ProviderFaceBook], [ProviderYoutube], [ProviderWeChat], [ProviderTwitter], [ProviderLikedIn], [ProviderSnapChat], [ProviderVendorId], [ProviderWebsite], [ProviderNetworkingId], [ProviderNetworkingContactId], [ProviderParterId], [ProviderReferralId], [ProviderLeadId], [ProviderInternalSalesId], [IsRecurrence], [ExpectedRevenuId], [ExpectedRevenuDuration], [ExpectedRevenuPerDuration], [Notes], [OppRequirements], [OppRequirementRemarks], [StartDate], [EndDate]) VALUES (3, NULL, NULL, NULL, 1, 1, NULL, NULL, 4, NULL, NULL, NULL, NULL, 9, NULL, N'SageDental-12231-Colonial-Dr', NULL, N'#d6b3b3', NULL, CAST(N'2023-06-13T00:00:00.000' AS DateTime), NULL, NULL, NULL, N'12231 E. Colonial Dr., Suite 150', N'Orlando', N'Florida', N'United States', N'32826', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'P0000001', CAST(N'2023-06-13T11:10:58.733' AS DateTime), N'dinesh@healthinformation.network', 4, CAST(N'2023-06-13T11:08:51.657' AS DateTime), N'dinesh@healthinformation.network', 4, N'User', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 1, CAST(0 AS Decimal(18, 0)), NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Deal] ([DealId], [OrganizationName], [Title], [Value], [PipelineGroupId], [PipelineId], [ExpectedCloseDate], [LeadId], [Owner], [VisibleTo], [Phone], [Email], [ContactId], [OrganizationId], [CurrencyId], [DealName], [Percentage], [Color], [NextStepDate], [EstimationDate], [LeadProvider], [LeadCost], [ExpectedRevenue], [Address], [City], [State], [Country], [ZipCode], [Website], [CompanyName], [TradeShowName], [TradeShowDate], [OriginsWebsite], [OriginsLinkedIn], [IsFromExistingCustomer], [IsFromExistingLead], [NoOfEmployee], [AnnualRevenue], [Industry], [AssignedTo], [AssignedName], [StatusId], [Application], [KeyFeatures], [PriceExpectation], [TimeFrame], [Evaluated], [Deployment], [Shopping], [EventId], [CancelReason], [DealNumber], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById], [AssignedType], [SecurityGroupId], [ActualAmount], [ReasonId], [OriginalPercentage], [StatusDate], [OpportunityProviderId], [ProviderEvenShowId], [ProviderSocialMediaId], [ProviderInstagram], [ProviderFaceBook], [ProviderYoutube], [ProviderWeChat], [ProviderTwitter], [ProviderLikedIn], [ProviderSnapChat], [ProviderVendorId], [ProviderWebsite], [ProviderNetworkingId], [ProviderNetworkingContactId], [ProviderParterId], [ProviderReferralId], [ProviderLeadId], [ProviderInternalSalesId], [IsRecurrence], [ExpectedRevenuId], [ExpectedRevenuDuration], [ExpectedRevenuPerDuration], [Notes], [OppRequirements], [OppRequirementRemarks], [StartDate], [EndDate]) VALUES (4, NULL, NULL, NULL, 1, 1, NULL, NULL, 4, NULL, NULL, NULL, NULL, 10, NULL, N'SageDental-12990-Tanja-King-Blvd', NULL, N'#8a92cc', NULL, CAST(N'2023-06-13T00:00:00.000' AS DateTime), NULL, NULL, NULL, N'12990 Tanja King Blvd.', N'Orlando', N'Florida', N'United States', N'32828', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'P0000004', NULL, NULL, NULL, CAST(N'2023-06-13T11:10:28.573' AS DateTime), N'dinesh@healthinformation.network', 4, N'User', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 1, CAST(0 AS Decimal(18, 0)), NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Deal] OFF
GO
SET IDENTITY_INSERT [dbo].[EntityListOptions] ON 
GO
INSERT [dbo].[EntityListOptions] ([Id], [Description], [Title], [Type], [Inactive], [CreatedBy], [CreatedOn], [CreatedById], [UpdatedBy], [UpdatedOn], [UpdatedById]) VALUES (1, N'York', NULL, 2, NULL, N'admin@healthinformation.network', CAST(N'2023-02-14T12:55:33.140' AS DateTime), 1, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[EntityListOptions] OFF
GO
SET IDENTITY_INSERT [dbo].[EventCost] ON 
GO
INSERT [dbo].[EventCost] ([Id], [EventId], [Travel], [Show], [Notes], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (1, 1, NULL, NULL, NULL, CAST(N'2023-02-14T17:59:50.930' AS DateTime), N'admin@healthinformation.network', NULL, CAST(N'2023-02-14T12:59:50.947' AS DateTime), N'admin@healthinformation.network', 1)
GO
SET IDENTITY_INSERT [dbo].[EventCost] OFF
GO
SET IDENTITY_INSERT [dbo].[EventMode] ON 
GO
INSERT [dbo].[EventMode] ([Id], [Name]) VALUES (1, N'Participate')
GO
INSERT [dbo].[EventMode] ([Id], [Name]) VALUES (2, N'WalkingIn')
GO
SET IDENTITY_INSERT [dbo].[EventMode] OFF
GO
SET IDENTITY_INSERT [dbo].[EventShow] ON 
GO
INSERT [dbo].[EventShow] ([Id], [Address], [Website], [City], [State], [Country], [ZipCode], [Name], [VendorId], [Location], [StartDate], [EndDate], [IsWalkin], [EventNumber], [EventModeId], [Telephone], [Industry], [Inactive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById], [PartnerId], [ReferralId], [EventStatusId], [EntityTypeId], [EntityId]) VALUES (1, N'25 WestCoast St', NULL, N'Legas', N'York', N'US', N'1523', N'Receptionist', NULL, NULL, NULL, NULL, NULL, N'E0000001', 1, N'6552002554', NULL, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T12:59:50.567' AS DateTime), N'admin@healthinformation.network', 1, NULL, NULL, 1, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[EventShow] OFF
GO
SET IDENTITY_INSERT [dbo].[EventStatus] ON 
GO
INSERT [dbo].[EventStatus] ([Id], [Name]) VALUES (1, N'Event')
GO
INSERT [dbo].[EventStatus] ([Id], [Name]) VALUES (2, N'Show')
GO
SET IDENTITY_INSERT [dbo].[EventStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[EventType] ON 
GO
INSERT [dbo].[EventType] ([Id], [Name]) VALUES (1, N'Consultant')
GO
SET IDENTITY_INSERT [dbo].[EventType] OFF
GO
SET IDENTITY_INSERT [dbo].[Gender] ON 
GO
INSERT [dbo].[Gender] ([GenderId], [GenderName]) VALUES (1, N'Male')
GO
INSERT [dbo].[Gender] ([GenderId], [GenderName]) VALUES (2, N'Female')
GO
INSERT [dbo].[Gender] ([GenderId], [GenderName]) VALUES (3, N'Other')
GO
SET IDENTITY_INSERT [dbo].[Gender] OFF
GO
SET IDENTITY_INSERT [dbo].[Importance] ON 
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (1, N'1(Low)')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (2, N'2')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (3, N'3')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (4, N'4')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (5, N'5')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (6, N'6')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (7, N'7')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (8, N'8')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (9, N'9')
GO
INSERT [dbo].[Importance] ([Id], [Name]) VALUES (10, N'10(High)')
GO
SET IDENTITY_INSERT [dbo].[Importance] OFF
GO
SET IDENTITY_INSERT [dbo].[IndustryType] ON 
GO
INSERT [dbo].[IndustryType] ([Id], [Name]) VALUES (1, N'Sales')
GO
INSERT [dbo].[IndustryType] ([Id], [Name]) VALUES (2, N'Manufacturer')
GO
INSERT [dbo].[IndustryType] ([Id], [Name]) VALUES (3, N'Reseller')
GO
SET IDENTITY_INSERT [dbo].[IndustryType] OFF
GO
SET IDENTITY_INSERT [dbo].[LeadOriginType] ON 
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (1, N'Trade Show Name')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (2, N'Social Media')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (5, N'Website')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (6, N'Networking')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (7, N'Partner')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (8, N'Referral')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (9, N'Patient')
GO
INSERT [dbo].[LeadOriginType] ([Id], [Name]) VALUES (10, N'Internal Marketing')
GO
SET IDENTITY_INSERT [dbo].[LeadOriginType] OFF
GO
SET IDENTITY_INSERT [dbo].[LeadStatus] ON 
GO
INSERT [dbo].[LeadStatus] ([Id], [Name]) VALUES (1, N'New Patient Referral')
GO
INSERT [dbo].[LeadStatus] ([Id], [Name]) VALUES (2, N'New Patient Walkin')
GO
SET IDENTITY_INSERT [dbo].[LeadStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[NetworkingCost] ON 
GO
INSERT [dbo].[NetworkingCost] ([NetworkingCostId], [Yearly], [Monthly], [Weekly], [PerEvent], [TravelCost], [YearlyNote], [MonthlyNote], [WeeklyNote], [PerEventNote], [TravelCostNote], [Note], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T13:00:38.300' AS DateTime), N'admin@healthinformation.network', 1)
GO
SET IDENTITY_INSERT [dbo].[NetworkingCost] OFF
GO
SET IDENTITY_INSERT [dbo].[NetworkingEventMeet] ON 
GO
INSERT [dbo].[NetworkingEventMeet] ([Id], [YearlyDate], [MonthlyDate], [WeeklyDate], [YearlyTime], [MonthlyTime], [WeeklyTime], [Notes], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T13:00:38.337' AS DateTime), N'admin@healthinformation.network', 1)
GO
SET IDENTITY_INSERT [dbo].[NetworkingEventMeet] OFF
GO
SET IDENTITY_INSERT [dbo].[PaperworkCompletion] ON 
GO
INSERT [dbo].[PaperworkCompletion] ([Id], [Name]) VALUES (1, N'Yes')
GO
INSERT [dbo].[PaperworkCompletion] ([Id], [Name]) VALUES (2, N'No')
GO
SET IDENTITY_INSERT [dbo].[PaperworkCompletion] OFF
GO
SET IDENTITY_INSERT [dbo].[PaymentMode] ON 
GO
INSERT [dbo].[PaymentMode] ([Id], [Name]) VALUES (1, N'One Time')
GO
INSERT [dbo].[PaymentMode] ([Id], [Name]) VALUES (2, N'Receurring Monthly')
GO
SET IDENTITY_INSERT [dbo].[PaymentMode] OFF
GO
SET IDENTITY_INSERT [dbo].[Pipeline] ON 
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (1, N'Stage 1', 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:25:22.937' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (2, N'Stage 2', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:25:22.947' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (3, N'Stage 3', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:25:22.947' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (4, N'Created', 10, NULL, NULL, NULL, 0, NULL, CAST(N'2023-06-13T11:04:26.053' AS DateTime), N'dinesh@healthinformation.network', 4, CAST(N'2023-02-14T18:26:43.810' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (5, N'Visited', 50, NULL, NULL, NULL, 1, NULL, CAST(N'2023-06-13T11:04:26.060' AS DateTime), N'dinesh@healthinformation.network', 4, CAST(N'2023-02-14T18:26:43.810' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (6, N'Diagnosed', 100, NULL, NULL, NULL, 2, NULL, CAST(N'2023-06-13T11:04:26.060' AS DateTime), N'dinesh@healthinformation.network', 4, CAST(N'2023-02-14T18:26:43.810' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (7, N'Stage 1', 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:28:05.177' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (8, N'Stage 2', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:28:05.180' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (9, N'Stage 3', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:28:05.180' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (10, N'Stage 1', 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:31:10.620' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (11, N'Stage 2', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:31:10.620' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (12, N'Stage 3', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:31:10.620' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (13, N'Stage 1', 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:31:53.997' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (14, N'Stage 2', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:31:53.997' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (15, N'Stage 3', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:31:53.997' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (16, N'Stage 1', 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:32:42.053' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (17, N'Stage 2', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:32:42.053' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (18, N'Stage 3', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:32:42.053' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (19, N'Stage 1', 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:33:23.857' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (20, N'Stage 2', 0, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:33:23.857' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[Pipeline] ([PipelineId], [Name], [Probability], [IsRotting], [RottingDays], [IsDefault], [DisplayOrder], [PipelineGroupId], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (21, N'Stage 3', 0, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T18:33:23.857' AS DateTime), N'admin@healthinformation.network', 1)
GO
SET IDENTITY_INSERT [dbo].[Pipeline] OFF
GO
SET IDENTITY_INSERT [dbo].[PipelineGroup] ON 
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (1, N'Practice Default', NULL, 1)
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (2, N'Event Default', NULL, 10)
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (3, N'Appointment Default', NULL, 8)
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (4, N'Todo Default', NULL, 2)
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (5, N'Vendor Default', NULL, 3)
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (6, N'Referral Default', NULL, 6)
GO
INSERT [dbo].[PipelineGroup] ([PipelineGroupId], [Name], [IsDefault], [PipelineGroupType]) VALUES (7, N'Patient Default', NULL, 7)
GO
SET IDENTITY_INSERT [dbo].[PipelineGroup] OFF
GO
SET IDENTITY_INSERT [dbo].[PipelineGroupType] ON 
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (1, N'Practice')
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (2, N'Todo')
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (3, N'Vendor')
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (6, N'Referral')
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (7, N'Patient')
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (8, N'Appointment')
GO
INSERT [dbo].[PipelineGroupType] ([Id], [Name]) VALUES (10, N'Event')
GO
SET IDENTITY_INSERT [dbo].[PipelineGroupType] OFF
GO
SET IDENTITY_INSERT [dbo].[PipelineMap] ON 
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (1, 1, 3, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (2, 1, 2, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (3, 1, 1, 0)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (4, 2, 6, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (5, 2, 5, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (6, 2, 4, 0)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (7, 3, 9, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (8, 3, 8, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (9, 3, 7, 0)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (10, 4, 12, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (11, 4, 11, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (12, 4, 10, 0)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (13, 5, 15, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (14, 5, 14, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (15, 5, 13, 0)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (16, 6, 18, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (17, 6, 17, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (18, 6, 16, 0)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (19, 7, 21, 2)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (20, 7, 20, 1)
GO
INSERT [dbo].[PipelineMap] ([PipelineMapId], [PipelineGroupId], [PipelineId], [DisplayOrder]) VALUES (21, 7, 19, 0)
GO
SET IDENTITY_INSERT [dbo].[PipelineMap] OFF
GO
SET IDENTITY_INSERT [dbo].[ProviderStatus] ON 
GO
INSERT [dbo].[ProviderStatus] ([Id], [Name]) VALUES (1, N'Started')
GO
INSERT [dbo].[ProviderStatus] ([Id], [Name]) VALUES (2, N'Done')
GO
SET IDENTITY_INSERT [dbo].[ProviderStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[Referral] ON 
GO
INSERT [dbo].[Referral] ([ReferralId], [Address], [City], [State], [Country], [ZipCode], [Website], [Name], [IsReferral], [ReferralTypeId], [ReferralFees], [ReccuringTypeId], [ReferralFeeId], [PaymentModelId], [ReferralNumber], [PipelineGroupId], [PipelineId], [Telephone], [Industry], [EndOfContract], [Inactive], [IsNotPayReferral], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById], [OriginId], [SocialMediaId], [SocialMediaLink], [EventId], [OriginsWebsite], [NetworkingId], [NetworkContactId], [NotPayReferralId], [OriginsDate], [OriginNotes], [LeadId], [ProviderTypeId], [IsPerReferralFee], [VendorId], [ReferralDropdownId], [SecurityGroupId], [AssignedTo], [Reason], [ReferralStatus], [Email], [IsPayCommission], [CompanyName]) VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, N'Robert', NULL, NULL, NULL, NULL, NULL, NULL, N'R0000001', 6, 16, NULL, 1, CAST(N'2023-02-14T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, CAST(N'2023-02-14T12:58:30.703' AS DateTime), N'admin@healthinformation.network', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Referral] OFF
GO
SET IDENTITY_INSERT [dbo].[ReferralDropdown] ON 
GO
INSERT [dbo].[ReferralDropdown] ([Id], [Name]) VALUES (1, N'Internal')
GO
INSERT [dbo].[ReferralDropdown] ([Id], [Name]) VALUES (2, N'External')
GO
SET IDENTITY_INSERT [dbo].[ReferralDropdown] OFF
GO
SET IDENTITY_INSERT [dbo].[ReferralFee] ON 
GO
INSERT [dbo].[ReferralFee] ([Id], [Name]) VALUES (1, N'Percentage')
GO
INSERT [dbo].[ReferralFee] ([Id], [Name]) VALUES (2, N'USD')
GO
SET IDENTITY_INSERT [dbo].[ReferralFee] OFF
GO
SET IDENTITY_INSERT [dbo].[ServiceStatus] ON 
GO
INSERT [dbo].[ServiceStatus] ([Id], [Name]) VALUES (1, N'In Progress')
GO
INSERT [dbo].[ServiceStatus] ([Id], [Name]) VALUES (2, N'On Hold')
GO
INSERT [dbo].[ServiceStatus] ([Id], [Name]) VALUES (3, N'Complete')
GO
INSERT [dbo].[ServiceStatus] ([Id], [Name]) VALUES (4, N'Cancel')
GO
SET IDENTITY_INSERT [dbo].[ServiceStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[Settings] ON 
GO
INSERT [dbo].[Settings] ([Id], [Name], [Type]) VALUES (1, N'Activate', N'Boolean')
GO
INSERT [dbo].[Settings] ([Id], [Name], [Type]) VALUES (2, N'File Restriction', N'Boolean')
GO
INSERT [dbo].[Settings] ([Id], [Name], [Type]) VALUES (3, N'File Upload Size', N'Number')
GO
SET IDENTITY_INSERT [dbo].[Settings] OFF
GO
SET IDENTITY_INSERT [dbo].[SocialMediaType] ON 
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (1, N'Instagram')
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (2, N'Facebook')
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (3, N'YouTube')
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (4, N'WeChat')
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (5, N'Twitter')
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (6, N'LinkedIn')
GO
INSERT [dbo].[SocialMediaType] ([Id], [Name]) VALUES (7, N'Snapchat')
GO
SET IDENTITY_INSERT [dbo].[SocialMediaType] OFF
GO
SET IDENTITY_INSERT [dbo].[Status] ON 
GO
INSERT [dbo].[Status] ([Id], [Name]) VALUES (1, N'Won')
GO
INSERT [dbo].[Status] ([Id], [Name]) VALUES (2, N'Loss')
GO
INSERT [dbo].[Status] ([Id], [Name]) VALUES (3, N'Cancel')
GO
INSERT [dbo].[Status] ([Id], [Name]) VALUES (4, N'InProgress')
GO
SET IDENTITY_INSERT [dbo].[Status] OFF
GO
SET IDENTITY_INSERT [dbo].[TemplateList] ON 
GO
INSERT [dbo].[TemplateList] ([Id], [TemplateName], [TemplateHtml], [TemplatePage]) VALUES (1, N'Initial Examination', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 25cm;height: 29.7cm; ">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;"><img style="max-width: 185px;" src ="assets/images/logo.png"></div>
		 <div style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Initial Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;
		 text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
	    </div>
      <div style="padding-top: 50px;padding-bottom: 10px;">
		 <form id="pdf-form">
		       <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="width: 70%;float: left;"><label>Patient Name:</label> <input style="width: 74%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" tabindex="1" id="name" value="{#patientName}"> </div>
				  <div style="float: left;width: 30%;text-align: right;"><label>Date:</label> <input style="width: 57%;border: none;outline:none;" 
				  type="date" id="date" value="{#ie_appointmentDate}"></div>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style=" width: 25%;float: left;"><label>D.O.B:</label> <input style="width: 55%;border: none;outline:none;" type="date" id="date-of-birth" value="{#patientDob}"> </div>
				  <div style="width: 25%;float: left;"><label>Sex:</label><input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="sex" value="{#ie_patientsex}"></div>
				  <div style=" width: 20%;float: left;"><label>Age:</label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;
	outline:none;" type="text" tabindex="2" id="age" value="{#patientAge}"></div>
				  <div style=" width: 30%;float: left;"><label>Date of accident:</label> <input style="width:49%;border: none;outline:none;" type="date" id="date" value="{#ie_accidentDate}"></div>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="width: 50%;float: left;"><label>Occupation:</label> <input style="width: 74%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" tabindex="3" id="occupation" value="{#patientOccupation}"> </div>
				  <div style="float: left;width: 50%;text-align: right;"><label>Dominant Hand:</label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" id="occupation" value="{#ie_dominantHand}"/></div>
			   </div>
			   <div style="display: flow-root;margin-bottom: 14px;">
			      <div class="chief"><label>Chief Complaint:</label> 
				  <textarea id="ie_CheifComplaint" rows="5" tabindex="4" style="display: block;width: 100%;outline: none;">{#ie_CheifComplaint}</textarea>
				  </div>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="margin-top: 20px;"><label>History of illness:</label> 
				  <textarea id="ie_HOI" rows="5" tabindex="5" style="display: block;width: 100%;outline: none;">{#ie_HOI}</textarea>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div class="pmd" style="margin-top: 20px;">
				  <label>PMH</label> <input style="width: 84%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" tabindex="6" id="occupation" value="{#ie_pmd}">
				  </div>
				  <div>
				  <label style=" width: 15%;float: left;">Allergies:</label>
				  <input style="width: 84%;border: none;border-bottom: 1px solid #999;
                         margin-bottom: 10px;outline:none;" type="text" tabindex="7" id="allergies" value="{#ie_allergies}"> 
				  </div>
				  <div>
				  <label style=" width: 15%;float: left;">Surgeries:</label>
				  <input  style="width: 84%;border: none;border-bottom: 1px solid #999;
                         margin-bottom: 10px;outline:none;"type="text" tabindex="8" id="surgeries" value="{#ie_surgeries}">
						 </div>
				  <div>
				  <label style=" width: 15%;float: left;">Medication:</label>
				  <input style="width: 84%;border: none;border-bottom: 1px solid #999;
                         margin-bottom: 10px;outline:none;" type="text" tabindex="9" id="mediction" value="{#ie_medication}"> 
						 </div>
				  <div>
				  <label style=" width: 15%;float: left;">Other</label>
				  <input style="width: 84%;border: none;border-bottom: 1px solid #999;
                         margin-bottom: 10px;outline:none;" type="text" tabindex="10" id="other" value="{#ie_other}"/>
						 </div>
				   <div style=" width: 19%;float: left;margin-bottom: 10px;"><label>Drink:</label> 
				   <input style="width: 50%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" id="occupation" value="{#rdoDrink}"/>
				   </div>
				    <div style=" width: 19%;float: left;margin-bottom: 10px;"><label>Smoke:</label> 
					<input style="width: 50%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" id="occupation" value="{#rdoSmoke}"/>
					</div>
					<div style=" width: 22%;float: left;margin-bottom: 10px;"><label>Illicit drugs:</label> 
					<input style="width: 48%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" id="occupation" value="{#rdoDrug}"/>
					</div>
					<div style=" width: 40%;float: left;margin-bottom: 10px;"><label>LMP</label> <input style="width: 87%;border: none;border-bottom: 1px solid #999;
                    height: 23px;outline:none;" type="text" tabindex="11" id="cheif" value="{#ie_lmp}"></div> </div>
					 <div><label>R.O.S:</label> 
						 <textarea id="ie_CheifComplaint" rows="5" tabindex="12" style="display: block;width: 100%;outline: none;">{#ie_ROS}</textarea>
						 </div>
					   <div class="chief"><label></label></div>
			   </div>
			   <div class="row" style="width: 300px;height:100px;float:right;">
                   <div class="w3-tiny col-6">
                   <img src="{#signature}" alt="signature"/>
                   </div>
				</div>
		 </form>
	   </div>
       <div style="margin-top: 20px;">
	   <div style="text-align: center;margin: 0px;">
	     <p>3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p>Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
	   </div>				  			  
	    </div>
  </div>', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">    <div class="container" style="display: block;padding: 20px 30px;">        <div class="header" style="display: -webkit-box;">        <div class="left-box" style="width: 50%;float: left;">     <!-- <img src="images/logo.png" style="max-width: 185px;"> -->     </div>     <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Initial Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align: right;margin: 0px;">Dr. Eric O. Pantaleon, MD</h4></div>                 </div>        <div class="main" style="padding-top: 50px;padding-bottom: 10px;">     <form id="pdf-form">                <div class="form-group" style="display: flow-root;margin-bottom: 14px;">           <div class="left-from-group" style="width: 70%;float: left;margin: 0;position: relative;">       <label>Patient Name:</label>        <input type="text" id="patientName" name="name" value="{#patientName}" binding="true" control-type="text" style="border: none;border-bottom: 1px solid #999;outline: none;width: 85%;">        <button type="button" class="app-speech-input-btn" name="patientName" (click)="voiceToText();"></button>       <button type="button" class="app-speech-stop-btn" name="patientName_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <div class="right-from-group" style="float: left;width: 30%;text-align: right;">       <label>Date:</label>        <input type="date" id="ie_appointmentDate" binding="true" control-type="text" name="date" style="border: none;border-bottom: 1px solid #999;outline: none;width: 57%;">        </div>        </div>                 <div class="form-group" style="display: flow-root;margin-bottom: 14px;">          <div class="left-from-group-1" style="width: 25%;float: left;">        <label>D.O.B:</label>         <input type="date" id="patientDob" value="{#patientDob}" binding="true" control-type="text"  name="date-of-birth" style="border: none;border-bottom: 1px solid #999;outline: none;">           </div>          <div class="right-from-group-2" style="width: 12%;float: left;">        <label>Sex:</label> <input type="radio" name="ie_patientsex" binding="true" control-type="radio" value="Male"/>M / <input type="radio" name="ie_patientsex" binding="true" control-type="radio" value="Female"/> F          </div>       <div class="right-from-group-3" style="width: 25%;float: left;margin: 0;position: relative;">        <label>Age:</label>         <input type="text" id="patientAge" tabindex="1" value="{#patientAge}" binding="true" control-type="text" name="age" style="border: none;border-bottom: 1px solid #999;outline: none;width: 77%;">        <button class="app-speech-input-btn" type="button" name="patientAge" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="patientAge_stop" style="display:none;" (click)="stopVoiceToText();"></button>       </div>        <div class="right-from-group-4" style="width: 38%;float: left;text-align: right;">       <label>Date of accident:</label>        <input type="date" id="ie_accidentDate" binding="true" control-type="text" name="date" style="border: none;border-bottom: 1px solid #999;outline: none;">        </div>        </div>                 <div class="form-group" style="display: flow-root;margin-bottom: 14px;">           <div class="left-from-group" style="width: 70%;float: left;margin: 0;position: relative;">        <label>Occupation:</label>         <input type="text" id="patientOccupation" tabindex="2" value="{#patientOccupation}" binding="true" control-type="text" name="occupation" style="border: none;border-bottom: 1px solid #999;outline: none;width: 86%;">         <button class="app-speech-input-btn" type="button" name="patientOccupation" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="patientOccupation_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <div class="right-from-group" style="float: left;width: 30%;text-align: right;"><label>Dominant Hand:</label> <input type="radio" name="ie_dominantHand" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="ie_dominantHand" binding="true" control-type="radio" value="RL"/> RL </div>                </div>                        <div class="form-group" style="display: flow-root;margin-bottom: 14px;margin: 0;position: relative;">           <div class="chief"><label>Chief Complaint:</label> </div>        <textarea id="ie_CheifComplaint" rows="5" tabindex="3" binding="true" control-type="text" style="display: block;width: 100%;outline: none;"></textarea>        <button class="app-speech-input-btn" type="button" name="ie_CheifComplaint" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="ie_CheifComplaint_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>                 <div class="form-group" style="display: flow-root;margin-bottom: 14px;margin: 0;position: relative;">           <div class="chief his" style="margin-top: 20px;"><label>History of illness:</label> </div>       <textarea id="ie_HOI" rows="15" tabindex="4" binding="true" control-type="text" style="display: block;width: 100%;outline: none;"></textarea>       <button class="app-speech-input-btn" type="button" name="ie_HOI" (click)="voiceToText();"></button>       <button type="button" class="app-speech-stop-btn" name="ie_HOI_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>                 <div class="form-group" style="display: flow-root;margin-bottom: 14px;">           <div class="pmd pmd-top" style="margin-top: 20px;position: relative;"><label style="width: 15%;float: left;">PMH</label>         <input type="text" id="ie_pmd" binding="true" tabindex="5" control-type="text" name="cheif" style="border: none;border-bottom: 1px solid #999;outline: none;width: 82%;margin-bottom: 10px;">         <button class="app-speech-input-btn" type="button" name="ie_pmd" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="ie_pmd_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <p>The patient denies/admits prior accidents or incidents that would have produced the current symptoms</p>                <div class="pmd" style="margin: 0;position: relative;"><label style="width: 15%;float: left;">Allergies:</label>         <input type="text" id="ie_allergies" tabindex="6" binding="true" control-type="text" name="allergies" style="border: none;border-bottom: 1px solid #999;outline: none;width: 82%;margin-bottom: 10px;">        <button class="app-speech-input-btn" type="button" name="ie_allergies" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="ie_allergies_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <div class="pmd" style="margin: 0;position: relative;"><label style="width: 15%;float: left;">Surgeries:</label>         <input type="text" id="ie_surgeries" tabindex="7" binding="true" control-type="text" name="surgeries" style="border: none;border-bottom: 1px solid #999;outline: none;width: 82%;margin-bottom: 10px;">         <button class="app-speech-input-btn" type="button" name="ie_surgeries" (click)="voiceToText('''');"></button>        <button type="button" class="app-speech-stop-btn" name="ie_surgeries_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <div class="pmd" style="margin: 0;position: relative;"><label style="width: 15%;float: left;">Medication:</label>         <input type="text" id="ie_medication" binding="true" tabindex="8" control-type="text" name="mediction" style="border: none;border-bottom: 1px solid #999;outline: none;width: 82%;margin-bottom: 10px;">        <button class="app-speech-input-btn" type="button" name="ie_medication" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="ie_medication_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <div class="pmd" style="margin: 0;position: relative;"><label style="width: 15%;float: left;">Other</label>         <input type="text" id="ie_other" tabindex="9" binding="true" control-type="text" name="other" style="border: none;border-bottom: 1px solid #999;outline: none;width: 82%;margin-bottom: 10px;">        <button class="app-speech-input-btn" type="button" name="ie_other" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="ie_other_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div>        <div class="pmd" style="margin: 0;position: relative;">         <div class="drink" style="width: 20%;float: left;margin-bottom: 10px;">         <label>Drink:</label>          <input type="radio" name="rdoDrink" binding="true" control-type="radio" value="Yes" /> Y /          <input type="radio" name="rdoDrink" binding="true" control-type="radio" value="No" /> N          </div>          <div class="drink" style="width: 20%;float: left;margin-bottom: 10px;"><label>Smoke:</label>        <input type="radio" name="rdoSmoke" binding="true" control-type="radio" value="Yes" /> Y /        <input type="radio" name="rdoSmoke" binding="true" control-type="radio" value="No"/>N</div>       <div class="drink" style="width: 20%;float: left;margin-bottom: 10px;"><label>Illicit drugs:</label>        <input type="radio" name="rdoDrug" binding="true" control-type="radio" value="Yes"/> Y /        <input type="radio" name="rdoDrug" binding="true" control-type="radio" value="No"/>N </div>       <div class="drink-1" style="width:40%;float:left;margin: 0;position: relative;"><label>LMP</label>        <input type="text" id="ie_lmp" binding="true" tabindex="10" control-type="text" name="lmp" style="border: none;border-bottom: 1px solid #999;outline: none;width: 86%;margin-bottom: 10px;">       <button class="app-speech-input-btn" type="button" name="ie_lmp" (click)="voiceToText();"></button>       <button type="button" class="app-speech-stop-btn" name="ie_lmp_stop" style="display:none;" (click)="stopVoiceToText();"></button>       </div>       </div>               <div class="pmd" style="margin: 0;display:inline-block;width:100%;">        <div style="position: relative;"><label style="width: 15%;float: left;">R.O.S:</label>         <textarea id="ie_ROS" binding="true" control-type="text" tabindex="11" rows="3" style="display: block;width: 100%;outline: none;"></textarea>        <button class="app-speech-input-btn" type="button" name="ie_ROS" (click)="voiceToText();"></button>        <button type="button" class="app-speech-stop-btn" name="ie_ROS_stop" style="display:none;" (click)="stopVoiceToText();"></button>        </div></div>                <div class="signature-pad" style="width: 400px;height:150px;border: 1px solid #999">                       <canvas #sPad width="400" height="150" style="touch-action: none; " (click)="selectSignature()" id="signatureCtrl"></canvas>                       </div>                       <section>                      <div class="row" style="width: 400px;height:30px;">                     <div class="w3-tiny col-6">                     <button type="button" class="w3-button w3-primary w3-right" (click)="clear()" id="signatureClear"><i class="fa fa-refresh" aria-hidden="true"></i></button>         <button type="button" class="w3-button w3-primary w3-right" (click)="loadSignature()" id="loadSignature"><i class="fa fa-upload" aria-hidden="true"></i></button>                     </div>      </div>    </section>    </section>                        </div>     </form>           </div>         <div class="footer" style="margin-top: 20px;">        <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>           <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>                             </div>        </div>  </div>')
GO
INSERT [dbo].[TemplateList] ([Id], [TemplateName], [TemplateHtml], [TemplatePage]) VALUES (2, N'Follow Up Examination', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 25cm;height: 29.7cm; ">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;"><img style="max-width: 185px;" src ="assets/images/logo.png"></div>
		 <div style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Follow Up Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;
		 text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
	    </div>
      <div style="padding-top: 50px;padding-bottom: 10px;">
		 <form id="pdf-form">
		       <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="width: 70%;float: left;"><label>Patient Name:</label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" tabindex="1" id="patientName" value="{#patientName}"> </div>
				  <div style="float: left;width: 30%;text-align: right;"><label>Date:</label> <input style="width: 57%;border: none;outline:none;"
				  type="date" id="date" value="{#fu_date}"></div>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
				  <div style="width: 35%;float: left;"><label>Gender:</label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="sex" value="{#fu_patientsex}"></div>
				  <div style=" width: 33%;float: left;"><label>Age:</label> <input style="width: 65%;border: none;border-bottom: 1px solid #999;
	outline:none;" type="text" tabindex="2" id="patientAge" value="{#patientAge}"></div>
				  <div style="border: none;outline:none;"><label>Date of accident:</label> <input style="border: none;outline:none;" type="date" id="date" value="{#fu_dateOfAccident}"></div>
			   </div>
			   <div style="margin-top: 35px;margin-bottom: 35px;display: flow-root;margin-bottom: 14px;">
			      <div><label>Chief Complaint:</label> 
				  <textarea id="fu_txtCheifComplaint" rows="5" tabindex="3" style="display: block;width: 100%;outline: none;">{#fu_txtCheifComplaint}</textarea> 
					</div>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="margin-top: 20px;">
				  <label>History of illness:</label> 
				  <textarea id="fu_txtHOI" rows="5" tabindex="4" style="display: block;width: 100%;outline: none;">{#fu_txtHOI}</textarea> 
					</div>
			   </div>
			   <div style="margin-top: 30px;margin-bottom: 30px;display: flow-root;margin-bottom: 14px;">
			      <div class="chief" style="margin-top: 20px;"><label>Imaging results:</label>
				  ( <input type="checkbox" selected="{#chkImagingXray}"> X-ray / 
				  <input type="checkbox" selected="{#chkImagingCTScan}"> CT Scan / 
				  <input type="checkbox" selected="{#chkImagingMRI}"> MRI )
				  </div>
				  <div>
				  <textarea id="fu_txtImaging" rows="5" tabindex="5" style="display: block;width: 100%;outline: none;">{#fu_txtImaging}</textarea> 
				  </div>
				  
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="margin-top: 10px;margin-bottom: 10px;"><label>Response to physical therapy:</label> <input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="fu_physicalTherapy" value="{#fu_physicalTherapy}"> </div>
				  <div style="margin-top: 10px;margin-bottom: 10px;"><label>Response to medication:</label> <input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="fu_medication" value="{#fu_medication}"> </div>
				  </div>
				  <div><label>R.O.S:</label> 
						 <textarea id="ie_CheifComplaint" rows="5" tabindex="6" style="display: block;width: 100%;outline: none;">{#ie_ROS}</textarea>
						 </div>
			    <div style="margin-top: 30px;margin-bottom: 30px;display: flow-root;margin-bottom: 14px;">
			      <div><label>Other:</label></div>
				  <div>
				  <textarea id="fu_txtOther" rows="4" tabindex="7" style="display: block;width: 100%;outline: none;">{#fu_txtOther}</textarea>
					</div>
				  
			   </div> 
			   <div class="row" style="width: 300px;height:100px;float:right;">
                   <div class="w3-tiny col-6">
                   <img src="{#signature}" alt="signature"/>
                   </div>
				</div>
		 </form>
	   </div>
       <div style="margin-top: 20px;">
	   <div style="text-align: center;margin: 0px;">
	     <p>3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p>Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
	   </div>					  				  
	    </div>
  </div>
</div>', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">
  <div class="container" style="display: block;padding: 20px 30px;">
      <div class="header" style="display: -webkit-box;">
	     <div class="left-box" style="width: 50%;float: left;">
		 <!--img src="assets/images/logo.png" style="max-width: 185px;"> -->
		 </div>
		 <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Followup Sheet</h3></div>
		 
		 
	    </div>
      <div class="main" style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
		       <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group" style="width: 70%;float: left;"><label></label></div>
				  <div class="right-from-group-date w3-right" style="width: 12%;float: right;border: none;">
				  <label>Date:</label> 
				  <input type="date" id="fs_Date" binding="true" control-type="text" name="date" style="width: 60%;border: none;border-bottom: 1px solid #999;outline:none;">
				  </div>
			   
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				   <div class="left-from-group-one" style="width: 50%;float: left;margin-bottom: 10px;position: relative;"><label>First Name: <label> 
				   <input type="text" id="patientName" binding="true" value="{#patientName}" control-type="text"  style="width: 84%;border: none;border-bottom: 1px solid #999;outline: none;"></label>
				   <button type="button" class="app-speech-input-btn" name="patientName" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="patientName_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				  <div class="right-from-group-second" style="width: 50%;float: left;margin-bottom: 10px;position: relative;"><label>Last Name: </label> 
				  <input type="text" binding="true" control-type="text" tabindex="1" id="fs_lastName" name="lname" style="width: 84%;border: none;border-bottom: 1px solid #999;outline: none;">
				 <button type="button" class="app-speech-input-btn" name="fs_lastName" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="fs_lastName_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  </div>
				  <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-1" style="width: 25%;float: left;"><label>D.O.B:</label> 
				  <input type="date" binding="true" control-type="text" id="fs_dateofBirth" name="date-of-birth" style="width: 30%;border: none;border-bottom: 1px solid #999;outline:none;"> 
				  </div>
				  <div class="right-from-group-2" style="width: 12%;float: left;">
				  <label>Sex:</label> 
				  <input type="radio" name="fs_Sex" binding="true" control-type="radio" value="Male"/> M / <input type="radio" name="fs_Sex" binding="true" control-type="radio" value="Female"/> F
				  </div>
				  <div class="right-from-group-3" style="width: 12%;float: left;position: relative;">
				  <label>Age:</label>
				  <input type="text" binding="true" control-type="text" tabindex="2" id="fs_Age"  style="width: 50%;border: none;border-bottom: 1px solid #999;outline: none;">
				  <button type="button" class="app-speech-input-btn" name="fs_Age" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="fs_Age_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div class="right-from-group-4" style="width: 33%;float: left;text-align: right;"><label>Date of accident:</label> 
				  <input type="date" binding="true" control-type="text" id="fs_accidentDate"  style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;"></div>
			   
			   </div>
			   
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="checkbox-1" style="float: left;width: 33%;">
				  <label>Chief Complaint:</label> Neck <input type="checkbox" id="neck" binding="true" control-type="checkbox" name="chkChiefComplaintNeck"> </div>
				  <div class="checkbox-2" style="width: 18%;float: left;">
				  <label>Midback Pain</label> <input type="checkbox" id="midback" binding="true" control-type="checkbox" name="chkChiefComplaintMidbackPain"></div>
				  <div class="checkbox-2" style="width: 18%;float: left;">
				  <label>Midback Pain</label> <input type="checkbox" id="midback" binding="true" control-type="checkbox" name="chkChiefComplaintMidback"> </div>
				  <div class="checkbox-2" style="width: 18%;float: left;">
				  <label>Sciatica</label> <input type="checkbox" id="midback" binding="true" control-type="checkbox" name="chkChiefComplaintSciatica"> </div>
				  
			   
			   </div>
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			   <div class="pmd" style="position: relative;">
			   <label style="width: 15%;float: left;">Other:</label>
			   <textarea id="fs_Other" binding="true" control-type="text" tabindex="3" rows="2" style="display: block;width: 100%;outline: none;"> </textarea>
			   
			   <button type="button" class="app-speech-input-btn" name="fs_Other" (click)="voiceToText();"></button>
				<button type="button" class="app-speech-stop-btn" name="fs_Other_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				</div>
			   <div class="pmd" style="position: relative;margin-bottom: 6px;">
			   <label style="width: 15%;float: left;">HPI:</label> 
			   <textarea id="fs_Hpi" binding="true" control-type="text" tabindex="4" rows="5" style="display: block;width: 100%;outline: none;"></textarea>
			    <button type="button" class="app-speech-input-btn" name="fs_Hpi" (click)="voiceToText();"></button>
				<button type="button" class="app-speech-stop-btn" name="fs_Hpi_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   </div>
	
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="medication" style="width: 46%;float: left;">
				  <label>Are medications being effective?</label> 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkMedicationsYes"> Yes 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkMedicationsNo"> No
				  </div>
				  <div class="medication-right" style="width: 54%;float: left;position: relative;">
				  <label>If Yes,</label>
				  <input type="text" binding="true" tabindex="5" control-type="text" id="fs_Medication" name="medication" style="border: none;border-bottom: 1px solid #999;width: 87%;outline: none;">
				  <button type="button" class="app-speech-input-btn" name="fs_Medication" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="fs_Medication_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
			   </div>
			    
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="medication-1"><label>Response to physical therapy:</label> 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkResponsePoor"> Poor 
				  
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkResponseAverage"> Average 
				   
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkResponseGood"> Good
				  
				  <div class=" medication-right" style="position: relative;">
				  <label></label> 
				  <input type="text" binding="true" tabindex="6" control-type="text" id="fs_Medications" name="medication-end" style="border: none;border-bottom: 1px solid #999;width: 47%;margin-left: 755px;outline: none;">
				  <button type="button" class="app-speech-input-btn" name="fs_Medications" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="fs_Medications_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
			   </div>
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="pain" style="width: 33%;float: left;"><label>Pain effect works.</label>  
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkPainYes"> Yes
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkPainNo"> No
				  </div>
				  <div class="adl" style="width: 33%;float: left;"><label>ADL?</label>  
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkADLYes"> Yes
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkADLNo"> No
				  </div>
				  <div class="sleep" style="width: 33%;float: left;"><label>Sleeping is adequate? </label>
				  
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingYes"> Yes
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingNo"> No
				  </div>
			   </div>
			    
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				  <h4 class="sleep-head" style="margin: 0px;margin-bottom: 15px;margin-top: 15px;text-transform: uppercase;text-decoration: underline;">Sleeping Exam</h4>
				  
				  <div class="hr" style="width: 16.66%;float: left;"><label>HR:</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingExamHR"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>BP:</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingExamBP"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>TEMP:</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingExamTEMP"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>RR:</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingExamRR"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>HT:</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingExamHT"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>WT:</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkSleepingExamWT"> </div>
			   </div>
			   <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				  <div class="nr" style="width: 25%;float: left;"><label>Normal:</label> 
				  Yes <input type="checkbox" binding="true" control-type="checkbox" name="chkNormalYes"> 
				  No <input type="checkbox" binding="true" control-type="checkbox" name="chkNormalNo">
				  </div>
				  <div class="nr" style="width: 25%;float: left;"><label>Obese?</label> 
				  Yes <input type="checkbox" binding="true" control-type="checkbox" name="chkObeseYes">
				  No <input type="checkbox" binding="true" control-type="checkbox" name="chkObeseNo">
				  </div>
				  <div class="nr" style="width: 25%;float: left;"><label>Deformities</label> 
				  Yes <input type="checkbox" binding="true" control-type="checkbox" name="chkDeformitiesYes"> 
				  No <input type="checkbox" binding="true" control-type="checkbox" name="chkDeformitiesNo">
				  </div>
				  <div class="nr" style="width: 25%;float: left;"><label>If Yes,</label> 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkIfYes"> No 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkIfNo">
				  </div> 
			   </div>
			   <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			   <div class="pmd" style="position: relative;" >
			   <label style="width: 10%;float: left;">HEENT: WNL</label> 
			   <input type="text" binding="true" control-type="text" tabindex="7" id="fs_Wnl" name="allergies" style="width: 85%;border: none;border-bottom: 1px solid #999;margin-bottom: 10px;outline: none;"> 
			    <button type="button" class="app-speech-input-btn" name="fs_Wnl" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fs_Wnl_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   </div>
			   <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="normal" style="width: 85%;float: left;">
			        Neck: Trapezium Muscle:  
					<input type="checkbox" style="margin-right: 17px;" binding="true" control-type="checkbox" name="chkTrapeziumMuscleNormal" >  Normal
					<input type="checkbox" style="margin-right: 17px;" binding="true" control-type="checkbox" name="chkTrapeziumMuscleTender"> Tender
                    <input type="checkbox" style="margin-right: 17px;" binding="true" control-type="checkbox" name="chkTrapeziumMuscleSpastic"> Spastic
					Spinous Process: 
					<input type="checkbox" style="margin-right: 17px;" binding="true" control-type="checkbox" name="chkSpinousProcessNormal"> Normal  
					<input type="checkbox" style="margin-right: 17px;" binding="true" control-type="checkbox" name="chkSpinousProcessTender"> Tender
					</div>
                    
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="normal-1" style="width: 15%;float: left;position: relative;">Flex:
				   <input type="text" binding="true" tabindex="8" control-type="text" id="fs_Flex" style="border: none;border-bottom: 1px solid #999;outline: none;width: 65%;">
				   <button type="button" class="app-speech-input-btn" name="fs_Flex" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_Flex_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="normal-1" style="width: 15%;float: left;position: relative;">  Exit:
				   <input type="text" binding="true" tabindex="9" control-type="text" id="fs_Exit" style="border: none;border-bottom: 1px solid #999;outline: none;width: 65%;">
				   <button type="button" class="app-speech-input-btn" name="fs_Exit" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_Exit_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
				   <div class="normal-2" style="width: 15%;float: left;position: relative;">Rot.: Rt: 
				   <input type="text" binding="true" control-type="text" tabindex="10" id="fs_Rot" style="border: none;border-bottom: 1px solid #999;outline: none;width: 55%;">
				   <button type="button" class="app-speech-input-btn" name="fs_Rot" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_Rot_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="normal-2" style="width: 15%;float: left;position: relative;"> Lt:
				   <input type="text" binding="true" control-type="text" tabindex="11" id="fs_rotLt" style="border: none;border-bottom: 1px solid #999;outline: none;width: 70%;">
				   <button type="button" class="app-speech-input-btn" name="fs_rotLt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_rotLt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
				   <div class="normal-3" style="width: 15%;float: left;position: relative;">Lat Flex: Rt:
				   <input type="text" binding="true" control-type="text" tabindex="12" id="fs_flexRt" style="border: none;border-bottom: 1px solid #999;outline: none;width: 45%;">
				   <button type="button" class="app-speech-input-btn" name="fs_flexRt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_flexRt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="normal-3" style="width: 15%;float: left;position: relative;"> Lt:
				   <input type="text" binding="true" control-type="text" tabindex="13" id="fs_flexLt" style="border: none;border-bottom: 1px solid #999;outline: none;width: 70%;">
				   <button type="button" class="app-speech-input-btn" name="fs_flexLt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_flexLt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
                    
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="spine" style="position: relative;"> 
				   Thoraxic Spine: 
				   Normal 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkThoraxicSpineNormal">
				   <input type="text" binding="true" control-type="text" tabindex="14" id="fs_Normal" style="width: 84%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_Normal" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_Normal_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				  
                    
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="heart" style="position: relative;"> Heart: 
				   RR 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkHeartRR"> 
				   Murmur? Yes 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkHeartYes"> 
				   No 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkHeartNo"> 
				   Lungs 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkHeartLungs"> 
				   Clear 
				   <input type="text" binding="true" control-type="text" tabindex="15" id="fs_Clear" style="width: 75%;border: none;border-bottom: 1px solid #999;">
				   <button type="button" class="app-speech-input-btn" name="fs_Clear" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="fs_Clear_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="heart"> Abdomen: 
				   Flat 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenFlat"> 
				   Soft 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenSoft"> 
				   Non Tender 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenNonTender "> 
				   Clear
				   <input type="text" binding="true" control-type="text" id="fs_Clears"> </div>
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">  
					  <div class="lumber-1" style="width: 25%;float: left;"> Lumbar paraspinal muscle:  
					  <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarParaspinalMuscleNormal">  Normal
					  <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarParaspinalMuscleSpastic">  Spastic
					  <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarParaspinalMuscleTender"> Tender
					  </div>
					  <div class="paraspinal" style="position: relative;float: left;width:75%;"> 
					  <input type="text" binding="true" control-type="text" tabindex="16" id="fs_Paraspinal" style="border: none;border-bottom: 1px solid #999;outline: none;width: 93%;">
					  <button type="button" class="app-speech-input-btn" name="fs_Paraspinal" (click)="voiceToText();"></button>
				      <button type="button" class="app-speech-stop-btn" name="fs_Paraspinal_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					  </div>
			    </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">  
					  <div class="flex-1" style="width: 25%;float: left;position: relative;">Flex: 
					  <input type="text" binding="true" tabindex="17" control-type="text" id="fs_Flexs" style="border: none;border-bottom: 1px solid #999;width: 75%;outline: none;">
					  <button type="button" class="app-speech-input-btn" name="fs_Flexs" (click)="voiceToText();"></button>
				      <button type="button" class="app-speech-stop-btn" name="fs_Flexs_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					  </div>
					  <div class="flex-1" style="width: 25%;float: left;position: relative;"> Exit
					  <input type="text" binding="true" tabindex="18" control-type="text" id="fs_Exits" style="border: none;border-bottom: 1px solid #999;width: 75%;outline: none;">
					  <button type="button" class="app-speech-input-btn" name="fs_Exits" (click)="voiceToText();"></button>
				      <button type="button" class="app-speech-stop-btn" name="fs_Exits_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					  </div>
					  <div class="flex-2" style="width: 25%;float: left;position: relative;">Lateral Bending Rt:
					  <input type="text" binding="true" tabindex="19" control-type="text" id= "fs_Rt" style="border: none;border-bottom: 1px solid #999;width: 58%;outline: none;">
					  <button type="button" class="app-speech-input-btn" name="fs_Rt" (click)="voiceToText();"></button>
				      <button type="button" class="app-speech-stop-btn" name="fs_Rt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					  </div>
					  <div class="flex-2" style="width: 25%;float: left;position: relative;"> Lt:
					  <input type="text" binding="true" control-type="text" tabindex="20" id= "fs_Lt" style="border: none;border-bottom: 1px solid #999;width: 75%;outline: none;">
					  <button type="button" class="app-speech-input-btn" name="fs_Lt" (click)="voiceToText();"></button>
				      <button type="button" class="app-speech-stop-btn" name="fs_Lt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					  </div>
			    </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="sh-1" style="width: 25%;float: left;position: relative;">Shoulder Abduction Rt:
				   <input type="text" binding="true" control-type="text" id="fs_Rts" style="border: none;border-bottom: 1px solid #999;width: 52%;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_Rts" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="fs_Rts_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-1" style="width: 25%;float: left;position: relative;"> Lt:
				   <input type="text" binding="true" control-type="text" tabindex="21" id="fs_Lts" style="border: none;border-bottom: 1px solid #999;width: 75%;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_Lts" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_Lts_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-2" style="width: 25%;float: left;position: relative;">Ext Rot: Rt:
				   <input type="text" binding="true" control-type="text" tabindex="22" id="fs_extRt" style="width: 68%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_extRt" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="fs_extRt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-2" style="width: 25%;float: left;position: relative;"> Lt:
				   <input type="text" binding="true" control-type="text" tabindex="23" id="fs_extLt" style="width: 75%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_extLt" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="fs_extLt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				   <div class="sh-1"  style="width: 25%;float: left;position:relative;">Flex Rot: Rt: 
				   <input type="text" binding="true" control-type="text" tabindex="24" id="fs_flexrotRt" style="width: 65%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_flexrotRt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_flexrotRt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-1" style="width: 25%;float: left;position:relative;"> Lt:
				   <input type="text" binding="true" control-type="text" tabindex="25" id= "fs_flexrotLt" style="width: 77%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_flexrotLt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_flexrotLt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				
			       <div class="sh-2" style="width: 25%;float: left;position: relative;">WNL: Adductio Rt:
				   <input  type="text" binding="true" control-type="text" tabindex="26" id= "fs_wnlRt" style="border: none;border-bottom: 1px solid #999;width: 58%;outline: none;"> 
				   <button type="button" class="app-speech-input-btn" name="fs_wnlRt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_wnlRt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-2" style="width: 25%;float: left;position: relative;">
				   Lt:
				   <input type="text" binding="true" tabindex="27" control-type="text" id= "fs_wnlLt" style="border: none;border-bottom: 1px solid #999;width: 76%;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_wnlLt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_wnlLt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				   <div class="sh-1" style="width: 25%;float: left;position: relative;">Int Rot: Rt:
				   <input type="text" binding="true" control-type="text" tabindex="28" id="fs_introtRt" style="width: 67%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_introtRt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_introtRt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-1" style="width: 25%;float: left;position: relative;"> Lt:
				   <input type="text" binding="true" control-type="text" id="fs_introtLt" tabindex="29" style="width: 77%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_introtLt" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_introtLt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
				   <div class="sh-2" style="width: 25%;float: left;position: relative;">Ext: Rt: 
				   <input  type="text" binding="true" control-type="text" id="fs_extRts" tabindex="30" style="width: 75%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_extRts" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_extRts_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div class="sh-2" style="width: 25%;float: left;position: relative;"> Lt:
				   <input type="text" binding="true" control-type="text" id="fs_extLts" tabindex="31" style="width: 76%;border: none;border-bottom: 1px solid #999;outline: none;">
				   <button type="button" class="app-speech-input-btn" name="fs_extLts" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_extLts_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				
				
				
				</div>
				
				<div class="pmd" style="position: relative;">
				   <label style="width: 15%;float: left;">Arms: WNL</label> 
				   <textarea  id="fs_armWnl" binding="true" tabindex="32" control-type="text" name="arm" style="display: block;width: 100%;outline: none;"> </textarea>
				   <button type="button" class="app-speech-input-btn" name="fs_armWnl" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_armWnl_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
			       <div class="pmd" style="position: relative;">
				   <label style="width: 15%;float: left;">Legs: WNL</label>
				   <textarea id="fs_legWnl" binding="true" control-type="text" tabindex="33"  rows="2" style="display: block;width: 100%;outline: none;"> </textarea>
				   <button type="button" class="app-speech-input-btn" name="fs_legWnl" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="fs_legWnl_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div> 
				
				
			   
		 </form>
		 
	   </div>
       <div  style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>




<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;height: 29.7cm;">
  <div class="container" style="display: block;padding: 20px 30px;">
      <div class="header" style="display: -webkit-box;">
	     <div class="left-box" style="width: 50%;float: left;">
		 </div>
		 <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Followup Sheet</h3></div>
		 
		 
	    </div>
      <div class="main" style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="nuro"><label>Neuro: </label> 
				  				
				  </div>
				  </div>
				  <div style="display: flow-root;margin-bottom: 6px;">
				   
				      <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Cervical Compression Test</label> 
					  <input type="radio" name="fs_cervicalComp" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="fs_cervicalCompRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="fs_cervicalCompRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="fs_cervicalComp" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
				       <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Shoulder Depression Test</label> 
					  <input type="radio" name="fs_shoulderTest" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="fs_shoulderTestRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="fs_shoulderTestRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="fs_shoulderTest" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Lasegue''s Test (SLR 45):</label>
					  <input type="radio" name="fs_lasegue" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="fs_lasegueRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="fs_lasegueRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="fs_lasegue" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Bragard''s Test:</label> 
					  <input type="radio" name="fs_bragard" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="fs_bragardRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="fs_bragardRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="fs_bragard" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
					  <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Romberg''s Test:</label> 
					  <input type="radio" name="fs_rombergTest" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="fs_rombergTestRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="fs_rombergTestRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="fs_rombergTest" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>

			   </div>
				
                
				
			   
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;position: relative;">
				 <div class="rhm"><label>Others</label> </div>
				 <textarea id="fs_others" binding="true" control-type="text" tabindex="34" rows="2" style="display: block;width: 100%;outline: none;"> </textarea>
				 <button type="button" class="app-speech-input-btn" name="fs_others (click)="voiceToText();"></button>
				<button type="button" class="app-speech-stop-btn" name="fs_others_stop" style="display:none;" (click)="stopVoiceToText();"></button> 
				</div>
			
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="cer"><label>Diagnosis: 
				  Headache <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisHeadache"></label> 
				  Cervical Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisCervicalSprain"> 
				  Thoraxic Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisThoraxicSprain"> 
				  Lumbar Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisLumbarSprain"> 
				  Lumbalgia <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisLumbalgia">
				  Cervicagia Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisCervicagiaSprain"> 
				  Sciatica <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisSciatica"> 
				  Disc Herniation <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisDiscHerniation">
				  Thoracic Spine Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisThoracicSpinePain">
				  Shoulder Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisShoulderPain "> 
				  Elbow Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisElbowPain"> 
				  Wrist/hand Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" binding="true" control-type="checkbox" name="chkDiagnosisWristhandPain">
				  </div>
				  
				  
			   </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;position: relative;">
				<textarea id="fs_Cheif" binding="true" control-type="text" tabindex="35" rows="5" style="display: block;width: 100%;outline: none;"></textarea>
				<button type="button" class="app-speech-input-btn" name="fs_Cheif" (click)="voiceToText();"></button>
				<button type="button" class="app-speech-stop-btn" name="fs_Cheif_stop" style="display:none;" (click)="stopVoiceToText();"></button> 
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;position: relative;">
			     <div class="pmd">
				 <label style="width: 15%;float: left;">Medication:</label> 
				 </div>
				 <textarea id="fs_Medi" binding="true" control-type="text" tabindex="36"  rows="4" style="display: block;width: 100%;outline: none;"> </textarea>
				 <button type="button" class="app-speech-input-btn" name="fs_Medi" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="fs_Medi_stop" style="display:none;" (click)="stopVoiceToText();"></button> 
                </div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			      <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" binding="true" control-type="checkbox" name="chkColdHotPack"> Cold | Hot Pack</li>
					  <li><input type="checkbox" binding="true" control-type="checkbox" name="chkElectricalStimulation"> Electrical Stimulation</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkParaffin"> Paraffin</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkUltrasound"> Ultrasound</li>
					 </ul>
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" binding="true" control-type="checkbox" name="chkGaitTraning"> Gait Traning</li>
					  <li><input type="checkbox" binding="true" control-type="checkbox" name="chkLowerLevelLeaser"> Lower Level Leaser</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkManualTherapy"> Manual Therapy</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkPhysicalTherapy"> Physical Therapy</li>
					 </ul>
					 
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" binding="true" control-type="checkbox" name="chkTherapeuticActivities"> Therapeutic Activities</li>
					  <li><input type="checkbox" binding="true" control-type="checkbox" name="chkTherapeuticExercises"> Therapeutic Exercises</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkLontophoresis"> Lontophoresis</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkMechanicalTraction"> Mechanical Traction</li>
					 </ul>
                    
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			     <div class="pmd" style="position: relative;">
				 <label style="width: 10%;float: left;">Referrals:</label> 
				 <input type="text" binding="true" tabindex="37" control-type="text" id="fs_Referral" name="arm" style="width: 85%;border: none;border-bottom: 1px solid #999;margin-bottom: 10px;outline: none;">
				 <button type="button" class="app-speech-input-btn" name="fs_Referral" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fs_Referral_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				 </div>
				  <div class="pmd" style="position: relative;">
				  <label style="width: 10%;float: left;">Recommendations:</label> 
				  <input type="text" binding="true" control-type="text" tabindex="38" id="fs_Recommendation" name="arm" style="width: 85%;border: none;border-bottom: 1px solid #999;margin-bottom: 10px;outline: none;">
				  <button type="button" class="app-speech-input-btn" name="fs_Recommendation" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="fs_Recommendation_stop" style="display:none;" (click)="stopVoiceToText();"></button> 
				  </div>
				   
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="sign-date"><label>Follow up appointment:</label> 
				  <input type="date" binding="true" control-type="date" style="width: 12%;border: none;border-bottom: 1px solid #999;outline:none;">
				  </div>
			   </div>
			    
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="sign"><input type="text" id="fs_Sign" binding="true" control-type="text" style="border: none;outline: none;border-bottom: 1px solid #999;width: 23%;margin-top: 50px;">
				  <p style="margin: 0px;"> Dr. Eric O. Pantaleon, MD
				  </p>
				  </div>
			   </div>
				<div class="signature-pad" style="width: 400px;height:150px;border: 1px solid #999;margin-top:10px;">
                     <canvas #sPad width="400" height="150" style="touch-action: none; " (click)="selectSignature()" id="signatureCtrl"></canvas>
                     </div>
                     <section>
                    <div class="row" style="width: 400px;height:30px;">
                   <div class="w3-tiny col-6">
                   <button type="button" class="w3-button w3-primary w3-right" (click)="clear()" id="signatureClear"><i class="fa fa-refresh" aria-hidden="true"></i></button>
				   <button type="button" class="w3-button w3-primary w3-right" (click)="loadSignature()" id="loadSignature"><i class="fa fa-upload" aria-hidden="true"></i></button>
                   </div>
    </div>
  </section>
			   
		 </form>
		 
	   </div>
       <div  style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>')
GO
INSERT [dbo].[TemplateList] ([Id], [TemplateName], [TemplateHtml], [TemplatePage]) VALUES (3, N'Final Examination', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 25cm;height: 29.7cm; ">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;"><img style="max-width: 185px;" src ="assets/images/logo.png"></div>
		 <div style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Final Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;
		 text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
	    </div>
      <div style="padding-top: 50px;padding-bottom: 10px;">
		 <form id="pdf-form">
		       <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="width: 70%;float: left;"><label>Patient Name:</label> <input style="width: 74%;border: none;border-bottom: 1px solid #999;
				  outline:none;" type="text" tabindex="1" id="patientName" value="{#patientName}"> </div>
				  <div style="float: left;width: 30%;text-align: right;"><label>Date:</label> <input style="width: 57%;border: none;outline:none;"
				  type="date" id="date" value="{#fl_date}"></div>			   
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      
				  <div style="width: 34;float: left;"><label>Gender:</label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="sex" value="{#fl_patientsex}"> </div>
				  <div style=" width: 34%;float: left;"><label>Age:</label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;
	outline:none;" type="text" tabindex="2" id="patientAge" value="{#patientAge}"></div>
				  <div style="border: none;outline:none;"><label>Date of accident:</label> <input style="border: none;outline:none;" type="date" id="date" value="{#fl_accidentDate}"></div>
			   </div>
			   <div style="margin-top: 35px;margin-bottom: 35px;display: flow-root;margin-bottom: 14px;">
			      <div>
				  <label>Chief Complaint:</label>
				  <textarea id="fl_txtCheifComplaint" rows="5" tabindex="3" style="display: block;width: 100%;outline: none;">{#fl_txtCheifComplaint}</textarea>
					</div>
				  
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="margin-top: 20px;">
				  <label>History of illness:</label> 
				  <textarea id="fl_txtHOI" rows="5" tabindex="4" style="display: block;width: 100%;outline: none;">{#fl_txtHOI}</textarea>
					</div>
			   </div>
			   <div style="margin-top: 30px;margin-bottom: 30px;display: flow-root;margin-bottom: 14px;">
			      <div class="chief" style="margin-top: 20px;"><label>Imaging results:</label> 
				  ( <input type="checkbox" selected="{#chkImagingXray}"> X-ray / 
				  <input type="checkbox" selected="{#chkImagingCTScan}"> CT Scan / 
				  <input type="checkbox" selected="{#chkImagingMRI}"> MRI )
				  </div>
				  <div>
				  <textarea id="fl_txtImaging" rows="5" tabindex="5" style="display: block;width: 100%;outline: none;">{#fl_txtImaging}</textarea>
				  </div>
			   </div>
			    <div style="display: flow-root;margin-bottom: 14px;">
			      <div style="margin-top: 10px;margin-bottom: 10px;"><label>Response to physical therapy:</label> <input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="fl_physicalTherapy" value="{#fl_physicalTherapy}"> </div>
				  <div style="margin-top: 10px;margin-bottom: 10px;"><label>Response to medication:</label> <input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="fl_medication" value="{#fl_medication}"> </div>
				  </div>
				   <div><label>R.O.S:</label> 
						 <textarea id="ie_CheifComplaint" rows="4" tabindex="6" style="display: block;width: 100%;outline: none;">{#ie_ROS}</textarea>
						 </div>
			    <div style="margin-top: 30px;margin-bottom: 30px;display: flow-root;margin-bottom: 14px;">
			      <div class="chief"><label>Other:</label>
				  <textarea id="fl_txtOther" rows="4" tabindex="7" style="display: block;width: 100%;outline: none;">{#fl_txtOther}</textarea>
				  </div> 
			   </div>
			   <div class="row" style="width: 300px;height:100px;float:right;">
                   <div class="w3-tiny col-6">
                   <img src="{#signature}" alt="signature"/>
                   </div>
				</div>
		 </form>
	   </div>
       <div style="margin-top: 20px;">
	   <div style="text-align: center;margin: 0px;">
	     <p>3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p>Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
	   </div>		  
	    </div>
  </div>
</div>', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">
  <div class="container" style="display: block;padding: 20px 30px;">
      <div class="header" style="display: -webkit-box;">
	     <div class="left-box" style="width: 50%;float: left;">
		 <!-- <img src="images/logo.png" style="max-width: 185px;"> -->
		 </div>
		 <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Final Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align: right;margin: 0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div class="main" style="padding-top: 50px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
		       <div class="form-group" style="display: flow-root;margin-bottom: 14px;">
			      <div class="left-from-group" style="width: 70%;float: left;margin: 0;position: relative;">
				  <label>Patient Name:</label> 
				  <input type="text" id="patientName" binding="true" value="{#patientName}" control-type="text" name="name" style="border: none;border-bottom: 1px solid #999;outline: none;width: 85%;">
                    <button type="button" class="app-speech-input-btn" name="patientName" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="patientName_stop" style="display:none;" (click)="stopVoiceToText();"></button>				  
				  </div>
				  <div class="right-from-group" style="float: left;width: 30%;text-align: right;">
				  <label>Date:</label>
				  <input type="date" id="fl_date" binding="true" control-type="text" name="date" style="border: none;border-bottom: 1px solid #999;outline: none;width: 57%;">
				  </div>
			   
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 14px;">
			      
				  <div class="left-from-group-1" style="width: 25%;float: left;">
				  <label>Gender:</label> 
				  <input type="radio" name="fl_patientsex" binding="true" control-type="radio" value="Male"/>M / <input type="radio" name="fl_patientsex" binding="true" control-type="radio" value="Female"/> F
				  </div>
				  <div class="left-from-group-2" style="width: 25%;float: left;margin: 0;position: relative;">
				  <label>Age:</label>
				  <input type="text" tabindex="1" id="patientAge" binding="true" value="{#patientAge}" control-type="text" name="age" style="border: none;border-bottom: 1px solid #999;outline: none;width:75%;">
				  <button class="app-speech-input-btn" type="button" name="patientAge" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="patientAge_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div class="float-right" style="float: right;">
				  <label>Date of accident:</label> 
				  <input type="date" id="fl_accidentDate" binding="true" control-type="text" name="date" style="border: none;border-bottom: 1px solid #999;outline: none;">
				  </div>
				  
				
			   </div>
			  
			   
			   
			   <div class="form-group occupatio-2" style="display: flow-root;margin-bottom: 35px;margin-top: 35px;margin: 0;position: relative;">
			      <div class="chief"><label>Chief Complaint:</label> </div>
			   <textarea id="fl_txtCheifComplaint" tabindex="2" binding="true" control-type="text" rows="5" style="display: block;width: 100%;outline: none;"></textarea>
			   <button class="app-speech-input-btn" type="button" name="fl_txtCheifComplaint" (click)="voiceToText();"></button>
			   <button type="button" class="app-speech-stop-btn" name="fl_txtCheifComplaint_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 14px;margin: 0;position: relative;">
			      <div class="chief his" style="margin-top: 20px;"><label>History of illness:</label> </div>
				  <textarea id="fl_txtHOI" binding="true" control-type="text" tabindex="3" rows="15" style="display: block;width: 100%;outline: none;"></textarea>
				  <button class="app-speech-input-btn" type="button" name="fl_txtHOI" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fl_txtHOI_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   
			  
			   
			   <div class="form-group his-1" style="display: flow-root;margin-bottom: 30px;margin-top: 30px;margin: 0;position: relative;">
			      <div class="chief his" style="margin-top: 20px;"><label>Imaging results:</label> 
				  ( <input type="checkbox" binding="true" control-type="checkbox" name="chkImagingXray"> X-ray /
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkImagingCTScan"> CT Scan / 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkImagingMRI"> MRI )
				  </div>
				  <textarea id="fl_txtImaging" binding="true" control-type="text" rows="4" style="display: block;width: 100%;outline: none;"></textarea>
				  <button class="app-speech-input-btn" tabindex="4" type="button" name="fl_txtImaging" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fl_txtImaging_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 14px;">
			      <div class="res" style="margin-top: 10px;margin-bottom: 10px;"><label>Response to physical therapy:</label> <input type="radio" name="fl_physicalTherapy" binding="true" control-type="radio" value="Poor"/>  Poor / <input type="radio" name="fl_physicalTherapy" binding="true" control-type="radio" value="Average"/> Average / <input type="radio" name="fl_physicalTherapy" binding="true" control-type="radio" value="Good"/> Good </div>
				  <div class="res" style="margin-top: 10px;margin-bottom: 10px;"><label>Response to medication:</label> <input type="radio" name="fl_medication" binding="true" control-type="radio" value="Poor"/>  Poor / <input type="radio" name="fl_medication" binding="true" control-type="radio" value="Average"/> Average / <input type="radio" name="fl_medication" binding="true" control-type="radio" value="Good"/> Good </div> </div>
				<div class="pmd" style="margin: 0;display:inline-block;width:100%;">
					 <div style="position: relative;"><label style="width: 15%;float: left;">R.O.S:</label> 
					 <textarea id="ie_ROS" binding="true" control-type="text" tabindex="5" rows="3" style="display: block;width: 100%;outline: none;"></textarea>
					 <button class="app-speech-input-btn" type="button" name="ie_ROS" (click)="voiceToText();"></button>
					 <button type="button" class="app-speech-stop-btn" name="ie_ROS_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					 </div></div>

				<div class="form-group other" style="display: flow-root;margin-bottom: 30px;margin-top: 30px;margin: 0;position: relative;">
			      <div class="chief"><label>Other:</label></div>
				  <textarea id="fl_txtOther" binding="true" control-type="text" rows="4" tabindex="6" style="display: block;width: 100%;outline: none;"></textarea>
				   <button class="app-speech-input-btn" type="button" name="fl_txtOther" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fl_txtOther_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>

				 </div>
			   <div class="signature-pad" style="width: 400px;height:150px;border: 1px solid #999;margin-top:10px;">
                     <canvas #sPad width="400" height="150" style="touch-action: none; " (click)="selectSignature()" id="signatureCtrl"></canvas>
                     </div>
                     <section>
                    <div class="row" style="width: 400px;height:30px;">
                   <div class="w3-tiny col-6">
                   <button type="button" class="w3-button w3-primary w3-right" (click)="clear()" id="signatureClear"><i class="fa fa-refresh" aria-hidden="true"></i></button>
				   <button type="button" class="w3-button w3-primary w3-right" (click)="loadSignature()" id="loadSignature"><i class="fa fa-upload" aria-hidden="true"></i></button>
                   </div>
    </div>
  </section>
			   
			    
			   
		 </form>
		 
	   </div>
       <div class="footer" style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  ')
GO
INSERT [dbo].[TemplateList] ([Id], [TemplateName], [TemplateHtml], [TemplatePage]) VALUES (4, N'Physical Examination', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 30cm;">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;"><img style="max-width: 185px;" src ="assets/images/logo.png"></div>
		 <div  style="width: 50%;float: left;"><h3 style=" font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Physical Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
			    <div style="display: flow-root;margin-bottom: 6px;">
				   <div style="width: 36%;float: left;">Name: <label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="1" value="{#patientName}"></div>
				  <div style="width: 21%;float: left;"><label>Age </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="2" value="{#patientAge}"></div>
				  <div style="width: 21%;float: left;"><label>Gender </label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" value="{#pl_patientsex}"></div>
				  <div style="width: 21%;float: left;"><label>Date </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" value="{#pl_date}"></div>
				 
				  </div>
				  <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 23%;float: left;"><label>Vital Signs: HR: <label> <input style="width: 40%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="3" id="fname" value="{#pl_hr}"></div>
				  <div style="width: 10%;float: left;"><label>BP:</label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="4" value="{#pl_bp}"></div>
				 <div style="width: 16%;float: left;"><label>TEMP:</label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="5" value="{#pl_temp}"></div>
				  <div style="width: 10%;float: left;"><label>RR:</label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="6" value="{#pl_rr}"></div>
				  <div style="width: 10%;float: left;"><label>WT:</label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="7" value="{#pl_wt}"></div>
				  <div style="width: 10%;float: left;"><label>HT:</label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="8" value="{#pl_ht}"></div>
				  <div style="width: 15%;float: left;"><label>BMI:</label> <input style="width: 60%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="9" value="{#pl_bmi}"></div>
			      <div style="display: block;margin-top: 16px;margin-bottom: 8px;float: left;border: 1px solid #999;width: 98%;"></div>
			   </div>
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 33.33%;float: left;"><label>Head: Atraumatic <label> <input type="checkbox" selected="{#chkAtraumatic}"></div>
				  <div style="width: 33.33%;float: left;"><label>Eyes: Perla Eomi</label> <input type="checkbox" selected="{#chkPerlaEomi}"></div>
				 <div style="width: 33.33%;float: left;"><label>ENT: WNL</label> <input type="checkbox" selected="{#chkWNL}"></div>
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 40%;float: left;"><label>Heart Rhythm: <label>  <input style="width: 70%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="pl_heartRhythm" value="{#pl_heartRhythm}"></div>
				  <div style="width: 60%;float: left;"><label>Chest/Lungs: WNL</label> <input style="border: none;border-bottom: 1px solid #999;width: 60%;outline: none;" type="text" tabindex="10" value="{#pl_wnl}"></div>
				
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-ad"><label>Abdomen: <label>
				    <input type="checkbox" selected="{#chkAbdomenFlat}"> Flat 
				    <input type="checkbox" selected="{#chkAbdomenSoft}"> Soft
				    <input type="checkbox" selected="{#chkAbdomenNonTender}"> Non Tender 
				    <input type="checkbox" selected="{#chkAbdomenNoMasses}"> No Masses 
				    <input type="checkbox" selected="{#chkAbdomenANormal}"> A-Normal 
				    <input type="checkbox" selected="{#chkAbdomenBowelSound}"> Bowel Sound 
				   </div>
				  
				  
			   </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Cervical Spine:  Tenderness of spinous process:<label> 
				  <input style="width: 30%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="pl_spinousProcess" value="{#pl_spinousProcess}">  &nbsp;  &nbsp; |  &nbsp; &nbsp; &nbsp;
				     <input type="checkbox" selected="{#chkCervicalSpineC3}"> C3
				     <input type="checkbox" selected="{#chkCervicalSpineC4}"> C4
				     <input type="checkbox" selected="{#chkCervicalSpineC5}"> C5
				     <input type="checkbox" selected="{#chkCervicalSpineC6}"> C6
				     <input type="checkbox" selected="{#chkCervicalSpineC7}"> C7
				   
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Extension</label>(N:60) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="11" value="{#pl_extension}"><br>
				   <label style="width: 124px;float: left;">Flexion</label> (N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="12" value="{#pl_flexion}"><br>
                        <label style="width: 124px;float: left;">RT Lat Flex  </label> (N:45) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="13" value="{#pl_rtLat}"><br>
                  <label style="width: 124px;float: left;">LT Lat Flex</label> (N:45)  <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="14" value="{#pl_ltLat}"><br>
                   <label style="width: 124px;float: left;">RT Rotation </label> (N: 80) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="15" value="{#pl_rtRotation}"><br>
                          <label style="width: 124px;float: left;">LT Rotation </label>  (N: 80) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="16" value="{#pl_ltRotation}"><br>

				   </div>
				   
				    <div style="width: 50%;float: left;">
				   <label>Trapezius Muscle: </label>RT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkTrapeziusMuscleRT}"> LT
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkTrapeziusMuscleLT}"> Both
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkTrapeziusMuscleBoth}"> <br>
				    <label> Spasm </label> Tenderness <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="17" value="{#pl_spasm}"><br>
                       <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkSpasmTendernessMild}"> Mild 
					   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkSpasmTendernessModerate}"> Moderate 
					   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkSpasmTendernessSevere}"> Severe <br>
                  <label>Other</label> <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="18" value="{#pl_other}"><br>
				   
				   </div> 
				  
			   </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Thoraxic Spine:  Tenderness of spinous process:<label> 
				  <input style="width: 20%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="sex" value="{#pl_tendernessSpinous}">
				  
				   
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Extension</label>(N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="19" value="{#pl_n50Extension}"><br>
				   <label style="width: 124px;float: left;">Flexion</label> (N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="20" value="{#pl_n50Flexion}"><br>
                        <label style="width: 124px;float: left;">Rotation  </label> (N:30) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="21" value="{#pl_n30Rotation}"><br>
                 

				   </div>
				   
				    <div style="width: 50%;float: left;">
				   <label>Thoraxic Paraspinals: </label> 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkThoraxicParaspinalsRT}"> RT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkThoraxicParaspinalsLT}"> LT
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkThoraxicParaspinalsBoth}"> Both <br>
				    <label> Spasm </label> Tenderness <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="22" value="{#pl_spasmTenderness}"><br>
                      <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkSpasmMild}"> Mild 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkSpasmModerate}"> Moderate 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkSpasmSevere}"> Severe <br>
                 
				   
				   </div>
				  
			   </div>
			   
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Lumbar Spine:  Tenderness of spinous process:<label> 
				  <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="pl_tendernessSpinousProcess" value="{#pl_tendernessSpinousProcess}"> &nbsp;  &nbsp; |  &nbsp; &nbsp; &nbsp;
                       <input type="checkbox" selected="{#chkLumbarSpineL1}"> L1 
				       <input type="checkbox" selected="{#chkLumbarSpineL2}"> L2 
				       <input type="checkbox" selected="{#chkLumbarSpineL3}"> L3 
				       <input type="checkbox" selected="{#chkLumbarSpineL4}"> L4 
				       <input type="checkbox" selected="{#chkLumbarSpineL5}"> L5 
				       <input type="checkbox" selected="{#chkLumbarSpineSI}"> SI 
				   
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Extension</label>(N:25) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="23" value="{#pl_n25Extension}"><br>
				   <label style="width: 124px;float: left;">Flexion</label> (N:60) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="24" value="{#pl_n60Flexion}"><br>
                        <label style="width: 124px;float: left;">RT Lat Flex  </label> (N:25) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="25" value="{#pl_n25RtlatFlex}"><br>
                  <label style="width: 124px;float: left;">LT Lat Flex</label> (N:25)  <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="26" value="{#pl_n25LtlatFlex}"><br>
                  

				   </div>
				   
				    <div style="width: 50%;float: left;">
				   <label>Lumbar Paraspinals: </label> 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkLumbarParaspinalsRT}"> RT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkLumbarParaspinalsLT}"> LT
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkLumbarParaspinalsBoth}"> Both <br>
				    <label> Spasm </label> Tenderness <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="27" value="{#pl_spasmThree}"><br>
                      <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkTendernessMild}"> Mild 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkTendernessModerate}"> Moderate 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" selected="{#chkTendernessSevere}"> Severe <br>
                  <label>Other</label> <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="28" value="{#pl_otherOne}"><br>
				   
				   </div>
			   </div>
			   
			   
			     <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Shoulder:<label> 
				       <input type="checkbox" selected="{#chkShoulderWNL}"> WNL 
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Abduction</label>(N:180) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="29" value="{#pl_n180Abduction}"><br>
				   <label style="width: 124px;float: left;">Adduction</label> (N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="30" value="{#pl_n50Adduction}"><br>
                        <label style="width: 124px;float: left;">Flexion  </label> (N:180) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="31" value="{#pl_n180Flexion}"><br>
                  <label style="width: 124px;float: left;">Extension</label> (N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="32" value="{#pl_n50Extension1}"><br>
                   <label style="width: 124px;float: left;">Int. Rotation </label> (N: 90) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="33" value="{#pl_n90IntRotation}"><br>
                          <label style="width: 124px;float: left;">Ext. Rotation </label>  (N: 90) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="34" value="{#pl_n90ExtRotation}"><br>

				   </div>
				   
				     <div style="margin-bottom: 10px;"><label>Elbow:<label> 
				            <input type="checkbox" selected="{#chkElbowWNL}"> WNL 
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Extension</label>(N:180) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="35" value="{#pl_n180Extension}"><br>
				   <label style="width: 124px;float: left;">Flexion</label> (N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="36" value="{#pl_n50FlexionOne}"><br>
                        <label style="width: 124px;float: left;">Supination  </label> (N:180) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="37" value="{#pl_n180Suspination}"><br>
                  <label style="width: 124px;float: left;">Pronation</label> (N:50)  <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="38" value="{#pl_n50Pronation}"><br>
                   <label style="width: 45%;float: left;">Bicipital Reflex Symmetric </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="sex" value="{#pl_bicipitalReflex}"> <br>
                          

				   </div>
				   
					 <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;" style="display: block;">
						<label>Other</label>
						<textarea id="pl_otherTwo" rows="4" tabindex="39" style="display: block;width: 100%;outline: none;">{#pl_otherTwo} </textarea>
						</div>	
				  
				  <div style="display: flow-root;margin-bottom: 6px;float: left;">
			      <div style="margin-bottom: 10px;"><label>Wrist:<label> 
				           <input type="checkbox" selected="{#chkWristWNL}"> WNL 
				   </div>
				   
				   <div style="width: 100%;float: left;">
				   <label style="width: 25%;float: left;">Flexion</label>(N:60) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="40" value="{#pl_n60FlexionOne}"><br>
				   <label style="width: 25%;float: left;">Extension</label> (N:60) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="41" value="{#pl_extensionOne}"><br>
                        

				   </div>
				     <div style="width: 100%;float: left;">
				   <label style="width: 25%;float: left;">Radial Deviation</label>(N:20) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="42" value="{#pl_n20Radial}"><br>
				   <label style="width: 25%;float: left;">Ulnar Deviation</label> (N:30) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="43" value="{#pl_n30Ulnar}"><br>
                        

				   </div>
				   </div>
				   <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;" style="display: block;">
						<label>Other</label>
						<textarea  rows="4" tabindex="44" style="display: block;width: 100%;outline: none;" id="pl_otherThree">{#pl_otherThree} </textarea>
						</div>
				   
				  
			   </div>
			   
		 </form>
		 
	   </div>
       <div style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>
 
 <div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 30cm;">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;"><img style="max-width: 185px;" src ="assets/images/logo.png"></div>
		 <div  style="width: 50%;float: left;"><h3 style=" font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Physical Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
			    <div style="display: flow-root;margin-bottom: 6px;">
				   <div style="width: 50%;float: left;"><label> Name: </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="45" value="{#name1}"></div>
				  <div style="width: 50%;float: left;"><label>Date </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" value="{#pl_date}"></div>
				  
				  </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Hip:<label> 
				       <input type="checkbox" selected="{#chkHipWNL}"> WNL </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Flexion</label>(N:40) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="46" value="{#pl_n40Flexion}"><br>
				   <label style="width: 124px;float: left;">Extension</label> (N:90) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="47" value="{#pl_n90Extension}"><br>
                        <label style="width: 124px;float: left;">Abduction </label> (N:40) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="48" value="{#pl_n40Abduction}"><br>
                          
				   </div>
				    <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Flexion</label>(N:40) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="49" value="{#pl_n40Flexion1}"><br>
				   <label style="width: 124px;float: left;">Extension</label> (N:90) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="50" value="{#pl_n90Extension1}"><br>
                        <label style="width: 124px;float: left;">Abduction </label> (N:40) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="51" value="{#pl_n40Abduction1}"><br>
                  
				   </div>
				   
				   <label>Other</label><br>
				   <textarea  rows="4" tabindex="52" style="display: block;width: 100%;outline: none;" id="pl_Other4">{#pl_Other4} </textarea>
                    
                          
			   </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Knee:<label> 
				     <input type="checkbox" selected="{#chkKneeWNL}"> WNL </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Flexion</label>(N:40) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="53" value="{#pl_n40Flexion2}"><br>
				   <label style="width: 124px;float: left;">Extension</label> (N:90) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="54" value="{#pl_n90Extension2}"><br>
                        <label style="width: 124px;float: left;">Patellar Reflex: </label> Symmetric 
						<input style="border: none;width: 15%;border-bottom: 1px solid #999;outline:none;" type="checkbox" style="width: auto;" selected="{#chkPatellarSymmetric}"> Normal 
						<input style="border: none;width: 15%;border-bottom: 1px solid #999;outline:none;" type="checkbox" style="width: auto;" selected="{#chkPatellarNormal}"><br>
                          
				   </div>
				    <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Drawer</label>WNL <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="55" value="{#pl_Wnl2}"><br>
				   <label style="width: 124px;float: left;">Lateral Collateral Ligaments:</label> WNL <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="56" value="{#pl_Wnl3}"><br>
                        <label style="width: 15%;float: left;">Decreased </label> <input style="width: 50%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="sex" value="{#pl_decreased}"><br>
                  
				   </div>
				   
				   
				   <label> Other</label><br>
				   <textarea  rows="4" tabindex="57" style="display: block;width: 100%;outline: none;" id="pl_Other5"> {#pl_Other5}</textarea>
                    
                          
			   </div>
			   
			      <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Ankle:<label> 
				        <input type="checkbox" selected="{#chkAnkleWNL}"> WNL </div>
				   
				   <div style="width: 50%;float: left;">
				   <label style="width: 124px;float: left;">Dorsiflexion</label>(N:20) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="58" value="{#pl_n20dorsiflexion}"><br>
				   <label style="width: 124px;float: left;">Plantar Flexion</label> (N:50) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="59" value="{#pl_n50Planter}"><br>
                          
				   </div>
				    <div style="width: 50%;float: left;">
				   
				   <label style="width: 124px;float: left;">Eversion:</label> (N:5) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="60" value="{#pl_n5Eversion}"><br>
                         <label style="width: 124px;float: left;">Inversion:</label> (N:5) <input style="border: none;width: 50%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="61" value="{#pl_n5Inversion}"><br>
                  
				   </div>
				   
				   <label>Other</label><br>
				   <textarea  rows="4" tabindex="62" style="display: block;width: 100%;outline: none;" id="pl_Other6">{#pl_Other6}</textarea>
                    
                          
			   </div>
			       <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Neurological<label> </div>  
				  
			   </div>
				   
				    <div style="display: flow-root;margin-bottom: 6px;">
				   
				      <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Cervical Compression Test</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="cervicalTest" value="{#pl_cervicalComp}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="cervicalCompRT" value="{#pl_cervicalCompRT}"><br>
				       
                          
				      </div>
				       <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Shoulder Depression Test</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="shoulderTest" value="{#pl_shoulderTest}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="shoulderTestRT" value="{#pl_shoulderTestRT}"><br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Lasegue''s Test (SLR 45):</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="lasegueTest" value="{#pl_lasegue}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="lasegueRT" value="{#pl_lasegueRT}"><br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Bragard''s Test:</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="bragardTest" value="{#pl_bragard}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="bragardRT" value="{#pl_bragardRT}"><br>
				       
                          
				      </div>
					  <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Romberg''s Test:</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="rombergTest" value="{#pl_rombergTest}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="rombergTestRT" value="{#pl_rombergTestRT}"><br>
				       
                          
				      </div>

			   </div>
				   
				   
				  <label>Other</label><br>
				  <textarea  rows="2" tabindex="63" style="display: block;width: 100%;outline: none;" id="pl_other7">{#pl_other7}</textarea>
				  
				  
				   <label>Diagnosis:</label><br>
				   <textarea  rows="5" tabindex="64" style="display: block;width: 100%;outline: none;" id="pl_diagnosis">{#pl_diagnosis}</textarea>
		 </form>
	   </div>
       <div style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p			  
	    </div> 
  </div>
</div>
 
 
<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 30cm;">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;"><img style="max-width: 185px;" src ="assets/images/logo.png"></div>
		 <div  style="width: 50%;float: left;"><h3 style=" font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Physical Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
			    <div style="display: flow-root;margin-bottom: 6px;">
				   <div style="width: 50%;float: left;"><label>Name: </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="65" value="{#name2}"></div>
				  <div style="width: 50%;float: left;"><label>Date </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" value="{#pl_date}"></div>
				  </div>
				  <div style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-vital0"><label>Diagnostic Test: <label>
				  <input style="border: none;border-bottom: 1px solid #999;" type="text" tabindex="66" value="{#pl_diagosticTest}">
				  </div>
				  
			   </div>
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 62%;float: left;"><label> CT scan | MRI | Soft Tissue Sonogram <label> <input style="border: none;border-bottom: 1px solid #999;" type="text" value="{#pl_cms}"></div>
				  
				 <div class="left-from-group-vital-16"><label> 
				 <input type="checkbox" selected="{#chkUpperExtremity}"> Upper Extremity <label> 
				 <input type="checkbox" selected="{#chkLowerExtremity}"> Lower Extremity </div>
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-top: 20px;margin-bottom: 20px;"><label>Other<label> 
				  <textarea  rows="3" tabindex="67" style="display: block;width: 100%;outline: none;" id="pl_other8">{#pl_other8}</textarea>
				  
				  </div>
				  
				
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-treatment"><label> Treatment: <label>
				  <input style="border: none;border-bottom: 1px solid #999;" type="text" tabindex="68" value="{#pl_treatment}">
				  </div>
				     
					   <div class="left-from-group-treatment-2" style="width: 70%;">&nbsp;  &nbsp; | &nbsp;  &nbsp; <input style="width: 25%;border: none;outline: none;border-bottom: 1px solid #999;" type="text" value="{#pl_mg1}"> MG. Q<input style="width: 25%;border: none;outline: none;border-bottom: 1px solid #999;" type="text" value="{#pl_hr1}">HR
					</div>
					  
					   <div class="left-from-group-treatment-2" style="width: 70%;">&nbsp;  &nbsp; | &nbsp;  &nbsp; <input style="width: 25%;border: none;outline: none;border-bottom: 1px solid #999;" type="text" value="{#pl_mg2}"> MG. Q<input style="width: 25%;border: none;outline: none;border-bottom: 1px solid #999;" type="text" value="{#pl_hr2}">HR
					</div>
				  
			   </div>
			    <div style="display: flow-root;margin-bottom: 6px;">
			    <div class="left-from-group-treatment-pic"><label> Other Medication: <label><br>
				<textarea  rows="3" tabindex="69" style="display: block;width: 100%;outline: none;" id="pl_otherMedication">{#pl_otherMedication}</textarea>
				</div>
				</div>
			    <div style="display: flow-root;margin-bottom: 6px;">
			     
				     <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" selected="{#chkColdHotPack}"> Cold | Hot Pack</li>
					  <li><input type="checkbox" selected="{#chkElectricalStimulation}"> Electrical Stimulation</li>
					   <li><input type="checkbox" selected="{#chkParaffin}"> Paraffin</li>
					   <li><input type="checkbox" selected="{#chkUltrasound}"> Ultrasound</li>
					 </ul>
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" selected="{#chkGaitTraning}"> Gait Traning</li>
					  <li><input type="checkbox" selected="{#chkLowerLevelLeaser}"> Lower Level Leaser</li>
					   <li><input type="checkbox" selected="{#chkManualTherapy}"> Manual Therapy</li>
					   <li><input type="checkbox" selected="{#chkPhysicalTherapy}"> Physical Therapy</li>
					 </ul>
					 
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" selected="{#chkTherapeuticActivities}"> Therapeutic Activities</li>
					  <li><input type="checkbox" selected="{#chkTherapeuticExercises}"> Therapeutic Exercises</li>
					   <li><input type="checkbox" selected="{#chkLontophoresis}"> Lontophoresis</li>
					   <li><input type="checkbox" selected="{#chkMechanicalTraction}"> Mechanical Traction</li>
					 </ul>
					 
					    <div style="width: 24%;float: left;margin-left: 20px;border: 1px solid #999;padding: 10px;height: 87px;">
					   <label>X-Week: </label><input style="border: none;outline: none;border-bottom: 1px solid #999;width: 89px;margin-bottom: 10px;" type="text" value="{#pl_xWeek}"><br>
					   For 1,2,3,4 week
					 </div>
					 
				  </div>
				    <div style="display: flow-root;margin-bottom: 6px;">
			    <div class="left-from-group-treatment-pic"><label>Referrals: <label><br>
				<textarea  rows="3" tabindex="70" style="display: block;width: 100%;outline: none;" id="pl_referral">{#pl_referral}</textarea>
				
				</div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			    <div class="left-from-group-treatment-pic"><label>Recommendations: <label><br>
				<textarea  rows="3" tabindex="71" style="display: block;width: 100%;outline: none;"  id="pl_recommendation">{#pl_recommendation} </textarea>
				
				</div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			    <div style="margin-top: 20px;"><label>Follow Up Appointment: <label><input style="border:none;border-bottom: 1px solid #999;outline: none;" type="date" value="{#pl_appointmentDate}">
				</div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			    <div style="width: 100%;margin-top: 20px;clear: both;"><label>Only For Final Exam: <label><input style="border: none;border-bottom: 1px solid #999;outline: none;" type="date" value="{#pl_examDate}">
				<p>The patient is discharged from active or scheduled care but can return as needed for supportive care. 
                 The patient has reached MMI and has sustained injuries that have resulted in a permanent partial impairment of <input style="border: none;border-bottom: 1px solid #999;outline: none;" type="text" value="{#pl_finalDataPer}">%.  This rational is based on my
                         professional opinion with the aid of information derived from the Guides to the Evaluation of Permanent Impairment, 6 Edition Copyright 2009 to 2021, AMA.</p>
				</div>
					 <div style="display: flow-root;margin-bottom: 6px;">
			    <div style="margin-top: 34px;"><label>MD: <label><input style="border: none;border-bottom: 1px solid #999;outline: none;" type="text" tabindex="72" value="{#pl_md}">
				<p style="margin-top: 8px;margin-bottom: 8px;">Physicians’ Signature</p>
				</div>
				<div class="row" style="width: 300px;height:100px;float:right;">
                   <div class="w3-tiny col-6">
                   <img src="{#signature}" alt="signature"/>
                   </div>
				</div>
		 </form>
	   </div>
       <div style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>			  
	    </div>
  </div>
</div>  
', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;">
		 <!-- <img style="max-width: 185px;" src ="assets/images/logo.png"> -->
		 </div>
		 <div  style="width: 50%;float: left;"><h3 style=" font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Physical Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
			    <div style="display: flow-root;margin-bottom: 6px;">
				   <div style="width: 36%;float: left;margin: 0;position: relative;">
				   <label>Name: </label>
				   <input id="patientName" name="name" binding="true" value="{#patientName}" control-type="text" style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" type="text">
				   <button type="button" class="app-speech-input-btn" name="patientName" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="patientName_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="width: 21%;float: left;margin: 0;position: relative;">
				  <label>Age </label>
				  <input id="patientAge" binding="true" value="{#patientAge}" control-type="text" name="age" style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" >
				   <button type="button" class="app-speech-input-btn" name="patientAge" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="patientAge_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="width: 21%;float: left;">
				  <label>Gender </label>
				   <input type="radio" name="pl_patientsex" binding="true" control-type="radio" value="Male"/> M / <input type="radio" name="pl_patientsex" binding="true" control-type="radio" value="Female"/> F
				  </div>
				  <div style="width: 21%;float: left;">
				  <label>Date </label>
				  <input id="pl_date" binding="true" control-type="text" type="date" style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;">
				  </div>
				  </div>
				  <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 20%;float: left;margin: 0;position: relative;">
				  <label>Vital Signs: HR: <label>
				  <input style="width: 45%;border: none;border-bottom: 1px solid #999;" tabindex="1" binding="true" control-type="text" type="text" id="pl_hr" name="hr">
				  <button type="button" class="app-speech-input-btn" name="pl_hr" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_hr_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="width: 12%;float: left;margin: 0;position: relative;">
				  <label>BP:</label> 
				  <input style="width: 50%;border: none;border-bottom: 1px solid #999;" tabindex="2" type="text" binding="true" control-type="text" id="pl_bp" name="bp">
				  <button type="button" class="app-speech-input-btn" name="pl_bp" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_bp_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				 <div style="width: 12%;float: left;margin: 0;position: relative;">
				 <label>TEMP:</label>
				 <input style="width: 50%;border: none;border-bottom: 1px solid #999;" type="text" tabindex="3" binding="true" control-type="text" id="pl_temp" name="temp">
				 <button type="button" class="app-speech-input-btn" name="pl_temp" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_temp_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				 </div>
				  <div style="width: 12%;float: left;margin: 0;position: relative;">
				  <label>RR:</label> 
				  <input style="width: 50%;border: none;border-bottom: 1px solid #999;" tabindex="4" type="text" binding="true" control-type="text" id="pl_rr" name="rr">
				  <button type="button" class="app-speech-input-btn" name="pl_rr" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_rr_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="width: 12%;float: left;margin: 0;position: relative;">
				  <label>WT:</label>
				  <input style="width: 50%;border: none;border-bottom: 1px solid #999;" tabindex="5" type="text" binding="true" control-type="text" id="pl_wt" name="wt">
				  <button type="button" class="app-speech-input-btn" name="pl_wt" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_wt_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="width: 12%;float: left;margin: 0;position: relative;">
				  <label>HT:</label>
				  <input style="width: 50%;border: none;border-bottom: 1px solid #999;" tabindex="6" type="text" binding="true" control-type="text" id="pl_ht" name="ht">
				  <button type="button" class="app-speech-input-btn" name="pl_ht" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_ht_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="width: 12%;float: left;margin: 0;position: relative;">
				  <label>BMI:</label> 
				  <input style="width: 50%;border: none;border-bottom: 1px solid #999;" tabindex="7" type="text" binding="true" control-type="text" id="pl_bmi" name="bmi">
				  <button type="button" class="app-speech-input-btn" name="pl_bmi" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_bmi_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
			      <div style="display: block;margin-top: 16px;margin-bottom: 8px;float: left;border: 1px solid #999;width: 98%;"></div>
			   </div>
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 33.33%;float: left;"><label>Head: Atraumatic <label> <input type="checkbox" binding="true" control-type="checkbox" name="chkAtraumatic"></div>
				  <div style="width: 33.33%;float: left;"><label>Eyes: Perla Eomi</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkPerlaEomi"></div>
				 <div style="width: 33.33%;float: left;"><label>ENT: WNL</label> <input type="checkbox" binding="true" control-type="checkbox" name="chkWNL"></div>
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 40%;float: left;"><label>Heart Rhythm: <label> <input type="radio" name="pl_heartRhythm" binding="true" control-type="radio" value="Regular"/> Regular / <input type="radio" name="pl_heartRhythm" binding="true" control-type="radio" value="Irregular"/> Irregular </div>
				  <div style="width: 60%;float: left;margin: 0;position: relative;">
				  <label>Chest/Lungs: WNL</label>
				  <input style="border: none;border-bottom: 1px solid #999;width: 70%;outline: none;" tabindex="8" type="text" binding="true" control-type="text" id="pl_wnl" name="wnl">
				  <button type="button" class="app-speech-input-btn" name="pl_wnl"" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_wnl_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-ad"><label>Abdomen: <label> 
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenFlat"> Flat
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenSoft"> Soft
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenNonTender"> Non Tender
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenNoMasses"> No Masses
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenANormal"> A-Normal
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAbdomenBowelSound"> Bowel Sound
				   </div>
				  
				  
			   </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Cervical Spine:  Tenderness of spinous process:<label> 
				  <input type="radio" name="pl_spinousProcess" binding="true" control-type="radio" value="Yes"/> Yes / 
				  <input type="radio" name="pl_spinousProcess" binding="true" control-type="radio" value="No"/> No &nbsp;  &nbsp; |  &nbsp; &nbsp; &nbsp;
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkCervicalSpineC3"> C3
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkCervicalSpineC4"> C4
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkCervicalSpineC5"> C5
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkCervicalSpineC6"> C6
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkCervicalSpineC7"> C7
				   
				   </div>
				   
				   <div style="width: 50%;float: left;margin: 0;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;">Extension</label>(N:60)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="9" type="text" binding="true" control-type="text" id="pl_extension" name="extension">
				   <button type="button" class="app-speech-input-btn" name="pl_extension" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_extension_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					</div>
					<div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;margin: 0;position: relative;">Flexion</label> (N:50)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="10" type="text" binding="true" control-type="text" id="pl_flexion" name="flexion">
				   <button type="button" class="app-speech-input-btn" name="pl_flexion" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_flexion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;margin: 0;position: relative;">RT Lat Flex  </label> (N:45)&nbsp; 
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="11" type="text" binding="true" control-type="text" id="pl_rtLat" name="rtLat">
						<button type="button" class="app-speech-input-btn" name="pl_rtLat" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_rtLat_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
						<div style="position: relative;width:70%;">
                  <label style="width: 124px;float: left;margin: 0;position: relative;">LT Lat Flex</label> (N:45)&nbsp; 
				  <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="12" type="text" binding="true" control-type="text" id="pl_ltLat" name="ltLat">
				  <button type="button" class="app-speech-input-btn" name="pl_ltLat" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_ltLat_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="position: relative;width:70%;">
                   <label style="width: 124px;float: left;margin: 0;position: relative;">RT Rotation </label> (N: 80)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="13" type="text" binding="true" control-type="text" id="pl_rtRotation" name="rtRotation">
				   <button type="button" class="app-speech-input-btn" name="pl_rtRotation" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_rtRotation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                          <label style="width: 124px;float: left;margin: 0;position: relative;">LT Rotation </label>  (N: 80)&nbsp; 
						  <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="14" type="text" binding="true" control-type="text" id="pl_ltRotation" name="ltRotation">
						  <button type="button" class="app-speech-input-btn" name="pl_ltRotation" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_ltRotation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						  </div>

				   </div>
				   
				    <div style="width: 50%;float: left;margin: 0;position: relative;">
				   <label>Trapezius Muscle: </label> 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkTrapeziusMuscleRT"> RT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkTrapeziusMuscleLT"> LT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkTrapeziusMuscleBoth"> Both <br>
				    <div style="position: relative;width:70%;">
					<label> Spasm Tenderness </label>
					<input style="border: none;border-bottom: 1px solid #999;outline:none;margin-bottom: 6px;" tabindex="15" type="text" binding="true" control-type="text" id="pl_spasm" name="spasm">
					<button type="button" class="app-speech-input-btn" name="pl_spasm" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_spasm_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					</div>
                      <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkSpasmTendernessMild"> Mild 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkSpasmTendernessModerate"> Moderate 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkSpasmTendernessSevere"> Severe <br>
                  <div style="position: relative;width:70%;">
				  <label>Other</label>
				  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="16" binding="true" control-type="text" id="pl_other" name="other">
				  <button type="button" class="app-speech-input-btn" name="pl_other" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_other_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				   
				   </div>
				  
			   </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Thoraxic Spine:  Tenderness of spinous process:<label> 
				  <input type="radio" name="pl_tendernessSpinous" binding="true" control-type="radio" value="Yes"/> Yes / <input type="radio" name="pl_tendernessSpinous" binding="true" control-type="radio" value="No"/> No
				  
				   
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;">Extension</label>(N:50)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" type="text" binding="true" tabindex="17" control-type="text" id="pl_n50Extension" name="n50Extension">
				   <button type="button" class="app-speech-input-btn" name="pl_n50Extension" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n50Extension_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;margin: 0;position: relative;">Flexion</label> (N:50)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="18" type="text" binding="true" control-type="text" id="pl_n50Flexion" name="n50flexion">
				    <button type="button" class="app-speech-input-btn" name="pl_n50Flexion" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n50Flexion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;margin: 0;position: relative;">Rotation  </label> (N:30)&nbsp; 
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="19" binding="true" control-type="text" id="pl_n30Rotation" name="n50rotation">
						<button type="button" class="app-speech-input-btn" name="pl_n30Rotation" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n30Rotation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
                 

				   </div>
				   
				    <div style="width: 50%;float: left;margin: 0;position: relative;">
				   <label>Thoraxic Paraspinals: </label> 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkThoraxicParaspinalsRT"> RT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkThoraxicParaspinalsLT"> LT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkThoraxicParaspinalsBoth"> Both <br>
				    <div style="position: relative;width:70%;">
					<label> Spasm Tenderness </label> 
					<input style="border: none;border-bottom: 1px solid #999;outline:none;margin-bottom: 6px;" tabindex="20" type="text" binding="true" control-type="text" id="pl_spasmTenderness" name="spasmTenderness">
					<button type="button" class="app-speech-input-btn" name="pl_spasmTenderness" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_spasmTenderness_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					</div>
                      <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkSpasmMild"> Mild 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkSpasmModerate"> Moderate 
					  <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkSpasmSevere"> Severe <br>
                  <br>
                 
				   
				   </div>
				  
			   </div>
			   
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Lumbar Spine:  Tenderness of spinous process:<label> 
				  <input type="radio" name="pl_tendernessSpinousProcess" binding="true" control-type="radio" value="Yes"/> Yes / <input type="radio" name="pl_tendernessSpinousProcess" binding="true" control-type="radio" value="No"/> No  &nbsp;  &nbsp; |  &nbsp; &nbsp; &nbsp;
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarSpineL1"> L1
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarSpineL2"> L2
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarSpineL3"> L3
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarSpineL4"> L4
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarSpineL5"> L5
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkLumbarSpineSI"> SI
				   
				   </div>
				   
				   <div style="width: 50%;float: left;">
				    <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;margin: 0;position: relative;">Extension</label>(N:25)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="21" binding="true" control-type="text" id="pl_n25Extension" name="n25Extension">
				   <button type="button" class="app-speech-input-btn" name="pl_n25Extension" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n25Extension_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				    <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;margin: 0;position: relative;">Flexion</label> (N:60)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="22" type="text" type="text" binding="true" control-type="text" id="pl_n60Flexion" name="n60flexion">
				   <button type="button" class="app-speech-input-btn" name="pl_n60Flexion" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n60Flexion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				    <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;margin: 0;position: relative;">RT Lat Flex  </label> (N:25)&nbsp;
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="23" binding="true" control-type="text" id="pl_n25RtlatFlex" name="n25RtLatFlex">
						<button type="button" class="app-speech-input-btn" name="pl_n25RtlatFlex" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n25RtlatFlex_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
						 <div style="position: relative;width:70%;">
                  <label style="width: 124px;float: left;margin: 0;position: relative;">LT Lat Flex</label> (N:25)&nbsp; 
				  <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="24" type="text" binding="true" control-type="text" id="pl_n25LtlatFlex" name="n25LtLatFlex">
				  <button type="button" class="app-speech-input-btn" name="pl_n25LtlatFlex" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n25LtlatFlex_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
                  

				   </div>
				   
				    <div style="width: 50%;float: left;">
				   <label>Lumbar Paraspinals: </label> 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkLumbarParaspinalsRT"> RT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkLumbarParaspinalsLT"> LT 
				   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkLumbarParaspinalsBoth"> Both <br>
				    <div style="position: relative;width:70%;">
					<label> Spasm Tenderness </label>
					<input style="border: none;border-bottom: 1px solid #999;outline:none;margin-bottom: 6px;" tabindex="25" type="text" binding="true" control-type="text" id="pl_spasmThree" name="spasm3">
					<button type="button" class="app-speech-input-btn" name="pl_spasmThree" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_spasmThree_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					</div>
                       <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkTendernessMild"> Mild 
					   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkTendernessModerate"> Moderate 
					   <input style="border: none;border-bottom: 1px solid #999;outline:none;" type="checkbox" binding="true" control-type="checkbox" name="chkTendernessSevere"> Severe <br>
                 <div style="position: relative;width:70%;">
				 <label>Other</label> 
				  <input style="border: none;border-bottom: 1px solid #999;outline:none;" tabindex="26" type="text" binding="true" control-type="text" id="pl_otherOne" name="other1">
				  <button type="button" class="app-speech-input-btn" name="pl_otherOne" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_otherOne_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				   
				   </div>
			   </div>
			   
			   
			     <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Shoulder:<label> 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkShoulderWNL"> WNL
				   </div>
				   
				   <div style="width: 50%;float: left;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;">Abduction</label>(N:180)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="27" type="text" binding="true" control-type="text" id="pl_n180Abduction" name="pl_n180abduction">
				   <button type="button" class="app-speech-input-btn" name="pl_n180Abduction" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n180Abduction_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;margin: 0;position: relative;">Adduction</label> (N:50)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="28" type="text" binding="true" control-type="text" id="pl_n50Adduction" name="n50adduction">
				   <button type="button" class="app-speech-input-btn" name="pl_n50Adduction" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n50Adduction_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;margin: 0;position: relative;">Flexion  </label> (N:180)&nbsp;
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="29" type="text" binding="true" control-type="text" id="pl_n180Flexion" name="n180Flexion">
						<button type="button" class="app-speech-input-btn" name="pl_n180Flexion" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n180Flexion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
						<div style="position: relative;width:70%;">
                  <label style="width: 124px;float: left;margin: 0;position: relative;">Extension</label> (N:50)&nbsp; 
				  <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" type="text" tabindex="30" binding="true" control-type="text" id="pl_n50Extension1" name="n50Extension1">
				  <button type="button" class="app-speech-input-btn" name="pl_n50Extension1" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n50Extension1_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div style="position: relative;width:70%;">
                   <label style="width: 124px;float: left;margin: 0;position: relative;">Int. Rotation </label> (N: 90)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="31" type="text" binding="true" control-type="text" id="pl_n90IntRotation" name="n90IntRotation">
				   <button type="button" class="app-speech-input-btn" name="pl_n90IntRotation" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n90IntRotation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                          <label style="width: 124px;float: left;margin: 0;position: relative;">Ext. Rotation </label>  (N: 90)&nbsp; 
						  <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="32" type="text" binding="true" control-type="text" id="pl_n90ExtRotation" name="n90ExtRotation">
						  <button type="button" class="app-speech-input-btn" name="pl_n90ExtRotation" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n90ExtRotation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						  </div>
						  </div>
						  
				   <div style="margin-bottom: 10px;"><label>Elbow:<label> 
				       <input type="checkbox" binding="true" control-type="checkbox" name="chkElbowWNL"> WNL 
				   </div>
				   <div style="width: 50%;float: left;">
				   
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: realtive;">Extension</label>(N:180)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" type="text" binding="true" tabindex="33" control-type="text" id="pl_n180Extension" name="n180Extension">
				   <button type="button" class="app-speech-input-btn" name="pl_n180Extension" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n180Extension_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: realtive;">Flexion</label> (N:50)&nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="34" type="text" binding="true" control-type="text" id="pl_n50FlexionOne" name="n50flexion1">
				   <button type="button" class="app-speech-input-btn" name="pl_n50FlexionOne" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n50FlexionOne_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;position: realtive;">Supination  </label> (N:180)&nbsp; 
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="35" type="text" binding="true" control-type="text" id="pl_n180Suspination" name="n180Suspination">
						<button type="button" class="app-speech-input-btn" name="pl_n180Suspination" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n180Suspination_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
						<div style="position: relative;width:70%;">
                  <label style="width: 124px;float: left;position: realtive;">Pronation</label> (N:50)&nbsp; 
				  <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;margin-bottom: 6px;" tabindex="36" type="text" binding="true" control-type="text" id="pl_n50Pronation" name="n50Pronation">
				  <button type="button" class="app-speech-input-btn" name="pl_n50Pronation" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n50Pronation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
                   <label style="width: 225px;float: left;">Bicipital Reflex Symmetric </label> 
				   <input type="radio" name="pl_bicipitalReflex" binding="true" control-type="radio" value="Yes"/> Yes / <input type="radio" name="pl_bicipitalReflex" binding="true" control-type="radio" value="No"/> No
                          

				   </div>

				   </div>
				   
				     
				   
					 <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
						<label>Other</label>
						<textarea  rows="3" binding="true" control-type="text" tabindex="37" id="pl_otherTwo" style="display: block;width: 100%;outline: none;"> </textarea>
						<button type="button" class="app-speech-input-btn" name="pl_otherTwo" (click)="voiceToText();"></button>
					    <button type="button" class="app-speech-stop-btn" name="pl_otherTwo_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>	
				  
				  <div style="display: flow-root;margin-bottom: 6px;float: left;width:100%;">
			      <div style="margin-bottom: 10px;"><label>Wrist:<label> 
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkWristWNL"> WNL 
				   </div>
				   
				   
				   <div style="width: 100%;float: left;">
				   <div style="position: relative;width:35%;">
				   <label style="width: 124px;float: left;position: relative;">Flexion</label>(N:60)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="38" binding="true" control-type="text" type="text" id="pl_n60FlexionOne">
				   <button type="button" class="app-speech-input-btn" name="pl_n60FlexionOne" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n60FlexionOne_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:35%;">
				   <label style="width: 124px;float: left;position: relative;">Extension</label> (N:60)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="39" binding="true" control-type="text" type="text" id="pl_extensionOne">
				   <button type="button" class="app-speech-input-btn" name="pl_extensionOne" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_extensionOne_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   
                        <div style="position: relative;width:35%;">
				   <label style="width: 124px;float: left;position: relative;">Radial Deviation</label>(N:20)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="40" binding="true" control-type="text" type="text" id="pl_n20Radial">
				   <button type="button" class="app-speech-input-btn" name="pl_n20Radial" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n20Radial_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:35%;">
				   <label style="width: 124px;float: left;position: relative;">Ulnar Deviation</label> (N:30)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="41" binding="true" control-type="text" type="text" id="pl_n30Ulnar">
				   <button type="button" class="app-speech-input-btn" name="pl_n30Ulnar" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="pl_n30Ulnar_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
                        

				   </div>
				   </div>
				   
				   
				   
				   <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
						<label>Other</label>
						<textarea  rows="4" id="pl_otherThree" tabindex="42" binding="true" control-type="text" style="display: block;width: 100%;outline: none;"> </textarea>
						<button type="button" class="app-speech-input-btn" name="pl_otherThree" (click)="voiceToText();"></button>
					    <button type="button" class="app-speech-stop-btn" name="pl_otherThree_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
						
				
				   
				  
			  
			   
		 </form>
		 
	   </div>
       <div style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>
 
 <div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;">
		 <!-- <img style="max-width: 185px;" src ="assets/images/logo.png"> -->
		 </div>
		 <div  style="width: 50%;float: left;"><h3 style=" font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Physical Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
			    <div style="display: flow-root;margin-bottom: 6px;">
				   <div style="width: 62%;float: left;margin:0;position: relative;"><label>Name: </label>
				   <input style="width: 87%;border: none;border-bottom: 1px solid #999;outline:none;" id="name1" name="name" binding="true" value="{#name1}" control-type="text" type="text" >
				   <button type="button" class="app-speech-input-btn" name="name1" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="name1_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				  <div style="width: 30%;float: left;"><label>Date </label> <input style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;" id="pl_date" binding="true" control-type="text" type="date" ></div>
				  
				  </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Hip:<label> 
				   <input type="checkbox" binding="true" control-type="checkbox" name="chkHipWNL"> WNL </div>
				   
				   <div style="width: 50%;float: left;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Flexion</label>(N:40)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="43" binding="true" control-type="text" type="text" id="pl_n40Flexion">
				   <button type="button" class="app-speech-input-btn" name="pl_n40Flexion" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n40Flexion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Extension</label> (N:90)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="44" binding="true" control-type="text" type="text" id="pl_n90Extension">
				   <button type="button" class="app-speech-input-btn" name="pl_n90Extension" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n90Extension_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;position: relative;">Abduction </label> (N:40)&nbsp; 
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="45" binding="true" control-type="text" type="text" id="pl_n40Abduction">
						<button type="button" class="app-speech-input-btn" name="pl_n40Abduction" (click)="voiceToText();"></button>
				        <button type="button" class="app-speech-stop-btn" name="pl_n40Abduction_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
                          
				   </div>
				   
				    <div style="width: 50%;float: left;">
					<div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Flexion</label>(N:40)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="46" binding="true" control-type="text" type="text" id="pl_n40Flexion1">
				   <button type="button" class="app-speech-input-btn" name="pl_n40Flexion1" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="pl_n40Flexion1_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Extension</label> (N:90)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" binding="true" tabindex="47" control-type="text" type="text" id="pl_n90Extension1">
				   <button type="button" class="app-speech-input-btn" name="pl_n90Extension1" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="pl_n90Extension1_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                        <label style="width: 124px;float: left;position: relative;">Abduction </label> (N:40)&nbsp; 
						<input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="48" binding="true" control-type="text" type="text" id="pl_n40Abduction1">
						<button type="button" class="app-speech-input-btn" name="pl_n40Abduction1" (click)="voiceToText();"></button>
				        <button type="button" class="app-speech-stop-btn" name="pl_n40Abduction1_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						</div>
                  
				   </div>
				   <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
				   <label>Other</label><br>
                    <textarea  rows="4" binding="true" control-type="text" tabindex="49" style="display: block;width: 100%;outline: none;" id="pl_Other4"> </textarea>
                    <button type="button" class="app-speech-input-btn" name="pl_Other4" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="pl_Other4_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					</div>
			   </div>
			   
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Knee:<label> 
				    <input type="checkbox" binding="true" control-type="checkbox" name="chkKneeWNL"> WNL </div>
				   
				   <div style="width: 50%;float: left;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Flexion</label>(N:40)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="50" binding="true" control-type="text" type="text" id="pl_n40Flexion2">
				   <button type="button" class="app-speech-input-btn" name="pl_n40Flexion2" (click)="voiceToText();"></button>
				    <button type="button" class="app-speech-stop-btn" name="pl_n40Flexion2_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Extension</label> (N:90)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;margin-bottom: 6px;" tabindex="51" binding="true" control-type="text" type="text" id="pl_n90Extension2">
				   <button type="button" class="app-speech-input-btn" name="pl_n90Extension2" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n90Extension2_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
                        <label style="width: 124px;float: left;position: relative;">Patellar Reflex: </label>
						<input type="checkbox" binding="true" control-type="checkbox" name="chkPatellarSymmetric"> Symmetric 
						<input type="checkbox" binding="true" control-type="checkbox" name="chkPatellarNormal"> Normal <br>
                          
				   </div>
				    <div style="width: 50%;float: left;">
					<div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Drawer</label>WNL &nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" binding="true" tabindex="52" control-type="text" type="text" id="pl_Wnl2">
				   <button type="button" class="app-speech-input-btn" name="pl_Wnl2" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_Wnl2_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;position: relative;">Lateral Collateral Ligaments:</label> WNL &nbsp;
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;margin-bottom: 6px;" tabindex="53" binding="true" control-type="text" type="text" id="pl_Wnl3">
				   <button type="button" class="app-speech-input-btn" name="pl_Wnl3" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_Wnl3_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
                        <label style="width: 124px;float: left;">Decreased </label> 
						<input type="radio" name="pl_decreased" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="pl_decreased" binding="true" control-type="radio" value="LT"/> LT <br>
                  
				   </div>
				   <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
				   <label>Other</label><br>
                    <textarea  rows="4" style="display: block;width: 100%;outline: none;position: relative;" tabindex="54" id= "pl_Other5"> </textarea>
					<button type="button" class="app-speech-input-btn" name="pl_Other5" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_Other5_stop" style="display:none;" (click)="stopVoiceToText();"></button>
                    </div>      
			   </div>
			   
			      <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Ankle:<label> 
				     <input type="checkbox" binding="true" control-type="checkbox" name="chkAnkleWNL"> WNL </div>
				   
				   <div style="width: 50%;float: left;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;">Dorsiflexion</label>(N:20)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="55" binding="true" control-type="text" type="text" id= "pl_n20dorsiflexion">
				   <button type="button" class="app-speech-input-btn" name="pl_n20dorsiflexion" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n20dorsiflexion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;">Plantar Flexion</label> (N:50)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="56" binding="true" control-type="text" type="text" id= "pl_n50Planter">
				   <button type="button" class="app-speech-input-btn" name="pl_n50Planter" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n50Planter_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
                          
				   </div>
				    <div style="width: 50%;float: left;">
				   <div style="position: relative;width:70%;">
				   <label style="width: 124px;float: left;">Eversion:</label> (N:5)&nbsp; 
				   <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" tabindex="57" binding="true" control-type="text" type="text" id= "pl_n5Eversion">
				   <button type="button" class="app-speech-input-btn" name="pl_n5Eversion" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_n5Eversion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				   <div style="position: relative;width:70%;">
                         <label style="width: 124px;float: left;">Inversion:</label> (N:5)&nbsp; 
						 <input style="border: none;width: 55%;border-bottom: 1px solid #999;outline:none;" binding="true" tabindex="58" control-type="text" type="text" id="pl_n5Inversion">
						 <button type="button" class="app-speech-input-btn" name="pl_n5Inversion" (click)="voiceToText();"></button>
				         <button type="button" class="app-speech-stop-btn" name="pl_n5Inversion_stop" style="display:none;" (click)="stopVoiceToText();"></button>
						 </div>
                  
				   </div>
				   <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
				   <label>Other</label><br>
                    <textarea  rows="4" style="display: block;width: 100%;outline: none;position: relative;" tabindex="59" binding="true" control-type="text" id= "pl_Other6"> </textarea>
                     <button type="button" class="app-speech-input-btn" name="pl_Other6" (click)="voiceToText();"></button>
				     <button type="button" class="app-speech-stop-btn" name="pl_Other6_stop" style="display:none;" (click)="stopVoiceToText();"></button> 
					 </div>
			   </div>
			       <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="margin-bottom: 10px;"><label>Neurological<label> </div>  
				  
			   </div>
				   
				    <div style="display: flow-root;margin-bottom: 6px;">
				   
				      <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Cervical Compression Test</label> 
					  <input type="radio" name="pl_cervicalComp" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="pl_cervicalCompRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="pl_cervicalCompRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="pl_cervicalComp" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
				       <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Shoulder Depression Test</label> 
					  <input type="radio" name="pl_shoulderTest" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="pl_shoulderTestRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="pl_shoulderTestRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="pl_shoulderTest" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Lasegue''s Test (SLR 45):</label>
					  <input type="radio" name="pl_lasegue" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="pl_lasegueRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="pl_lasegueRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="pl_lasegue" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Bragard''s Test:</label> 
					  <input type="radio" name="pl_bragard" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="pl_bragardRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="pl_bragardRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="pl_bragard" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>
					  <div class="lt-bx-comp">
				      <label style="width: 15%;float: left;">Romberg''s Test:</label> 
					  <input type="radio" name="pl_rombergTest" binding="true" control-type="radio" value="Positive"/> Positive &nbsp; &nbsp; <input type="radio" name="pl_rombergTestRT" binding="true" control-type="radio" value="RT"/> RT / <input type="radio" name="pl_rombergTestRT" binding="true" control-type="radio" value="LT"/> LT &nbsp; &nbsp;&nbsp; &nbsp; <input type="radio" name="pl_rombergTest" binding="true" control-type="radio" value="Negative"/> Negative <br>
				       
                          
				      </div>

			   </div>
				   
				   <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
				  <label>Other</label>
				  <textarea  rows="3" binding="true" control-type="text" tabindex="60" style="display: block;width: 100%;outline: none;position: relative;" id="pl_other7"> </textarea>
				  <button type="button" class="app-speech-input-btn" name="pl_other7" (click)="voiceToText();"></button>
				     <button type="button" class="app-speech-stop-btn" name="pl_other7_stop" style="display:none;" (click)="stopVoiceToText();"></button> 
				  </div>
				  
				  <div style="display: flow-root;margin-bottom: 6px;float:left;width:100%;display: block;position: relative;">
				   <label>Diagnosis:</label>
				   <textarea  rows="5" binding="true" tabindex="61" control-type="text" style="display: block;width: 100%;outline: none;position: relative;" id="pl_diagnosis""> </textarea>
				   <button type="button" class="app-speech-input-btn" name="pl_diagnosis" (click)="voiceToText();"></button>
				     <button type="button" class="app-speech-stop-btn" name="pl_diagnosis_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					 </div>
		 </form>
	   </div>
       <div style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p			  
	    </div> 
  </div>
</div>
 
 
<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">
  <div style="display: block;padding: 20px 30px;">
      <div style="display: -webkit-box;">
	     <div style="width: 50%;float: left;">
		 <!-- <img style="max-width: 185px;" src ="assets/images/logo.png"> -->
		 </div>
		 <div  style="width: 50%;float: left;"><h3 style=" font-size: 26px;font-weight: 600;text-align:right;margin:0px;">Physical Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align:right;margin:0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
			    <div style="display: flow-root;margin-bottom: 6px;">
				   <div style="width: 70%;float: left;position: relative;"><label>Name: </label> 
				   <input style="width: 85%;border: none;border-bottom: 1px solid #999;outline:none;" id="name2" name="name" binding="true" value="{#name2}" control-type="text">
				   <button type="button" class="app-speech-input-btn" name="name2" (click)="voiceToText();"></button>
				     <button type="button" class="app-speech-stop-btn" name="name2_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				   </div>
				  <div style="width: 30%;float: left;"><label>Date </label> <input id="pl_date" binding="true" control-type="text" type="date" style="width: 75%;border: none;border-bottom: 1px solid #999;outline:none;"></div>
				  </div>
				  <div style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-vital0" style="width: 70%;float: left;position: relative;"><label>Diagnostic Test: <label>
				  <input style="border: none;border-bottom: 1px solid #999;width:85%" binding="true" tabindex="62" control-type="text" type="text" id="pl_diagosticTest">
				  <button type="button" class="app-speech-input-btn" name="pl_diagosticTest" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_diagosticTest_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				
			   </div>
			   <div style="display: flow-root;margin-bottom: 6px;">
			      <div style="width: 62%;float: left;position: relative;">
				  <label>CT scan | MRI | Soft Tissue Sonogram <label>
				  <input style="border: none;border-bottom: 1px solid #999;width:65%" binding="true" control-type="text" type="text" id="pl_cms">
				  <button type="button" class="app-speech-input-btn" name="pl_cms" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_cms_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  
				 <div class="left-from-group-vital-16"><label> 
				 <input type="checkbox" binding="true" control-type="checkbox" name="chkUpperExtremity"> Upper Extremity <label> 
				 <input type="checkbox" binding="true" control-type="checkbox" name="chkLowerExtremity"> Lower Extremity </div>
				  
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;position: relative;">
			      <div style="margin-top: -5px;margin-bottom: 6px;position: relative;"><label>Other<label> </div>
				  <textarea  rows="3" binding="true" control-type="text" tabindex="63" id="pl_other8" style="display: block;width: 100%;outline: none;"> </textarea>
				 <button type="button" class="app-speech-input-btn" name="pl_other8" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_other8_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   
			    <div style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-treatment" style="width: 70%;float: left;position: relative;"><label>Treatment: <label>
				  <input style="border: none;border-bottom: 1px solid #999;width:85%" binding="true" control-type="text" tabindex="64" type="text" id="pl_treatment">
				  <button type="button" class="app-speech-input-btn" name="pl_treatment" (click)="voiceToText();"></button>
				   <button type="button" class="app-speech-stop-btn" name="pl_treatment_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				    					 
					   <div class="left-from-group-treatment-2" style="width: 70%;">&nbsp;  &nbsp; | &nbsp;  &nbsp; <input style="width: 50px;border: none;outline: none;border-bottom: 1px solid #999;" type="text" id="pl_mg1"> MG. Q<input style="width: 50px;border: none;outline: none;border-bottom: 1px solid #999;" type="text" id="pl_hr1">HR
					</div>
					  
					   <div class="left-from-group-treatment-2" style="width: 70%;">&nbsp;  &nbsp; | &nbsp;  &nbsp; <input style="width: 50px;border: none;outline: none;border-bottom: 1px solid #999;" type="text" id="pl_mg2"> MG. Q<input style="width: 50px;border: none;outline: none;border-bottom: 1px solid #999;" type="text" id="pl_hr2">HR
					</div>
				  
			   </div>
			    <div style="display: flow-root;margin-bottom: 6px;">
			    <div class="left-from-group-treatment-pic" style="position: relative;"><label>Other Medication: <label><br>
				<textarea  rows="3" id="pl_otherMedication" binding="true" control-type="text" tabindex="65" style="display: block;width: 100%;outline: none;"> </textarea>
				<button type="button" class="app-speech-input-btn" name="pl_otherMedication" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="pl_otherMedication_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				</div>
				</div>
			    <div style="display: flow-root;margin-bottom: 6px;">
			     
				     <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" binding="true" control-type="checkbox" name="chkColdHotPack"> Cold | Hot Pack</li>
					  <li><input type="checkbox" binding="true" control-type="checkbox" name="chkElectricalStimulation"> Electrical Stimulation</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkParaffin"> Paraffin</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkUltrasound"> Ultrasound</li>
					 </ul>
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" binding="true" control-type="checkbox" name="chkGaitTraning"> Gait Traning</li>
					  <li><input type="checkbox" binding="true" control-type="checkbox" name="chkLowerLevelLeaser"> Lower Level Leaser</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkManualTherapy"> Manual Therapy</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkPhysicalTherapy"> Physical Therapy</li>
					 </ul>
					 
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" binding="true" control-type="checkbox" name="chkTherapeuticActivities"> Therapeutic Activities</li>
					  <li><input type="checkbox" binding="true" control-type="checkbox" name="chkTherapeuticExercises"> Therapeutic Exercises</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkLontophoresis"> Lontophoresis</li>
					   <li><input type="checkbox" binding="true" control-type="checkbox" name="chkMechanicalTraction"> Mechanical Traction</li>
					 </ul>
					 
					    <div style="width: 24%;float: left;margin-left: 20px;border: 1px solid #999;padding: 10px;height: 87px;">
					   <label>X-Week: </label><input style="border: none;outline: none;border-bottom: 1px solid #999;width: 89px;margin-bottom: 10px;" type="text" id="pl_xWeek"><br>
					   For 1,2,3,4 week
					 </div>
					 
				  </div>
				    <div style="display: flow-root;margin-bottom: 6px;">
			    <div class="left-from-group-treatment-pic" style="position: relative;"><label>Referrals: <label><br>
				<textarea  rows="3" binding="true" control-type="text" id="pl_referral" tabindex="66" style="display: block;width: 100%;outline: none;"> </textarea>
				<button type="button" class="app-speech-input-btn" name="pl_referral" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="pl_referral_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				</div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			    <div class="left-from-group-treatment-pic"  style="position: relative;"><label>Recommendations: <label><br>
				<textarea  rows="3" binding="true" control-type="text" tabindex="67" id="pl_recommendation" style="display: block;width: 100%;outline: none;"> </textarea>
				<button type="button" class="app-speech-input-btn" name="pl_recommendation" (click)="voiceToText();"></button>
				<button type="button" class="app-speech-stop-btn" name="pl_recommendation_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				</div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			    <div style="margin-top: 20px;"><label>Follow Up Appointment: <label><input type="date" id="pl_appointme')
GO
INSERT [dbo].[TemplateList] ([Id], [TemplateName], [TemplateHtml], [TemplatePage]) VALUES (5, N'Followup Sheet', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 25cm;height: 29.7cm;">
  <div class="container" style="display: block;padding: 20px 30px;">
      <div class="header" style="display: -webkit-box;">
	     <div class="left-box" style="width: 50%;float: left;"><img src="assets/images/logo.png" style="max-width: 185px;"></div>
		 <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Followup Sheet</h3></div>
		 </div>
		 
		 
		 
	    
      <div class="main" style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
		       <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group" style="width: 70%;float: left;"><label></label></div>
				  <div class="right-from-group-date w3-right" style="width: 27%;float: right;border: none;"><label>Date:</label> 
				  <input type="date" id="date" style="width: 60%;border: none;border-bottom: 1px solid #999;outline:none;" value="{#fs_Date}">
				  </div>
			   
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				   <div class="left-from-group-one" style="width: 50%;float: left;margin-bottom: 10px;"><label>First Name: <label> 
				   <input type="text" tabindex="1" id="fs_firstName" value="{#patientName}"  style="width: 65%;border: none;border-bottom: 1px solid #999;outline: none;"></label>
				   </div>
				  <div class="right-from-group-second" style="width: 50%;float: left;margin-bottom: 10px;"><label>Last Name: </label> 
				  <input type="text" tabindex="2"  id="fs_lastName" value="{#fs_lastName}" style="width: 65%;border: none;border-bottom: 1px solid #999;outline: none;">
				 
				  </div>
				  </div>
				  <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="left-from-group-1" style="width: 25%;float: left;"><label>D.O.B:</label> 
				  <input type="date"  id="date"  style="width: 66%;border: none;border-bottom: 1px solid #999;outline:none;" value="{#fs_dateofBirth}"> 
				  </div>
				  <div class="right-from-group-2" style="width: 20%;float: left;">
				  <label>Sex:</label> 
				  <input  style="width: 60%;border: none;border-bottom: 1px solid #999;outline: none;" type="text"  id="fs_Sex" value="{#fs_Sex}" >
				  
				  </div>
				  <div class="right-from-group-3" style="width: 20%;float: left;">
				  <label>Age:</label>
				  <input type="text" tabindex="3"  id="fs_Age" value="{#fs_Age}" style="width: 50%;border: none;border-bottom: 1px solid #999;outline: none;">
				  
				  </div>
				  <div class="right-from-group-4" style="width: 35%;float: left;text-align: right;"><label>Date of accident:</label> 
				  <input type="date"  id="date"  style="width: 47%;border: none;border-bottom: 1px solid #999;outline:none;" value="{#fs_accidentDate}">
				  </div>
			   
			   </div>
			   
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="checkbox-1" style="float: left;width: 33%;"><label>Chief Complaint:</label> Neck <input type="checkbox" selected="{#chkChiefComplaintNeck}"> </div>
				  <div class="checkbox-2" style="width: 18%;float: left;"><label>Midback Pain</label> <input type="checkbox" selected="{#chkChiefComplaintMidbackPain}"></div>
				  <div class="checkbox-2" style="width: 18%;float: left;"><label>Midback Pain</label> <input type="checkbox" selected="{#chkChiefComplaintMidback}"> </div>
				  <div class="checkbox-2" style="width: 18%;float: left;"><label>Sciatica</label> <input type="checkbox" selected="{#chkChiefComplaintSciatica}"> </div>
				  
			   
			   </div>
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			   <div class="pmd" >
			   <label style="width: 15%;float: left;">Other:</label>
			   <textarea id="fs_Other" rows="2" tabindex="4" style="display: block;width: 100%;outline: none;">{#fs_Other}</textarea> 
				</div>
			   <div class="pmd" style="margin-bottom: 6px;">
			   <label style="width: 15%;float: left;">HPI:</label> 
			   <textarea id="fs_Hpi" rows="5" tabindex="5" style="display: block;width: 100%;outline: none;">{#fs_Hpi}</textarea>
			   </div>
			   </div>
	
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="medication" style="width: 46%;float: left;"><label>Are medications being effective?</label> 
				  Yes <input type="checkbox" selected="{#chkMedicationsYes}"> 
				  No <input type="checkbox" selected="{#chkMedicationsNo}">
				  </div>
				  <div class="medication-right" style="width: 54%;float: left;">
				  <label>If Yes,</label>
				  <input type="text"  tabindex="6" id="fs_Medication" value="{#fs_Medication}" style="border: none;border-bottom: 1px solid #999;width: 85%;outline: none;">
				  
				  </div>
			   </div>
			    
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="medication-1"><label>Response to physical therapy:</label> 
				  Poor 
				  <input type="checkbox" selected="{#chkResponsePoor}"> 
				  Average 
				  <input type="checkbox" selected="{#chkResponseAverage}"> 
				  Good 
				  <input type="checkbox" selected="{#chkResponseGood}">
				  <div class=" medication-right">
				  <label></label> 
				  <input type="text" tabindex="7"  id="fs_Medications" value="{#fs_Medications}"  style="border: none;border-bottom: 1px solid #999;width: 47%;margin-left: 450px;outline: none;">
				  
				  </div>
			   </div>
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="pain" style="width: 33%;float: left;"><label>Pain effect works.</label>
				  Yes 
				  <input type="checkbox" selected="{#chkPainYes}"> 
				  No 
				  <input type="checkbox" selected="{#chkPainNo}">
				  </div>
				  <div class="adl" style="width: 33%;float: left;"><label>ADL?</label> 
				  Yes 
				  <input type="checkbox" selected="{#chkADLYes}"> 
				  No 
				  <input type="checkbox" selected="{#chkADLNo}">
				  </div>
				  <div class="sleep" style="width: 33%;float: left;"><label>Sleeping is adequate? </label> 
				  Yes
				  <input type="checkbox" selected="{#chkSleepingYes}"> 
				  No 
				  <input type="checkbox" selected="{#chkSleepingNo}">
				  </div>
			   </div>
			    
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				  <h4 class="sleep-head" style="margin: 0px;margin-bottom: 15px;margin-top: 15px;text-transform: uppercase;text-decoration: underline;">Sleeping Exam</h4>
				  
				  <div class="hr" style="width: 16.66%;float: left;"><label>HR:</label> <input type="checkbox" selected="{#chkSleepingExamHR}"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>BP:</label> <input type="checkbox" selected="{#chkSleepingExamBP}"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>TEMP:</label> <input type="checkbox" selected="{#chkSleepingExamTEMP}"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>RR:</label> <input type="checkbox" selected="{#chkSleepingExamRR}"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>HT:</label> <input type="checkbox" selected="{#chkSleepingExamHT}"> </div>
				  <div class="hr" style="width: 16.66%;float: left;"><label>WT:</label> <input type="checkbox" selected="{#chkSleepingExamWT}"> </div>
			   </div>
			   <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				  <div class="nr" style="width: 25%;float: left;"><label>Normal:</label> 
				  Yes <input type="checkbox" selected="{#chkNormalYes}"> 
				  No <input type="checkbox" selected="{#chkNormalNo}">
				  </div>
				  <div class="nr" style="width: 25%;float: left;"><label>Obese?</label>
				  Yes <input type="checkbox" selected="{#chkObeseYes}">
				  No <input type="checkbox" selected="{#chkObeseNo}">
				  </div>
				  <div class="nr" style="width: 25%;float: left;"><label>Deformities</label> 
				  Yes <input type="checkbox" selected="{#chkDeformitiesYes}"> 
				  No <input type="checkbox" selected="{#chkDeformitiesNo}">
				  </div>
				  <div class="nr" style="width: 25%;float: left;"><label>
				  If Yes,</label> <input type="checkbox" selected="{#chkIfYes}"> 
				  No <input type="checkbox" selected="{#chkIfNo}">
				  </div> 
			   </div>
			   <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			   <div class="pmd"  >
			   <label style="width: 10%;float: left;">HEENT: WNL</label> 
			   <input type="text" tabindex="8"  id="fs_Wnl" value="{#fs_Wnl}" style="width: 85%;border: none;border-bottom: 1px solid #999;margin-bottom: 10px;outline: none;"> 
			    
			   </div>
			   </div>
			   <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="normal" style="width: 85%;float: left;">
			        Neck: Trapezium Muscle: 
					Normal <input type="checkbox" style="margin-right: 17px;" selected="{#chkTrapeziumMuscleNormal}"> 
					Tender <input type="checkbox" style="margin-right: 17px;" selected="{#chkTrapeziumMuscleTender}">
                    Spastic <input type="checkbox" style="margin-right: 17px;" selected="{#chkTrapeziumMuscleSpastic}">
					Spinous Process: 
					Normal <input type="checkbox" style="margin-right: 17px;" selected="{#chkSpinousProcessNormal}"> 
					Tender  <input type="checkbox" style="margin-right: 17px;" selected="{#chkSpinousProcessTender}">
					</div>
                    
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="normal-1" style="width: 30%;float: left;">Flex:
				   <input type="text" tabindex="9" value="{#fs_Flex}" id="fs_Flex"  style="border: none;border-bottom: 1px solid #999;outline: none;width: 65%;">
				   
				   </div>
				   
				   
				   <div class="normal-2" style="width: 30%;float: left;">Rot.: Rt: 
				   <input type="text" tabindex="11" value="{#fs_Rot}" id="fs_Rot" style="border: none;border-bottom: 1px solid #999;outline: none;width: 55%;">
				   
				   </div>
				   
				   
				   <div class="normal-3" style="width: 30%;float: left;">Lat Flex: Rt:
				   <input type="text" tabindex="13" value="{#fs_flexRt}" id="fs_flexRt" style="border: none;border-bottom: 1px solid #999;outline: none;width: 45%;">
				   
				   </div>
				   
                    
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				<div class="normal-1" style="width: 30%;float: left;">  Exit:
				   <input type="text" tabindex="10" value="{#fs_Exit}" id="fs_Exit" style="border: none;border-bottom: 1px solid #999;outline: none;width: 65%;">
				   
				   </div>
				   <div class="normal-2" style="width: 30%;float: left;"> Lt:
				   <input type="text" tabindex="12" value="{#fs_rotLt}" id="fs_rotLt" style="border: none;border-bottom: 1px solid #999;outline: none;width: 70%;">
				   
				   </div>
				   <div class="normal-3" style="width: 30%;float: left;"> Lt:
				   <input type="text" tabindex="14" value="{#fs_flexLt}" id="fs_flexLt" style="border: none;border-bottom: 1px solid #999;outline: none;width: 70%;">
				   
				   </div>
				
				</div>
				
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="spine" style="position: relative;"> 
				   Thoraxic Spine: 
				   Normal 
				   <input type="checkbox" selected="{#chkThoraxicSpineNormal}">
				   <input type="text" tabindex="15" value="{#fs_Normal}" id="fs_Normal" style="width: 70%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				  
                    
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="heart" style="position: relative;"> Heart: 
				   RR 
				   <input type="checkbox" selected="{#chkHeartRR}"> 
				   Murmur? Yes 
				   <input type="checkbox" selected="{#chkHeartYes}"> 
				   No 
				   <input type="checkbox" selected="{#chkHeartNo}"> 
				   Lungs 
				   <input type="checkbox" selected="{#chkHeartLungs}"> 
				   Clear 
				   <input type="text" tabindex="16" value="{#fs_Clear}" id="fs_Clear" style="width: 42%;border: none;border-bottom: 1px solid #999;">
				   
				   </div>
				   
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="heart"> Abdomen: 
				   Flat <input type="checkbox" selected="{#chkAbdomenFlat}">
				   Soft <input type="checkbox" selected="{#chkAbdomenSoft}"> 
				   Non Tender <input type="checkbox" selected="{#chkAbdomenNonTender}"> 
				   Clear <input type="text" id="clear" value="{#fs_Clears}"> </div>
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">  
					  <div class="lumber-1" style="width: 55%;float: left;"> Lumbar paraspinal muscle:
					  Normal <input type="checkbox" selected="{#chkLumbarParaspinalMuscleNormal}">
					  Spastic <input type="checkbox" selected="{#chkLumbarParaspinalMuscleSpastic}"> 
					  Tender <input type="checkbox" selected="{#chkLumbarParaspinalMuscleTender}">
					   
					  </div>
					  <div class="paraspinal" >
					  <input type="text" tabindex="17" value="{#fs_Paraspinal}" id="fs_Paraspinal" style="border: none;border-bottom: 1px solid #999;outline: none;width: 40%;">
					  
					  </div>
			    </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">  
					  <div class="flex-1" style="width: 50%;float: left;">Flex: 
					  <input type="text" tabindex="18" value="{#fs_Flexs}" id="fs_Flexs" style="border: none;border-bottom: 1px solid #999;width: 75%;outline: none;">
					  
					  </div>
					  <div class="flex-1" style="width: 50%;float: left;"> Exit:
					  <input type="text" tabindex="19" value="{#fs_Exits}" id="fs_Exits" style="border: none;border-bottom: 1px solid #999;width: 75%;outline: none;">
					  
					  </div>
					  
			    </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">  
				<div class="flex-2" style="width: 60%;float: left;">Lateral Bending Rt:
					  <input type="text" tabindex="20" value="{#fs_Rt}" id= "fs_Rt" style="border: none;border-bottom: 1px solid #999;width: 40%;outline: none;">
					  
					  </div>
					  <div class="flex-2" style="width: 40%;float: left;"> Lt:
					  <input type="text" tabindex="21" value="{#fs_Lt}" id= "fs_Lt" style="border: none;border-bottom: 1px solid #999;width: 50%;outline: none;">
					  
					  </div>
				
				</div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			       <div class="sh-1" style="width: 60%;float: left;">Shoulder Abduction Rt:
				   <input type="text" tabindex="22" value="{#fs_Rts}" id="fs_Rts" style="border: none;border-bottom: 1px solid #999;width: 40%;outline: none;">
				   
				   </div>
				   <div class="sh-1" style="width: 40%;float: left;"> Lt:
				   <input type="text" tabindex="23" value="{#fs_Lts}" id="fs_Lts" style="border: none;border-bottom: 1px solid #999;width: 50%;outline: none;">
				   
				   </div>
				   
				   
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				<div class="sh-2" style="width: 60%;float: left;">Ext Rot: Rt:
				   <input type="text" tabindex="24" value="{#fs_extRt}" id="fs_extRt" style="width: 40%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				   <div class="sh-2" style="width: 40%;float: left;"> Lt:
				   <input type="text" tabindex="25" value="{#fs_extLt}" id="fs_extLt" style="width: 50%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				</div>
				
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				   <div class="sh-1"  style="width: 60%;float: left;">Flex Rot: Rt: 
				   <input type="text" tabindex="26" value="{#fs_flexrotRt}" id="fs_flexrotRt" style="width: 40%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				   <div class="sh-1" style="width: 40%;float: left;"> Lt:
				   <input type="text" tabindex="27" value="{#fs_flexrotLt}" id= "fs_flexrotLt" style="width: 50%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				
			       
				   
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				<div class="sh-2" style="width: 60%;float: left;">WNL: Adductio Rt:
				   <input  type="text" tabindex="28" value="{#fs_wnlRt}" id= "fs_wnlRt" style="border: none;border-bottom: 1px solid #999;width: 40%;outline: none;"> 
				   
				   </div>
				   <div class="sh-2" style="width: 40%;float: left;">
				   Lt:
				   <input type="text" tabindex="29" value="{#fs_wnlLt}" id= "fs_wnlLt" style="border: none;border-bottom: 1px solid #999;width: 50%;outline: none;">
				   
				   </div>
				</div>
				
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				   <div class="sh-1" style="width: 60%;float: left;">Int Rot: Rt:
				   <input type="text" tabindex="30" value="{#fs_introtRt}" id="fs_introtRt" style="width: 40%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				   <div class="sh-1" style="width: 40%;float: left;"> Lt:
				   <input type="text" tabindex="31" value="{#fs_introtLt}" id="fs_introtLt" style="width: 50%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				   
				   
				</div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				<div class="sh-2" style="width: 60%;float: left;">Ext: Rt: 
				   <input  type="text" tabindex="32" value="{#fs_extRts}" id="fs_extRts"  style="width: 40%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				   <div class="sh-2" style="width: 40%;float: left;"> Lt:
				   <input type="text" tabindex="33" value="{#fs_extLts}" id="fs_extLts" style="width: 50%;border: none;border-bottom: 1px solid #999;outline: none;">
				   
				   </div>
				</div>
				
				<div class="pmd" >
				   <label style="width: 15%;float: left;">Arms: WNL</label> 
				   <textarea  id="fs_armWnl" tabindex="34" style="display: block;width: 100%;outline: none;">{#fs_armWnl}</textarea>
				   
				   </div>
			       <div class="pmd" >
				   <label style="width: 15%;float: left;">Legs: WNL</label>
				   <textarea id="fs_legWnl" rows="2" tabindex="35" style="display: block;width: 100%;outline: none;">{#fs_legWnl}</textarea>
				   
				   </div> 
				
				
			   
		 </form>
		 
	   </div>
       <div  style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>




<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;width: 25cm;height: 29.7cm; margin-top: 500px;">
  <div class="container" style="display: block;padding: 20px 30px;">
      <div class="header" style="display: -webkit-box;">
	     <div class="left-box" style="width: 50%;float: left;"><img src="assets/images/logo.png" style="max-width: 185px;"></div>
		 
		 <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Followup Sheet</h3></div>
		 
		 
	    </div>
      <div class="main" style="padding-top: 30px;padding-bottom: 10px;">
		 <form id="pdf-form">
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="nuro"><label>Neuro: </label> 
				 				  
				  </div>
				  
				</div>
				 <div style="display: flow-root;margin-bottom: 6px;">
				   
				      <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Cervical Compression Test</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="cervicalTest" value="{#fs_cervicalComp}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="cervicalCompRT" value="{#fs_cervicalCompRT}"><br>
				       
                          
				      </div>
				       <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Shoulder Depression Test</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="shoulderTest" value="{#fs_shoulderTest}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="shoulderTestRT" value="{#fs_shoulderTestRT}"><br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Lasegue''s Test (SLR 45):</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="lasegueTest" value="{#fs_lasegue}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="lasegueRT" value="{#fs_lasegueRT}"><br>
				       
                          
				      </div>
					  
					  <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Bragard''s Test:</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="bragardTest" value="{#fs_bragard}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="bragardRT" value="{#fs_bragardRT}"><br>
				       
                          
				      </div>
					  <div class="lt-bx-comp">
				      <label style="width: 36%;float: left;">Romberg''s Test:</label> <input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="rombergTest" value="{#fs_rombergTest}"><input style="width: 25%;border: none;border-bottom: 1px solid #999;outline:none;" type="text" id="rombergTestRT" value="{#fs_rombergTestRT}"><br>
				       
                          
				      </div>

			   </div>
                
				
			   
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				 <div class="rhm"><label>Others:</label> </div>
				 <textarea id="fs_others" tabindex="36" rows="2" style="display: block;width: 100%;outline: none;">{#fs_others}</textarea>
				 
				</div>
			
			    <div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="cer"><label>Diagnosis: </label>
				  Headache <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisHeadache}"> 
				  Cervical Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisCervicalSprain}"> 
				  Thoraxic Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisThoraxicSprain}"> 
				  Lumbar Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisLumbarSprain}"> 
				  Lumbalgia <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisLumbalgia}">
				  Cervicagia Sprain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisCervicagiaSprain}"> 
				  Sciatica <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisSciatica}">
				  Disc Herniation <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisDiscHerniation}">
				  Thoracic Spine Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisThoracicSpinePain}">
				  Shoulder Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisShoulderPain}">
				  Elbow Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisElbowPain}">
				  Wrist/hand Pain <input type="checkbox" style="margin-top: 8px;margin-bottom: 8px;" selected="{#chkDiagnosisWristhandPain}">
				  </div>
				  
				  
			   </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
				<textarea id="fs_Cheif" rows="5" tabindex="37" style="display: block;width: 100%;outline: none;">{#fs_Cheif}</textarea>
				
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			     <div class="pmd">
				 <label style="width: 15%;float: left;">Medication:</label> 
				 </div>
				 <textarea id="fs_Medi" rows="4" tabindex="38" style="display: block;width: 100%;outline: none;">{#fs_Medi}</textarea>
				 
                </div>
				
				<div style="display: flow-root;margin-bottom: 6px;">
			      <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" selected="{#chkColdHotPack}"> Cold | Hot Pack</li>
					  <li><input type="checkbox" selected="{#chkElectricalStimulation}"> Electrical Stimulation</li>
					   <li><input type="checkbox" selected="{#chkParaffin}"> Paraffin</li>
					   <li><input type="checkbox" selected="{#chkUltrasound}"> Ultrasound</li>
					 </ul>
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" selected="{#chkGaitTraning}"> Gait Traning</li>
					  <li><input type="checkbox" selected="{#chkLowerLevelLeaser}"> Lower Level Leaser</li>
					   <li><input type="checkbox" selected="{#chkManualTherapy}"> Manual Therapy</li>
					   <li><input type="checkbox" selected="{#chkPhysicalTherapy}"> Physical Therapy</li>
					 </ul>
					 
					 
					 <ul style="padding-left: 0px;list-style: none;	width: 23%;float: left;">
					 <li><input type="checkbox" selected="{#chkTherapeuticActivities}"> Therapeutic Activities</li>
					  <li><input type="checkbox" selected="{#chkTherapeuticExercises}"> Therapeutic Exercises</li>
					   <li><input type="checkbox" selected="{#chkLontophoresis}"> Lontophoresis</li>
					   <li><input type="checkbox" selected="{#chkMechanicalTraction}"> Mechanical Traction</li>
					 </ul>
                    
                </div>
				
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			     <div class="pmd" >
				 <label style="width: 10%;float: left;">Referrals:</label> 
				 <input type="text" tabindex="39"  id="fs_Referral" value="{#fs_Referral}" style="width: 85%;border: none;border-bottom: 1px solid #999;margin-bottom: 10px;outline: none;">
				 
				 </div>
				  <div class="pmd" >
				  <label style="width: 10%;float: left;">Recommendations:</label> 
				  <input type="text" tabindex="40" id="fs_Recommendation" value="{#fs_Recommendation}" style="width: 85%;border: none;border-bottom: 1px solid #999;margin-bottom: 10px;outline: none;">
				   
				  </div>
				   
                </div>
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="sign-date"><label>Follow up appointment:</label> 
				  <input type="date" binding="true" control-type="date" style="width: 12%;border: none;border-bottom: 1px solid #999;outline:none;">
				  </div>
			   </div>
			    
				<div class="form-group" style="display: flow-root;margin-bottom: 6px;">
			      <div class="sign"><input type="text" id="fs_Sign" value="{#fs_Sign}" style="border: none;outline: none;border-bottom: 1px solid #999;width: 23%;margin-top: 50px;">
				  <p style="margin: 0px;"> Dr. Eric O. Pantaleon, MD
				  </p>
				  </div>
			   </div>
			   <div class="row" style="width: 300px;height:100px;float:right;">
                   <div class="w3-tiny col-6">
                   <img src="{#signature}" alt="signature"/>
                   </div>
				</div>
				
			   
		 </form>
		 
	   </div>
       <div  style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>

', N'<div style="background: white;display: block;margin: 0 auto;margin-bottom: 0.5cm;">
  <div class="container" style="display: block;padding: 20px 30px;">
      <div class="header" style="display: -webkit-box;">
	     <div class="left-box" style="width: 50%;float: left;">
		 <!-- <img src="images/logo.png" style="max-width: 185px;"> -->
		 </div>
		 <div class="right-box" style="width: 50%;float: left;"><h3 style="font-size: 26px;font-weight: 600;text-align: right;margin: 0px;">Follow Up Examination</h3><h4 style="font-size: 20px;font-weight: 500;padding-top: 3px;text-align: right;margin: 0px;">Dr. Eric O. Pantaleon, MD</h4></div>
		 
		 
	    </div>
      <div class="main" style="padding-top: 50px;padding-bottom: 10px;">
		 <form id="pdf-form">
		 
		       <div class="form-group" style="display: flow-root;margin-bottom: 14px;">
			      <div class="left-from-group" style="width: 70%;float: left;margin: 0;position: relative;">
				  <label>Patient Name:</label>
				  <input type="text" id="patientName" value="{#patientName}" binding="true" control-type="text" style="border: none;border-bottom: 1px solid #999;outline: none;width: 85%;">
                    <button type="button" class="app-speech-input-btn" name="patientName" (click)="voiceToText();"></button>
					<button type="button" class="app-speech-stop-btn" name="patientName_stop" style="display:none;" (click)="stopVoiceToText();"></button>				  
				  </div>
				  <div class="right-from-group" style="float: left;width: 30%;text-align: right;">
				  <label>Date:</label> 
				  <input type="date" id="fu_date" binding="true" control-type="text" name="date" style="border: none;border-bottom: 1px solid #999;outline: none;width: 57%;">
				  </div>
			   
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 14px;">
				  <div class="left-from-group-1" style="width: 25%;float: left;">
				  <label>Gender:</label>
				   <input type="radio" name="fu_patientsex" binding="true" control-type="radio" value="Male"/>M / <input type="radio" name="fu_patientsex" binding="true" control-type="radio" value="Female"/> F
				  </div>
				  <div class="left-from-group-2" style="width: 25%;float: left;margin: 0;position: relative;">
				  <label>Age:</label> 
				  <input type="text" tabindex="1" id="patientAge" binding="true" value="{#patientAge}" control-type="text" name="patientAge" style="border: none;border-bottom: 1px solid #999;outline: none;width: 75%">
				  <button class="app-speech-input-btn" type="button" name="patientAge" (click)="voiceToText();"></button>
				  <button type="button" class="app-speech-stop-btn" name="patientAge_stop" style="display:none;" (click)="stopVoiceToText();"></button>
				  </div>
				  <div class="float-right" style="float: right;"><label>Date of accident:</label>
				  <input type="date" id="fu_dateOfAccident" binding="true" control-type="text" name="date" style="border: none;border-bottom: 1px solid #999;outline: none;"></div>
				  
			   </div>
			  
			   
			   
			   <div class="form-group occupatio-2" style="display: flow-root;margin-bottom: 35px;margin-top: 35px;margin: 0;position: relative;">
			      <div class="chief"><label>Chief Complaint:</label> </div>
					<textarea id="fu_txtCheifComplaint" tabindex="2" binding="true" control-type="text" rows="5" style="display: block;width: 100%;outline: none;"></textarea>
					<button class="app-speech-input-btn" type="button" name="fu_txtCheifComplaint" (click)="voiceToText();"></button>
			   <button type="button" class="app-speech-stop-btn" name="fu_txtCheifComplaint_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 14px;margin: 0;position: relative;">
			      <div class="chief his" style="margin-top: 20px;"><label>History of illness:</label> </div>
				  <textarea id="fu_txtHOI" binding="true" tabindex="3" control-type="text" rows="15" style="display: block;width: 100%;outline: none;"></textarea>
				  <button class="app-speech-input-btn" type="button" name="fu_txtHOI" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fu_txtHOI_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   
			   </div>
			   
			   <div class="form-group his-1" style="display: flow-root;margin-bottom: 30px;margin-top: 30px;margin: 0;position: relative;">
			      <div class="chief his" style="margin-top: 20px;"><label>Imaging results:</label> 
				  ( <input type="checkbox" binding="true" control-type="checkbox" name="chkImagingXray"> X-ray / 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkImagingCTScan"> CT Scan / 
				  <input type="checkbox" binding="true" control-type="checkbox" name="chkImagingMRI"> MRI )
				  </div>
				  <textarea id="fu_txtImaging" tabindex="4" binding="true" control-type="text" rows="4" style="display: block;width: 100%;outline: none;"></textarea>
				  <button class="app-speech-input-btn" type="button" name="fu_txtImaging" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fu_txtImaging_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   
			    <div class="form-group" style="display: flow-root;margin-bottom: 14px;">
			      <div class="res" style="margin-top: 10px;margin-bottom: 10px;"><label>Response to physical therapy:</label> <input type="radio" name="fu_physicalTherapy" binding="true" control-type="radio" value="Poor"/>  Poor / <input type="radio" name="fu_physicalTherapy" binding="true" control-type="radio" value="Average"/> Average / <input type="radio" name="fu_physicalTherapy" binding="true" control-type="radio" value="Good"/> Good </div>
				  <div class="res" style="margin-top: 10px;margin-bottom: 10px;"><label>Response to medication:</label> <input type="radio" name="fu_medication" binding="true" control-type="radio" value="Poor"/>  Poor / <input type="radio" name="fu_medication" binding="true" control-type="radio" value="Average"/> Average / <input type="radio" name="fu_medication" binding="true" control-type="radio" value="Good"/> Good </div>
				  </div>
				  <div class="pmd" style="margin: 0;display:inline-block;width:100%;">
					 <div style="position: relative;"><label style="width: 15%;float: left;">R.O.S:</label> 
					 <textarea id="ie_ROS" binding="true" tabindex="5" control-type="text" rows="3" style="display: block;width: 100%;outline: none;"></textarea>
					 <button class="app-speech-input-btn" type="button" name="ie_ROS" (click)="voiceToText();"></button>
					 <button type="button" class="app-speech-stop-btn" name="ie_ROS_stop" style="display:none;" (click)="stopVoiceToText();"></button>
					 </div></div>
			   
			   
			    <div class="form-group other" style="display: flow-root;margin-bottom: 30px;margin-top: 30px;margin: 0;position: relative;">
			      <div class="chief"><label>Other:</label></div>
				  <textarea id="fu_txtOther" binding="true" tabindex="6" control-type="text" rows="4" style="display: block;width: 100%;outline: none;"></textarea>
				  <button class="app-speech-input-btn" type="button" name="fu_txtOther" (click)="voiceToText();"></button>
				 <button type="button" class="app-speech-stop-btn" name="fu_txtOther_stop" style="display:none;" (click)="stopVoiceToText();"></button>
			   </div>
			   <div class="signature-pad" style="width: 400px;height:150px;border: 1px solid #999;margin-top:10px;">
                     <canvas #sPad width="400" height="150" style="touch-action: none; " (click)="selectSignature()" id="signatureCtrl"></canvas>
                     </div>
                     <section>
                    <div class="row" style="width: 400px;height:30px;">
                   <div class="w3-tiny col-6">
                   <button type="button" class="w3-button w3-primary w3-right" (click)="clear()" id="signatureClear"><i class="fa fa-refresh" aria-hidden="true"></i></button>
				   <button type="button" class="w3-button w3-primary w3-right" (click)="loadSignature()" id="loadSignature"><i class="fa fa-upload" aria-hidden="true"></i></button>
                   </div>
    </div>
  </section>
			   
		 </form>
		 
	   </div>
       <div class="footer" style="margin-top: 20px;">
	     <p style="text-align: center;margin: 0px;">3107W hallandale Beach Blvd <sup>.</sup>Suite 102 <sup>.</sup> Pembroke Park, FL 33009</p>
         <p style="text-align: center;margin: 0px;">Office:(786) 638-1717 <sup>.</sup>Fax:(951) 367-3763</p>
							  
							  
	    </div>
  
  </div>
</div>	')
GO
SET IDENTITY_INSERT [dbo].[TemplateList] OFF
GO
SET IDENTITY_INSERT [dbo].[UserGroups] ON 
GO
INSERT [dbo].[UserGroups] ([UserGroupId], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (1, N'Admin', NULL, 1, CAST(N'2023-07-05T14:26:33.223' AS DateTime), N'admin@healthinformation.network', 1, NULL, NULL, NULL)
GO
INSERT [dbo].[UserGroups] ([UserGroupId], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (2, N'Doctors', NULL, 1, NULL, NULL, NULL, CAST(N'2023-07-05T14:25:46.450' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[UserGroups] ([UserGroupId], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (3, N'Medical Assistants', NULL, 1, NULL, NULL, NULL, CAST(N'2023-07-05T14:26:10.773' AS DateTime), N'admin@healthinformation.network', 1)
GO
INSERT [dbo].[UserGroups] ([UserGroupId], [Name], [Description], [IsActive], [UpdatedOn], [UpdatedBy], [UpdatedById], [CreatedOn], [CreatedBy], [CreatedById]) VALUES (4, N'Patient', NULL, 1, NULL, NULL, NULL, CAST(N'2023-07-05T14:26:20.510' AS DateTime), N'admin@healthinformation.network', 1)
GO
SET IDENTITY_INSERT [dbo].[UserGroups] OFF
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'-1', N'Menu', N'0', NULL, NULL, NULL, N'0', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Home', N'1', 1, NULL, 1, N'01000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Patient', N'2', 1, NULL, 2, N'02000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02000000000000', N'Patient List', N'2.1', 0, NULL, NULL, N'02010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02000000000000', N'Add Patient', N'2.2', 0, NULL, NULL, N'02020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Add New Field', N'2.2.1', 0, NULL, NULL, N'02020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Back To Funnel', N'2.2.2', 0, NULL, NULL, N'02020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Add Patient', N'2.2.3', 0, NULL, NULL, N'02020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Patient EMR No', N'2.2.4', 0, NULL, NULL, N'02020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Number', N'2.2.5', 0, NULL, NULL, N'02020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'First Name', N'2.2.6', 0, NULL, NULL, N'02020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Middle Name', N'2.2.7', 0, NULL, NULL, N'02020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Second Middle Name', N'2.2.8', 0, NULL, NULL, N'02020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Last Name', N'2.2.9', 0, NULL, NULL, N'02020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Second Last Name', N'2.2.10', 0, NULL, NULL, N'02020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'D.O.B', N'2.2.11', 0, NULL, NULL, N'02020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Age', N'2.2.12', 0, NULL, NULL, N'02020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Gender', N'2.2.13', 0, NULL, NULL, N'02020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Occupation', N'2.2.14', 0, NULL, NULL, N'02020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Company Name', N'2.2.15', 0, NULL, NULL, N'02020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Funnel', N'2.2.16', 0, NULL, NULL, N'02020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Primary Contact', N'2.2.17', 0, NULL, NULL, N'02020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Status', N'2.2.18', 0, NULL, NULL, N'02020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Security Group', N'2.2.19', 0, NULL, NULL, N'02020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Assigned To', N'2.2.20', 0, NULL, NULL, N'02020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Created By', N'2.2.21', 0, NULL, NULL, N'02020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Address', N'2.2.22', 0, NULL, NULL, N'02020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'City', N'2.2.23', 0, NULL, NULL, N'02020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'State', N'2.2.24', 0, NULL, NULL, N'02020000000024', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Country', N'2.2.25', 0, NULL, NULL, N'02020000000025', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'ZipCode', N'2.2.26', 0, NULL, NULL, N'02020000000026', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Office Number', N'2.2.27', 0, NULL, NULL, N'02020000000027', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Website', N'2.2.28', 0, NULL, NULL, N'02020000000028', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Origins', N'2.2.29', 0, NULL, NULL, N'02020000000029', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Contacts', N'2.2.30', 0, NULL, NULL, N'02020000000030', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Notes', N'2.2.31', 0, NULL, NULL, N'02020000000031', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Appointments', N'2.2.32', 0, NULL, NULL, N'02020000000032', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Insurance', N'2.2.33', 0, NULL, NULL, N'02020000000033', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Employer', N'2.2.34', 0, NULL, NULL, N'02020000000034', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000000', N'Files', N'2.2.35', 0, NULL, NULL, N'02020000000035', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000029', N'Origins', N'2.2.29.1', 0, NULL, NULL, N'02020000000036', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000029', N'Remarks', N'2.2.29.2', 0, NULL, NULL, N'02020000000037', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000030', N'Add Contact', N'2.2.30.1', 0, NULL, NULL, N'02020000000038', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000030', N'Choose Contact', N'2.2.30.2', 0, NULL, NULL, N'02020000000039', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000031', N'Add Notes', N'2.2.31.1', 0, NULL, NULL, N'02020000000040', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000032', N'Add Appointment', N'2.2.32.1', 0, NULL, NULL, N'02020000000041', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'02020000000035', N'Files', N'2.2.35.1', 0, NULL, NULL, N'02020000000042', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Practice', N'3', 1, NULL, 3, N'03000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03000000000000', N'Practice List', N'3.1', 0, NULL, NULL, N'03010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03000000000000', N'Add Practice', N'3.2', 0, NULL, NULL, N'03020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Back To Calendar', N'3.2.1', 0, NULL, NULL, N'03020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Back To Funnel', N'3.2.2', 0, NULL, NULL, N'03020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Back To List', N'3.2.3', 0, NULL, NULL, N'03020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Go To Steps', N'3.2.4', 0, NULL, NULL, N'03020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Practice Number', N'3.2.5', 0, NULL, NULL, N'03020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Practice Name', N'3.2.6', 0, NULL, NULL, N'03020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Funnel', N'3.2.7', 0, NULL, NULL, N'03020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Address Detail', N'3.2.8', 0, NULL, NULL, N'03020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Address', N'3.2.9', 0, NULL, NULL, N'03020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'City', N'3.2.10', 0, NULL, NULL, N'03020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'State', N'3.2.11', 0, NULL, NULL, N'03020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Country', N'3.2.12', 0, NULL, NULL, N'03020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Zipcode', N'3.2.13', 0, NULL, NULL, N'03020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Practice Status', N'3.2.14', 0, NULL, NULL, N'03020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Security Group', N'3.2.15', 0, NULL, NULL, N'03020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Assigned To', N'3.2.16', 0, NULL, NULL, N'03020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Created By', N'3.2.17', 0, NULL, NULL, N'03020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Color', N'3.2.18', 0, NULL, NULL, N'03020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Practice Provider', N'3.2.19', 0, NULL, NULL, N'03020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Remarks', N'3.2.20', 0, NULL, NULL, N'03020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Contact Information', N'3.2.21', 0, NULL, NULL, N'03020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Notes', N'3.2.22', 0, NULL, NULL, N'03020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000000', N'Appointment', N'3.2.23', 0, NULL, NULL, N'03020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000021', N'Add Contact', N'3.2.21.1', 0, NULL, NULL, N'03020000000024', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000021', N'Choose Contact', N'3.2.21.2', 0, NULL, NULL, N'03020000000025', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000022', N'Add Notes', N'3.2.22.1', 0, NULL, NULL, N'03020000000026', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'03020000000023', N'Add Appointment', N'3.2.23.1', 0, NULL, NULL, N'03020000000027', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Appointment', N'4', 1, NULL, 4, N'04000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04000000000000', N'Appointment List', N'4.1', 0, NULL, NULL, N'04010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04000000000000', N'Appointment Detail', N'4.2', 0, NULL, NULL, N'04020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Back', N'4.2.1', 0, NULL, NULL, N'04020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Add New', N'4.2.2', 0, NULL, NULL, N'04020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'EMR Appointment Number', N'4.2.3', 0, NULL, NULL, N'04020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Practice Name', N'4.2.4', 0, NULL, NULL, N'04020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Patient Name', N'4.2.5', 0, NULL, NULL, N'04020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Event Name', N'4.2.6', 0, NULL, NULL, N'04020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Funnel', N'4.2.7', 0, NULL, NULL, N'04020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Address Detail', N'4.2.8', 0, NULL, NULL, N'04020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Appointment Type', N'4.2.9', 0, NULL, NULL, N'04020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Security Group', N'4.2.10', 0, NULL, NULL, N'04020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Assigned To', N'4.2.11', 0, NULL, NULL, N'04020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Created By', N'4.2.12', 0, NULL, NULL, N'04020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Status', N'4.2.13', 0, NULL, NULL, N'04020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Color', N'4.2.14', 0, NULL, NULL, N'04020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'NPI', N'4.2.15', 0, NULL, NULL, N'04020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Remarks', N'4.2.16', 0, NULL, NULL, N'04020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Appointment Date', N'4.2.17', 0, NULL, NULL, N'04020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Appointment Time', N'4.2.18', 0, NULL, NULL, N'04020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Contact Information', N'4.2.19', 0, NULL, NULL, N'04020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Notes', N'4.2.20', 0, NULL, NULL, N'04020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000000', N'Files', N'4.2.21', 0, NULL, NULL, N'04020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000019', N'Choose Contact', N'4.2.19.1', 0, NULL, NULL, N'04020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000019', N'Add Contact', N'4.2.19.2', 0, NULL, NULL, N'04020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000020', N'Add Notes', N'4.2.20.1', 0, NULL, NULL, N'04020000000024', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'04020000000021', N'Connect To Onedrive', N'4.2.21.1', 0, NULL, NULL, N'04020000000025', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Funnel', N'5', 1, NULL, 5, N'05000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'To Do', N'6', 1, NULL, 6, N'06000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06000000000000', N'ToDo List', N'6.1', 0, NULL, NULL, N'06010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06000000000000', N'Add Todo', N'6.2', 0, NULL, NULL, N'06020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Add New Field', N'6.2.1', NULL, NULL, NULL, N'06020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Back To Calendar', N'6.2.2', NULL, NULL, NULL, N'06020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Back To List', N'6.2.3', NULL, NULL, NULL, N'06020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Back To Funnel', N'6.2.4', NULL, NULL, NULL, N'06020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Todo Number', N'6.2.5', NULL, NULL, NULL, N'06020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Importance', N'6.2.6', NULL, NULL, NULL, N'06020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Todo Name', N'6.2.7', NULL, NULL, NULL, N'06020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Todo Subject', N'6.2.8', NULL, NULL, NULL, N'06020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Start Date', N'6.2.9', NULL, NULL, NULL, N'06020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'End Date', N'6.2.10', NULL, NULL, NULL, N'06020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Funnel', N'6.2.11', NULL, NULL, NULL, N'06020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Color', N'6.2.12', NULL, NULL, NULL, N'06020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Todo Status', N'6.2.13', NULL, NULL, NULL, N'06020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Security Group', N'6.2.14', NULL, NULL, NULL, N'06020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Assigned To', N'6.2.15', NULL, NULL, NULL, N'06020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Created By', N'6.2.16', NULL, NULL, NULL, N'06020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Location', N'6.2.17', NULL, NULL, NULL, N'06020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'06020000000000', N'Remarks', N'6.2.18', NULL, NULL, NULL, N'06020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Template', N'7', 1, NULL, 7, N'07000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'07000000000000', N'Template List', N'7.1', 0, NULL, NULL, N'07010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'07000000000000', N'Add Template', N'7.2', 0, NULL, NULL, N'07020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'07020000000000', N'Appointment', N'7.2.1', 0, NULL, NULL, N'07020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'07020000000000', N'Template', N'7.2.2', 0, NULL, NULL, N'07020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Calendar', N'8', 1, NULL, 8, N'08000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Events', N'9', 1, NULL, 9, N'09000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09000000000000', N'Events List', N'9.1', 0, NULL, NULL, N'09010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09000000000000', N'Add Events', N'9.2', 0, NULL, NULL, N'09020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Add New Field', N'9.2.1', 0, NULL, NULL, N'09020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Add New Event', N'9.2.2', 0, NULL, NULL, N'09020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Event Number', N'9.2.3', 0, NULL, NULL, N'09020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Event Name', N'9.2.4', 0, NULL, NULL, N'09020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Funnel', N'9.2.5', 0, NULL, NULL, N'09020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Practice Name', N'9.2.6', 0, NULL, NULL, N'09020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Patient Number', N'9.2.7', 0, NULL, NULL, N'09020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Patient Number From EMR', N'9.2.8', 0, NULL, NULL, N'09020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Patient Name', N'9.2.9', 0, NULL, NULL, N'09020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Paperwork Completion', N'9.2.10', 0, NULL, NULL, N'09020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Case Number Lawyer', N'9.2.11', 0, NULL, NULL, N'09020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Event Type', N'9.2.12', 0, NULL, NULL, N'09020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Security Group', N'9.2.13', 0, NULL, NULL, N'09020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Assigned To', N'9.2.14', 0, NULL, NULL, N'09020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Created By', N'9.2.15', 0, NULL, NULL, N'09020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Status', N'9.2.16', 0, NULL, NULL, N'09020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Color', N'9.2.17', 0, NULL, NULL, N'09020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Event Started', N'9.2.18', 0, NULL, NULL, N'09020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Event Closed Date', N'9.2.19', 0, NULL, NULL, N'09020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Remarks', N'9.2.20', 0, NULL, NULL, N'09020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000000', N'Contact Information', N'9.2.21', 0, NULL, NULL, N'09020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000021', N'Add Contact ', N'9.2.21.1', 0, NULL, NULL, N'09020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'09020000000021', N'Choose Contact', N'9.2.21.2', 0, NULL, NULL, N'09020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Provider', N'10', 1, NULL, 10, N'10000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10000000000000', N'Provider', N'10.1', 0, NULL, NULL, N'10010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10000000000000', N'Event', N'10.2', 0, NULL, NULL, N'10020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10000000000000', N'Network', N'10.3', 0, NULL, NULL, N'10030000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Email', N'11', 1, NULL, 11, N'11000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'0', N'Maintenance', N'12', 1, NULL, 12, N'12000000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10010000000000', N'Add Referral', N'13.1', 0, NULL, NULL, N'13010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10010000000000', N'Referral List', N'13.2', 0, NULL, NULL, N'13020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Add Patient', N'13.2.1', 0, NULL, NULL, N'13020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Add Referral', N'13.2.2', 0, NULL, NULL, N'13020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Add New Field', N'13.2.3', 0, NULL, NULL, N'13020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Referral Number', N'13.2.4', 0, NULL, NULL, N'13020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Referral Name', N'13.2.5', 0, NULL, NULL, N'13020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Practice/NPI2', N'13.2.6', 0, NULL, NULL, N'13020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Funnel', N'13.2.7', 0, NULL, NULL, N'13020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Primary Contact', N'13.2.8', 0, NULL, NULL, N'13020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Referral Type', N'13.2.9', 0, NULL, NULL, N'13020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Provider Speciality', N'13.2.10', 0, NULL, NULL, N'13020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Security Group', N'13.2.11', 0, NULL, NULL, N'13020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Industry', N'13.2.12', 0, NULL, NULL, N'13020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Assigned To', N'13.2.13', 0, NULL, NULL, N'13020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Created By', N'13.2.14', 0, NULL, NULL, N'13020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Address', N'13.2.15', 0, NULL, NULL, N'13020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'City', N'13.2.16', 0, NULL, NULL, N'13020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'State', N'13.2.17', 0, NULL, NULL, N'13020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Zipcode', N'13.2.18', 0, NULL, NULL, N'13020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Country', N'13.2.19', 0, NULL, NULL, N'13020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Office Number', N'13.2.20', 0, NULL, NULL, N'13020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Website', N'13.2.21', 0, NULL, NULL, N'13020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Remarks', N'13.2.22', 0, NULL, NULL, N'13020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Contacts', N'13.2.23', 0, NULL, NULL, N'13020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Notes', N'13.2.24', 0, NULL, NULL, N'13020000000024', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Patients', N'13.2.25', 0, NULL, NULL, N'13020000000025', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Files', N'13.2.26', 0, NULL, NULL, N'13020000000026', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Affiliate', N'13.2.27', 0, NULL, NULL, N'13020000000027', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Skills', N'13.2.28', 0, NULL, NULL, N'13020000000028', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000000', N'Email', N'13.2.29', 0, NULL, NULL, N'13020000000029', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000023', N'Add Contact', N'13.2.23.1', 0, NULL, NULL, N'13020000000030', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000023', N'Choose Contact', N'13.2.23.2', 0, NULL, NULL, N'13020000000031', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000024', N'Add Notes', N'13.2.24.1', 0, NULL, NULL, N'13020000000032', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'13020000000025', N'Add Patient', N'13.2.25.1', 0, NULL, NULL, N'13020000000033', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10020000000000', N'Event List', N'14.1', 0, NULL, NULL, N'14010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10020000000000', N'Add Event', N'14.2', 0, NULL, NULL, N'14020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Add New Field', N'14.2.1', 0, NULL, NULL, N'14020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'New Event', N'14.2.2', 0, NULL, NULL, N'14020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Mode', N'14.2.3', 0, NULL, NULL, N'14020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Status', N'14.2.4', 0, NULL, NULL, N'14020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Number', N'14.2.5', 0, NULL, NULL, N'14020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Name', N'14.2.6', 0, NULL, NULL, N'14020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Select Provider', N'14.2.7', 0, NULL, NULL, N'14020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Select Provider Name', N'14.2.8', 0, NULL, NULL, N'14020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Website', N'14.2.9', 0, NULL, NULL, N'14020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Industry', N'14.2.10', 0, NULL, NULL, N'14020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Telephone Number', N'14.2.11', 0, NULL, NULL, N'14020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Address', N'14.2.12', 0, NULL, NULL, N'14020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'City ', N'14.2.13', 0, NULL, NULL, N'14020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'State', N'14.2.14', 0, NULL, NULL, N'14020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Zipcode', N'14.2.15', 0, NULL, NULL, N'14020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Country', N'14.2.16', 0, NULL, NULL, N'14020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Cost', N'14.2.17', 0, NULL, NULL, N'14020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Contacts', N'14.2.18', 0, NULL, NULL, N'14020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Notes', N'14.2.19', 0, NULL, NULL, N'14020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000000', N'Files', N'14.2.20', 0, NULL, NULL, N'14020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000017', N'Travel Cost', N'14.2.17.1', 0, NULL, NULL, N'14020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000017', N'Show Cost', N'14.2.17.2', 0, NULL, NULL, N'14020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000017', N'Add New Field', N'14.2.17.3', 0, NULL, NULL, N'14020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000017', N'Remarks', N'14.2.17.4', 0, NULL, NULL, N'14020000000024', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000018', N'Add Contact ', N'14.2.18.1', 0, NULL, NULL, N'14020000000025', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000018', N'Choose Contact', N'14.2.18.2', 0, NULL, NULL, N'14020000000026', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'14020000000019', N'Add Notes', N'14.2.19.1', 0, NULL, NULL, N'14020000000027', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10030000000000', N'Network List', N'15.1', 0, NULL, NULL, N'15010000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'10030000000000', N'Add Network', N'15.2', 0, NULL, NULL, N'15020000000000', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Add New Field', N'15.2.1', 0, NULL, NULL, N'15020000000001', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Add Network', N'15.2.2', 0, NULL, NULL, N'15020000000002', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Network Number', N'15.2.3', 0, NULL, NULL, N'15020000000003', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Network Name', N'15.2.4', 0, NULL, NULL, N'15020000000004', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Telephone', N'15.2.5', 0, NULL, NULL, N'15020000000005', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Fax', N'15.2.6', 0, NULL, NULL, N'15020000000006', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Website', N'15.2.7', 0, NULL, NULL, N'15020000000007', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Address', N'15.2.8', 0, NULL, NULL, N'15020000000008', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'City', N'15.2.9', 0, NULL, NULL, N'15020000000009', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'State', N'15.2.10', 0, NULL, NULL, N'15020000000010', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Zipcode', N'15.2.11', 0, NULL, NULL, N'15020000000011', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Country', N'15.2.12', 0, NULL, NULL, N'15020000000012', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Industry', N'15.2.13', 0, NULL, NULL, N'15020000000013', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Cost', N'15.2.14', 0, NULL, NULL, N'15020000000014', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Contacts', N'15.2.15', 0, NULL, NULL, N'15020000000015', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000000', N'Notes', N'15.2.16', 0, NULL, NULL, N'15020000000016', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000014', N'Yearly', N'15.2.14.1', 0, NULL, NULL, N'15020000000017', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000014', N'Monthly', N'15.2.14.2', 0, NULL, NULL, N'15020000000018', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000014', N'Weekly', N'15.2.14.3', 0, NULL, NULL, N'15020000000019', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000014', N'Per Event', N'15.2.14.4', 0, NULL, NULL, N'15020000000020', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000014', N'Travel Cost', N'15.2.14.5', 0, NULL, NULL, N'15020000000021', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000014', N'Remark', N'15.2.14.6', 0, NULL, NULL, N'15020000000022', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000015', N'Add Contact', N'15.2.15.1', 0, NULL, NULL, N'15020000000023', NULL)
GO
INSERT [dbo].[UserPermission] ([Parent], [Name], [IdHtml], [IsMenuEntry], [UrlPath], [MenuOrder], [Id], [UrlPathForm]) VALUES (N'15020000000015', N'ChooseContact', N'15.2.15.2', 0, NULL, NULL, N'15020000000024', NULL)
GO
ALTER TABLE [dbo].[Config] ADD  DEFAULT ((0)) FOR [isProtected]
GO
ALTER TABLE [dbo].[ChartConfig]  WITH CHECK ADD  CONSTRAINT [FK_ChartConfig_DashboardUserConfig] FOREIGN KEY([DashboardConfigId])
REFERENCES [dbo].[DashboardUserConfig] ([Id])
GO
ALTER TABLE [dbo].[ChartConfig] CHECK CONSTRAINT [FK_ChartConfig_DashboardUserConfig]
GO
ALTER TABLE [dbo].[CompanyEFileConfig]  WITH CHECK ADD  CONSTRAINT [FK_CompanyEFileConfig_CompanyRegister] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[CompanyRegister] ([RegisterId])
GO
ALTER TABLE [dbo].[CompanyEFileConfig] CHECK CONSTRAINT [FK_CompanyEFileConfig_CompanyRegister]
GO
ALTER TABLE [dbo].[CompanySettings]  WITH CHECK ADD  CONSTRAINT [FK_CompanySettings_CompanyRegister] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[CompanyRegister] ([RegisterId])
GO
ALTER TABLE [dbo].[CompanySettings] CHECK CONSTRAINT [FK_CompanySettings_CompanyRegister]
GO
ALTER TABLE [dbo].[CompanySettings]  WITH CHECK ADD  CONSTRAINT [FK_CompanySettings_Settings] FOREIGN KEY([SettingsId])
REFERENCES [dbo].[Settings] ([Id])
GO
ALTER TABLE [dbo].[CompanySettings] CHECK CONSTRAINT [FK_CompanySettings_Settings]
GO
ALTER TABLE [dbo].[ContactGroup]  WITH CHECK ADD  CONSTRAINT [FK_ContactGroup_ContactInformation] FOREIGN KEY([ContactId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[ContactGroup] CHECK CONSTRAINT [FK_ContactGroup_ContactInformation]
GO
ALTER TABLE [dbo].[ContactGroup]  WITH CHECK ADD  CONSTRAINT [FK_ContactGroup_Group] FOREIGN KEY([GroupId])
REFERENCES [dbo].[Group] ([Id])
GO
ALTER TABLE [dbo].[ContactGroup] CHECK CONSTRAINT [FK_ContactGroup_Group]
GO
ALTER TABLE [dbo].[ContactInformation]  WITH CHECK ADD FOREIGN KEY([ContactGroupId])
REFERENCES [dbo].[Group] ([Id])
GO
ALTER TABLE [dbo].[ContactInformationEmailMapping]  WITH CHECK ADD  CONSTRAINT [FK_ContactInformationEmailMapping_ContactInformation] FOREIGN KEY([ContactInformationId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[ContactInformationEmailMapping] CHECK CONSTRAINT [FK_ContactInformationEmailMapping_ContactInformation]
GO
ALTER TABLE [dbo].[CustomerPriceList]  WITH CHECK ADD  CONSTRAINT [FK_CustomerPriceList_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[CustomerPriceList] CHECK CONSTRAINT [FK_CustomerPriceList_Lead]
GO
ALTER TABLE [dbo].[CustomerPriceList]  WITH CHECK ADD  CONSTRAINT [FK_CustomerPriceList_PriceList] FOREIGN KEY([PriceListId])
REFERENCES [dbo].[PriceList] ([Id])
GO
ALTER TABLE [dbo].[CustomerPriceList] CHECK CONSTRAINT [FK_CustomerPriceList_PriceList]
GO
ALTER TABLE [dbo].[CustomFieldListItems]  WITH CHECK ADD  CONSTRAINT [FK_CustomFieldListItems_CustomProperty] FOREIGN KEY([CustomPropertyId])
REFERENCES [dbo].[CustomProperty] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CustomFieldListItems] CHECK CONSTRAINT [FK_CustomFieldListItems_CustomProperty]
GO
ALTER TABLE [dbo].[CustomPropertyValues]  WITH CHECK ADD  CONSTRAINT [FK_CustomPropertyValues_CustomProperty] FOREIGN KEY([CustomPropertyId])
REFERENCES [dbo].[CustomProperty] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CustomPropertyValues] CHECK CONSTRAINT [FK_CustomPropertyValues_CustomProperty]
GO
ALTER TABLE [dbo].[DashboardChartMapping]  WITH CHECK ADD  CONSTRAINT [FK_DashboardChartMapping_ChartName] FOREIGN KEY([ChartId])
REFERENCES [dbo].[ChartName] ([Id])
GO
ALTER TABLE [dbo].[DashboardChartMapping] CHECK CONSTRAINT [FK_DashboardChartMapping_ChartName]
GO
ALTER TABLE [dbo].[DashboardChartMapping]  WITH CHECK ADD  CONSTRAINT [FK_DashboardChartMapping_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[DashboardChartMapping] CHECK CONSTRAINT [FK_DashboardChartMapping_Users]
GO
ALTER TABLE [dbo].[DashBoardQueries]  WITH CHECK ADD  CONSTRAINT [FK_DashBoardQueries_DashboardUserConfig] FOREIGN KEY([DashboardConfigId])
REFERENCES [dbo].[DashboardUserConfig] ([Id])
GO
ALTER TABLE [dbo].[DashBoardQueries] CHECK CONSTRAINT [FK_DashBoardQueries_DashboardUserConfig]
GO
ALTER TABLE [dbo].[DashboardUserConfig]  WITH CHECK ADD  CONSTRAINT [FK_DashoardUserConfig_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[DashboardUserConfig] CHECK CONSTRAINT [FK_DashoardUserConfig_Users]
GO
ALTER TABLE [dbo].[Deal]  WITH CHECK ADD FOREIGN KEY([ReasonId])
REFERENCES [dbo].[Reason] ([Id])
GO
ALTER TABLE [dbo].[Deal]  WITH CHECK ADD FOREIGN KEY([SecurityGroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[Deal]  WITH CHECK ADD  CONSTRAINT [FK_Deal_Currency] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currency] ([Id])
GO
ALTER TABLE [dbo].[Deal] CHECK CONSTRAINT [FK_Deal_Currency]
GO
ALTER TABLE [dbo].[Deal]  WITH CHECK ADD  CONSTRAINT [FK_Deal_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[Deal] CHECK CONSTRAINT [FK_Deal_Lead]
GO
ALTER TABLE [dbo].[Deal]  WITH CHECK ADD  CONSTRAINT [FK_Deal_Status] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([Id])
GO
ALTER TABLE [dbo].[Deal] CHECK CONSTRAINT [FK_Deal_Status]
GO
ALTER TABLE [dbo].[DealContact]  WITH CHECK ADD  CONSTRAINT [FK_DealContact_ChooseMethod] FOREIGN KEY([CalendarInviteType])
REFERENCES [dbo].[ChooseMethod] ([Id])
GO
ALTER TABLE [dbo].[DealContact] CHECK CONSTRAINT [FK_DealContact_ChooseMethod]
GO
ALTER TABLE [dbo].[DealContact]  WITH CHECK ADD  CONSTRAINT [FK_DealContact_CompletedStatus] FOREIGN KEY([CompletedStatusId])
REFERENCES [dbo].[CompletedStatus] ([Id])
GO
ALTER TABLE [dbo].[DealContact] CHECK CONSTRAINT [FK_DealContact_CompletedStatus]
GO
ALTER TABLE [dbo].[DealContact]  WITH CHECK ADD  CONSTRAINT [FK_DealContact_ContactInformation] FOREIGN KEY([ContactId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[DealContact] CHECK CONSTRAINT [FK_DealContact_ContactInformation]
GO
ALTER TABLE [dbo].[DealContact]  WITH CHECK ADD  CONSTRAINT [FK_DealContact_StepTypes] FOREIGN KEY([StepTypeId])
REFERENCES [dbo].[StepTypes] ([Id])
GO
ALTER TABLE [dbo].[DealContact] CHECK CONSTRAINT [FK_DealContact_StepTypes]
GO
ALTER TABLE [dbo].[DealContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_DealContactNextStep_ChooseMethod] FOREIGN KEY([CalendarInviteType])
REFERENCES [dbo].[ChooseMethod] ([Id])
GO
ALTER TABLE [dbo].[DealContactNextStep] CHECK CONSTRAINT [FK_DealContactNextStep_ChooseMethod]
GO
ALTER TABLE [dbo].[DealContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_DealContactNextStep_ContactInformation] FOREIGN KEY([ContactId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[DealContactNextStep] CHECK CONSTRAINT [FK_DealContactNextStep_ContactInformation]
GO
ALTER TABLE [dbo].[DealContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_DealContactNextStep_DealContact] FOREIGN KEY([DealContactId])
REFERENCES [dbo].[DealContact] ([Id])
GO
ALTER TABLE [dbo].[DealContactNextStep] CHECK CONSTRAINT [FK_DealContactNextStep_DealContact]
GO
ALTER TABLE [dbo].[DealContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_DealContactNextStep_StepTypes] FOREIGN KEY([StepTypeId])
REFERENCES [dbo].[StepTypes] ([Id])
GO
ALTER TABLE [dbo].[DealContactNextStep] CHECK CONSTRAINT [FK_DealContactNextStep_StepTypes]
GO
ALTER TABLE [dbo].[EventCost]  WITH CHECK ADD  CONSTRAINT [FK_EventCost_EventShow] FOREIGN KEY([EventId])
REFERENCES [dbo].[EventShow] ([Id])
GO
ALTER TABLE [dbo].[EventCost] CHECK CONSTRAINT [FK_EventCost_EventShow]
GO
ALTER TABLE [dbo].[EventShow]  WITH CHECK ADD FOREIGN KEY([EventStatusId])
REFERENCES [dbo].[EventStatus] ([Id])
GO
ALTER TABLE [dbo].[EventShow]  WITH CHECK ADD  CONSTRAINT [FK_EventShow_EventMode] FOREIGN KEY([EventModeId])
REFERENCES [dbo].[EventMode] ([Id])
GO
ALTER TABLE [dbo].[EventShow] CHECK CONSTRAINT [FK_EventShow_EventMode]
GO
ALTER TABLE [dbo].[EventShow]  WITH CHECK ADD  CONSTRAINT [FK_EventShow_Partner] FOREIGN KEY([PartnerId])
REFERENCES [dbo].[Partner] ([PartnerId])
GO
ALTER TABLE [dbo].[EventShow] CHECK CONSTRAINT [FK_EventShow_Partner]
GO
ALTER TABLE [dbo].[EventShow]  WITH CHECK ADD  CONSTRAINT [FK_EventShow_Referral] FOREIGN KEY([ReferralId])
REFERENCES [dbo].[Referral] ([ReferralId])
GO
ALTER TABLE [dbo].[EventShow] CHECK CONSTRAINT [FK_EventShow_Referral]
GO
ALTER TABLE [dbo].[EventShow]  WITH CHECK ADD  CONSTRAINT [FK_EventShow_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[EventShow] CHECK CONSTRAINT [FK_EventShow_Vendor]
GO
ALTER TABLE [dbo].[FunnelUserList]  WITH CHECK ADD  CONSTRAINT [FK_FunnelUserList_Pipeline] FOREIGN KEY([FunnelId])
REFERENCES [dbo].[PipelineGroup] ([PipelineGroupId])
GO
ALTER TABLE [dbo].[FunnelUserList] CHECK CONSTRAINT [FK_FunnelUserList_Pipeline]
GO
ALTER TABLE [dbo].[HeaderChartMapping]  WITH CHECK ADD  CONSTRAINT [FK_HeaderChartMapping_ChartName] FOREIGN KEY([ChartId])
REFERENCES [dbo].[ChartName] ([Id])
GO
ALTER TABLE [dbo].[HeaderChartMapping] CHECK CONSTRAINT [FK_HeaderChartMapping_ChartName]
GO
ALTER TABLE [dbo].[HeaderChartMapping]  WITH CHECK ADD  CONSTRAINT [FK_HeaderChartMapping_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[HeaderChartMapping] CHECK CONSTRAINT [FK_HeaderChartMapping_Users]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD FOREIGN KEY([SecurityGroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_Currency] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currency] ([Id])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_Currency]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_EventShow] FOREIGN KEY([EventId])
REFERENCES [dbo].[EventShow] ([Id])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_EventShow]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_IndustryType] FOREIGN KEY([Industry])
REFERENCES [dbo].[IndustryType] ([Id])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_IndustryType]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_LeadOriginType] FOREIGN KEY([OriginId])
REFERENCES [dbo].[LeadOriginType] ([Id])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_LeadOriginType]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_LeadStatus] FOREIGN KEY([LeadStatus])
REFERENCES [dbo].[LeadStatus] ([Id])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_LeadStatus]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_Referral] FOREIGN KEY([ReferralId])
REFERENCES [dbo].[Referral] ([ReferralId])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_Referral]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_SocialMediaType] FOREIGN KEY([SocialMediaId])
REFERENCES [dbo].[SocialMediaType] ([Id])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_SocialMediaType]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_Users] FOREIGN KEY([Owner])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_Users]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_Vendor]
GO
ALTER TABLE [dbo].[Lead]  WITH CHECK ADD  CONSTRAINT [FK_Lead_Vendor1] FOREIGN KEY([NotPayReferralId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[Lead] CHECK CONSTRAINT [FK_Lead_Vendor1]
GO
ALTER TABLE [dbo].[LeadContact]  WITH CHECK ADD  CONSTRAINT [FK_LeadContact_ContactInformation] FOREIGN KEY([ContactId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[LeadContact] CHECK CONSTRAINT [FK_LeadContact_ContactInformation]
GO
ALTER TABLE [dbo].[LeadContact]  WITH CHECK ADD  CONSTRAINT [FK_LeadContact_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[LeadContact] CHECK CONSTRAINT [FK_LeadContact_Lead]
GO
ALTER TABLE [dbo].[LeadEmail]  WITH CHECK ADD  CONSTRAINT [FK_Email_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[LeadEmail] CHECK CONSTRAINT [FK_Email_Lead]
GO
ALTER TABLE [dbo].[LeadGroupMapping]  WITH CHECK ADD  CONSTRAINT [FK_LeadGroupMapping_Leads] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[LeadGroupMapping] CHECK CONSTRAINT [FK_LeadGroupMapping_Leads]
GO
ALTER TABLE [dbo].[LeadGroupMapping]  WITH CHECK ADD  CONSTRAINT [FK_LeadGroupMapping_UserGroups] FOREIGN KEY([GroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[LeadGroupMapping] CHECK CONSTRAINT [FK_LeadGroupMapping_UserGroups]
GO
ALTER TABLE [dbo].[LeadLabels]  WITH CHECK ADD  CONSTRAINT [FK_LeadLabels_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[LeadLabels] CHECK CONSTRAINT [FK_LeadLabels_Lead]
GO
ALTER TABLE [dbo].[LeadLabels]  WITH CHECK ADD  CONSTRAINT [FK_LeadLabels_LeadLabels] FOREIGN KEY([LeadTypeId])
REFERENCES [dbo].[LeadTypes] ([Id])
GO
ALTER TABLE [dbo].[LeadLabels] CHECK CONSTRAINT [FK_LeadLabels_LeadLabels]
GO
ALTER TABLE [dbo].[LeadPhoneNumber]  WITH CHECK ADD  CONSTRAINT [FK_PhoneNumber_PhoneNumber] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[LeadPhoneNumber] CHECK CONSTRAINT [FK_PhoneNumber_PhoneNumber]
GO
ALTER TABLE [dbo].[LinePart]  WITH CHECK ADD FOREIGN KEY([PartCatalogId])
REFERENCES [dbo].[PartCatalog] ([Id])
GO
ALTER TABLE [dbo].[LinePart]  WITH CHECK ADD FOREIGN KEY([QuoteId])
REFERENCES [dbo].[Quote] ([Id])
GO
ALTER TABLE [dbo].[MaterialCost]  WITH CHECK ADD FOREIGN KEY([ProductId])
REFERENCES [dbo].[PartCatalog] ([Id])
GO
ALTER TABLE [dbo].[MaterialCost]  WITH CHECK ADD  CONSTRAINT [FK_MaterialCost_DealContact] FOREIGN KEY([DealContactId])
REFERENCES [dbo].[DealContact] ([Id])
GO
ALTER TABLE [dbo].[MaterialCost] CHECK CONSTRAINT [FK_MaterialCost_DealContact]
GO
ALTER TABLE [dbo].[Networking]  WITH CHECK ADD  CONSTRAINT [FK_Networking_NetworkingCost] FOREIGN KEY([CostId])
REFERENCES [dbo].[NetworkingCost] ([NetworkingCostId])
GO
ALTER TABLE [dbo].[Networking] CHECK CONSTRAINT [FK_Networking_NetworkingCost]
GO
ALTER TABLE [dbo].[Networking]  WITH CHECK ADD  CONSTRAINT [FK_Networking_NetworkingEventMeet] FOREIGN KEY([EventMeetId])
REFERENCES [dbo].[NetworkingEventMeet] ([Id])
GO
ALTER TABLE [dbo].[Networking] CHECK CONSTRAINT [FK_Networking_NetworkingEventMeet]
GO
ALTER TABLE [dbo].[Organization]  WITH CHECK ADD  CONSTRAINT [FK_Organization_Lead] FOREIGN KEY([LabelId])
REFERENCES [dbo].[LabelType] ([Id])
GO
ALTER TABLE [dbo].[Organization] CHECK CONSTRAINT [FK_Organization_Lead]
GO
ALTER TABLE [dbo].[PartCatalog]  WITH CHECK ADD FOREIGN KEY([QuoteId])
REFERENCES [dbo].[Quote] ([Id])
GO
ALTER TABLE [dbo].[PartCatalog]  WITH CHECK ADD FOREIGN KEY([UOMId])
REFERENCES [dbo].[UOM] ([Id])
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD FOREIGN KEY([ReferralDropdownId])
REFERENCES [dbo].[ReferralDropdown] ([Id])
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD FOREIGN KEY([SecurityGroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_EventShow] FOREIGN KEY([EventId])
REFERENCES [dbo].[EventShow] ([Id])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_EventShow]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_Lead]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_LeadOriginType] FOREIGN KEY([OriginId])
REFERENCES [dbo].[LeadOriginType] ([Id])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_LeadOriginType]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_PaymentMode] FOREIGN KEY([PaymentModelId])
REFERENCES [dbo].[PaymentMode] ([Id])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_PaymentMode]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_ProviderType] FOREIGN KEY([ProviderTypeId])
REFERENCES [dbo].[ProviderType] ([Id])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_ProviderType]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_ReferralFee] FOREIGN KEY([ReferralFeeId])
REFERENCES [dbo].[ReferralFee] ([Id])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_ReferralFee]
GO
ALTER TABLE [dbo].[Partner]  WITH CHECK ADD  CONSTRAINT [FK_Partner_SocialMediaType] FOREIGN KEY([SocialMediaId])
REFERENCES [dbo].[SocialMediaType] ([Id])
GO
ALTER TABLE [dbo].[Partner] CHECK CONSTRAINT [FK_Partner_SocialMediaType]
GO
ALTER TABLE [dbo].[PipelineGroup]  WITH CHECK ADD  CONSTRAINT [FK_PipelineGroup_PipelineGroupType] FOREIGN KEY([PipelineGroupType])
REFERENCES [dbo].[PipelineGroupType] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PipelineGroup] CHECK CONSTRAINT [FK_PipelineGroup_PipelineGroupType]
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([AssignedToId])
REFERENCES [dbo].[AssignedToDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([CostCenterId])
REFERENCES [dbo].[CostCenterDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([CustomerId])
REFERENCES [dbo].[CustomerDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([DealId])
REFERENCES [dbo].[Deal] ([DealId])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([DiscountId])
REFERENCES [dbo].[DiscountDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([PaymentTermsId])
REFERENCES [dbo].[PaymentTermsDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([StatusId])
REFERENCES [dbo].[StatusDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([TaxId])
REFERENCES [dbo].[TaxDropdown] ([Id])
GO
ALTER TABLE [dbo].[Quote]  WITH CHECK ADD FOREIGN KEY([TypeOfSaleId])
REFERENCES [dbo].[TypeSaleDropdown] ([Id])
GO
ALTER TABLE [dbo].[Recurrence]  WITH CHECK ADD  CONSTRAINT [FK_Recurrence_RecurrenceType] FOREIGN KEY([RecurrenceTypeId])
REFERENCES [dbo].[RecurrenceType] ([Id])
GO
ALTER TABLE [dbo].[Recurrence] CHECK CONSTRAINT [FK_Recurrence_RecurrenceType]
GO
ALTER TABLE [dbo].[RecurrenceDays]  WITH CHECK ADD  CONSTRAINT [FK_RecurrenceDays_Days] FOREIGN KEY([DayId])
REFERENCES [dbo].[Days] ([Id])
GO
ALTER TABLE [dbo].[RecurrenceDays] CHECK CONSTRAINT [FK_RecurrenceDays_Days]
GO
ALTER TABLE [dbo].[RecurrenceDays]  WITH CHECK ADD  CONSTRAINT [FK_RecurrenceDays_Recurrence] FOREIGN KEY([RecurrenceId])
REFERENCES [dbo].[Recurrence] ([Id])
GO
ALTER TABLE [dbo].[RecurrenceDays] CHECK CONSTRAINT [FK_RecurrenceDays_Recurrence]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD FOREIGN KEY([ReferralDropdownId])
REFERENCES [dbo].[ReferralDropdown] ([Id])
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD FOREIGN KEY([SecurityGroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_EventShow] FOREIGN KEY([EventId])
REFERENCES [dbo].[EventShow] ([Id])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_EventShow]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_Lead]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_LeadOriginType] FOREIGN KEY([OriginId])
REFERENCES [dbo].[LeadOriginType] ([Id])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_LeadOriginType]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_PaymentMode] FOREIGN KEY([PaymentModelId])
REFERENCES [dbo].[PaymentMode] ([Id])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_PaymentMode]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_ProviderType] FOREIGN KEY([ProviderTypeId])
REFERENCES [dbo].[ProviderType] ([Id])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_ProviderType]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_ReferralFee] FOREIGN KEY([ReferralFeeId])
REFERENCES [dbo].[ReferralFee] ([Id])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_ReferralFee]
GO
ALTER TABLE [dbo].[Referral]  WITH CHECK ADD  CONSTRAINT [FK_Referral_SocialMediaType] FOREIGN KEY([SocialMediaId])
REFERENCES [dbo].[SocialMediaType] ([Id])
GO
ALTER TABLE [dbo].[Referral] CHECK CONSTRAINT [FK_Referral_SocialMediaType]
GO
ALTER TABLE [dbo].[RolePermissions]  WITH CHECK ADD  CONSTRAINT [FK_RolePermissions_Permissions] FOREIGN KEY([PermissionId])
REFERENCES [dbo].[Permissions] ([Id])
GO
ALTER TABLE [dbo].[RolePermissions] CHECK CONSTRAINT [FK_RolePermissions_Permissions]
GO
ALTER TABLE [dbo].[RolePermissions]  WITH CHECK ADD  CONSTRAINT [FK_RolePermissions_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[RolePermissions] CHECK CONSTRAINT [FK_RolePermissions_Roles]
GO
ALTER TABLE [dbo].[Services]  WITH CHECK ADD  CONSTRAINT [FK__Services__DealId__093F5D4E] FOREIGN KEY([DealId])
REFERENCES [dbo].[Deal] ([DealId])
GO
ALTER TABLE [dbo].[Services] CHECK CONSTRAINT [FK__Services__DealId__093F5D4E]
GO
ALTER TABLE [dbo].[Services]  WITH CHECK ADD  CONSTRAINT [FK_Services_Deal] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[Services] CHECK CONSTRAINT [FK_Services_Deal]
GO
ALTER TABLE [dbo].[Services]  WITH CHECK ADD  CONSTRAINT [FK_Services_Users] FOREIGN KEY([AssignedTo])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Services] CHECK CONSTRAINT [FK_Services_Users]
GO
ALTER TABLE [dbo].[Services]  WITH CHECK ADD  CONSTRAINT [FK_Services_Users1] FOREIGN KEY([Owner])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Services] CHECK CONSTRAINT [FK_Services_Users1]
GO
ALTER TABLE [dbo].[StepsContact]  WITH CHECK ADD  CONSTRAINT [FK_StepsContact_ChooseMethod] FOREIGN KEY([CalendarInviteType])
REFERENCES [dbo].[ChooseMethod] ([Id])
GO
ALTER TABLE [dbo].[StepsContact] CHECK CONSTRAINT [FK_StepsContact_ChooseMethod]
GO
ALTER TABLE [dbo].[StepsContact]  WITH CHECK ADD  CONSTRAINT [FK_StepsContact_CompletedStatus] FOREIGN KEY([CompletedStatusId])
REFERENCES [dbo].[CompletedStatus] ([Id])
GO
ALTER TABLE [dbo].[StepsContact] CHECK CONSTRAINT [FK_StepsContact_CompletedStatus]
GO
ALTER TABLE [dbo].[StepsContact]  WITH CHECK ADD  CONSTRAINT [FK_StepsContact_ContactInformation] FOREIGN KEY([ContactId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[StepsContact] CHECK CONSTRAINT [FK_StepsContact_ContactInformation]
GO
ALTER TABLE [dbo].[StepsContact]  WITH CHECK ADD  CONSTRAINT [FK_StepsContact_StepsMaterialCost] FOREIGN KEY([StepsMaterialCostId])
REFERENCES [dbo].[StepsMaterialCost] ([MaterialCostId])
GO
ALTER TABLE [dbo].[StepsContact] CHECK CONSTRAINT [FK_StepsContact_StepsMaterialCost]
GO
ALTER TABLE [dbo].[StepsContact]  WITH CHECK ADD  CONSTRAINT [FK_StepsContact_StepsTimeCost] FOREIGN KEY([StepsTimeCostId])
REFERENCES [dbo].[StepsTimeCost] ([TimeCostId])
GO
ALTER TABLE [dbo].[StepsContact] CHECK CONSTRAINT [FK_StepsContact_StepsTimeCost]
GO
ALTER TABLE [dbo].[StepsContact]  WITH CHECK ADD  CONSTRAINT [FK_StepsContact_StepTypes] FOREIGN KEY([StepTypeId])
REFERENCES [dbo].[StepTypes] ([Id])
GO
ALTER TABLE [dbo].[StepsContact] CHECK CONSTRAINT [FK_StepsContact_StepTypes]
GO
ALTER TABLE [dbo].[StepsContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_StepsContactNextStep_ChooseMethod] FOREIGN KEY([CalendarInviteType])
REFERENCES [dbo].[ChooseMethod] ([Id])
GO
ALTER TABLE [dbo].[StepsContactNextStep] CHECK CONSTRAINT [FK_StepsContactNextStep_ChooseMethod]
GO
ALTER TABLE [dbo].[StepsContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_StepsContactNextStep_ContactInformation] FOREIGN KEY([ContactId])
REFERENCES [dbo].[ContactInformation] ([Id])
GO
ALTER TABLE [dbo].[StepsContactNextStep] CHECK CONSTRAINT [FK_StepsContactNextStep_ContactInformation]
GO
ALTER TABLE [dbo].[StepsContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_StepsContactNextStep_StepsContact] FOREIGN KEY([StepsContactId])
REFERENCES [dbo].[StepsContact] ([Id])
GO
ALTER TABLE [dbo].[StepsContactNextStep] CHECK CONSTRAINT [FK_StepsContactNextStep_StepsContact]
GO
ALTER TABLE [dbo].[StepsContactNextStep]  WITH CHECK ADD  CONSTRAINT [FK_StepsContactNextStep_StepTypes] FOREIGN KEY([StepTypeId])
REFERENCES [dbo].[StepTypes] ([Id])
GO
ALTER TABLE [dbo].[StepsContactNextStep] CHECK CONSTRAINT [FK_StepsContactNextStep_StepTypes]
GO
ALTER TABLE [dbo].[TimeCost]  WITH CHECK ADD  CONSTRAINT [FK_TimeCost_DealContact] FOREIGN KEY([DealContactId])
REFERENCES [dbo].[DealContact] ([Id])
GO
ALTER TABLE [dbo].[TimeCost] CHECK CONSTRAINT [FK_TimeCost_DealContact]
GO
ALTER TABLE [dbo].[Todo]  WITH CHECK ADD FOREIGN KEY([ImportanceId])
REFERENCES [dbo].[Importance] ([Id])
GO
ALTER TABLE [dbo].[Todo]  WITH CHECK ADD  CONSTRAINT [FK_Todo_Assigned_Users] FOREIGN KEY([AssignedTo])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Todo] CHECK CONSTRAINT [FK_Todo_Assigned_Users]
GO
ALTER TABLE [dbo].[Todo]  WITH CHECK ADD  CONSTRAINT [FK_Todo_Recurrence] FOREIGN KEY([RecurrenceId])
REFERENCES [dbo].[Recurrence] ([Id])
GO
ALTER TABLE [dbo].[Todo] CHECK CONSTRAINT [FK_Todo_Recurrence]
GO
ALTER TABLE [dbo].[Todo]  WITH CHECK ADD  CONSTRAINT [FK_Todo_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[Todo] CHECK CONSTRAINT [FK_Todo_Vendor]
GO
ALTER TABLE [dbo].[UserCost]  WITH CHECK ADD FOREIGN KEY([UserCostDropdownId])
REFERENCES [dbo].[UserCostDropdown] ([Id])
GO
ALTER TABLE [dbo].[UserCost]  WITH CHECK ADD  CONSTRAINT [FK_UserCost_Partner] FOREIGN KEY([PartnerId])
REFERENCES [dbo].[Partner] ([PartnerId])
GO
ALTER TABLE [dbo].[UserCost] CHECK CONSTRAINT [FK_UserCost_Partner]
GO
ALTER TABLE [dbo].[UserCost]  WITH CHECK ADD  CONSTRAINT [FK_UserCost_Referral] FOREIGN KEY([ReferralId])
REFERENCES [dbo].[Referral] ([ReferralId])
GO
ALTER TABLE [dbo].[UserCost] CHECK CONSTRAINT [FK_UserCost_Referral]
GO
ALTER TABLE [dbo].[UserCost]  WITH CHECK ADD  CONSTRAINT [FK_UserCost_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserCost] CHECK CONSTRAINT [FK_UserCost_Users]
GO
ALTER TABLE [dbo].[UserCost]  WITH CHECK ADD  CONSTRAINT [FK_UserCost_Vendor] FOREIGN KEY([VendorId])
REFERENCES [dbo].[Vendor] ([VendorId])
GO
ALTER TABLE [dbo].[UserCost] CHECK CONSTRAINT [FK_UserCost_Vendor]
GO
ALTER TABLE [dbo].[UserGoal]  WITH CHECK ADD  CONSTRAINT [FK_UserGoal_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserGoal] CHECK CONSTRAINT [FK_UserGoal_Users]
GO
ALTER TABLE [dbo].[UserGroupMapping]  WITH CHECK ADD  CONSTRAINT [FK_UserGroupMapping_UserGroups] FOREIGN KEY([GroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[UserGroupMapping] CHECK CONSTRAINT [FK_UserGroupMapping_UserGroups]
GO
ALTER TABLE [dbo].[UserGroupMapping]  WITH CHECK ADD  CONSTRAINT [FK_UserGroupMapping_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserGroupMapping] CHECK CONSTRAINT [FK_UserGroupMapping_Users]
GO
ALTER TABLE [dbo].[UserQuoteChartMapping]  WITH CHECK ADD  CONSTRAINT [FK_UserQuoteChartMapping_ChartName] FOREIGN KEY([ChartId])
REFERENCES [dbo].[ChartName] ([Id])
GO
ALTER TABLE [dbo].[UserQuoteChartMapping] CHECK CONSTRAINT [FK_UserQuoteChartMapping_ChartName]
GO
ALTER TABLE [dbo].[UserQuoteChartMapping]  WITH CHECK ADD  CONSTRAINT [FK_UserQuoteChartMapping_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[UserQuoteChartMapping] CHECK CONSTRAINT [FK_UserQuoteChartMapping_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_EmployeeType] FOREIGN KEY([EmployeeTypeId])
REFERENCES [dbo].[EmployeeType] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_EmployeeType]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([RoleId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_TwoFactorType] FOREIGN KEY([TwoFactorType])
REFERENCES [dbo].[TwoFactorType] ([TwoFactorId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_TwoFactorType]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_UserGroups] FOREIGN KEY([GroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_UserGroups]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD FOREIGN KEY([ReferralDropdownId])
REFERENCES [dbo].[ReferralDropdown] ([Id])
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD FOREIGN KEY([SecurityGroupId])
REFERENCES [dbo].[UserGroups] ([UserGroupId])
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_EventShow] FOREIGN KEY([EventId])
REFERENCES [dbo].[EventShow] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_EventShow]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_Lead] FOREIGN KEY([LeadId])
REFERENCES [dbo].[Lead] ([LeadId])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_Lead]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_LeadOriginType] FOREIGN KEY([OriginId])
REFERENCES [dbo].[LeadOriginType] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_LeadOriginType]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_PaymentMode] FOREIGN KEY([PaymentModelId])
REFERENCES [dbo].[PaymentMode] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_PaymentMode]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_ProviderType] FOREIGN KEY([ProviderTypeId])
REFERENCES [dbo].[ProviderType] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_ProviderType]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_ReferralFee] FOREIGN KEY([ReferralFeeId])
REFERENCES [dbo].[ReferralFee] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_ReferralFee]
GO
ALTER TABLE [dbo].[Vendor]  WITH CHECK ADD  CONSTRAINT [FK_Vendor_SocialMediaType] FOREIGN KEY([SocialMediaId])
REFERENCES [dbo].[SocialMediaType] ([Id])
GO
ALTER TABLE [dbo].[Vendor] CHECK CONSTRAINT [FK_Vendor_SocialMediaType]
GO
/****** Object:  StoredProcedure [dbo].[GetOpportunitiesByStatus]    Script Date: 9/8/2023 3:48:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
CREATE Procedure [dbo].[GetOpportunitiesByStatus]
(
@statusId INT,
@from Datetime,
@to Datetime
) AS
Begin
SET NOCOUNT ON;
IF @statusId=0
BEGIN
select D.DealId, D.LeadProvider, D.CreatedOn, D.DealName, L.LeadName, D.ExpectedRevenue, S.[Name] as DealStatus, D.EstimationDate, P.[Name] as DealPipeline from Deal as D
left join [Lead] as L on
D.LeadId = L.LeadId
left join [Status] as S on
D.StatusId = S.Id
left join Pipeline as P on
D.PipelineId = P.PipelineId Where D.CreatedOn >= @from and D.CreatedOn <= @to
END
ELSE
BEGIN
select D.DealId, D.LeadProvider, D.CreatedOn, D.DealName, L.LeadName, D.ExpectedRevenue, S.[Name] as DealStatus, D.EstimationDate, P.[Name] as DealPipeline from Deal as D
left join [Lead] as L on
D.LeadId = L.LeadId
left join [Status] as S on
D.StatusId = S.Id
left join Pipeline as P on
D.PipelineId = P.PipelineId Where L.LeadStatus = @statusId and D.CreatedOn >= @from and D.CreatedOn <= @to
END
SET NOCOUNT OFF;
End

GO
/****** Object:  StoredProcedure [dbo].[GetUsersByPageSize]    Script Date: 9/8/2023 3:48:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[GetUsersByPageSize]
(
@skip INT,
@pageSize INT,
@search VARCHAR(50),
@totalCount INT OUT
) AS 
Begin
SET NOCOUNT ON;
IF @search=''
BEGIN
SELECT * FROM Users AS U
ORDER BY U.UserId Asc
OFFSET @skip ROWS FETCH NEXT @pageSize ROWS ONLY
SELECT @totalCount = COUNT(UserId) FROM Users
END
ELSE
BEGIN
SELECT * FROM Users AS U
WHERE U.FirstName like '%'+@search+'%' or U.LastName like'%'+@search+'%' or U.Email like '%'+@search+'%'
ORDER BY U.UserId DESC
OFFSET @skip ROWS FETCH NEXT @pageSize ROWS ONLY
SELECT @totalCount = COUNT(UserId) FROM Users AS U WHERE 
U.FirstName like '%'+@search+'%' or U.LastName like'%'+@search+'%' or U.Email like '%'+@search+'%'
END
SET NOCOUNT OFF;
End
GO
/****** Object:  StoredProcedure [dbo].[SP_CompanyRegister]    Script Date: 9/8/2023 3:48:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[SP_CompanyRegister]
(
@pageNumber INT,
@pageSize INT,
@totalCount INT OUT
) AS 
Begin
SET NOCOUNT ON;
BEGIN
select cr.RegisterId, cr.CompanyName, cr.Email from CompanyRegister cr
ORDER BY cr.RegisterId DESC
OFFSET @pageNumber ROWS FETCH NEXT @pageSize ROWS ONLY
SELECT @totalCount = COUNT(RegisterId) FROM VW_CompanyRegister as cu
END
BEGIN
select cr.RegisterId, cr.CompanyName, cr.Email from CompanyRegister cr
ORDER BY cr.RegisterId DESC
OFFSET @pageNumber ROWS FETCH NEXT @pageSize ROWS ONLY
SELECT @totalCount = COUNT(RegisterId) FROM VW_CompanyRegister as cu
END
SET NOCOUNT OFF;
End
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllCalendarEvents]    Script Date: 9/8/2023 3:48:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[sp_GetAllCalendarEvents]
(
@startDate date,
@endDate date
)
as 
Begin
    select 1 as EventType, t.Id as Id, t.TodoName as EventName, t.Subject as [Description], t.StartDate, t.EndDate, 
	t.Color, t.TodoNumber as IdentNumber from Todo t 
	where (@startDate IS NULL OR (Cast(t.StartDate as date) >= Cast(@startDate as date) and Cast(t.EndDate as date) <= Cast(@endDate as date)))
	Union
    select 3 as EventType, s.Id as Id, s.ServiceNumber as EventName, s.ApplicationRemarks as [Description], s.StartDate,
	s.EndDate , s.Color, s.ServiceNumber as IdentNumber from [Services] s
	where (@startDate IS NULL OR (Cast(s.StartDate as date) >= Cast(@startDate as date)))	
End
GO
/****** Object:  StoredProcedure [dbo].[SP_PriceList]    Script Date: 9/8/2023 3:48:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[SP_PriceList]
(
@pageNumber INT,
@pageSize INT,
@totalCount INT OUT
) AS 
Begin
SET NOCOUNT ON;
BEGIN
SELECT PL.Id, PL.[Code], PL.[Description],PL.[StartDate],PL.[EndDate] from [PriceList] PL
ORDER BY PL.Id Asc
OFFSET @pageNumber ROWS FETCH NEXT @pageSize ROWS ONLY
SELECT @totalCount = COUNT(Id) from [VwPriceList] PL
END
BEGIN
SELECT PL.Id, PL.[Code], PL.[Description],PL.[StartDate],PL.[EndDate] from [PriceList] PL
ORDER BY PL.Id DESC
OFFSET @pageNumber ROWS FETCH NEXT @pageSize ROWS ONLY
SELECT @totalCount = COUNT(Id) from [VwPriceList] PL
END
SET NOCOUNT OFF;
End
GO
/****** Object:  StoredProcedure [dbo].[sp_SelectNameWithKeyByEntity]    Script Date: 9/8/2023 3:48:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_SelectNameWithKeyByEntity] @entity int, @leadType int
AS
IF @entity = 1
Begin
select L.LeadName as [Name], L.LeadId as Id from [Lead] as L where L.LeadStatus = 3
End
IF @entity = 4
Begin
select V.[Name] as [Name], V.VendorId as Id from Vendor as V
End
IF @entity = 5
Begin
select E.[Name] as [Name], E.Id as Id from EventShow as E
End
IF @entity = 19
Begin
select P.[Name] as [Name], P.PartnerId as Id from [Partner] as P
End
IF @entity = 20
Begin
select R.[Name] as [Name], R.ReferralId as Id from Referral as R
End
IF @entity = 21
Begin
select L.LeadName as [Name], L.LeadId as Id from [Lead] as L where L.LeadStatus = 1
End
IF @entity = 22
Begin
select L.LeadName as [Name], L.LeadId as Id from [Lead] as L where L.LeadStatus = 2
End
IF @entity = 18
Begin
select U.FirstName + '' + U.LastName as [Name], U.UserId as Id from [Users] as U
End
GO
