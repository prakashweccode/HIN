using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DapperQueryBuilder;
using HIN_API.Helpers;
using HIN_API.Models;
using HIN_API.Models.DTO;
using HIN_API.Query;
using HIN_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace HIN_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private TenantContext _dbContext;
        private IEmailSender _emailSender;
        private readonly AppSettings _appSettings;
        private MasterDbContext _masterContext;
        public IConfiguration _configuration;
        public AuthenticationController(TenantContext dbContext, IOptions<AppSettings> appSettings, IEmailSender emailSender, MasterDbContext masterContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _emailSender = emailSender;
            _appSettings = appSettings.Value;
            _masterContext = masterContext;
            _configuration = configuration;
        }
        [Route("GetDecryptedKey")]
        [HttpGet]
        public async Task<IActionResult> GetDecryptedKey(string encryptedKey)
        {
            return Ok(DataCryptoHelper.DecryptString(encryptedKey, _appSettings.SecretKey, _appSettings.Publickey));
        }
        [Route("GetTenantName")]
        [HttpGet]
        public async Task<IActionResult> GetTenantName()
        {
            var tenant = "healthinformation";
            var context = HttpHelper.HttpContext;
            var tenantHeader = context.Request.Headers["tenant"];
            if (!string.IsNullOrEmpty(tenantHeader))
            {
                tenant = tenantHeader;
            }
            return Ok(tenant);
        }
        [Route("ValidateHinPortalAccount")]
        [HttpPost]
        public async Task<IActionResult> ValidateHinPortalAccount(MSUserDto model)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(w => w.Email == model.userPrincipalName || w.UserName == model.userPrincipalName);
                if (user != null)
                {
                    return Ok(GetAuthenticatedUserDetails(user));
                }
                else
                {
                    Users oUser = new Users
                    {
                        Email = model.userPrincipalName,
                        UserName = model.userPrincipalName,
                        FirstName = model.givenName,
                        LastName = model.surname,
                        IsActive = true,
                        IsAdmin = true,
                        GroupId = 1,
                        IsEmailConfirmed = true,
                        Password = DataCryptoHelper.EncryptString("Hin@123", _appSettings.SecretKey, _appSettings.Publickey),
                        AdminPassword = "Hinadmin@123",
                        CreatedBy = "MSFT",
                        CreatedOn = DateTime.Now
                    };
                    _dbContext.Users.Add(oUser);
                    await _dbContext.SaveChangesAsync();
                    var createdUser = await _dbContext.Users.FirstOrDefaultAsync(w => w.Email == model.userPrincipalName || w.UserName == model.userPrincipalName);
                    return Ok(GetAuthenticatedUserDetails(createdUser));
                }
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }

        private UserDetail GetAuthenticatedUserDetails(Users user)
        {
            UserDetail userDetail = new UserDetail();
            var userGroup = _dbContext.UserGroupMapping.Where(x => x.UserId == user.UserId);
            userDetail.Permissions = GetUserPermissions(userGroup.Select(x => x.GroupId).ToArray());
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecurityKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                                        new Claim(ClaimTypes.Name, user.Email.ToString()),
                                        new Claim(ClaimTypes.Sid, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(14),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            string verificationCode = CodeGenerator.VerificationCodeGenerator();
            user.TwoFactorCode = verificationCode;
            var token = tokenHandler.CreateToken(tokenDescriptor);
            userDetail.Token = tokenHandler.WriteToken(token);
            userDetail.User = user;
            userDetail.isValid = true;
            return userDetail;
        }

        [Route("PortalLogin")]
        [HttpPost]
        public async Task<IActionResult> PortalLogin(TwoFactor model)
        {
            try
            {

                var user = _dbContext.Users.FirstOrDefault(w => w.Email == model.Login.UserName || w.UserName == model.Login.UserName);
                if (user == null && model.Login.IsMicrosoftAuth == true)
                {
                    string sql = string.Empty;
                    int id = 0;
                    using (IDbConnection con = new SqlConnection(_dbContext.getConnectionString()))
                    {
                        sql = string.Format(DBQuery.CreateUser, model.Login.UserName);
                        id = await con.QuerySingleAsync<int>(sql);
                        user = _dbContext.Users.FirstOrDefault(x => x.UserId == id);
                    }
                }
                UserDetail userDetail = new UserDetail();
                if (user != null)
                {
                    bool isActive = Convert.ToBoolean(user.IsActive);
                    if (isActive)
                    {
                        bool isValid = model.Login.IsMicrosoftAuth == true ? true : (DataCryptoHelper.DecryptString(user.Password, _appSettings.SecretKey, _appSettings.Publickey) == model.Login.Password);

                        if (isValid)
                        {
                            var userGroup = _dbContext.UserGroupMapping.Where(x => x.UserId == user.UserId);
                            userDetail.Permissions = GetUserPermissions(userGroup.Select(x => x.GroupId).ToArray());
                            if (Convert.ToBoolean(user.IsTwoFactorEnabled))
                            {
                                string verificationCode = CodeGenerator.VerificationCodeGenerator();
                                user.TwoFactorCode = verificationCode;
                                user.TwoFactorExpiryTime = DateTime.Now.AddMinutes(5);
                                _dbContext.Update(user);
                                await _dbContext.SaveChangesAsync();
                                await _emailSender.SendEmailAsync(user.Email, "HMS Portal Verification Code", verificationCode);
                                userDetail.User = user;
                                userDetail.isValid = true;
                                return Ok(userDetail);
                            }
                            else
                            {
                                var tokenHandler = new JwtSecurityTokenHandler();
                                var key = Encoding.ASCII.GetBytes(_appSettings.SecurityKey);
                                var tokenDescriptor = new SecurityTokenDescriptor
                                {
                                    Subject = new ClaimsIdentity(new Claim[]
                                    {
                                        new Claim(ClaimTypes.Name, user.Email.ToString()),
                                        new Claim(ClaimTypes.Sid, user.UserId.ToString())
                                    }),
                                    Expires = DateTime.UtcNow.AddDays(14),
                                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                                };
                                string verificationCode = CodeGenerator.VerificationCodeGenerator();
                                user.TwoFactorCode = verificationCode;
                                var token = tokenHandler.CreateToken(tokenDescriptor);
                                userDetail.Token = tokenHandler.WriteToken(token);
                                userDetail.User = user;
                                userDetail.isValid = true;
                                return Ok(userDetail);
                            }
                        }
                        else
                        {
                            return StatusCode(StatusCodes.Status401Unauthorized, EnumerationHelper.GetEnumDescription(ErrorCodes.InvalidLogin));
                        }
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, EnumerationHelper.GetEnumDescription(ErrorCodes.InactiveUser));
                    }
                }
                else
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, EnumerationHelper.GetEnumDescription(ErrorCodes.NotFound));
                }
            }
            catch (Exception ex)
            {
                return Problem("");
            }
        }
        [Route("TwoFactorVerification")]
        [HttpPost]
        public IActionResult TwoFactorVerification(TwoFactor model)
        {
            var user = _dbContext.Users.FirstOrDefault(w => w.Email == model.Login.UserName || w.UserName == model.Login.UserName);
            if (user != null)
            {
                bool isValid = (DataCryptoHelper.DecryptString(user.Password, _appSettings.SecretKey, _appSettings.Publickey) == model.Login.Password);
                if (isValid)
                {
                    if (user.TwoFactorCode == model.AccessCode.Trim())
                    {
                        //if (user.TwoFactorExpiryTime <= DateTime.Now)
                        //{
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var key = Encoding.ASCII.GetBytes(_appSettings.SecurityKey);
                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new Claim[]
                            {
                                new Claim(ClaimTypes.Name, user.Email.ToString()),
                                new Claim(ClaimTypes.Sid, user.UserId.ToString())
                            }),
                            Expires = DateTime.UtcNow.AddDays(14),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        };
                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        UserDetail userDetail = new UserDetail
                        {
                            User = user,
                            Token = tokenHandler.WriteToken(token)
                        };

                        return Ok(userDetail);
                        //}
                        //else
                        //{
                        //    return Problem("", null, Convert.ToInt16(ErrorCodes.CodeExpired));
                        //}
                    }
                    else
                    {
                        return Problem("", null, Convert.ToInt16(ErrorCodes.InvalidCode));
                    }
                }
                else
                {
                    return Problem("", null, Convert.ToInt16(ErrorCodes.InvalidLogin));
                }
            }
            else
            {
                return Problem("", null, Convert.ToInt16(ErrorCodes.NotFound));
            }
        }

        private JArray GetUserPermissions(int?[] groupId)
        {
            using (IDbConnection con = new SqlConnection(_dbContext.getConnectionString()))
            {
                var q = con.QueryBuilder($@"select ugp.Id,ugp.StatGrant,ugp.StatRead,ugp.StatHide,up.IdHtml 
  from UsersGroupsPermission ugp
  inner join UserPermission up
  on ugp.IdPermis = up.Id WHERE 1=1");
                q.Append($" AND ugp.IdGroup IN {groupId}");
                var listPerm = q.Query();
                return JArray.FromObject(listPerm);
            }
        }



        [Route("ForgotPassword")]
        [HttpPost]
        public IActionResult ForgotPassword(ForgotPassword forgotPwdModel)
        {
            var user = _dbContext.Users.Where(w => w.Email == forgotPwdModel.EmailId).FirstOrDefault();
            if (user != null)
            {

                try
                {
                    _emailSender.SendForgotEmail(forgotPwdModel.EmailId, user.UserId, _appSettings.SecretKey, _appSettings.Publickey);
                    return Ok();
                }
                catch (Exception ex)
                {
                    return Problem();
                }

            }
            else
            {
                return Problem("Record not found", null, StatusCodes.Status404NotFound);
            }
        }
        [Route("ResetPassword")]
        [HttpPost]
        public IActionResult ResetPassword(ResetPassword resetPwdModel)
        {
            string decrptedUserId = DataCryptoHelper.DecryptString(resetPwdModel.UserId, _appSettings.SecretKey, _appSettings.Publickey);
            string decrptedEmail = DataCryptoHelper.DecryptString(resetPwdModel.Email, _appSettings.SecretKey, _appSettings.Publickey);
            var user = _dbContext.Users.Where(w => (w.UserId == Convert.ToInt32(decrptedUserId) && w.Email == decrptedEmail)).FirstOrDefault();
            if (user != null)
            {
                user.Password = DataCryptoHelper.EncryptString(resetPwdModel.Password, _appSettings.SecretKey, _appSettings.Publickey);
                _dbContext.Update(user);
                _dbContext.SaveChanges();
                return Ok(resetPwdModel);
            }
            else
            {
                return Problem("Record not found", null, StatusCodes.Status404NotFound);
            }
        }

        [Route("SaveTempPatient")]
        [HttpPost]
        public async Task<ActionResult<TempPatient>> SaveTempPatient(TempPatient temppatient)
        {
            try
            {

                string companyName = string.Empty;
                using (IDbConnection con = new SqlConnection(_dbContext.masterConnectionString()))
                {
                    string sql = $"SELECT [Name] FROM CompanyRegister WHERE CompanyPracticeCode = '{temppatient.PracticeCode}'";
                    companyName = con.QueryFirst<string>(sql);
                }
                if (!string.IsNullOrEmpty(companyName))
                {
                    string tranSql = string.Empty;
                    if (temppatient.Id == null || temppatient.Id == 0)
                    {
                        tranSql = DBQuery.InsertTempPatient;
                    }
                    else
                    {
                        tranSql = DBQuery.UpdateTempPatient;
                    }
                    using(IDbConnection db = new SqlConnection(_dbContext.getConnectionString(companyName)))
                    {
                        var rowsAffected = db.ExecuteScalar<TempPatient>(tranSql, new { id = temppatient.Id, patientName = temppatient.PatientName, address = temppatient.Address, city = temppatient.City, state = temppatient.State, zipcode = temppatient.Zipcode, age = temppatient.Age, gender = temppatient.Gender, dOB = temppatient.Dob, homePhone = temppatient.HomePhone, cellPhone = temppatient.CellPhone, maritalStatus = temppatient.MaritalStatus, emailAddress = temppatient.EmailAddress, emergencyContact = temppatient.EmergencyContact, telephone = temppatient.Telephone, allergies = temppatient.Allergies, nKA = temppatient.Nka, hypertension = temppatient.Hypertension, liverdisease = temppatient.Liverdisease, diabetes = temppatient.Diabetes, insulinDependent = temppatient.InsulinDependent, cancer = temppatient.Cancer, heartDisease = temppatient.HeartDisease, kidneyDisease = temppatient.KidneyDisease, thyroidDisease = temppatient.ThyroidDisease, type = temppatient.Type, otherMedicalProblems = temppatient.OtherMedicalProblems, pastSurgeriesAndHospitalization = temppatient.PastSurgeriesAndHospitalization, medication = temppatient.Medication, bloodTransfusion = temppatient.BloodTransfusion, sedentary = temppatient.Sedentary, mildExercise = temppatient.MildExercise, regularVigorius = temppatient.RegularVigorius, drinkAlcohol = temppatient.DrinkAlcohol, convernedDrink = temppatient.ConvernedDrink, useTobocco = temppatient.UseTobocco, streetDrugs = temppatient.StreetDrugs, streetDrugNeedle = temppatient.StreetDrugNeedle, sexuallyActive = temppatient.SexuallyActive, contraception = temppatient.Contraception, liveAlone = temppatient.LiveAlone, frequentlyFalls = temppatient.FrequentlyFalls, colonoscopy = temppatient.Colonoscopy, colonoscopyData = temppatient.ColonoscopyData, fatherHealthProblem = temppatient.FatherHealthProblem, fatherAge = temppatient.FatherAge, motherHealthPProblem = temppatient.MotherHealthPproblem, motherAge = temppatient.MotherAge, siblingHealthProblem = temppatient.SiblingHealthProblem, siblingAge = temppatient.SiblingAge, patientPrintedName = temppatient.PatientPrintedName, date = temppatient.Date, patientSignature = temppatient.PatientSignature, nombreDelPaciente = temppatient.NombreDelPaciente, fecha = temppatient.Fecha, firmaDelPaciente = temppatient.FirmaDelPaciente, patientAttenSign = temppatient.PatientAttenSign, attenDate = temppatient.AttenDate, firmaDelAtencion = temppatient.FirmaDelAtencion, atencionDate = temppatient.AtencionDate, createdOn = temppatient.CreatedOn, updatedOn = temppatient.UpdatedOn, createdBy = temppatient.CreatedBy, updatedBy = temppatient.UpdatedBy, createdById = temppatient.CreatedById, updatedById = temppatient.UpdatedById, isPatientApproved = temppatient.IsPatientApproved, g = temppatient.G, p = temppatient.P, a = temppatient.A, lMP = temppatient.Lmp, mamogram = temppatient.Mamogram, papSmear = temppatient.PapSmear, lastName = temppatient.LastName, packsPerDay = temppatient.PacksPerDay, years = temppatient.Years, yearsToQuit = temppatient.YearsToQuit, contraceptionData = temppatient.ContraceptionData, bloodTransfusionData = temppatient.BloodTransfusionData, drinkAlcoholData = temppatient.DrinkAlcoholData, asthma = temppatient.Asthma, mentalDisorder = temppatient.MentalDisorder, attentionAgree = temppatient.AttentionAgree, atencionAgree = temppatient.AtencionAgree, isConsentEn = temppatient.IsConsentEn, isCONSENTIMIENTO = temppatient.IsConsentimiento });
                        return temppatient;
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Route("GetTenantDetail")]
        [HttpGet]
        public async Task<ActionResult<CompanyRegister>> GetTenantDetail(string code)
        {
            using (IDbConnection con = new SqlConnection(_dbContext.masterConnectionString()))
            {
                //var Name = _dbContext.getSubDomainName();
                var result = await con.QueryFirstOrDefaultAsync<CompanyRegister>(DBQuery.GetTenantDetail, new { Code = code });
                return Ok(result);
            }
        }
        //Validate practice code for the subdomains
        [Route("GetValidatePracticeCode")]
        [HttpGet]
        public async Task<ActionResult<CompanyRegister>> GetValidatePracticeCode(string code)
        {
            using (IDbConnection con = new SqlConnection(_dbContext.masterConnectionString()))
            {
                //var Name = _dbContext.getSubDomainName();
                var result = await con.QueryFirstOrDefaultAsync<CompanyRegister>(DBQuery.GetValidatedCode, new { Code = code });
                return Ok(result);
            }
        }
    }
}
