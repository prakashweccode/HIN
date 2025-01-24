using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HIN_API.Helpers
{
    public class K9ErpSyncHelper
    {

        public static TenantContext _context;

        public K9ErpSyncHelper(TenantContext context)
        {
            _context = context;
        }

        public async Task<messageResult> syncData(int K9LeadEntityId, K9ErpEntityDocSync k9ErpMappingData, string requestType, string apiUrl, Newtonsoft.Json.Linq.JObject customer, int entityType)
        {
            var result = await post(customer, apiUrl, requestType);

            if (!result.error)
            {
                if (result.data != null)
                {
                    var k9ErpObject = Newtonsoft.Json.Linq.JObject.Parse(result.data.ToString());

                    if (k9ErpMappingData == null)
                    {
                        var K9ErpEntityDocSync = new K9ErpEntityDocSync()
                        {
                            K9erpId = Convert.ToInt32(k9ErpObject["id"]),
                            K9leadId = K9LeadEntityId,
                            Type = entityType,
                            Category = "Entity",
                            Status = entityType == 1 ? Convert.ToInt32(k9ErpObject["status"]) : 0
                        };
                        _context.K9ErpEntityDocSync.Add(K9ErpEntityDocSync);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(Convert.ToString(k9ErpObject["status"])))
                        {
                            k9ErpMappingData.Status = Convert.ToInt32(k9ErpObject["status"]);
                            await _context.SaveChangesAsync();
                        }
                    }
                }

            }

            return result;
        }

        public async Task<messageResult> post(JObject data, string requestUrl, string requestType, int entityType = 0, bool getList = false)
        {
            messageResult result = new messageResult();

            var authorizationHeader = await getK9ERPToken();

            if (!authorizationHeader.error)
            {
                var authorizationValue = authorizationHeader.data.ToString();

                var serializedData = JsonConvert.SerializeObject(data);
                var httpcontent = new StringContent(serializedData, Encoding.UTF8, "application/json");

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Authorization", "Bearer " + authorizationValue);
                    HttpResponseMessage response = null;
                    var company = getProperty("K9ERP_URL");
                    string apiUrl = company + requestUrl;
                    try
                    {
                        switch (requestType)
                        {
                            case "POST":
                                response = await client.PostAsync(apiUrl, httpcontent);
                                break;
                            case "PUT":
                                apiUrl = apiUrl + "/" + data["id"];
                                response = await client.PutAsync(apiUrl, httpcontent);
                                break;
                            case "GET":
                                response = await client.GetAsync(apiUrl);
                                break;
                        }

                        if (!response.IsSuccessStatusCode)
                        {
                            result.error = true;
                            result.errorValue = 2;
                            result.description = "";
                        }
                        else
                        {
                            var resultString = await response.Content.ReadAsStringAsync();
                            switch (requestType)
                            {
                                case "POST":
                                case "PUT":
                                    result = JsonConvert.DeserializeObject<messageResult>(resultString);
                                    break;
                                case "GET":
                                    if (getList)
                                    {
                                        result.data = JsonConvert.DeserializeObject<JArray>(resultString);
                                    }
                                    else if (entityType == Convert.ToInt32(LeadGenType.Contact))
                                    {
                                        result.data = JsonConvert.DeserializeObject<JObject>(resultString);
                                    }
                                    else
                                        result.data = JsonConvert.DeserializeObject<JArray>(resultString)[0];
                                    break;
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        result.error = true;
                        result.errorValue = 2;
                        result.description = ex.Message;
                    }
                }
            }

            return result;
        }

        private async Task<messageResult> getK9ERPToken()
        {
            messageResult result = new messageResult();

            var authToken = _context.Config.Where(x => x.Name == "K9ERP_authToken").FirstOrDefault();
            var authTokenExpiry = _context.Config.Where(x => x.Name == "K9ERP_authToken_ExpiryTime").FirstOrDefault();
            if (authTokenExpiry != null)
            {
                authToken.Value = string.Empty;
            }

            if (string.IsNullOrEmpty(authToken.Value))
            {
                var data = "grant_type=password&username=" + getProperty("K9ERP_userName") + "&password=" + getProperty("K9ERP_password");
                var httpcontent = new StringContent(data, Encoding.UTF8, "application/x-www-form-urlencoded");

                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = null;
                    var company = getProperty("K9ERP_URL");
                    string apiUrl = company + "token";
                    try
                    {
                        response = await client.PostAsync(apiUrl, httpcontent);

                        if (!response.IsSuccessStatusCode)
                        {
                            result.error = true;
                            result.errorValue = 2;
                            result.description = "";
                        }
                        else
                        {
                            var resultString = await response.Content.ReadAsStringAsync();
                            var access_token = JObject.Parse(resultString.ToString())["access_token"];
                            authToken.Value = Convert.ToString(access_token);

                            result.data = access_token;
                        }
                    }
                    catch (Exception ex)
                    {
                        result.error = true;
                        result.errorValue = 2;
                        result.description = ex.Message;
                    }
                }
                //_context.Entry(authToken).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                //await _context.SaveChangesAsync();
                _context.Config.Update(authToken);
            }
            return result;


        }

        private static string getProperty(string property)
        {
            var value = string.Empty;
            try
            {
                value = _context.Config.Where(x => x.Name == property).FirstOrDefault().Value;
            }
            catch (Exception e)
            {
                return string.Empty;
            }
            return value;
        }

        public static JObject createK9ERPCustomer(Lead lead, K9ErpEntityDocSync mappingData, JObject customer)
        {
            customer["id"] = mappingData == null ? 0 : mappingData.K9erpId;
            customer["status"] = mappingData == null ? 1 : customer["status"];
            customer["name"] = lead.LeadName;
            customer["address1"] = lead.Address;
            customer["city"] = lead.City;
            customer["state"] = lead.State;
            customer["country"] = lead.Country;
            customer["zip"] = lead.ZipCode;
            customer["webSite"] = lead.Website;
            customer["phone"] = lead.LeadPhoneNumber == null || lead.LeadPhoneNumber.Count == 0 ? null : lead.LeadPhoneNumber.FirstOrDefault().PhoneNumber;
            customer["email"] = lead.LeadEmail == null || lead.LeadEmail.Count == 0 ? null : lead.LeadEmail.FirstOrDefault().Email;

            return customer;
        }

        public async Task<messageResult> IntegrateK9ErpCustomer(Lead lead)
        {
            var result = new messageResult();
            try
            {
                var k9ErpMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == lead.LeadId && x.Type == Convert.ToInt32(LeadGenType.Lead)).FirstOrDefault();
                var k9ErpId = k9ErpMappingData == null ? 0 : k9ErpMappingData.K9erpId;
                var requestType = k9ErpMappingData == null ? "POST" : "PUT";

                JObject customer = new JObject();
                if (requestType == "PUT")
                {
                    var url = "api/customers/getCustomerSearch?id=" + k9ErpMappingData.K9erpId;
                    var searchData = await post(new JObject(), url, "GET");
                    customer = (JObject)searchData.data;
                }

                var apiUrl = _context.Config.Where(x => x.Name == "K9ERP_SyncCustomer").FirstOrDefault().Value;

                customer = createK9ERPCustomer(lead, k9ErpMappingData, customer);
                result = await syncData(lead.LeadId, k9ErpMappingData, requestType, apiUrl, customer, Convert.ToInt32(LeadGenType.Lead));
            }
            catch (Exception ex)
            {
                result.error = true;
                result.errorValue = 2;
                result.description = ex.Message;
            }

            return result;
        }

        internal static Lead mapK9CustToLead(JObject customer, Lead lead)
        {
            lead.LeadName = Convert.ToString(customer["name"]);
            lead.Address = string.Concat(Convert.ToString(customer["address1"]), ' ', Convert.ToString(customer["address2"]));
            lead.City = Convert.ToString(customer["city"]);
            lead.State = Convert.ToString(customer["state"]);
            lead.Country = Convert.ToString(customer["country"]);
            lead.ZipCode = Convert.ToString(customer["zip"]);
            lead.Website = Convert.ToString(customer["webSite"]);
            lead.LeadPhoneNumber.First().PhoneNumber = Convert.ToString(customer["phone"]);
            lead.LeadEmail.First().Email = Convert.ToString(customer["email"]);
            return lead;
        }
        public static JObject createK9ERPVendor(Vendor vendor, K9ErpEntityDocSync mappingData, JObject k9ErpVendor)
        {
            k9ErpVendor["id"] = mappingData == null ? 0 : mappingData.K9erpId;
            k9ErpVendor["code"] = vendor.VendorNumber;
            k9ErpVendor["name"] = vendor.Name;
            k9ErpVendor["webSite"] = vendor.Website;
            k9ErpVendor["address1"] = vendor.Address;
            k9ErpVendor["city"] = vendor.City;
            k9ErpVendor["state"] = vendor.State;
            k9ErpVendor["zip"] = vendor.ZipCode;
            k9ErpVendor["country"] = vendor.Country;

            //customer.status = 1;
            //customer.paymentTerms = 24;

            return k9ErpVendor;
        }

        internal static Vendor mapK9VendorToK9LeadVendor(JObject vendor, Vendor K9LeadVendor)
        {
            K9LeadVendor.VendorNumber = Convert.ToString(vendor["code"]);
            K9LeadVendor.Name = Convert.ToString(vendor["name"]);
            K9LeadVendor.Address = string.Concat(Convert.ToString(vendor["address1"]), ' ', Convert.ToString(vendor["address2"]));
            K9LeadVendor.City = Convert.ToString(vendor["city"]);
            K9LeadVendor.State = Convert.ToString(vendor["state"]);
            K9LeadVendor.Country = Convert.ToString(vendor["country"]);
            K9LeadVendor.ZipCode = Convert.ToString(vendor["zip"]);
            K9LeadVendor.Website = Convert.ToString(vendor["webSite"]);

            return K9LeadVendor;
        }
        public async Task<messageResult> IntegrateK9ErpVendor(Vendor vendor)
        {
            var result = new messageResult();
            try
            {
                var k9ErpMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == vendor.VendorId && x.Type == Convert.ToInt32(LeadGenType.Vendor)).FirstOrDefault();
                var k9ErpId = k9ErpMappingData == null ? 0 : k9ErpMappingData.K9erpId;
                var requestType = k9ErpMappingData == null ? "POST" : "PUT";

                JObject k9ErpVendor = new JObject();
                if (requestType == "PUT")
                {
                    var url = "api/vendors?id=" + k9ErpMappingData.K9erpId;
                    var searchData = await post(new JObject(), url, "GET");
                    k9ErpVendor = (JObject)searchData.data;
                }

                var apiUrl = _context.Config.Where(x => x.Name == "K9ERP_SyncVendor").FirstOrDefault().Value;
                //var K9ErpSyncHelper = new K9ErpSyncHelper(_context);

                k9ErpVendor = createK9ERPVendor(vendor, k9ErpMappingData, k9ErpVendor);
                result = await syncData(vendor.VendorId, k9ErpMappingData, requestType, apiUrl, k9ErpVendor, Convert.ToInt32(LeadGenType.Vendor));
            }
            catch (Exception ex)
            {
                result.error = true;
                result.errorValue = 2;
                result.description = ex.Message;
            }

            return result;
        }

        public static JObject createK9ERPPartner(Partner partner, K9ErpEntityDocSync mappingData, JObject k9ErpPartner)
        {
            k9ErpPartner["id"] = mappingData == null ? 0 : mappingData.K9erpId;
            k9ErpPartner["code"] = partner.PartnerNumber;
            k9ErpPartner["name"] = partner.Name;
            k9ErpPartner["webSite"] = partner.Website;
            k9ErpPartner["address1"] = partner.Address;
            k9ErpPartner["city"] = partner.City;
            k9ErpPartner["state"] = partner.State;
            k9ErpPartner["zip"] = partner.ZipCode;
            k9ErpPartner["country"] = partner.Country;

            //customer.status = 1;
            //customer.paymentTerms = 24;

            return k9ErpPartner;
        }

        internal static Partner mapK9VendorToK9LeadPartner(JObject partner, Partner K9LeadPartner)
        {
            K9LeadPartner.PartnerNumber = Convert.ToString(partner["code"]);
            K9LeadPartner.Name = Convert.ToString(partner["name"]);
            K9LeadPartner.Address = string.Concat(Convert.ToString(partner["address1"]), ' ', Convert.ToString(partner["address2"]));
            K9LeadPartner.City = Convert.ToString(partner["city"]);
            K9LeadPartner.State = Convert.ToString(partner["state"]);
            K9LeadPartner.Country = Convert.ToString(partner["country"]);
            K9LeadPartner.ZipCode = Convert.ToString(partner["zip"]);
            K9LeadPartner.Website = Convert.ToString(partner["webSite"]);

            return K9LeadPartner;
        }

        public async Task<messageResult> IntegrateK9ErpPartner(Partner partner)
        {
            var result = new messageResult();
            try
            {
                var k9ErpMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == partner.PartnerId && x.Type == Convert.ToInt32(LeadGenType.Partner)).FirstOrDefault();
                var k9ErpId = k9ErpMappingData == null ? 0 : k9ErpMappingData.K9erpId;
                var requestType = k9ErpMappingData == null ? "POST" : "PUT";

                JObject k9ErpPartner = new JObject();
                if (requestType == "PUT")
                {
                    var url = "api/vendors?id=" + k9ErpMappingData.K9erpId;
                    var searchData = await post(new JObject(), url, "GET");
                    k9ErpPartner = (JObject)searchData.data;
                }

                var apiUrl = _context.Config.Where(x => x.Name == "K9ERP_SyncVendor").FirstOrDefault().Value;
                //var K9ErpSyncHelper = new K9ErpSyncHelper(_context);

                k9ErpPartner = createK9ERPPartner(partner, k9ErpMappingData, k9ErpPartner);
                result = await syncData(partner.PartnerId, k9ErpMappingData, requestType, apiUrl, k9ErpPartner, Convert.ToInt32(LeadGenType.Partner));
            }
            catch (Exception ex)
            {
                result.error = true;
                result.errorValue = 2;
                result.description = ex.Message;
            }

            return result;
        }


        public static JObject createK9ERPReferral(Referral referral, K9ErpEntityDocSync mappingData, JObject k9ErpReferral)
        {
            k9ErpReferral["id"] = mappingData == null ? 0 : mappingData.K9erpId;
            k9ErpReferral["code"] = referral.ReferralNumber;
            k9ErpReferral["name"] = referral.Name;
            k9ErpReferral["webSite"] = referral.Website;
            k9ErpReferral["address1"] = referral.Address;
            k9ErpReferral["city"] = referral.City;
            k9ErpReferral["state"] = referral.State;
            k9ErpReferral["zip"] = referral.ZipCode;
            k9ErpReferral["country"] = referral.Country;

            //customer.status = 1;
            //customer.paymentTerms = 24;

            return k9ErpReferral;
        }
        internal static Referral mapK9VendorToK9LeadReferral(JObject referral, Referral K9LeadReferral)
        {
            K9LeadReferral.ReferralNumber = Convert.ToString(referral["code"]);
            K9LeadReferral.Name = Convert.ToString(referral["name"]);
            K9LeadReferral.Address = string.Concat(Convert.ToString(referral["address1"]), ' ', Convert.ToString(referral["address2"]));
            K9LeadReferral.City = Convert.ToString(referral["city"]);
            K9LeadReferral.State = Convert.ToString(referral["state"]);
            K9LeadReferral.Country = Convert.ToString(referral["country"]);
            K9LeadReferral.ZipCode = Convert.ToString(referral["zip"]);
            K9LeadReferral.Website = Convert.ToString(referral["webSite"]);

            return K9LeadReferral;
        }
        public async Task<messageResult> IntegrateK9ErpReferral(Referral referral)
        {
            var result = new messageResult();
            try
            {
                var k9ErpMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == referral.ReferralId && x.Type == Convert.ToInt32(LeadGenType.Referral)).FirstOrDefault();
                var k9ErpId = k9ErpMappingData == null ? 0 : k9ErpMappingData.K9erpId;
                var requestType = k9ErpMappingData == null ? "POST" : "PUT";

                JObject k9ErpReferral = new JObject();
                if (requestType == "PUT")
                {
                    var url = "api/referrals?id=" + k9ErpMappingData.K9erpId;
                    var searchData = await post(new JObject(), url, "GET");
                    k9ErpReferral = (JObject)searchData.data;
                }

                var apiUrl = _context.Config.Where(x => x.Name == "K9ERP_SyncReferral").FirstOrDefault().Value;
                //var K9ErpSyncHelper = new K9ErpSyncHelper(_context);

                k9ErpReferral = createK9ERPReferral(referral, k9ErpMappingData, k9ErpReferral);
                result = await syncData(referral.ReferralId, k9ErpMappingData, requestType, apiUrl, k9ErpReferral, Convert.ToInt32(LeadGenType.Referral));
            }
            catch (Exception ex)
            {
                result.error = true;
                result.errorValue = 2;
                result.description = ex.Message;
            }

            return result;
        }

        public static JObject createK9ERPContact(ContactInformation contactInfo, K9ErpEntityDocSync mappingData, JObject k9ErpContact)
        {
            k9ErpContact["id"] = mappingData == null ? 0 : mappingData.K9erpId;
            k9ErpContact["firstName"] = contactInfo.FirstName;
            k9ErpContact["lastName"] = contactInfo.LastName;
            k9ErpContact["inactive"] = contactInfo.Inactive == null ? false : contactInfo.Inactive;
            k9ErpContact["jobTitle"] = contactInfo.ContactTitle;
            k9ErpContact["phone"] = contactInfo.OfficeNumber;
            k9ErpContact["phoneExt"] = contactInfo.Extension;
            k9ErpContact["fax"] = contactInfo.FaxNumber;
            k9ErpContact["cell"] = contactInfo.CellNumber;
            k9ErpContact["email"] = contactInfo.Email;
            return k9ErpContact;
        }

        public async Task<messageResult> IntegrateK9ErpContact(ContactInformation contactInfo)
        {
            var result = new messageResult();
            //var K9ErpSyncHelper = new K9ErpSyncHelper(_context);
            try
            {
                var configName = string.Empty;
                var existDataUrl = string.Empty;
                var contactCodeUrl = string.Empty;
                var k9ErpEntityId = 0;
                var k9ErpParentMappingData = new K9ErpEntityDocSync();
                var messageResult = new messageResult();

                var k9ErpMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == contactInfo.Id && x.Type == Convert.ToInt32(LeadGenType.Contact)).FirstOrDefault();
                var k9ErpId = k9ErpMappingData == null ? 0 : k9ErpMappingData.K9erpId;
                var requestType = k9ErpMappingData == null ? "POST" : "PUT";

                JObject k9ErpContact = new JObject();

                if (contactInfo.Type == Convert.ToInt32(LeadGenType.Lead))
                {
                    var lead = _context.Lead.FirstOrDefault(x => x.LeadId == contactInfo.EntityId);
                    messageResult = await IntegrateK9ErpCustomer(lead);
                    k9ErpParentMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == contactInfo.EntityId && x.Type == contactInfo.Type).FirstOrDefault();
                    k9ErpContact["customer"] = k9ErpParentMappingData.K9erpId;

                    configName = "K9ERP_SyncCustomerContact";
                    existDataUrl = "api/customersContacts?id=";
                    contactCodeUrl = "api/customersContacts/getCustContactByCust?customer=";
                }
                else if (contactInfo.Type == Convert.ToInt32(LeadGenType.Vendor))
                {
                    var vendor = _context.Vendor.FirstOrDefault(x => x.VendorId == contactInfo.EntityId);
                    messageResult = await IntegrateK9ErpVendor(vendor);
                    k9ErpParentMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9leadId == contactInfo.EntityId && x.Type == contactInfo.Type).FirstOrDefault();
                    k9ErpContact["vendor"] = k9ErpParentMappingData.K9erpId;

                    configName = "K9ERP_SyncVendorContact";
                    existDataUrl = "api/vendorsContacts?id=";
                    contactCodeUrl = "api/vendorsContacts/getVendContactByVend?vendor=";
                }

                if (requestType == "PUT")
                {
                    var url = existDataUrl + k9ErpMappingData.K9erpId;
                    var searchData = await post(new JObject(), url, "GET", Convert.ToInt32(LeadGenType.Contact));
                    k9ErpContact = (JObject)searchData.data;
                }

                k9ErpContact = createK9ERPContact(contactInfo, k9ErpMappingData, k9ErpContact);


                if (string.IsNullOrEmpty(Convert.ToString(k9ErpContact["code"])))
                {
                    var url = contactCodeUrl + k9ErpParentMappingData.K9erpId;
                    var searchData = await post(new JObject(), url, "GET", Convert.ToInt32(LeadGenType.Contact), getList: true);
                    var k9ErpContactListByEntity = (JArray)searchData.data;
                    var contactCode = genetateContactCode(k9ErpContactListByEntity, Convert.ToInt32(contactInfo.Type));
                    k9ErpContact["code"] = contactCode;
                }



                var apiUrl = _context.Config.Where(x => x.Name == configName).FirstOrDefault().Value;
                result = await syncData(contactInfo.Id, k9ErpMappingData, requestType, apiUrl, k9ErpContact, Convert.ToInt32(LeadGenType.Contact));
            }
            catch (Exception ex)
            {
                result.error = true;
                result.errorValue = 2;
                result.description = ex.Message;
            }

            return result;
        }

        private string genetateContactCode(JArray k9ErpContactListByEntity, int type)
        {
            string contactCode = string.Empty;
            if (string.IsNullOrEmpty(contactCode))
            {
                int incrementValue = 1;

                if (k9ErpContactListByEntity != null && k9ErpContactListByEntity.Count > 0)
                {
                    List<int> ids = new List<int>();
                    var splittedString = "";
                    foreach (JObject cc in k9ErpContactListByEntity)
                    {
                        if (Convert.ToString(cc["code"]).Contains('-'))
                        {
                            splittedString = Convert.ToString(cc["code"]).ToString().Split('-')[1];
                            ids.Add(Convert.ToInt32(splittedString));
                        }
                    }

                    if (ids.Count > 0)
                    {
                        incrementValue = ids.Max() + incrementValue;
                    }
                }

                if (type == Convert.ToInt32(LeadGenType.Lead))
                    contactCode = "CC-" + incrementValue.ToString();
                else if (type == Convert.ToInt32(LeadGenType.Vendor))
                    contactCode = "VC-" + incrementValue.ToString();
            }
            return contactCode;
        }

        internal static ContactInformation mapK9VendorToK9LeadContact(JObject contactInfo, ContactInformation K9LeadContact)
        {
            K9LeadContact.ContactName = string.Concat(Convert.ToString(contactInfo["firstName"]), ' ', Convert.ToString(contactInfo["lastName"]));
            K9LeadContact.OfficeNumber = Convert.ToString(contactInfo["phone"]);
            K9LeadContact.Extension = Convert.ToString(contactInfo["phoneExt"]);
            K9LeadContact.FaxNumber = Convert.ToString(contactInfo["fax"]);
            K9LeadContact.CellNumber = Convert.ToString(contactInfo["cell"]);
            K9LeadContact.Email = Convert.ToString(contactInfo["email"]);
            K9LeadContact.Type = Convert.ToInt32(contactInfo["entityType"]) == 5 ? Convert.ToInt32(LeadGenType.Lead) : Convert.ToInt32(LeadGenType.Vendor);
            var k9ErpEntityId = K9LeadContact.Type == Convert.ToInt32(LeadGenType.Contact) ? Convert.ToInt32(contactInfo["customer"]) : Convert.ToInt32(contactInfo["vendor"]);

            var K9SyncMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9erpId == k9ErpEntityId && x.Type == K9LeadContact.Type).FirstOrDefault();
            K9LeadContact.EntityId = K9SyncMappingData.K9leadId;


            return K9LeadContact;
        }

    }
}
