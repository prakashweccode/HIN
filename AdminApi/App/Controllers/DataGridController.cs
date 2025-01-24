using DTO.Models;
using Admin_API.Helper;
using Admin_API.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Admin_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataGridController : ControllerBase
    {
        DataGridRepository objDataGrid;
        public DataGridController(DBConnectionHelper _helper)
        {
            objDataGrid = new DataGridRepository(_helper);
        }
        [Route("GetTenantUserList")]
        [HttpPost]
        public Tuple<List<TenantUserListDTO>, int?> GetTenantUserList(GridFilterDataModel gridFilter)
        {
            return objDataGrid.GetTenantUserList(gridFilter);
        }
        [Route("GetCompanyUser")]
        [HttpPost]
        public Tuple<List<CompanyUserListDTO>, int?> GetCompanyUser(GridFilterDataModel gridFilter)
        {
            return objDataGrid.GetCompanyUser(gridFilter);
        }
        [Route("GetCompanyRegisterList")]
        [HttpPost]
        public Tuple<List<CompanyRegisterListDTO>, int?> GetCompanyRegisterList(GridFilterDataModel gridFilter)
        {
            return objDataGrid.GetCompanyRegisterList(gridFilter);
        }
        [Route("GetFilterDropDownResponse")]
        [HttpPost]
        public IEnumerable<FilterDropDownListResponseDto> GetFilterDropDownResponse(FilterDropDownListRequestDto request)
        {
            return objDataGrid.GetFilterDropDownResponse(request);
        }
    }
}
