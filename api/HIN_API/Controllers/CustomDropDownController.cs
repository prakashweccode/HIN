using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomDropDownController : ControllerBase
    {
        private TenantContext _dbContext;
        private readonly AppSettings _appSettings;
        public CustomDropDownController(TenantContext dbContext, IOptions<AppSettings> appSettings)
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }

        [Route("SaveChooseMethod")]
        [HttpPost]
        public async Task<ActionResult<CustomDropDown>> SaveChooseMethod(CustomDropDown customDropDown)
        {
            try
            {
                var chooseMethod = new ChooseMethod();
                chooseMethod.Name = customDropDown.DropDownName;
                _dbContext.ChooseMethod.Add(chooseMethod);
                await _dbContext.SaveChangesAsync();
                return Ok(customDropDown);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveLeadStatus")]
        [HttpPost]
        public async Task<ActionResult<CustomDropDown>> SaveLeadStatus(CustomDropDown customDropDown)
        {
            try
            {
                var leadStatus = new LeadStatus();
                leadStatus.Name = customDropDown.DropDownName;
                _dbContext.LeadStatus.Add(leadStatus);
                await _dbContext.SaveChangesAsync();
                return Ok(customDropDown);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveEventStatus")]
        [HttpPost]
        public async Task<ActionResult<CustomDropDown>> SaveEventStatus(CustomDropDown customDropDown)
        {
            try
            {
                var eventStatus = new EventStatus();
                eventStatus.Name = customDropDown.DropDownName;
                _dbContext.EventStatus.Add(eventStatus);
                await _dbContext.SaveChangesAsync();
                return Ok(customDropDown);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveIndustryType")]
        [HttpPost]
        public async Task<ActionResult<IndustryType>> SaveIndustryType(CustomDropDown customDropDown)
        {
            try
            {
                var industryType = new IndustryType();
                industryType.Name = customDropDown.DropDownName;
                _dbContext.IndustryType.Add(industryType);
                await _dbContext.SaveChangesAsync();
                return Ok(industryType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveProviderType")]
        [HttpPost]
        public async Task<ActionResult<ProviderType>> SaveProviderType(CustomDropDown customDropDown)
        {
            try
            {
                var provider = new ProviderType();
                provider.Name = customDropDown.DropDownName;
                _dbContext.ProviderType.Add(provider);
                await _dbContext.SaveChangesAsync();
                return Ok(provider);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveReason")]
        [HttpPost]
        public async Task<ActionResult<ProviderType>> SaveReason(CustomDropDown customDropDown)
        {
            try
            {
                var reason = new Reason();
                reason.Name = customDropDown.DropDownName;
                _dbContext.Reason.Add(reason);
                await _dbContext.SaveChangesAsync();
                return Ok(reason);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveReferralDrpodown")]
        [HttpPost]
        public async Task<ActionResult<ReferralDropdown>> SaveReferralDrpodown(CustomDropDown customDropDown)
        {
            try
            {
                var referralDropdown = new ReferralDropdown();
                referralDropdown.Name = customDropDown.DropDownName;
                _dbContext.ReferralDropdown.Add(referralDropdown);
                await _dbContext.SaveChangesAsync();
                return Ok(referralDropdown);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }



        [Route("SaveCompletedStatus")]
        [HttpPost]
        public async Task<ActionResult<CompletedStatus>> SaveCompletedStatus(CustomDropDown customDropDown)
        {
            try
            {
                var completedStatus = new CompletedStatus();
                completedStatus.Name = customDropDown.DropDownName;
                _dbContext.CompletedStatus.Add(completedStatus);
                await _dbContext.SaveChangesAsync();
                return Ok(completedStatus);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveContactTitle")]
        [HttpPost]
        public async Task<ActionResult<ContactTitle>> SaveContactTitle(CustomDropDown customDropDown)
        {
            try
            {
                var contactTitle = new ContactTitle();
                contactTitle.Name = customDropDown.DropDownName;
                _dbContext.ContactTitle.Add(contactTitle);
                await _dbContext.SaveChangesAsync();
                return Ok(contactTitle);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveLocation")]
        [HttpPost]
        public async Task<ActionResult<Location>> SaveLocation(CustomDropDown customDropDown)
        {
            try
            {
                var location = new Location();
                location.Name = customDropDown.DropDownName;
                _dbContext.Location.Add(location);
                await _dbContext.SaveChangesAsync();
                return Ok(location);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        [Route("SaveConfig")]
        [HttpPost]
        public async Task<ActionResult<Config>> SaveConfig(CustomDropDown customDropDown)
        {
            try
            {
                var config = new Config();
                config.Name = customDropDown.DropDownName;
                _dbContext.Config.Add(config);
                await _dbContext.SaveChangesAsync();
                return Ok(config);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveCountry")]
        [HttpPost]
        public async Task<ActionResult<Country>> SaveCountry(CustomDropDown customDropDown)
        {
            try
            {
                var country = new Country();
                country.Name = customDropDown.DropDownName;
                _dbContext.Country.Add(country);
                await _dbContext.SaveChangesAsync();
                return Ok(country);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveCurrency")]
        [HttpPost]
        public async Task<ActionResult<Currency>> SaveCurrency(CustomDropDown customDropDown)
        {
            try
            {
                var currency = new Currency();
                currency.Name = customDropDown.DropDownName;
                _dbContext.Currency.Add(currency);
                await _dbContext.SaveChangesAsync();
                return Ok(currency);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveDays")]
        [HttpPost]
        public async Task<ActionResult<Days>> SaveDays(CustomDropDown customDropDown)
        {
            try
            {
                var days = new Days();
                days.DayName = customDropDown.DropDownName;
                _dbContext.Days.Add(days);
                await _dbContext.SaveChangesAsync();
                return Ok(days);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveDbPropertyTypes")]
        [HttpPost]
        public async Task<ActionResult<DbPropertyTypes>> SaveDbPropertyTypes(CustomDropDown customDropDown)
        {
            try
            {
                var dbPropertyTypes = new DbPropertyTypes();
                dbPropertyTypes.Name = customDropDown.DropDownName;
                _dbContext.DbPropertyTypes.Add(dbPropertyTypes);
                await _dbContext.SaveChangesAsync();
                return Ok(dbPropertyTypes);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveEmailType")]
        [HttpPost]
        public async Task<ActionResult<EmailType>> SaveEmailType(CustomDropDown customDropDown)
        {
            try
            {
                var emailType = new EmailType();
                emailType.Name = customDropDown.DropDownName;
                _dbContext.EmailType.Add(emailType);
                await _dbContext.SaveChangesAsync();
                return Ok(emailType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveEmployeeType")]
        [HttpPost]
        public async Task<ActionResult<EmployeeType>> SaveEmployeeType(CustomDropDown customDropDown)
        {
            try
            {
                var employeeType = new EmployeeType();
                employeeType.Name = customDropDown.DropDownName;
                _dbContext.EmployeeType.Add(employeeType);
                await _dbContext.SaveChangesAsync();
                return Ok(employeeType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveEventMode")]
        [HttpPost]
        public async Task<ActionResult<EventMode>> SaveEventMode(CustomDropDown customDropDown)
        {
            try
            {
                var eventMode = new EventMode();
                eventMode.Name = customDropDown.DropDownName;
                _dbContext.EventMode.Add(eventMode);
                await _dbContext.SaveChangesAsync();
                return Ok(eventMode);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveGender")]
        [HttpPost]
        public async Task<ActionResult<Gender>> SaveGender(CustomDropDown customDropDown)
        {
            try
            {
                var gender = new Gender();
                gender.GenderName = customDropDown.DropDownName;
                _dbContext.Gender.Add(gender);
                await _dbContext.SaveChangesAsync();
                return Ok(gender);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveLabelType")]
        [HttpPost]
        public async Task<ActionResult<LabelType>> SaveLabelType(CustomDropDown customDropDown)
        {
            try
            {
                var labelType = new LabelType();
                labelType.Name = customDropDown.DropDownName;
                _dbContext.LabelType.Add(labelType);
                await _dbContext.SaveChangesAsync();
                return Ok(labelType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveLeadGenEntityType")]
        [HttpPost]
        public async Task<ActionResult<LeadGenEntityType>> SaveLeadGenEntityType(CustomDropDown customDropDown)
        {
            try
            {
                var leadGenEntityType = new LeadGenEntityType();
                leadGenEntityType.EntityType = customDropDown.DropDownName;
                _dbContext.LeadGenEntityType.Add(leadGenEntityType);
                await _dbContext.SaveChangesAsync();
                return Ok(leadGenEntityType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveLeadOriginType")]
        [HttpPost]
        public async Task<ActionResult<LeadOriginType>> SaveLeadOriginType(CustomDropDown customDropDown)
        {
            try
            {
                var leadOriginType = new LeadOriginType();
                leadOriginType.Name = customDropDown.DropDownName;
                _dbContext.LeadOriginType.Add(leadOriginType);
                await _dbContext.SaveChangesAsync();
                return Ok(customDropDown);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveLeadTypes")]
        [HttpPost]
        public async Task<ActionResult<LeadTypes>> SaveLeadTypes(CustomDropDown customDropDown)
        {
            try
            {
                var leadTypes = new LeadTypes();
                leadTypes.Name = customDropDown.DropDownName;
                _dbContext.LeadTypes.Add(leadTypes);
                await _dbContext.SaveChangesAsync();
                return Ok(leadTypes);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SavePhoneNumberType")]
        [HttpPost]
        public async Task<ActionResult<PhoneNumberType>> SavePhoneNumberType(CustomDropDown customDropDown)
        {
            try
            {
                var phoneNumberType = new PhoneNumberType();
                phoneNumberType.Name = customDropDown.DropDownName;
                _dbContext.PhoneNumberType.Add(phoneNumberType);
                await _dbContext.SaveChangesAsync();
                return Ok(phoneNumberType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SavePipelineGroupType")]
        [HttpPost]
        public async Task<ActionResult<PipelineGroupType>> SavePipelineGroupType(CustomDropDown customDropDown)
        {
            try
            {
                var pipelineGroupType = new PipelineGroupType();
                pipelineGroupType.Name = customDropDown.DropDownName;
                _dbContext.PipelineGroupType.Add(pipelineGroupType);
                await _dbContext.SaveChangesAsync();
                return Ok(pipelineGroupType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveRecurrenceType")]
        [HttpPost]
        public async Task<ActionResult<RecurrenceType>> SaveRecurrenceType(CustomDropDown customDropDown)
        {
            try
            {
                var recurrenceType = new RecurrenceType();
                recurrenceType.Name = customDropDown.DropDownName;
                _dbContext.RecurrenceType.Add(recurrenceType);
                await _dbContext.SaveChangesAsync();
                return Ok(recurrenceType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveReferralFee")]
        [HttpPost]
        public async Task<ActionResult<ReferralFee>> SaveReferralFee(CustomDropDown customDropDown)
        {
            try
            {
                var referralFee = new ReferralFee();
                referralFee.Name = customDropDown.DropDownName;
                _dbContext.ReferralFee.Add(referralFee);
                await _dbContext.SaveChangesAsync();
                return Ok(referralFee);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveRoles")]
        [HttpPost]
        public async Task<ActionResult<Roles>> SaveRoles(CustomDropDown customDropDown)
        {
            try
            {
                var roles = new Roles();
                roles.RoleName = customDropDown.DropDownName;
                _dbContext.Roles.Add(roles);
                await _dbContext.SaveChangesAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveSocialMediaType")]
        [HttpPost]
        public async Task<ActionResult<SocialMediaType>> SaveSocialMediaType(CustomDropDown customDropDown)
        {
            try
            {
                var socialMediaType = new SocialMediaType();
                socialMediaType.Name = customDropDown.DropDownName;
                _dbContext.SocialMediaType.Add(socialMediaType);
                await _dbContext.SaveChangesAsync();
                return Ok(socialMediaType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveStatus")]
        [HttpPost]
        public async Task<ActionResult<Status>> SaveStatus(CustomDropDown customDropDown)
        {
            try
            {
                var status = new Status();
                status.Name = customDropDown.DropDownName;
                _dbContext.Status.Add(status);
                await _dbContext.SaveChangesAsync();
                return Ok(status);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveServiceStatus")]
        [HttpPost]
        public async Task<ActionResult<ServiceStatus>> SaveServiceStatus(CustomDropDown customDropDown)
        {
            try
            {
                var status = new ServiceStatus();
                status.Name = customDropDown.DropDownName;
                _dbContext.ServiceStatus.Add(status);
                await _dbContext.SaveChangesAsync();
                return Ok(status);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveEventType")]
        [HttpPost]
        public async Task<ActionResult<EventType>> SaveEventType(CustomDropDown customDropDown)
        {
            try
            {
                var eventType = new EventType();
                eventType.Name = customDropDown.DropDownName;
                _dbContext.EventType.Add(eventType);
                await _dbContext.SaveChangesAsync();
                return Ok(eventType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveEventPaperwork")]
        [HttpPost]
        public async Task<ActionResult<PaperworkCompletion>> SaveEventPaperwork(CustomDropDown customDropDown)
        {
            try
            {
                var paperworkCompletion = new PaperworkCompletion();
                paperworkCompletion.Name = customDropDown.DropDownName;
                _dbContext.PaperworkCompletion.Add(paperworkCompletion);
                await _dbContext.SaveChangesAsync();
                return Ok(paperworkCompletion);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SavePrority")]
        [HttpPost]
        public async Task<ActionResult<Prority>> SavePrority(CustomDropDown customDropDown)
        {
            try
            {
                var prority = new Prority();
                prority.Name = customDropDown.DropDownName;
                _dbContext.Prority.Add(prority);
                await _dbContext.SaveChangesAsync();
                return Ok(prority);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveTicketType")]
        [HttpPost]
        public async Task<ActionResult<TicketType>> SaveTicketType(CustomDropDown customDropDown)
        {
            try
            {
                var ticketType = new TicketType();
                ticketType.Name = customDropDown.DropDownName;
                _dbContext.TicketType.Add(ticketType);
                await _dbContext.SaveChangesAsync();
                return Ok(ticketType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveSubIssueType")]
        [HttpPost]
        public async Task<ActionResult<SubIssueType>> SaveSubIssueType(CustomDropDown customDropDown)
        {
            try
            {
                var subIssueType = new SubIssueType();
                subIssueType.Name = customDropDown.DropDownName;
                _dbContext.SubIssueType.Add(subIssueType);
                await _dbContext.SaveChangesAsync();
                return Ok(subIssueType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveStepTypes")]
        [HttpPost]
        public async Task<ActionResult<StepTypes>> SaveStepTypes(CustomDropDown customDropDown)
        {
            try
            {
                var stepTypes = new StepTypes();
                stepTypes.Name = customDropDown.DropDownName;
                _dbContext.StepTypes.Add(stepTypes);
                await _dbContext.SaveChangesAsync();
                return Ok(stepTypes);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveServiceActionType")]
        [HttpPost]
        public async Task<ActionResult<ServiceActionTypes>> SaveServiceActionType(CustomDropDown customDropDown)
        {
            try
            {
                var serviceActionType = new ServiceActionTypes();
                serviceActionType.Name = customDropDown.DropDownName;
                _dbContext.ServiceActionTypes.Add(serviceActionType);
                await _dbContext.SaveChangesAsync();
                return Ok(serviceActionType);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveUserRole")]
        [HttpPost]
        public async Task<ActionResult<UserRole>> SaveUserRole(CustomDropDown customDropDown)
        {
            try
            {
                var userRole = new UserRole();
                userRole.Name = customDropDown.DropDownName;
                _dbContext.UserRole.Add(userRole);
                await _dbContext.SaveChangesAsync();
                return Ok(userRole);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        

        [Route("GetChooseMethod")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetChooseMethod()
        {
            List<ChooseMethod> lstChooseMethod = new List<ChooseMethod>();
            lstChooseMethod = await _dbContext.ChooseMethod.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var chooseMethod in lstChooseMethod)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = chooseMethod.Id;
                objCustomDropDown.DropDownName = chooseMethod.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetCompletedStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetCompletedStatus()
        {
            List<CompletedStatus> lstCompletedStatus = new List<CompletedStatus>();
            lstCompletedStatus = await _dbContext.CompletedStatus.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var completedStatus in lstCompletedStatus)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = completedStatus.Id;
                objCustomDropDown.DropDownName = completedStatus.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetContactTitle")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactTitle>>> GetContactTitle()
        {
            List<ContactTitle> lstContactTitle = new List<ContactTitle>();
            lstContactTitle = await _dbContext.ContactTitle.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var contactTitle in lstContactTitle)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = contactTitle.Id;
                objCustomDropDown.DropDownName = contactTitle.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetLocation")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocation()
        {
            List<Location> lstLocation = new List<Location>();
            lstLocation = await _dbContext.Location.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var location in lstLocation)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = location.Id;
                objCustomDropDown.DropDownName = location.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetConfig")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetConfig()
        {
            List<Config> lstConfig = new List<Config>();
            lstConfig = await _dbContext.Config.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var config in lstConfig)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = config.Id;
                objCustomDropDown.DropDownName = config.Description;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetCountry")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetCountry()
        {
            List<Country> lstCountry = new List<Country>();
            lstCountry = await _dbContext.Country.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var country in lstCountry)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = country.Id;
                objCustomDropDown.DropDownName = country.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetCurrency")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetCurrency()
        {
            List<Currency> lstCurrency = new List<Currency>();
            lstCurrency = await _dbContext.Currency.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var currency in lstCurrency)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = currency.Id;
                objCustomDropDown.DropDownName = currency.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

      


        [Route("GetLeadStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetLeadStatus()
        {
            List<LeadStatus> lstLeadStatus = new List<LeadStatus>();
            lstLeadStatus = await _dbContext.LeadStatus.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var currency in lstLeadStatus)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = currency.Id;
                objCustomDropDown.DropDownName = currency.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetEventType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetEventType()
        {
            List<EventType> lstEventType = new List<EventType>();
            lstEventType = await _dbContext.EventType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var currency in lstEventType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = currency.Id;
                objCustomDropDown.DropDownName = currency.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetEventPaperwork")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetEventPaperwork()
        {
            List<PaperworkCompletion> lstPaperwork = new List<PaperworkCompletion>();
            lstPaperwork = await _dbContext.PaperworkCompletion.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var currency in lstPaperwork)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = currency.Id;
                objCustomDropDown.DropDownName = currency.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetEventStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetEventStatus()
        {
            List<EventStatus> lstEventStatus = new List<EventStatus>();
            lstEventStatus = await _dbContext.EventStatus.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var eventStatus in lstEventStatus)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = eventStatus.Id;
                objCustomDropDown.DropDownName = eventStatus.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }



        [Route("GetDays")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetDays()
        {
            List<Days> lstDays = new List<Days>();
            lstDays = await _dbContext.Days.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var days in lstDays)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = days.Id;
                objCustomDropDown.DropDownName = days.DayName;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetDbPropertyTypes")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetDbPropertyTypes()
        {
            List<DbPropertyTypes> lstDbPropertyTypes = new List<DbPropertyTypes>();
            lstDbPropertyTypes = await _dbContext.DbPropertyTypes.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var dbPropertyTypes in lstDbPropertyTypes)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = dbPropertyTypes.Id;
                objCustomDropDown.DropDownName = dbPropertyTypes.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetEmailType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetEmailType()
        {
            List<EmailType> lstEmailType = new List<EmailType>();
            lstEmailType = await _dbContext.EmailType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var emailType in lstEmailType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = emailType.Id;
                objCustomDropDown.DropDownName = emailType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetEmployeeType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetEmployeeType()
        {
            List<EmployeeType> lstEmployeeType = new List<EmployeeType>();
            lstEmployeeType = await _dbContext.EmployeeType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var employeeType in lstEmployeeType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = employeeType.Id;
                objCustomDropDown.DropDownName = employeeType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetEventMode")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetEventMode()
        {
            List<EventMode> lstEventMode = new List<EventMode>();
            lstEventMode = await _dbContext.EventMode.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var eventMode in lstEventMode)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = eventMode.Id;
                objCustomDropDown.DropDownName = eventMode.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetGender")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetGender()
        {
            List<Gender> lstGender = new List<Gender>();
            lstGender = await _dbContext.Gender.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var gender in lstGender)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = gender.GenderId;
                objCustomDropDown.DropDownName = gender.GenderName;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetLabelType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetLabelType()
        {
            List<LabelType> lstLabelType = new List<LabelType>();
            lstLabelType = await _dbContext.LabelType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var labelType in lstLabelType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = labelType.Id;
                objCustomDropDown.DropDownName = labelType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetLeadGenEntityType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetLeadGenEntityType()
        {
            List<LeadGenEntityType> lstLeadGenEntityType = new List<LeadGenEntityType>();
            lstLeadGenEntityType = await _dbContext.LeadGenEntityType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var leadGenEntityType in lstLeadGenEntityType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = leadGenEntityType.Id;
                objCustomDropDown.DropDownName = leadGenEntityType.EntityType;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetLeadOriginType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetLeadOriginType()
        {
            List<LeadOriginType> lstLeadOriginType = new List<LeadOriginType>();
            lstLeadOriginType = await _dbContext.LeadOriginType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var leadOriginType in lstLeadOriginType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = leadOriginType.Id;
                objCustomDropDown.DropDownName = leadOriginType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetLeadTypes")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetLeadTypes()
        {
            List<LeadTypes> lstLeadTypes = new List<LeadTypes>();
            lstLeadTypes = await _dbContext.LeadTypes.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var leadTypes in lstLeadTypes)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = leadTypes.Id;
                objCustomDropDown.DropDownName = leadTypes.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetPhoneNumberType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetPhoneNumberType()
        {
            List<PhoneNumberType> lstPhoneNumberType = new List<PhoneNumberType>();
            lstPhoneNumberType = await _dbContext.PhoneNumberType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var phoneNumberType in lstPhoneNumberType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = phoneNumberType.Id;
                objCustomDropDown.DropDownName = phoneNumberType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetPipelineGroupType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetPipelineGroupType()
        {
            List<PipelineGroupType> lstPipelineGroupType = new List<PipelineGroupType>();
            lstPipelineGroupType = await _dbContext.PipelineGroupType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var pipelineGroupType in lstPipelineGroupType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = pipelineGroupType.Id;
                objCustomDropDown.DropDownName = pipelineGroupType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetRecurrenceType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetRecurrenceType()
        {
            List<RecurrenceType> lstRecurrenceType = new List<RecurrenceType>();
            lstRecurrenceType = await _dbContext.RecurrenceType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var recurrenceType in lstRecurrenceType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = recurrenceType.Id;
                objCustomDropDown.DropDownName = recurrenceType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetReferralFee")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetReferralFee()
        {
            List<ReferralFee> lstReferralFee = new List<ReferralFee>();
            lstReferralFee = await _dbContext.ReferralFee.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var referralFee in lstReferralFee)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = referralFee.Id;
                objCustomDropDown.DropDownName = referralFee.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetRoles")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetRoles()
        {
            List<Roles> lstRoles = new List<Roles>();
            lstRoles = await _dbContext.Roles.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var roles in lstRoles)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = roles.RoleId;
                objCustomDropDown.DropDownName = roles.RoleName;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetSocialMediaType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetSocialMediaType()
        {
            List<SocialMediaType> lstSocialMediaType = new List<SocialMediaType>();
            lstSocialMediaType = await _dbContext.SocialMediaType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var socialMediaType in lstSocialMediaType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = socialMediaType.Id;
                objCustomDropDown.DropDownName = socialMediaType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetStatus()
        {
            List<Status> lstStatus = new List<Status>();
            lstStatus = await _dbContext.Status.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var status in lstStatus)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = status.Id;
                objCustomDropDown.DropDownName = status.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetPrority")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetPrority()
        {
            List<Prority> lstPrority = new List<Prority>();
            lstPrority = await _dbContext.Prority.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var prority in lstPrority)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = prority.Id;
                objCustomDropDown.DropDownName = prority.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetTicketType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetTicketType()
        {
            List<TicketType> lstTicketType = new List<TicketType>();
            lstTicketType = await _dbContext.TicketType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var ticketType in lstTicketType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = ticketType.Id;
                objCustomDropDown.DropDownName = ticketType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetSubIssueType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetSubIssueType()
        {
            List<SubIssueType> lstSubIssueType = new List<SubIssueType>();
            lstSubIssueType = await _dbContext.SubIssueType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var subIssueType in lstSubIssueType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = subIssueType.Id;
                objCustomDropDown.DropDownName = subIssueType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetServiceStatus")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetServiceStatus()
        {
            List<ServiceStatus> lstStatus = new List<ServiceStatus>();
            lstStatus = await _dbContext.ServiceStatus.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var status in lstStatus)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = status.Id;
                objCustomDropDown.DropDownName = status.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetStepTypes")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetStepTypes()
        {
            List<StepTypes> lstStepTypes = new List<StepTypes>();
            lstStepTypes = await _dbContext.StepTypes.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var stepTypes in lstStepTypes)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = stepTypes.Id;
                objCustomDropDown.DropDownName = stepTypes.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetServiceActionTypes")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetServiceActionTypes()
        {
            List<ServiceActionTypes> lstServiceActionTypes = new List<ServiceActionTypes>();
            lstServiceActionTypes = await _dbContext.ServiceActionTypes.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var stepTypes in lstServiceActionTypes)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = stepTypes.Id;
                objCustomDropDown.DropDownName = stepTypes.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetUserRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetUserRole()
        {
            List<UserRole> lstUserRole = new List<UserRole>();
            lstUserRole = await _dbContext.UserRole.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var userRole in lstUserRole)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = userRole.Id;
                objCustomDropDown.DropDownName = userRole.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetIndustryType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetIndustryType()
        {
            List<IndustryType> lstIndustryType = new List<IndustryType>();
            lstIndustryType = await _dbContext.IndustryType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var industryType in lstIndustryType)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = industryType.Id;
                objCustomDropDown.DropDownName = industryType.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetProvider")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProviderType>>> GetProvider()
        {
            List<ProviderType> listProvider = new List<ProviderType>();
            listProvider = await _dbContext.ProviderType.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var provider in listProvider)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = provider.Id;
                objCustomDropDown.DropDownName = provider.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetReason")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reason>>> GetReason()
        {
            List<Reason> listReason = new List<Reason>();
            listReason = await _dbContext.Reason.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var reason in listReason)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = reason.Id;
                objCustomDropDown.DropDownName = reason.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
       

        [Route("GetReferralDropdown")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReferralDropdown>>> GetReferralDropdown()
        {
            List<ReferralDropdown> listReferralDropdown = new List<ReferralDropdown>();
            listReferralDropdown = await _dbContext.ReferralDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var referralDropdown in listReferralDropdown)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = referralDropdown.Id;
                objCustomDropDown.DropDownName = referralDropdown.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetUOM")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetUOM()
        {
            List<Uom> lstUom = new List<Uom>();
            lstUom = await _dbContext.Uom.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var uom in lstUom)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = uom.Id;
                objCustomDropDown.DropDownName = uom.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetCustomer")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetCustomer()
        {
            List<CustomerDropdown> lstCustomer = new List<CustomerDropdown>();
            lstCustomer = await _dbContext.CustomerDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var customer in lstCustomer)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = customer.Id;
                objCustomDropDown.DropDownName = customer.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetPaymentTerms")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetPaymentTerms()
        {
            List<PaymentTermsDropdown> lstPaymentTerms = new List<PaymentTermsDropdown>();
            lstPaymentTerms = await _dbContext.PaymentTermsDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var paymentTerms in lstPaymentTerms)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = paymentTerms.Id;
                objCustomDropDown.DropDownName = paymentTerms.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetTypeOfSale")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetTypeOfSale()
        {
            List<TypeSaleDropdown> lstTypeOfSale = new List<TypeSaleDropdown>();
            lstTypeOfSale = await _dbContext.TypeSaleDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var typeOfSale in lstTypeOfSale)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = typeOfSale.Id;
                objCustomDropDown.DropDownName = typeOfSale.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetDiscount")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetDiscount()
        {
            List<DiscountDropdown> lstDiscount = new List<DiscountDropdown>();
            lstDiscount = await _dbContext.DiscountDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var discount in lstDiscount)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = discount.Id;
                objCustomDropDown.DropDownName = discount.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetCostCenter")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetCostCenter()
        {
            List<CostCenterDropdown> lstCostCenter = new List<CostCenterDropdown>();
            lstCostCenter = await _dbContext.CostCenterDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var costCenter in lstCostCenter)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = costCenter.Id;
                objCustomDropDown.DropDownName = costCenter.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetStatusDrop")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetStatusDrop()
        {
            List<StatusDropdown> lstStatus = new List<StatusDropdown>();
            lstStatus = await _dbContext.StatusDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var status in lstStatus)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = status.Id;
                objCustomDropDown.DropDownName = status.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetTax")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetTax()
        {
            List<TaxDropdown> lstTax = new List<TaxDropdown>();
            lstTax = await _dbContext.TaxDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var tax in lstTax)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = tax.Id;
                objCustomDropDown.DropDownName = tax.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }
        [Route("GetAssignedTo")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetAssignedTo()
        {
            List<AssignedToDropdown> lstAssignedTo = new List<AssignedToDropdown>();
            lstAssignedTo = await _dbContext.AssignedToDropdown.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var assignedTo in lstAssignedTo)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = assignedTo.Id;
                objCustomDropDown.DropDownName = assignedTo.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }

        [Route("GetUserGroups")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomDropDown>>> GetUserGroups()
        {
            List<UserGroups> lstUserGroups = new List<UserGroups>();
            lstUserGroups = await _dbContext.UserGroups.ToListAsync();
            List<CustomDropDown> lstCustomDropDown = new List<CustomDropDown>();
            foreach (var userGroups in lstUserGroups)
            {
                CustomDropDown objCustomDropDown = new CustomDropDown();
                objCustomDropDown.DropDownId = userGroups.UserGroupId;
                objCustomDropDown.DropDownName = userGroups.Name;
                lstCustomDropDown.Add(objCustomDropDown);
            }
            return Ok(lstCustomDropDown);
        }


        [Route("SaveUOM")]
        [HttpPost]
        public async Task<ActionResult<Uom>> SaveUOM(CustomDropDown customDropDown)
        {
            try
            {
                var uom = new Uom();
                uom.Name = customDropDown.DropDownName;
                _dbContext.Uom.Add(uom);
                await _dbContext.SaveChangesAsync();
                return Ok(uom);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveCustomer")]
        [HttpPost]
        public async Task<ActionResult<CustomerDropdown>> SaveCustomer(CustomDropDown customDropDown)
        {
            try
            {
                var customer = new CustomerDropdown();
                customer.Name = customDropDown.DropDownName;
                _dbContext.CustomerDropdown.Add(customer);
                await _dbContext.SaveChangesAsync();
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SavePaymentTerms")]
        [HttpPost]
        public async Task<ActionResult<PaymentTermsDropdown>> SavePaymentTerms(CustomDropDown customDropDown)
        {
            try
            {
                var paymentTerms = new PaymentTermsDropdown();
                paymentTerms.Name = customDropDown.DropDownName;
                _dbContext.PaymentTermsDropdown.Add(paymentTerms);
                await _dbContext.SaveChangesAsync();
                return Ok(paymentTerms);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveTypeOfSale")]
        [HttpPost]
        public async Task<ActionResult<PaymentTermsDropdown>> SaveTypeOfSale(CustomDropDown customDropDown)
        {
            try
            {
                var typeOfSale = new TypeSaleDropdown();
                typeOfSale.Name = customDropDown.DropDownName;
                _dbContext.TypeSaleDropdown.Add(typeOfSale);
                await _dbContext.SaveChangesAsync();
                return Ok(typeOfSale);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveUserGroups")]
        [HttpPost]
        public async Task<ActionResult<UserGroups>> SaveUserGroups(CustomDropDown customDropDown)
        {
            try
            {
                var userGroups = new UserGroups();
                userGroups.Name = customDropDown.DropDownName;
                _dbContext.UserGroups.Add(userGroups);
                await _dbContext.SaveChangesAsync();
                return Ok(userGroups);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [Route("SaveDiscount")]
        [HttpPost]
        public async Task<ActionResult<DiscountDropdown>> SaveDiscount(CustomDropDown customDropDown)
        {
            try
            {
                var discount = new DiscountDropdown();
                discount.Name = customDropDown.DropDownName;
                _dbContext.DiscountDropdown.Add(discount);
                await _dbContext.SaveChangesAsync();
                return Ok(discount);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveCostCenter")]
        [HttpPost]
        public async Task<ActionResult<DiscountDropdown>> SaveCostCenter(CustomDropDown customDropDown)
        {
            try
            {
                var costCenter = new CostCenterDropdown();
                costCenter.Name = customDropDown.DropDownName;
                _dbContext.CostCenterDropdown.Add(costCenter);
                await _dbContext.SaveChangesAsync();
                return Ok(costCenter);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveStatusDrop")]
        [HttpPost]
        public async Task<ActionResult<DiscountDropdown>> SaveStatusDrop(CustomDropDown customDropDown)
        {
            try
            {
                var status = new StatusDropdown();
                status.Name = customDropDown.DropDownName;
                _dbContext.StatusDropdown.Add(status);
                await _dbContext.SaveChangesAsync();
                return Ok(status);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveTax")]
        [HttpPost]
        public async Task<ActionResult<DiscountDropdown>> SaveTax(CustomDropDown customDropDown)
        {
            try
            {
                var tax = new TaxDropdown();
                tax.Name = customDropDown.DropDownName;
                _dbContext.TaxDropdown.Add(tax);
                await _dbContext.SaveChangesAsync();
                return Ok(tax);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
        [Route("SaveAssignedTo")]
        [HttpPost]
        public async Task<ActionResult<DiscountDropdown>> SaveAssignedTo(CustomDropDown customDropDown)
        {
            try
            {
                var assignedTo = new AssignedToDropdown();
                assignedTo.Name = customDropDown.DropDownName;
                _dbContext.AssignedToDropdown.Add(assignedTo);
                await _dbContext.SaveChangesAsync();
                return Ok(assignedTo);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }



    }
}
