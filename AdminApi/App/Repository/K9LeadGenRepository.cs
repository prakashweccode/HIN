using Dapper;
using DTO.Models;
using Admin_API.Helper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Xml.Linq;

namespace Admin_API.Repository
{
    public class K9LeadGenRepository
    {

		DBConnectionHelper connectionHelper;
        string contentRootPath= string.Empty;
		public K9LeadGenRepository(DBConnectionHelper _connectionHelper, IWebHostEnvironment env)
		{
			this.connectionHelper = _connectionHelper;
            contentRootPath = env.ContentRootPath;
		}
		#region CompanyRegister

		public async Task<CompanyRegisterDataModel> GetCompanyRegister(int registerId)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
			{
				const string getQuery = "SELECT * FROM CompanyRegister WHERE RegisterId = @registerId";
				return await db.QuerySingleAsync<CompanyRegisterDataModel>(getQuery, new { registerId });
			}
		}

		public async Task<IEnumerable<CompanyRegisterDataModel>> FindAllCompanyRegister()
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
			{
				const string findAllQuery = "SELECT * FROM CompanyRegister";
				var results = await db.QueryAsync<CompanyRegisterDataModel>(findAllQuery);
				return results;
			}
		}

		

		public async Task<IEnumerable<CompanyRegisterDataModel>> FindCompanyRegisterByAll(int? registerId, string companyName, long? phoneNumber, string extension, string faxNumber, string contactFirstName, string contactMiddleName, string contactLastName, string contactTitle, long? cellNumber, string email, string address, string city, string state, string zipCode, string country, string password, DateTime? updatedOn, string updatedBy, int? updatedById, DateTime? createdOn, string createdBy, int? createdById, int? maximumUser, string userName)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
			{
				const string findByAllQuery = "SELECT * FROM CompanyRegister WHERE (@registerId IS NULL OR RegisterId = @registerId), (@companyName IS NULL OR CompanyName = @companyName), (@phoneNumber IS NULL OR PhoneNumber = @phoneNumber), (@extension IS NULL OR Extension = @extension), (@faxNumber IS NULL OR FaxNumber = @faxNumber), (@contactFirstName IS NULL OR ContactFirstName = @contactFirstName), (@contactMiddleName IS NULL OR ContactMiddleName = @contactMiddleName), (@contactLastName IS NULL OR ContactLastName = @contactLastName), (@contactTitle IS NULL OR ContactTitle = @contactTitle), (@cellNumber IS NULL OR CellNumber = @cellNumber), (@email IS NULL OR Email = @email), (@address IS NULL OR Address = @address), (@city IS NULL OR City = @city), (@state IS NULL OR State = @state), (@zipCode IS NULL OR ZipCode = @zipCode), (@country IS NULL OR Country = @country), (@password IS NULL OR Password = @password), (@updatedOn IS NULL OR UpdatedOn = @updatedOn), (@updatedBy IS NULL OR UpdatedBy = @updatedBy), (@updatedById IS NULL OR UpdatedById = @updatedById), (@createdOn IS NULL OR CreatedOn = @createdOn), (@createdBy IS NULL OR CreatedBy = @createdBy), (@createdById IS NULL OR CreatedById = @createdById), (@maximumUser IS NULL OR MaximumUser = @maximumUser), (@userName IS NULL OR UserName = @userName)";
				var results = await db.QueryAsync<CompanyRegisterDataModel>(findByAllQuery, new { registerId, companyName, phoneNumber, extension, faxNumber, contactFirstName, contactMiddleName, contactLastName, contactTitle, cellNumber, email, address, city, state, zipCode, country, password, updatedOn, updatedBy, updatedById, createdOn, createdBy, createdById, maximumUser, userName });
				return results;
			}
		}

		public async Task<IEnumerable<CompanyRegisterDataModel>> FindCompanyRegisterByAny(int? registerId, string companyName, long? phoneNumber, string extension, string faxNumber, string contactFirstName, string contactMiddleName, string contactLastName, string contactTitle, long? cellNumber, string email, string address, string city, string state, string zipCode, string country, string password, DateTime? updatedOn, string updatedBy, int? updatedById, DateTime? createdOn, string createdBy, int? createdById, int? maximumUser, string userName)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
			{
				const string findByAnyQuery = "SELECT * FROM CompanyRegister WHERE (@registerId IS NOT NULL AND RegisterId = @registerId), (@companyName IS NOT NULL AND CompanyName = @companyName), (@phoneNumber IS NOT NULL AND PhoneNumber = @phoneNumber), (@extension IS NOT NULL AND Extension = @extension), (@faxNumber IS NOT NULL AND FaxNumber = @faxNumber), (@contactFirstName IS NOT NULL AND ContactFirstName = @contactFirstName), (@contactMiddleName IS NOT NULL AND ContactMiddleName = @contactMiddleName), (@contactLastName IS NOT NULL AND ContactLastName = @contactLastName), (@contactTitle IS NOT NULL AND ContactTitle = @contactTitle), (@cellNumber IS NOT NULL AND CellNumber = @cellNumber), (@email IS NOT NULL AND Email = @email), (@address IS NOT NULL AND Address = @address), (@city IS NOT NULL AND City = @city), (@state IS NOT NULL AND State = @state), (@zipCode IS NOT NULL AND ZipCode = @zipCode), (@country IS NOT NULL AND Country = @country), (@password IS NOT NULL AND Password = @password), (@updatedOn IS NOT NULL AND UpdatedOn = @updatedOn), (@updatedBy IS NOT NULL AND UpdatedBy = @updatedBy), (@updatedById IS NOT NULL AND UpdatedById = @updatedById), (@createdOn IS NOT NULL AND CreatedOn = @createdOn), (@createdBy IS NOT NULL AND CreatedBy = @createdBy), (@createdById IS NOT NULL AND CreatedById = @createdById), (@maximumUser IS NOT NULL AND MaximumUser = @maximumUser), (@userName IS NOT NULL AND UserName = @userName)";
				var results = await db.QueryAsync<CompanyRegisterDataModel>(findByAnyQuery, new { registerId, companyName, phoneNumber, extension, faxNumber, contactFirstName, contactMiddleName, contactLastName, contactTitle, cellNumber, email, address, city, state, zipCode, country, password, updatedOn, updatedBy, updatedById, createdOn, createdBy, createdById, maximumUser, userName });
				return results;
			}
		}

		public async Task<int> CreateCompanyRegister(CompanyRegisterDataModel companyRegisterDataModel)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
            {
                const string insertQuery = "INSERT INTO CompanyRegister (RegisterId, CompanyName, PhoneNumber, Extension, FaxNumber, ContactFirstName, ContactMiddleName, ContactLastName, ContactTitle, CellNumber, Email, Address, City, State, ZipCode, Country, Password, UpdatedOn, UpdatedBy, UpdatedById, CreatedOn, CreatedBy, CreatedById, MaximumUser, UserName) VALUES (@registerId, @companyName, @phoneNumber, @extension, @faxNumber, @contactFirstName, @contactMiddleName, @contactLastName, @contactTitle, @cellNumber, @email, @address, @city, @state, @zipCode, @country, @password, @updatedOn, @updatedBy, @updatedById, @createdOn, @createdBy, @createdById, @maximumUser, @userName)";
                var rowsAffected = await ParseAndExecute(companyRegisterDataModel, db, insertQuery);
                return rowsAffected;
            }
        }

        private static Task<int> ParseAndExecute(CompanyRegisterDataModel companyRegisterDataModel, IDbConnection db, string sqlQuery)
        {
            return db.ExecuteScalarAsync<int>(sqlQuery, new { registerId = companyRegisterDataModel.RegisterId, companyName = companyRegisterDataModel.CompanyName, phoneNumber = companyRegisterDataModel.PhoneNumber, extension = companyRegisterDataModel.Extension, faxNumber = companyRegisterDataModel.FaxNumber, contactFirstName = companyRegisterDataModel.ContactFirstName, contactMiddleName = companyRegisterDataModel.ContactMiddleName, contactLastName = companyRegisterDataModel.ContactLastName, contactTitle = companyRegisterDataModel.ContactTitle, cellNumber = companyRegisterDataModel.CellNumber, email = companyRegisterDataModel.Email, address = companyRegisterDataModel.Address, city = companyRegisterDataModel.City, state = companyRegisterDataModel.State, zipCode = companyRegisterDataModel.ZipCode, country = companyRegisterDataModel.Country, password = companyRegisterDataModel.Password, updatedOn = companyRegisterDataModel.UpdatedOn, updatedBy = companyRegisterDataModel.UpdatedBy, updatedById = companyRegisterDataModel.UpdatedById, createdOn = companyRegisterDataModel.CreatedOn, createdBy = companyRegisterDataModel.CreatedBy, createdById = companyRegisterDataModel.CreatedById, maximumUser = companyRegisterDataModel.MaximumUser, userName = companyRegisterDataModel.UserName });
        }
        private static Task<int> ParseAndExecuteCompany(CompanyRegister companyRegister, IDbConnection db, string sqlQuery)
        {
            return db.ExecuteScalarAsync<int>(sqlQuery, new { registerId = companyRegister.RegisterId, companyName = companyRegister.CompanyName, phoneNumber = companyRegister.PhoneNumber, extension = companyRegister.Extension, faxNumber = companyRegister.FaxNumber, contactFirstName = companyRegister.ContactFirstName, contactMiddleName = companyRegister.ContactMiddleName, contactLastName = companyRegister.ContactLastName, contactTitle = companyRegister.ContactTitle, cellNumber = companyRegister.CellNumber, email = companyRegister.Email, address = companyRegister.Address, city = companyRegister.City, state = companyRegister.State, zipCode = companyRegister.ZipCode, country = companyRegister.Country, password = companyRegister.Password, updatedOn = companyRegister.UpdatedOn, updatedBy = companyRegister.UpdatedBy, updatedById = companyRegister.UpdatedById, createdOn = companyRegister.CreatedOn, createdBy = companyRegister.CreatedBy, createdById = companyRegister.CreatedById, maximumUser = companyRegister.MaximumUser, userName = companyRegister.UserName, name = companyRegister.Name, isActive= companyRegister.IsActive, encryptedKey = companyRegister.EncryptedKey, offlineAppKey = companyRegister.OfflineAppKey, supportEmail = companyRegister.SupportEmail,companyLogo = companyRegister.CompanyLogo, companyPracticeCode = companyRegister.CompanyPracticeCode});
        }

        public async Task<int> UpdateCompanyRegister(CompanyRegisterDataModel companyRegisterDataModel)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
			{
				const string updateQuery = "UPDATE CompanyRegister SET RegisterId = @registerId, CompanyName = @companyName, PhoneNumber = @phoneNumber, Extension = @extension, FaxNumber = @faxNumber, ContactFirstName = @contactFirstName, ContactMiddleName = @contactMiddleName, ContactLastName = @contactLastName, ContactTitle = @contactTitle, CellNumber = @cellNumber, Email = @email, Address = @address, City = @city, State = @state, ZipCode = @zipCode, Country = @country, Password = @password, UpdatedOn = @updatedOn, UpdatedBy = @updatedBy, UpdatedById = @updatedById, CreatedOn = @createdOn, CreatedBy = @createdBy, CreatedById = @createdById, MaximumUser = @maximumUser, UserName = @userName WHERE RegisterId = @registerId";
				var rowsAffected = await ParseAndExecute(companyRegisterDataModel, db, updateQuery);
				return rowsAffected;
			}
		}

		public async Task<int> DeleteCompanyRegister(int registerId)
		{
			using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
			{
				const string deleteQuery = "DELETE CompanyRegister WHERE RegisterId = @registerId";
				var rowsAffected = await db.ExecuteScalarAsync<int>(deleteQuery, new { registerId });
				return rowsAffected;
			}
		}

        public async Task<int> CreateNewCompany(CompanyRegister companyRegister)
        {
            try
            {

                bool companyDuplicate = CheckCompanyDuplicates(companyRegister.CompanyName, companyRegister.RegisterId);
                if (!companyDuplicate)
                    {

                    CreateNewDataBase(companyRegister);
                    string practiceCode = Helper.DataCryptoHelper.GeneratePracticeCode();
                    companyRegister.CompanyPracticeCode = practiceCode;
                    using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
                    {
                        const string insertQuery = "INSERT INTO CompanyRegister (CompanyName, PhoneNumber, Extension, FaxNumber, ContactFirstName, ContactMiddleName, ContactLastName, ContactTitle, CellNumber, Email, Address, City, State, ZipCode, Country, Password, UpdatedOn, UpdatedBy, UpdatedById, CreatedOn, CreatedBy, CreatedById, MaximumUser, UserName, Name,IsActive,EncryptedKey,OfflineAppKey,SupportEmail,CompanyLogo,CompanyPracticeCode) VALUES (@companyName, @phoneNumber, @extension, @faxNumber, @contactFirstName, @contactMiddleName, @contactLastName, @contactTitle, @cellNumber, @email, @address, @city, @state, @zipCode, @country, @password, @updatedOn, @updatedBy, @updatedById, @createdOn, @createdBy, @createdById, @maximumUser, @userName, @name, @isActive ,@encryptedKey, @offlineAppKey, @supportEmail , @companyLogo, @companyPracticeCode)";
                        var rowsAffected = await ParseAndExecuteCompany(companyRegister, db, insertQuery);
                        return rowsAffected;
                        
                    }

                    }
                    else
                    {
                        return 0;
                    }
                
            }
            catch 
            {
                return 0;
            }
        }

        public void CreateNewDataBase(CompanyRegister companyRegister)
        {
            try
            {
                var Name = RemoveSpecialCharacters(companyRegister.Name);
                using (SqlConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
                {
                    db.Open();
                    //var objTrans = con.BeginTransaction();
                    try
                    {
                        string createDBCommand = $"IF NOT EXISTS(SELECT 1 FROM sys.databases WHERE name='{Name}_QA') CREATE DATABASE [{Name}_QA]";
                        //string createDBCommand = $"IF NOT EXISTS(SELECT 1 FROM sys.databases WHERE name='{Name}_PROD') CREATE DATABASE [{Name}_PROD]";
                        db.Query(createDBCommand);
                        var rootPath = contentRootPath + "\\Assets\\CompanyRegister_Qa.sql";
                        //var rootPath = contentRootPath + "\\Assets\\CompanyRegister_Prod.sql";
                        string script = System.IO.File.ReadAllText(rootPath);
                        script = script.Replace("#%dbName%#", Name + "_QA");
                        string createUser = $" USE [{Name}_QA] SET IDENTITY_INSERT[dbo].[Users] ON INSERT[dbo].[Users]([UserId], [Email], [IsEmailConfirmed], [FirstName], [LastName], [UserName], [Password], [PhoneNumber], [IsPhoneNumberVerified], [AccessFailedCount], [IsLocked], [IsTwoFactorEnabled], [TwoFactorCode], [TwoFactorExpiryTime], [TwoFactorType], [RoleId], [UpdatedBy], [IsActive],[IsAdmin], [LastLogin], [CreatedOn], [CreatedBy], [UpdatedOn], [CellNumber], [Skills], [CostPerHour], [GroupId], [UserTheme], [AdminPassword]) VALUES(1, N'{companyRegister.Email}', NULL, N'{companyRegister.ContactFirstName}', N'{companyRegister.ContactLastName}', N'{companyRegister.UserName}', N'{companyRegister.Password}', N'{companyRegister.PhoneNumber}', NULL, NULL, NULL, 0, N'123456', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)";
                        using (SqlCommand cmd = db.CreateCommand())
                        {
                            var strArr = script.Split("GO");
                            foreach (var s in strArr)
                            {
                                cmd.CommandText = s.ToString();
                                cmd.ExecuteNonQuery();
                            }
                            db.Execute(createUser);
                        }
                    }
                    catch (Exception ex)
                    {
                        
                    }
                    finally
                    {
                        db.Close();
                    }
                }
            }
            catch (Exception ex)
            {

            }
        }

        //public void CreateNewDataBase(CompanyRegister companyRegister)
        //{
        //    try
        //    {
        //        var Name = RemoveSpecialCharacters(companyRegister.Name);
        //        using (SqlConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
        //        {
        //            db.Open();
        //            //var objTrans = con.BeginTransaction();
        //            try
        //            {
        //                string createDBCommand = $"IF NOT EXISTS(SELECT 1 FROM sys.databases WHERE name='{Name}_PROD') CREATE DATABASE [{Name}_PROD]";
        //                db.Query(createDBCommand);
        //                var rootPath = contentRootPath + "\\Assets\\CompanyRegister_Prod.sql";
        //                string script = System.IO.File.ReadAllText(rootPath);
        //                script = script.Replace("#%dbName%#", Name + "_PROD");
        //                string createUser = $" USE [{Name}_PROD] SET IDENTITY_INSERT[dbo].[Users] ON INSERT[dbo].[Users]([UserId], [Email], [IsEmailConfirmed], [FirstName], [LastName], [UserName], [Password], [PhoneNumber], [IsPhoneNumberVerified], [AccessFailedCount], [IsLocked], [IsTwoFactorEnabled], [TwoFactorCode], [TwoFactorExpiryTime], [TwoFactorType], [RoleId], [UpdatedBy], [IsActive],[IsAdmin], [LastLogin], [CreatedOn], [CreatedBy], [UpdatedOn], [CellNumber], [Skills], [CostPerHour], [GroupId], [UserTheme], [AdminPassword]) VALUES(1, N'{companyRegister.Email}', NULL, N'{companyRegister.ContactFirstName}', N'{companyRegister.ContactLastName}', N'{companyRegister.UserName}', N'{companyRegister.Password}', N'{companyRegister.PhoneNumber}', NULL, NULL, NULL, 0, N'123456', NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)";
        //                using (SqlCommand cmd = db.CreateCommand())
        //                {
        //                    var strArr = script.Split("GO");
        //                    foreach (var s in strArr)
        //                    {
        //                        cmd.CommandText = s.ToString();
        //                        cmd.ExecuteNonQuery();
        //                    }
        //                    db.Execute(createUser);
        //                }
        //            }
        //            catch (Exception ex)
        //            {

        //            }
        //            finally
        //            {
        //                db.Close();
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //    }
        //}





        private bool CheckCompanyDuplicates(string companyName, int registerId)
        {
            using (IDbConnection db = new SqlConnection(connectionHelper.getMasterConnectionString()))
            {
               string sql = $"SELECT TOP 1 *FROM [dbo].[CompanyRegister] WHERE CompanyName = '{companyName}' and RegisterId != {registerId}";
                var rowsAffected = db.ExecuteScalar<int>(sql);
                return rowsAffected > 0;
            }
        }
        private static string RemoveSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
        // WARNING: The Dapper code generation tool doesn't currently generate merge method(s).

        #endregion CompanyRegister
    }
}
