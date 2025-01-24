using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using CsvHelper;
using HIN_WEB.Helper;
using HIN_WEB.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HIN_WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public ImportController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [Route("ImportLeads")]
        public async Task<IActionResult> ImportLeads(IFormFile file, IFormCollection formData)
        {
            try
            {
                string deserializeString = string.Empty;
                if (formData.Keys.FirstOrDefault() != null)
                {
                    deserializeString = formData.Keys.FirstOrDefault().Replace("%22", "\"");
                }
                List<ImportException> lstException = new List<ImportException>();
                List<MappedColumns> mappedColumns = JsonConvert.DeserializeObject<List<MappedColumns>>(deserializeString);
                string apiPath = "Leads";
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(stream))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Configuration.BadDataFound = null;
                            csv.Configuration.HeaderValidated = null;
                            csv.Configuration.MissingFieldFound = null;
                            csv.Configuration.Delimiter = ",";
                            var records = csv.GetRecords<dynamic>().ToList();
                            string batchNumber = CodeIndentHelper.GenerateBatchNumber("BIL");
                            int i = 0;
                            foreach (var data in records)
                            {
                                try
                                {
                                    i++;
                                    Lead oLead = ImportCsvHelper.CsvMapping<Lead>(typeof(Lead), data, mappedColumns);
                                    try
                                    {
                                        string codeApiPath = string.Format("CodeIndent/GetLastIndentByEntity?entity={0}", "Lead");
                                        HttpResponseMessage apiResponse = await DataManager.GetData(codeApiPath).ConfigureAwait(false);
                                        if (apiResponse.IsSuccessStatusCode)
                                        {
                                            var content = await apiResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                            var lastId = JsonConvert.DeserializeObject<int>(content);
                                            EntityCodeNumber entityCodeNumber = new EntityCodeNumber();
                                            entityCodeNumber.EntityNumber = CodeIndentHelper.ProcessLastIdByEntity("Lead", "LI", lastId);
                                            oLead.LeadNumber = entityCodeNumber.EntityNumber;
                                            oLead.BatchNumber = batchNumber;
                                        }
                                        HttpResponseMessage response = await DataManager.PostData(apiPath, oLead).ConfigureAwait(false);
                                        if (response.IsSuccessStatusCode)
                                        {
                                            var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                                            var lead = JsonConvert.DeserializeObject<Lead>(content);
                                            //try
                                            //{
                                            //    ContactInformation oContactInfo = ImportCsvHelper.CsvMapping<ContactInformation>(typeof(ContactInformation), data, mappedColumns);
                                            //    oContactInfo.BatchNumber = batchNumber;
                                            //    oContactInfo.EntityId = 1;
                                            //    string contactApiPath = "ContactInfo/AddContactInfo";
                                            //    HttpResponseMessage contactResponse = await DataManager.PostData(contactApiPath, oContactInfo).ConfigureAwait(false);
                                            //    if (contactResponse.IsSuccessStatusCode)
                                            //    {
                                            //        var contactContent = await contactResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                            //        var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(contactContent);
                                            //    }
                                            //    else
                                            //    {
                                            //        ImportException oException = new ImportException();
                                            //        oException.BatchNumber = batchNumber;
                                            //        oException.EntityName = "Lead";
                                            //        oException.ErrorDescription = response.ReasonPhrase;
                                            //        oException.RowNumber = i;
                                            //        lstException.Add(oException);
                                            //    }
                                            //}
                                            //catch (Exception ex)
                                            //{
                                            //    ImportException oException = new ImportException();
                                            //    oException.BatchNumber = batchNumber;
                                            //    oException.EntityName = "Lead";
                                            //    oException.ErrorDescription = ex.Message;
                                            //    oException.RowNumber = i;
                                            //    lstException.Add(oException);
                                            //}
                                            //try
                                            //{
                                            //    Deal oDeal = ImportCsvHelper.CsvMapping<Deal>(typeof(Deal), data, mappedColumns);
                                            //    oDeal.LeadId = lead.LeadId;
                                            //    string dealApiPath = "Deals/SaveDeal";
                                            //    HttpResponseMessage dealResponse = await DataManager.PostData(dealApiPath, oDeal).ConfigureAwait(false);
                                            //    if (dealResponse.IsSuccessStatusCode)
                                            //    {
                                            //        var dealContent = await dealResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                            //        var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(dealContent);
                                            //    }
                                            //    else
                                            //    {
                                            //        ImportException oException = new ImportException();
                                            //        oException.BatchNumber = batchNumber;
                                            //        oException.EntityName = "Lead";
                                            //        oException.ErrorDescription = response.ReasonPhrase;
                                            //        oException.RowNumber = i;
                                            //        lstException.Add(oException);
                                            //    }
                                            //}
                                            //catch (Exception ex)
                                            //{
                                            //    ImportException oException = new ImportException();
                                            //    oException.BatchNumber = batchNumber;
                                            //    oException.EntityName = "Lead";
                                            //    oException.ErrorDescription = ex.Message;
                                            //    oException.RowNumber = i;
                                            //    lstException.Add(oException);
                                            //}
                                        }
                                        else
                                        {
                                            ImportException oException = new ImportException();
                                            oException.BatchNumber = batchNumber;
                                            oException.EntityName = "Lead";
                                            oException.ErrorDescription = response.ReasonPhrase;
                                            oException.RowNumber = i;
                                            lstException.Add(oException);
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        ImportException oException = new ImportException();
                                        oException.BatchNumber = batchNumber;
                                        oException.EntityName = "Lead";
                                        oException.ErrorDescription = ex.Message;
                                        oException.RowNumber = i;
                                        lstException.Add(oException);
                                    }
                                }
                                catch (Exception ex)
                                {
                                    ImportException oException = new ImportException();
                                    oException.BatchNumber = batchNumber;
                                    oException.EntityName = "Lead";
                                    oException.ErrorDescription = ex.Message;
                                    oException.RowNumber = i;
                                    lstException.Add(oException);
                                }
                            }
                        }
                    }
                }
                if (lstException.Count > 0)
                {
                    string exceptionApiPath = "Import/SaveImportExceptions";
                    HttpResponseMessage exeResponse = await DataManager.PostData(exceptionApiPath, lstException).ConfigureAwait(false);
                    if (exeResponse.IsSuccessStatusCode)
                    {
                        //var exeContent = await exeResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                        //var contactInformation = JsonConvert.DeserializeObject<>(exeContent);
                    }
                    else
                    {

                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("ImportVendors")]
        public async Task<IActionResult> ImportVendors(IFormFile file, IFormCollection formData)
        {
            try
            {
                string deserializeString = string.Empty;
                if (formData.Keys.FirstOrDefault() != null)
                {
                    deserializeString = formData.Keys.FirstOrDefault().Replace("%22", "\"");
                }
                List<MappedColumns> mappedColumns = JsonConvert.DeserializeObject<List<MappedColumns>>(deserializeString);
                string apiPath = "Vendor/SaveVendor";
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(stream))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Configuration.BadDataFound = null;
                            csv.Configuration.HeaderValidated = null;
                            csv.Configuration.MissingFieldFound = null;
                            csv.Configuration.Delimiter = ",";
                            var records = csv.GetRecords<dynamic>().ToList();
                            foreach (var data in records)
                            {
                                Vendor oVendor = ImportCsvHelper.CsvMapping<Vendor>(typeof(Vendor), data, mappedColumns);
                                if (string.IsNullOrEmpty(oVendor.VendorNumber))
                                {
                                    string codeApiPath = string.Format("CodeIndent/GetLastIndentByEntity?entity={0}", "Vendor");
                                    HttpResponseMessage apiResponse = await DataManager.GetData(codeApiPath).ConfigureAwait(false);
                                    if (apiResponse.IsSuccessStatusCode)
                                    {
                                        var content = await apiResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                        var lastId = JsonConvert.DeserializeObject<int>(content);
                                        EntityCodeNumber entityCodeNumber = new EntityCodeNumber();
                                        entityCodeNumber.EntityNumber = CodeIndentHelper.ProcessLastIdByEntity("Vendor", "VI", lastId);
                                        oVendor.VendorNumber = entityCodeNumber.EntityNumber;
                                    }
                                }
                                HttpResponseMessage response = await DataManager.PostData(apiPath, oVendor).ConfigureAwait(false);
                                if (response.IsSuccessStatusCode)
                                {
                                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                                    var vendor = JsonConvert.DeserializeObject<Vendor>(content);
                                }
                                else
                                {

                                }
                            }
                        }
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("ImportContacts")]
        public async Task<IActionResult> ImportContacts(IFormFile file, IFormCollection formData)
        {
            try
            {
                string deserializeString = string.Empty;
                if (formData.Keys.FirstOrDefault() != null)
                {
                    deserializeString = formData.Keys.FirstOrDefault().Replace("%22", "\"");
                }
                List<MappedColumns> mappedColumns = JsonConvert.DeserializeObject<List<MappedColumns>>(deserializeString);
                string apiPath = "ContactInfo/AddContactInfo";
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(stream))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Configuration.BadDataFound = null;
                            csv.Configuration.HeaderValidated = null;
                            csv.Configuration.MissingFieldFound = null;
                            csv.Configuration.Delimiter = ",";
                            var records = csv.GetRecords<dynamic>().ToList();
                            foreach (var data in records)
                            {
                                ContactInformation oContact = ImportCsvHelper.CsvMapping<ContactInformation>(typeof(ContactInformation), data, mappedColumns);
                                HttpResponseMessage contactResponse = await DataManager.PostData(apiPath, oContact).ConfigureAwait(false);
                                if (contactResponse.IsSuccessStatusCode)
                                {
                                    var contactContent = await contactResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                    var contactInformation = JsonConvert.DeserializeObject<ContactInformation>(contactContent);
                                }
                            }
                        }
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("ImportPartners")]
        public async Task<IActionResult> ImportPartners(IFormFile file, IFormCollection formData)
        {
            try
            {
                string deserializeString = string.Empty;
                if (formData.Keys.FirstOrDefault() != null)
                {
                    deserializeString = formData.Keys.FirstOrDefault().Replace("%22", "\"");
                }
                List<MappedColumns> mappedColumns = JsonConvert.DeserializeObject<List<MappedColumns>>(deserializeString);
                string apiPath = "Partner/SavePartner";
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(stream))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Configuration.BadDataFound = null;
                            csv.Configuration.HeaderValidated = null;
                            csv.Configuration.MissingFieldFound = null;
                            csv.Configuration.Delimiter = ",";
                            var records = csv.GetRecords<dynamic>().ToList();
                            foreach (var data in records)
                            {
                                Partner oPartner = ImportCsvHelper.CsvMapping<Partner>(typeof(Partner), data, mappedColumns);
                                if (string.IsNullOrEmpty(oPartner.PartnerNumber))
                                {
                                    string codeApiPath = string.Format("CodeIndent/GetLastIndentByEntity?entity={0}", "Partner");
                                    HttpResponseMessage apiResponse = await DataManager.GetData(codeApiPath).ConfigureAwait(false);
                                    if (apiResponse.IsSuccessStatusCode)
                                    {
                                        var content = await apiResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                        var lastId = JsonConvert.DeserializeObject<int>(content);
                                        EntityCodeNumber entityCodeNumber = new EntityCodeNumber();
                                        entityCodeNumber.EntityNumber = CodeIndentHelper.ProcessLastIdByEntity("Partner", "PI", lastId);
                                        oPartner.PartnerNumber = entityCodeNumber.EntityNumber;
                                    }
                                }
                                HttpResponseMessage response = await DataManager.PostData(apiPath, oPartner).ConfigureAwait(false);
                                if (response.IsSuccessStatusCode)
                                {
                                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                                    var partner = JsonConvert.DeserializeObject<Partner>(content);
                                }
                                else
                                {

                                }
                            }
                        }
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("ImportReferrals")]
        public async Task<IActionResult> ImportReferrals(IFormFile file, IFormCollection formData)
        {
            try
            {
                string deserializeString = string.Empty;
                if (formData.Keys.FirstOrDefault() != null)
                {
                    deserializeString = formData.Keys.FirstOrDefault().Replace("%22", "\"");
                }
                List<MappedColumns> mappedColumns = JsonConvert.DeserializeObject<List<MappedColumns>>(deserializeString);
                string apiPath = "Referral/SaveReferral";
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(stream))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Configuration.BadDataFound = null;
                            csv.Configuration.HeaderValidated = null;
                            csv.Configuration.MissingFieldFound = null;
                            csv.Configuration.Delimiter = ",";
                            var records = csv.GetRecords<dynamic>().ToList();
                            foreach (var data in records)
                            {
                                Referral oReferral = ImportCsvHelper.CsvMapping<Referral>(typeof(Referral), data, mappedColumns);
                                if (string.IsNullOrEmpty(oReferral.ReferralNumber))
                                {
                                    string codeApiPath = string.Format("CodeIndent/GetLastIndentByEntity?entity={0}", "Referral");
                                    HttpResponseMessage apiResponse = await DataManager.GetData(codeApiPath).ConfigureAwait(false);
                                    if (apiResponse.IsSuccessStatusCode)
                                    {
                                        var content = await apiResponse.Content.ReadAsStringAsync().ConfigureAwait(false);
                                        var lastId = JsonConvert.DeserializeObject<int>(content);
                                        EntityCodeNumber entityCodeNumber = new EntityCodeNumber();
                                        entityCodeNumber.EntityNumber = CodeIndentHelper.ProcessLastIdByEntity("Referral", "RI", lastId);
                                        oReferral.ReferralNumber = entityCodeNumber.EntityNumber;
                                    }
                                }
                                HttpResponseMessage response = await DataManager.PostData(apiPath, oReferral).ConfigureAwait(false);
                                if (response.IsSuccessStatusCode)
                                {
                                    var content = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                                    var referral = JsonConvert.DeserializeObject<Referral>(content);
                                }
                                else
                                {

                                }
                            }
                        }
                    }
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("ImportedFileHeader")]
        public async Task<IActionResult> ImportedFileHeader(IFormFile file)
        {
            try
            {
                string[] headers = { string.Empty };
                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Seek(0, SeekOrigin.Begin);
                    using (var reader = new StreamReader(stream))
                    {
                        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Read();
                            csv.ReadHeader();
                            headers = csv.Context.HeaderRecord;
                        }
                    }
                }
                return Ok(headers);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetEntityColumns")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<string>, List<string>>>> GetEntityColumns(string entityname)
        {
            try
            {
                entityname = entityname.ToLower();
                List<PropertyInfo> properties = new List<PropertyInfo>();
                List<PropertyInfo> requiredProperties = new List<PropertyInfo>();
                switch (entityname)
                {
                    case "lead":
                        properties = ImportCsvHelper.GetCsvProperties(typeof(Lead)).ToList();
                        //properties.AddRange(ImportCsvHelper.GetCsvProperties(typeof(ContactInformation)));
                        //properties.AddRange(ImportCsvHelper.GetCsvProperties(typeof(Deal)));
                        requiredProperties = ImportCsvHelper.GetCsvRequiredProperties(typeof(Lead)).ToList();
                        //requiredProperties.AddRange(ImportCsvHelper.GetCsvRequiredProperties(typeof(ContactInformation)));
                        //requiredProperties.AddRange(ImportCsvHelper.GetCsvRequiredProperties(typeof(Deal)));
                        break;
                    case "vendor":
                        properties = ImportCsvHelper.GetCsvProperties(typeof(Vendor)).ToList();
                        requiredProperties = ImportCsvHelper.GetCsvRequiredProperties(typeof(Vendor)).ToList();
                        break;
                    case "partner":
                        properties = ImportCsvHelper.GetCsvProperties(typeof(Partner)).ToList();
                        requiredProperties = ImportCsvHelper.GetCsvRequiredProperties(typeof(Partner)).ToList();
                        break;
                    case "referral":
                        properties = ImportCsvHelper.GetCsvProperties(typeof(Referral)).ToList();
                        requiredProperties = ImportCsvHelper.GetCsvRequiredProperties(typeof(Referral)).ToList();
                        break;
                    case "contact":
                        properties = ImportCsvHelper.GetCsvProperties(typeof(ContactInformation)).ToList();
                        requiredProperties = ImportCsvHelper.GetCsvRequiredProperties(typeof(Referral)).ToList();
                        break;
                }
                return Ok(new Tuple<List<string>, List<string>>(properties.Select(s => s.Name).ToList(), requiredProperties.Select(s => s.Name).ToList()));
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
    }
}
