
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactInfoController : ControllerBase
    {
        [Route("GetContactInfos")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetContactInfos(int entityType, int entityId, bool additionalInfo)
        {
            string apiPath = "ContactInfo/GetContactInfos?entityType=" + entityType + "&entityId=" + entityId + "&additionalInfo=" + additionalInfo;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformations = JsonConvert.DeserializeObject<IEnumerable<ContactInformation>>(content);
                return Ok(contactInformations);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetAllContactInfos")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetAllContactInfos()
        {
            string apiPath = "ContactInfo/GetAllContactInfos";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformations = JsonConvert.DeserializeObject<IEnumerable<ContactInformation>>(content);
                return Ok(contactInformations);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetAllContactTitle")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactTitle>>> GetAllContactTitle()
        {
            string apiPath = "ContactInfo/GetAllContactTitle";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactTitle = JsonConvert.DeserializeObject<IEnumerable<ContactTitle>>(content);
                return Ok(contactTitle);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetDealContacts")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DealContact>>> GetDealContacts(int entityId, int entityType)
        {
            string apiPath = "ContactInfo/GetDealContacts?entityId=" + entityId + "&entityType=" + entityType;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealContacts = JsonConvert.DeserializeObject<IEnumerable<DealContact>>(content);
                return Ok(dealContacts);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetContactNextStep")]
        [HttpGet]
        public async Task<ActionResult<DealContactNextStep>> GetContactNextStep(int nextStepId)
        {
            string apiPath = "ContactInfo/GetContactNextStep?nextStepId=" + nextStepId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealContacts = JsonConvert.DeserializeObject<DealContactNextStep>(content);
                return Ok(dealContacts);
            }
            else
            {
                return NoContent();
            }
        }
        //[Route("GetVendorContactSteps")]
        //[HttpGet]
        //public async Task<ActionResult<VendorContactNextStep>> GetVendorContactSteps(int nextStepId)
        //{
        //    string apiPath = "ContactInfo/GetVendorContactSteps?nextStepId=" + nextStepId;
        //    HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        var vContactSteps = JsonConvert.DeserializeObject<VendorContactNextStep>(content);
        //        return Ok(vContactSteps);
        //    }
        //    else
        //    {
        //        return NoContent();
        //    }
        //}
        [Route("GetAllDealContacts")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DealContact>>> GetAllDealContacts()
        {
            string apiPath = "ContactInfo/GetAllDealContacts";
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealContacts = JsonConvert.DeserializeObject<IEnumerable<DealContact>>(content);
                return Ok(dealContacts);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetLeadOpportunities")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deal>>> GetLeadOpportunities(int leadId)
        {
            string apiPath = "ContactInfo/GetLeadOpportunities?leadId=" + leadId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealContacts = JsonConvert.DeserializeObject<IEnumerable<Deal>>(content);
                return Ok(dealContacts);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetPartnerEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetPartnerEntity(int vendorId)
        {
            string apiPath = "ContactInfo/GetPartnerEntity?vendorId=" + vendorId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var vendorPartners = JsonConvert.DeserializeObject<IEnumerable<Partner>>(content);
                return Ok(vendorPartners);
            }
            else
            {
                return NoContent();
            }
        }



        [Route("GetEventPartnerEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetEventPartnerEntity(int eventId)
        {
            string apiPath = "ContactInfo/GetEventPartnerEntity?eventId=" + eventId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var eventPartners = JsonConvert.DeserializeObject<IEnumerable<Partner>>(content);
                return Ok(eventPartners);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("GetReferralNetworkEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralNetworkEntity(int networkingId)
        {
            string apiPath = "ContactInfo/GetReferralNetworkEntity?networkingId=" + networkingId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var networkReferrals = JsonConvert.DeserializeObject<IEnumerable<Referral>>(content);
                return Ok(networkReferrals);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetReferralEventEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Referral>>> GetReferralEventEntity(int eventId)
        {
            string apiPath = "ContactInfo/GetReferralEventEntity?eventId=" + eventId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var networkReferrals = JsonConvert.DeserializeObject<IEnumerable<Referral>>(content);
                return Ok(networkReferrals);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetNetworkEntity")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partner>>> GetNetworkEntity(int networkingId)
        {
            string apiPath = "ContactInfo/GetNetworkEntity?networkingId=" + networkingId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var networkPartners = JsonConvert.DeserializeObject<IEnumerable<Partner>>(content);
                return Ok(networkPartners);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("GetContactsByName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformation>>> GetContactsByName(string contactName)
        {
            string apiPath = "ContactInfo/GetContactsByName?contactName=" + contactName;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformations = JsonConvert.DeserializeObject<IEnumerable<ContactInformation>>(content);
                return Ok(contactInformations);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetContactById")]
        [HttpGet]
        public async Task<ActionResult<ContactInformation>> GetContactById(int contactId)
        {
            string apiPath = "ContactInfo/GetContactById?contactId=" + contactId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(content);
                return Ok(contactInformation);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("AddContactInfo")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> AddContactInfo(ContactInformation contactInfo)
        {
            string apiPath = "ContactInfo/AddContactInfo";
            HttpResponseMessage response = await DataManager.PostData(apiPath, contactInfo).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(content);
                return Ok(contactInformation);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("SaveSelectedContact")]
        [HttpPost]
        public async Task<ActionResult<ContactInformation>> SaveSelectedContact(SelectedContact contactInfo)
        {
            string apiPath = "ContactInfo/SaveSelectedContact";
            HttpResponseMessage response = await DataManager.PostData(apiPath, contactInfo).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(content);
                return Ok(contactInformation);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("UpdateDealContact")]
        [HttpPost]
        public async Task<ActionResult<DealContact>> UpdateDealContact(DealContact dealContact)
        {
            string apiPath = "ContactInfo/UpdateDealContact";
            HttpResponseMessage response = await DataManager.PostData(apiPath, dealContact).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealCont = JsonConvert.DeserializeObject<DealContact>(content);
                return Ok(dealCont);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("UpdateOppStepsSchedule/{id}")]
        [HttpPatch]
        public async Task<ActionResult<DealContact>> UpdateOppStepsSchedule(int id, [FromBody] EventSchedule eventSchedule)
        {
            try
            {
                string apiPath = string.Format("ContactInfo/UpdateOppStepsSchedule?id={0}", id);
                HttpResponseMessage response = await DataManager.PatchData(apiPath, eventSchedule).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    var data = JsonConvert.DeserializeObject<DealContact>(content);
                    return Ok(data);
                }
                else
                {
                    return Problem(response.ReasonPhrase, null, Convert.ToInt32(response.StatusCode));
                }
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, null, 1001);
            }
        }
        //[Route("UpdateVendorContact")]
        //[HttpPost]
        //public async Task<ActionResult<VendorContact>> UpdateVendorContact(VendorContact vendorContact)
        //{
        //    string apiPath = "ContactInfo/UpdateVendorContact";
        //    HttpResponseMessage response = await DataManager.PostData(apiPath, vendorContact).ConfigureAwait(false);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        var vendorCont = JsonConvert.DeserializeObject<VendorContact>(content);
        //        return Ok(vendorCont);
        //    }
        //    else
        //    {
        //        return NoContent();
        //    }
        //}
        [Route("UpdateDealContactNote")]
        [HttpGet]
        public async Task<ActionResult<DealContact>> UpdateDealContactNote(int dealContactId, string note)
        {
            string apiPath = "ContactInfo/UpdateDealContactNote?dealContactId=" + dealContactId + "&note=" + note;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealCont = JsonConvert.DeserializeObject<DealContact>(content);
                return Ok(dealCont);
            }
            else
            {
                return NoContent();
            }
        }
        //[Route("UpdateVendorContactNote")]
        //[HttpGet]
        //public async Task<ActionResult<VendorContact>> UpdateVendorContactNote(int vendorContactId, string note)
        //{
        //    string apiPath = "ContactInfo/UpdateVendorContactNote?vendorContactId=" + vendorContactId + "&note=" + note;
        //    HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        var vendorCont = JsonConvert.DeserializeObject<VendorContact>(content);
        //        return Ok(vendorCont);
        //    }
        //    else
        //    {
        //        return NoContent();
        //    }
        //}
        [Route("SaveDealContact")]
        [HttpPost]
        public async Task<ActionResult<DealContact>> SaveDealContact(DealContact dealContact)
        {
            string apiPath = "ContactInfo/SaveDealContact";
            HttpResponseMessage response = await DataManager.PostData(apiPath, dealContact).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealCont = JsonConvert.DeserializeObject<DealContact>(content);
                return Ok(dealCont);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("AddDealContactNextStep")]
        [HttpPost]
        public async Task<ActionResult<DealContactNextStep>> AddDealContactNextStep(DealContactNextStep dealContactNextStep, int dealContactId)
        {
            string apiPath = "ContactInfo/AddDealContactNextStep?dealContactId=" + dealContactId;
            HttpResponseMessage response = await DataManager.PostData(apiPath, dealContactNextStep).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var dealCont = JsonConvert.DeserializeObject<DealContactNextStep>(content);
                return Ok(dealCont);
            }
            else
            {
                return NoContent();
            }
        }
        //[Route("AddVendorContactNextStep")]
        //[HttpPost]
        //public async Task<ActionResult<VendorContactNextStep>> AddVendorContactNextStep(VendorContactNextStep vendorContactNextStep, int vendorContactId)
        //{
        //    string apiPath = "ContactInfo/AddVendorContactNextStep?vendorContactId=" + vendorContactId;
        //    HttpResponseMessage response = await DataManager.PostData(apiPath, vendorContactNextStep).ConfigureAwait(false);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
        //        var vendorCont = JsonConvert.DeserializeObject<VendorContactNextStep>(content);
        //        return Ok(vendorCont);
        //    }
        //    else
        //    {
        //        return NoContent();
        //    }
        //}
        [Route("SaveContactInfos")]
        [HttpPost]
        public async Task<ActionResult> SaveContactInfos(List<ContactInformation> contactInfos)
        {
            string apiPath = "ContactInfo/SaveContactInfos";
            HttpResponseMessage response = await DataManager.PostData(apiPath, contactInfos).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }
        [Route("UpdateContact")]
        [HttpPost]
        public async Task<ActionResult> UpdateContact(ContactInformation contactInfo)
        {
            string apiPath = "ContactInfo/UpdateContact";
            HttpResponseMessage response = await DataManager.PostData(apiPath, contactInfo).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contact = JsonConvert.DeserializeObject<ContactInformation>(content);
                return Ok(contact);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetODataContactInfo")]
        [HttpGet]
        public async Task<ActionResult> GetODataContactInfo()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataContactInfo" + urlParams;
            var response = await DataManager.GetOData(apiPath).ConfigureAwait(false);
            if (response.Success)
            {
                return Ok(response.Body);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("OdataVwContactInfo")]
        [HttpGet]
        public async Task<ActionResult> OdataVwContactInfo()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataVwContacts" + urlParams;
            var response = await DataManager.GetOData(apiPath).ConfigureAwait(false);
            if (response.Success)
            {
                return Ok(response.Body);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("OdataContactGroup")]
        [HttpGet]
        public async Task<ActionResult> OdataContactGroup()
        {
            string urlParams = Request.QueryString.HasValue ? Request.QueryString.Value : string.Empty;
            string apiPath = "odata/ODataContactGroup" + urlParams;
            var response = await DataManager.GetOData(apiPath).ConfigureAwait(false);
            if (response.Success)
            {
                return Ok(response.Body);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetGenderEntityType")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Gender>, IEnumerable<LeadGenEntityType>, IEnumerable<Category>, IEnumerable<CategoryValues>>>> GetGenderEntityType()
        {
            string apiPath = "ContactInfo/GetGenderEntityType";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInfoList = JsonConvert.DeserializeObject<Tuple<IEnumerable<Gender>, IEnumerable<LeadGenEntityType>, IEnumerable<Category>, IEnumerable<CategoryValues>>>(content);
                return Ok(contactInfoList);
            }
            else
            {
                return NoContent();
            }
        }


        [Route("GetIndustryEntityType")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<IndustryType>, IEnumerable<LeadOriginType>>>> GetIndustryEntityType()
        {
            string apiPath = "ContactInfo/GetIndustryEntityType";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var industryList = JsonConvert.DeserializeObject<Tuple<IEnumerable<IndustryType>, IEnumerable<LeadOriginType>>>(content);
                return Ok(industryList);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetToDoStatus")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Users>, IEnumerable<CompletedStatus>>>> GetToDoStatus()
        {
            string apiPath = "ContactInfo/GetToDoStatus";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var lstToDoStatus = JsonConvert.DeserializeObject<Tuple<IEnumerable<Users>, IEnumerable<CompletedStatus>>>(content);
                return Ok(lstToDoStatus);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetQuoteName")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<CustomerDropdown>, IEnumerable<StatusDropdown>>>> GetQuoteName()
        {
            string apiPath = "ContactInfo/GetQuoteName";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var lstQuoteName = JsonConvert.DeserializeObject<Tuple<IEnumerable<CustomerDropdown>, IEnumerable<StatusDropdown>>>(content);
                return Ok(lstQuoteName);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetUOMName")]
        [HttpGet]
        public async Task<ActionResult<Tuple<IEnumerable<Uom>>>> GetUOMName()
        {
            string apiPath = "ContactInfo/GetUOMName";
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var lstUom = JsonConvert.DeserializeObject<Tuple<IEnumerable<Uom>>>(content);
                return Ok(lstUom);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("SaveOrUpdateGroup")]
        [HttpPost]
        public async Task<ActionResult<ContactGroupModel>> SaveOrUpdateGroup(ContactGroupModel contactGroupModel)
        {
            string apiPath = "ContactInfo/SaveOrUpdateGroup";
            var response = await DataManager.PostData(apiPath, contactGroupModel).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<ContactGroupModel>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetContactGroups")]
        [HttpGet]
        public async Task<ActionResult<List<ContactInformation>>> GetContactGroups(int groupId)
        {
            string apiPath = "ContactInfo/GetContactGroups?groupId=" + groupId;
            var response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var result = JsonConvert.DeserializeObject<List<ContactInformation>>(content);
                return Ok(result);
            }
            else
            {
                return NoContent();
            }
        }

        [Route("SaveContactInfoEmail")]
        [HttpPost]
        public async Task<ActionResult> SaveContactInfoEmail(List<ContactInformationEmailMapping> contactInformationEmailMappings)
        {
            string apiPath = "ContactInfo/SaveContactInfoEmail";
            HttpResponseMessage response = await DataManager.PostData(apiPath, contactInformationEmailMappings).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }

        [Route("GetContactInfoEmail")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactInformationEmailMapping>>> GetContactInfoEmail(int id)
        {
            string apiPath = "ContactInfo/GetContactInfoEmail?id=" + id;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var contactInfoEmail = JsonConvert.DeserializeObject<IEnumerable<ContactInformationEmailMapping>>(content);
                return Ok(contactInfoEmail);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetEntityByOrigin")]
        [HttpGet]
        public async Task<IActionResult> GetEntityByOrigin(int originId)
        {
            string apiPath = "ContactInfo/GetEntityByOrigin?originId=" + originId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var entityOrigin = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(entityOrigin);
            }
            else
            {
                return NoContent();
            }
        }
        [Route("GetAffiliateName")]
        [HttpGet]
        public async Task<IActionResult> GetAffiliateName(int type, int entityId)
        {
            string apiPath = "ContactInfo/GetAffiliateName?type=" + type + "&entityId=" + entityId;
            HttpResponseMessage response = await DataManager.GetData(apiPath).ConfigureAwait(false);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                var entityData = JsonConvert.DeserializeObject<dynamic>(content);
                return Ok(entityData);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
