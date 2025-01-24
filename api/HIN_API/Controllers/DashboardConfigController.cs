using HIN_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardConfigController : ControllerBase
    {
        private readonly TenantContext _context;
        public DashboardConfigController(TenantContext context)
        {
            _context = context;
        }
        [Route("GetDashboardConfigData")]
        [HttpGet]
        public async Task<ActionResult<Tuple<List<DashboardConfigFields>, List<SearchCriteria>>>> GetDashboardConfigData(int entity)
        {
            try
            {
                var dataFields = await _context.DashboardConfigFields.Where(w => w.Entity == entity).ToListAsync();
                var searchCriterias = await _context.SearchCriteria.ToListAsync();
                return new Tuple<List<DashboardConfigFields>, List<SearchCriteria>>(dataFields, searchCriterias);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetChartConfigById")]
        [HttpGet]
        public async Task<ActionResult<Tuple<DashboardUserConfig, List<DashBoardQueries>>>> GetChartConfigById(int configId)
        {
            try
            {
                var dashBordConfig = await _context.DashboardUserConfig.FindAsync(configId);
                var dashBordQuery = await _context.DashBoardQueries.Where(x => x.DashboardConfigId == configId).ToListAsync();
                return new Tuple<DashboardUserConfig, List<DashBoardQueries>>(dashBordConfig, dashBordQuery);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("GetAllChartConfig")]
        [HttpGet]
        public async Task<ActionResult<List<VwDashboardChartConfig>>> GetAllChartConfig()
        {
            try
            {
                var dashBoardConfig = await _context.VwDashboardChartConfig.ToListAsync();
                //var chartConfigs = await _context.ChartConfig.ToListAsync();
                return dashBoardConfig;
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }
        [Route("GetChartData")]
        [HttpPost]
        public async Task<ActionResult> GetChartData(VwDashboardChartConfig config)
        {
            try
            {
                string sql = config.Query;
                var result = _context.Query<VwOpportunities>().FromSqlRaw(sql).ToList();
                dynamic groupedResult = null;
                if(config.GroupById != null && config.GroupById > 0)
                {
                    switch (config.GroupById)
                    {
                        case 1:
                            groupedResult = result.GroupBy(x => x.DealStatus).ToList();
                            break;
                        case 2:
                            groupedResult = result.GroupBy(x => x.AssignedTo).ToList();
                            break;
                        case 3:
                            groupedResult = result.GroupBy(x => x.Pipeline).ToList();
                            break;
                        default:
                            break;
                    }
                    return Ok(groupedResult);
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("SaveDashboardConfig")]
        [HttpPost]
        public async Task<ActionResult> SaveDashboardConfig(DashboardSettingsModel model)
        {
            try
            {
                var configData = model.DashoardUserConfig;
                var queries = model.DashBoardQueries;
                configData.Query = GenerateDashboardQuery(queries, model.EntityName);
                if (configData.Id > 0)
                {
                    _context.DashboardUserConfig.Update(configData);
                }
                else
                {
                    _context.DashboardUserConfig.Add(configData);
                }
                await _context.SaveChangesAsync();
                if (queries.Count > 0)
                {
                    queries.ForEach(x => x.DashboardConfigId = configData.Id);
                    var existingRecords = _context.DashBoardQueries.Where(w => w.DashboardConfigId == configData.Id).ToList();
                    if (existingRecords.Count > 0)
                        _context.DashBoardQueries.RemoveRange(existingRecords);
                    _context.DashBoardQueries.AddRange(queries);
                    await _context.SaveChangesAsync();
                }
                return Ok(model);
            }
            catch (Exception ex)
            {
                return Problem();
            }
        }

        private string GenerateDashboardQuery(List<DashBoardQueries> queries, string entityName)
        {
            var conditions = new List<string>();
            StringBuilder sb = new StringBuilder();
            sb.Append("SELECT * FROM [dbo].[VwOpportunities]");
            if (queries.Count > 0)
            {
                foreach (var query in queries)
                {
                    if (!string.IsNullOrEmpty(GetFilterCondition(query)))
                        conditions.Add(GetFilterCondition(query));
                }
                if (conditions.Count > 0)
                {
                    sb.Append(" WHERE ");
                    sb.Append(string.Join(" AND ", conditions));
                }
            }
            return sb.ToString();
        }

        [Route("SaveChartConfig")]
        [HttpPost]
        public async Task<ActionResult<ChartConfig>> SaveChartConfig(ChartConfig chartConfig)
        {
            try
            {
                if (chartConfig.Id > 0)
                {
                    _context.ChartConfig.Update(chartConfig);
                }
                else
                {
                    _context.ChartConfig.Add(chartConfig);
                }
                await _context.SaveChangesAsync();
                return Ok(chartConfig);
            }
            catch (Exception ex)
            {
                return NoContent();
            }
        }

        [Route("getAllChartConfigById")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChartConfig>>> getAllChartConfigById(int id)
        {
            return await _context.ChartConfig.Where(x => x.DashboardConfigId == id).ToListAsync();
        }
        [Route("GetSearchValues")]
        [HttpGet]
        public async Task<IActionResult> GetSearchValues(int id, string fieldname)
        {
            var configData = await _context.DashboardUserConfig.FindAsync(id);
            if(configData != null)
            {
                string sql = string.Empty;
                switch (configData.ReportId)
                {
                    case 1:
                        switch (fieldname)
                        {
                            case "PipelineGroup":
                                sql = "select Name as Keys from PipelineGroup Where PipelineGroupType = 1";
                                break;
                            case "AssignedTo":
                                sql = "select Username as Keys from Users";
                                break;
                            case "OpportunityStatus":
                                sql = "select Name as Keys from Status";
                                break;
                            default:
                                sql = "select " + fieldname + " as Keys from Deal";
                                break;
                        }
                        break;
                    case 2:
                        switch (fieldname)
                        {
                            case "PipelineGroup":
                                sql = "select Name as Keys from PipelineGroup Where PipelineGroupType = 7";
                                break;
                            case "AssignedTo":
                                sql = "select Username as Keys from Users";
                                break;
                            case "LeadStatus":
                                sql = "select Name as Keys from LeadStatus";
                                break;
                            default:
                                sql = "select " + fieldname + " as Keys from Lead";
                                break;
                        }
                        break;
                    case 3:
                        sql = "select " + fieldname + " as Keys from Users";
                        break;
                    default:
                        sql = "select " + fieldname + " as Keys from Deal";
                        break;
                }
                return Ok(_context.Query<SearchValues>().FromSqlRaw(sql).ToArray());
            }
            else
            {
                return Ok();
            }
        }

        [Route("RemoveChartConfigById")]
        [HttpDelete]
        public async Task<ActionResult> RemoveChartConfigById(int id)
        {
            var chartConfig = await _context.ChartConfig.Where(x => x.Id == id).ToListAsync();
            if (chartConfig.Count > 0)
            {
                _context.ChartConfig.RemoveRange(chartConfig);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }


        private string GetFilterCondition(DashBoardQueries query)
        {
            //query.FieldName + " " + query.CriteriaName + " (" + query.FromValue + ") AND"
            switch (query.CriteriaName)
            {
                case "All":
                    return string.Empty;
                case "Empty":
                    return query.FieldName + " is null or " + query.FieldName + " = ''";
                case "Equal To":
                    return query.FieldName + " = '" + query.FromValue + "'";
                case "Not Equal To":
                    return query.FieldName + " != '" + query.FromValue + "'";
                case "Between":
                    return query.FieldName + " between " + query.FromValue + " and " + query.ToValue;
                case "Not Between":
                    return query.FieldName + " not between " + query.FromValue + " and " + query.ToValue;
                case "Contains":
                    return query.FieldName + " like '%" + query.FromValue + "%'";
                case "Not Contains":
                    return query.FieldName + " not like '%" + query.FromValue + "%'";
                case "Lesser Than":
                    return query.FieldName + " < " + query.FromValue;
                case "Greater Than":
                    return query.FieldName + " > " + query.FromValue;
                case "Lesser Than Equal To":
                    return query.FieldName + " <= " + query.FromValue;
                case "Greater Than Equal To":
                    return query.FieldName + " >= " + query.FromValue;
                default:
                    return string.Empty;
            }
        }
    }
}
