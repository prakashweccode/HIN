using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Helpers;
using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Math.EC.Rfc7748;

namespace HIN_API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class K9ErpSyncController : ControllerBase
    {
        private readonly TenantContext _context;
        public K9ErpSyncController(TenantContext context)
        {
            _context = context;
        }

        [Route("api/K9ErpSyncController/K9ErpToLeadCustomer")]
        [HttpPost]
        public async Task<ActionResult<messageResult>> K9ErpToLeadCustomer(JObject customer)
        {
            var messageResult = new messageResult();
            try
            {
                var k9MappingData = _context.K9ErpEntityDocSync.Where(x => x.K9erpId == Convert.ToInt32(customer["id"]) && x.Type == Convert.ToInt32(LeadGenType.Lead)).FirstOrDefault();
                if (k9MappingData != null)
                {
                    var lead = _context.Lead.Where(x => x.LeadId == k9MappingData.K9leadId).FirstOrDefault();
                    updateLead(lead, customer);
                    var leadController = new LeadsController(_context);
                    var result = await leadController.PostLeads(lead, true);
                }
                else
                {
                    messageResult.error = true;
                    messageResult.errorValue = 2;
                    messageResult.description = "Data doesn't exist";
                }
            }
            catch (Exception ex)
            {
                messageResult.error = true;
                messageResult.errorValue = 2;
                messageResult.description = ex.Message;
            }

            return messageResult;
        }

        [HttpGet]
        [Route("api/K9ErpSyncController/GetK9ErpCustomerBySearch")]
        public async Task<List<Lead>> GetK9ErpCustomerBySearch(string searchText)
        {
            JArray customer = new JArray();
            var url = "api/customers/GetK9LeadByCodeName?searchText=" + searchText;
            var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
            var searchData = await k9ErpSyncHelper.post(new JObject(), url, "GET", getList: true);
            if (!searchData.error)
            {
                customer = (JArray)searchData.data;
            }

            var leadList = customer.ToObject<List<Lead>>();
            return leadList;
        }

        private void updateLead(Lead lead, JObject customer)
        {
            lead.LeadName = Convert.ToString(customer["name"]);
            lead.Address = Convert.ToString(customer["address1"]);
            lead.City = Convert.ToString(customer["city"]);
            lead.State = Convert.ToString(customer["state"]);
            lead.Country = Convert.ToString(customer["country"]);
            lead.ZipCode = Convert.ToString(customer["zip"]);
            lead.Website = Convert.ToString(customer["webSite"]);
            //lead.LeadPhoneNumber = Convert.ToString(customer["phone"]);
            //lead.LeadName = Convert.ToString(customer["email"]);
        }

        [Route("api/K9ErpSyncController/K9ErpToLeadVendor")]
        [HttpPost]
        public async Task<ActionResult<messageResult>> K9ErpToLeadVendor(JObject data)
        {
            var messageResult = new messageResult();
            try
            {
                var k9MappingData = _context.K9ErpEntityDocSync.Where(x => x.K9erpId == Convert.ToInt32(data["id"]) && x.Type == Convert.ToInt32(LeadGenType.Vendor)).FirstOrDefault();
                if (k9MappingData != null)
                {
                    var vendor = _context.Vendor.Where(x => x.VendorId == k9MappingData.K9leadId).FirstOrDefault();
                    updateVendor(vendor, data);
                    var vendorController = new VendorController(_context);
                    var result = await vendorController.SaveVendor(vendor, true);
                }
                else
                {
                    messageResult.error = true;
                    messageResult.errorValue = 2;
                    messageResult.description = "Data doesn't exist";
                }
            }
            catch (Exception ex)
            {
                messageResult.error = true;
                messageResult.errorValue = 2;
                messageResult.description = ex.Message;
            }

            return messageResult;
        }

        private void updateVendor(Vendor vendor, JObject data)
        {
            vendor.VendorNumber = Convert.ToString(data["code"]);
            vendor.Name = Convert.ToString(data["name"]);
            vendor.Address = string.Concat(Convert.ToString(data["address1"]), ' ', Convert.ToString(data["address2"]));
            vendor.City = Convert.ToString(data["city"]);
            vendor.State = Convert.ToString(data["state"]);
            vendor.Country = Convert.ToString(data["country"]);
            vendor.ZipCode = Convert.ToString(data["zip"]);
            vendor.Website = Convert.ToString(data["webSite"]);
        }

        [HttpGet]
        [Route("api/K9ErpSyncController/getK9ErpVendorBySearch")]
        public async Task<List<Vendor>> getK9ErpVendorBySearch(string searchText)
        {
            JArray K9Erpvendor = new JArray();
            var url = "api/vendors/GetK9LeadVendorByCodeName?searchText=" + searchText;
            var k9ErpSyncHelper = new K9ErpSyncHelper(_context);
            var searchData = await k9ErpSyncHelper.post(new JObject(), url, "GET", getList: true);
            if (!searchData.error)
            {
                K9Erpvendor = (JArray)searchData.data;
            }
            var leadVendor = K9Erpvendor.ToObject<List<Vendor>>();
            return leadVendor;
        }

        [Route("api/K9ErpSyncController/K9ErpToLeadCusContact")]
        [HttpPost]
        public async Task<ActionResult<messageResult>> K9ErpToLeadCusContact(JObject data)
        {
            var messageResult = new messageResult();
            try
            {
                var contactInfoController = new ContactInfoController(_context);
                var contactInfo = new ContactInformation();

                var k9MappingData = _context.K9ErpEntityDocSync.Where(x => x.K9erpId == Convert.ToInt32(data["id"]) && x.Type == Convert.ToInt32(LeadGenType.Contact)).FirstOrDefault();
                if (k9MappingData != null)
                {
                    contactInfo = _context.ContactInformation.Where(x => x.Id == k9MappingData.K9leadId).FirstOrDefault();
                    updateContactInfo(contactInfo, data);
                    var result = await contactInfoController.UpdateContact(contactInfo, true);
                    return messageResult;
                }
                var k9ParentMappingData = new K9ErpEntityDocSync();
                k9ParentMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9erpId == Convert.ToInt32(data["customer"]) && x.Type == Convert.ToInt32(LeadGenType.Lead)).FirstOrDefault();
                if (k9ParentMappingData != null)
                {
                    contactInfo.EntityId = k9ParentMappingData.K9leadId;
                    contactInfo.Type = Convert.ToInt32(LeadGenType.Lead);
                    updateContactInfo(contactInfo, data);
                    var result = await contactInfoController.AddContactInfo(contactInfo, true);

                    if (((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).StatusCode == 200)
                    {
                        contactInfo = (ContactInformation)((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value;
                        k9MappingData = new K9ErpEntityDocSync()
                        {
                            K9erpId = Convert.ToInt32(data["id"]),
                            K9leadId = contactInfo.Id,
                            Type = Convert.ToInt32(contactInfo.Type),
                            Category = "Contact"
                        };
                        _context.K9ErpEntityDocSync.Add(k9MappingData);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        messageResult.error = true;
                        messageResult.errorValue = 2;
                        messageResult.description = "Error";
                    }

                    return messageResult;
                }

                k9ParentMappingData = _context.K9ErpEntityDocSync.Where(x => x.K9erpId == Convert.ToInt32(data["vendor"]) && x.Type == Convert.ToInt32(LeadGenType.Vendor)).FirstOrDefault();
                if (k9ParentMappingData != null)
                {
                    contactInfo.EntityId = k9ParentMappingData.K9leadId;
                    contactInfo.Type = Convert.ToInt32(LeadGenType.Vendor);
                    updateContactInfo(contactInfo, data);
                    var result = await contactInfoController.AddContactInfo(contactInfo, true);
                    if (((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).StatusCode == 200)
                    {
                        contactInfo = (ContactInformation)((Microsoft.AspNetCore.Mvc.ObjectResult)result.Result).Value;
                        k9MappingData = new K9ErpEntityDocSync()
                        {
                            K9erpId = Convert.ToInt32(data["id"]),
                            K9leadId = contactInfo.Id,
                            Type = Convert.ToInt32(contactInfo.Type),
                            Category = "Contact"
                        };
                        _context.K9ErpEntityDocSync.Add(k9MappingData);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        messageResult.error = true;
                        messageResult.errorValue = 2;
                        messageResult.description = "Error";
                    }
                    return messageResult;
                }
                else
                {
                    messageResult.error = true;
                    messageResult.errorValue = 2;
                    messageResult.description = "Data doesn't exist";
                }
            }
            catch (Exception ex)
            {
                messageResult.error = true;
                messageResult.errorValue = 2;
                messageResult.description = ex.Message;
            }

            return messageResult;
        }

        private void updateContactInfo(ContactInformation contactInfo, JObject data)
        {
            contactInfo.FirstName = Convert.ToString(data["firstName"]);
            contactInfo.LastName = Convert.ToString(data["lastName"]);
            contactInfo.Inactive = Convert.ToBoolean(data["inactive"]);
            //contactInfo.ContactTitle = Convert.ToString(data["jobTitle"]);
            contactInfo.OfficeNumber = Convert.ToString(data["phone"]);
            contactInfo.Extension = Convert.ToString(data["phoneExt"]);
            contactInfo.FaxNumber = Convert.ToString(data["fax"]);
            contactInfo.CellNumber = Convert.ToString(data["cell"]);
            contactInfo.Email = Convert.ToString(data["email"]);
        }
    }
}
