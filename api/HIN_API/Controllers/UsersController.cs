using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HIN_API.Models;
using HIN_API.Helpers;
using Microsoft.Extensions.Options;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TenantContext _context;
        private readonly AppSettings _appSettings;
        private MasterDbContext _masterContext;
        public UsersController(TenantContext context, IOptions<AppSettings> appSettings, MasterDbContext masterContext)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _masterContext = masterContext;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<List<Users>>> search(string id)
        {
            var users = await _context.Users.Where(x => x.FirstName.Contains(id) || x.LastName.Contains(id)).ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [HttpGet]
        [Route("searchById")]
        public async Task<ActionResult<Users>> searchById(string id)
        {
            var userId = 0;
            int.TryParse(id, out userId);
            var users = await _context.Users.Where(x => x.UserId == userId).FirstOrDefaultAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        

        // GET: api/Users/5
        [HttpGet]
        [Route("GetUsers")]
        public async Task<ActionResult<Users>> GetUsers(string id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<ActionResult<List<Users>>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        [HttpGet]
        [Route("GetCountries")]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            return await _context.Country.ToListAsync();
        }

        [HttpGet]
        [Route("GetStatesByCountryId")]
        public async Task<ActionResult<List<State>>> GetStatesByCountryId(int countryId)
        {
            return await _context.State.Where(x=>x.CountryId == countryId).ToListAsync();
        }

        [HttpGet]
        [Route("GetCityByStateId")]
        public async Task<ActionResult<List<City>>> GetCityByStateId(int stateId)
        {
            return await _context.City.Where(x => x.StateId == stateId).ToListAsync();
        }


        [HttpGet]
        [Route("GetUserCost")]
        public async Task<ActionResult<UserCost>> GetUserCost(int userId)
        {
            return await _context.UserCost.Where(w => w.UserId == userId).FirstOrDefaultAsync();
        }
        [HttpGet]
        [Route("GetUserGoal")]
        public async Task<ActionResult<UserGoal>> GetUserGoal(int userId)
        {
            return await _context.UserGoal.Where(w => w.UserId == userId).FirstOrDefaultAsync();
        }
        [HttpGet]
        [Route("GetEmployeeTypes")]
        public async Task<ActionResult<List<EmployeeType>>> GetEmployeeTypes()
        {
            return await _context.EmployeeType.Where(w => !w.IsActive == false).ToListAsync();
        }
        [HttpGet]
        [Route("GetGroupUsers")]
        public async Task<ActionResult<List<Users>>> GetGroupUsers(int groupId)
        {
            var users = await _context.Users.Where(w=>w.GroupId == groupId).ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }



        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.UserId)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.UserId }, users);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Users>> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return users;
        }

        [HttpPost]
        [Route("SaveUser")]
        public async Task<ActionResult<Users>> SaveUser(Users user)
        {
            if (user.UserId > 0)
            {
                bool userDuplicate = CheckUsersDuplicates(user.Email, user.UserName, user.UserId);
                if (!userDuplicate)
                {
                    user = DetectPasswordChange(user);
                    user = DetectGmailPasswordChange(user);
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                    return user;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                bool userEmailExist = UserEmailExists(user.Email, user.UserName);
                if (!userEmailExist)
                {
                    var tenantName = _context.isTenent();
                    if (tenantName != "healthinformation")
                    {
                        var company = _masterContext.CompanyRegister.Where(x => x.CompanyName == tenantName).FirstOrDefault();
                        if (company != null)
                        {
                            List<Users> lstUsers = _context.Users.ToList();
                            if (lstUsers.Count == company.MaximumUser)
                            {
                                return StatusCode(StatusCodes.Status400BadRequest, EnumerationHelper.GetEnumDescription(ErrorCodes.MaximumUser));
                            }
                        }
                    }
                    user.Password = DataCryptoHelper.EncryptString(user.Password, _appSettings.SecretKey, _appSettings.Publickey);
                    user.CreatedOn = DateTime.UtcNow;
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();
                    return CreatedAtAction("GetUsers", new { id = user.UserId }, user);
                }
                else
                {
                    return null;
                }
            }
        }

        private Users DetectPasswordChange(Users user)
        {
            var data = _context.Users.AsNoTracking().FirstOrDefault(w => w.UserId == user.UserId);
            if(data != null) 
            {
                if (data.Password != user.Password)
                {
                    user.Password = DataCryptoHelper.EncryptString(user.Password, _appSettings.SecretKey, _appSettings.Publickey);
                    return user;
                }
                else
                {
                    return user;
                }
            }
            else
            {
                return user;
            }
        }

        private Users DetectGmailPasswordChange(Users user)
        {
            var data = _context.Users.AsNoTracking().FirstOrDefault(w => w.UserId == user.UserId);
            if (data != null)
            {
                if (data.GmailPassword != user.GmailPassword)
                {
                    user.GmailPassword = DataCryptoHelper.EncryptString(user.GmailPassword, _appSettings.SecretKey, _appSettings.Publickey);
                    return user;
                }
                else
                {
                    return user;
                }
            }
            else
            {
                return user;
            }
        }



        [HttpPost]
        [Route("SaveUserCost")]
        public async Task<ActionResult<UserCost>> SaveUserCost(UserCost userCost)
        {
            if (userCost.Id > 0)
            {
                _context.UserCost.Update(userCost);
                await _context.SaveChangesAsync();
                return Ok(userCost);
            }
            else
            {
                _context.UserCost.Add(userCost);
                await _context.SaveChangesAsync();
                return Ok(userCost);
            }
        }

        [HttpPost]
        [Route("SaveUserGoal")]
        public async Task<ActionResult<UserGoal>> SaveUserGoal(UserGoal userGoal)
        {
            if (userGoal.Id > 0)
            {
                _context.UserGoal.Update(userGoal);
                await _context.SaveChangesAsync();
                return Ok(userGoal);
            }
            else
            {
                _context.UserGoal.Add(userGoal);
                await _context.SaveChangesAsync();
                return Ok(userGoal);
            }
        }

        [HttpGet]
        [Route("SaveUserTheme")]
        public async Task<ActionResult<Users>> SaveUserTheme(int userId, string userTheme)
        {
            var user = await _context.Users.FirstOrDefaultAsync(w => w.UserId == userId);

            if (user != null)
            {
                user.UserTheme = userTheme;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return user;
            }

            return user;
        }

        [HttpGet]
        [Route("GetGender")]
        public async Task<ActionResult<List<Gender>>> GetGender()
        {
            var gender = await _context.Gender.ToListAsync();

            if (gender == null)
            {
                return NotFound();
            }

            return gender;
        }

        [HttpGet]
        [Route("GetUserCostDropdown")]
        public async Task<ActionResult<List<UserCostDropdown>>> GetUserCostDropdown()
        {
            var userCostDropdown = await _context.UserCostDropdown.ToListAsync();

            if (userCostDropdown == null)
            {
                return NotFound();
            }

            return userCostDropdown;
        }

        [HttpGet]
        [Route("GetChartName")]
        public async Task<ActionResult<List<ChartName>>> GetChartName()
        {
            var chartName = await _context.ChartName.ToListAsync();

            if (chartName == null)
            {
                return NotFound();
            }

            return chartName;
        }

        [HttpGet]
        [Route("GetChartsById")]
        public async Task<ActionResult<Tuple<List<HeaderChartMapping>, List<DashboardChartMapping>, List<UserQuoteChartMapping>>>> GetChartsById(int userId)
        {
            var lstHeaderChartMappings = await _context.HeaderChartMapping.Where(x => x.UserId == userId).ToListAsync();
            var lstDashboardChartMappings = await _context.DashboardChartMapping.Where(x => x.UserId == userId).ToListAsync();
            var lstUserQuoteChartMappings = await _context.UserQuoteChartMapping.Where(x => x.UserId == userId).ToListAsync();
            return Ok(new Tuple<List<HeaderChartMapping>, List<DashboardChartMapping>, List<UserQuoteChartMapping>>(lstHeaderChartMappings, lstDashboardChartMappings, lstUserQuoteChartMappings));
        }


        [HttpGet]
        [Route("GetHeaderChartNameById")]
        public async Task<ActionResult<List<HeaderChartMapping>>> GetHeaderChartNameById(int userId)
        {
            var chartName = await _context.HeaderChartMapping.Where(x => x.UserId == userId).ToListAsync();

            if (chartName == null)
            {
                return NotFound();
            }

            return chartName;
        }

        [HttpGet]
        [Route("GetDashboardChartNameById")]
        public async Task<ActionResult<List<DashboardChartMapping>>> GetDashboardChartNameById(int userId)
        {
            var chartName = await _context.DashboardChartMapping.Where(x => x.UserId == userId).ToListAsync();

            if (chartName == null)
            {
                return NotFound();
            }

            return chartName;
        }

        [HttpGet]
        [Route("GetUserQuoteChartNameById")]
        public async Task<ActionResult<List<UserQuoteChartMapping>>> GetUserQuoteChartNameById(int userId)
        {
            var chartName = await _context.UserQuoteChartMapping.Where(x => x.UserId == userId).ToListAsync();

            if (chartName == null)
            {
                return NotFound();
            }

            return chartName;
        }

        [HttpPost]
        [Route("SaveHeaderChartMapping")]
        public async Task<ActionResult<List<HeaderChartMapping>>> SaveHeaderChartMapping(List<HeaderChartMapping> headerChartMappings)
        {
            if (headerChartMappings.Count > 0)
            {
                var removeData = _context.HeaderChartMapping.Where(w => w.UserId == headerChartMappings.FirstOrDefault().UserId).ToList();
                if (removeData.Count > 0)
                    _context.HeaderChartMapping.RemoveRange(removeData);
                _context.HeaderChartMapping.AddRange(headerChartMappings);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpPost]
        [Route("SaveDashboardChartMapping")]
        public async Task<ActionResult<List<DashboardChartMapping>>> SaveDashboardChartMapping(List<DashboardChartMapping> dashboardChartMappings)
        {
            if (dashboardChartMappings.Count > 0)
            {
                var removeData = _context.DashboardChartMapping.Where(w => w.UserId == dashboardChartMappings.FirstOrDefault().UserId).ToList();
                if (removeData.Count > 0)
                    _context.DashboardChartMapping.RemoveRange(removeData);
                _context.DashboardChartMapping.AddRange(dashboardChartMappings);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpPost]
        [Route("SaveUserQuoteChartMapping")]
        public async Task<ActionResult<List<UserQuoteChartMapping>>> SaveUserQuoteChartMapping(List<UserQuoteChartMapping> userQuoteChartMappings)
        {
            if (userQuoteChartMappings.Count > 0)
            {
                var removeData = _context.UserQuoteChartMapping.Where(w => w.UserId == userQuoteChartMappings.FirstOrDefault().UserId).ToList();
                if (removeData.Count > 0)
                    _context.UserQuoteChartMapping.RemoveRange(removeData);
                _context.UserQuoteChartMapping.AddRange(userQuoteChartMappings);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

       
        private bool UserEmailExists(string email, string userName)
        {
            return _context.Users.Any(e => e.Email == email || e.UserName == userName);
        }
        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }

        private bool CheckUsersDuplicates(string emailID,string userName, int id)
        {
            return _context.Users.Any(e => (e.Email == emailID || e.UserName == userName) && e.UserId != id);
        }

    }
}
