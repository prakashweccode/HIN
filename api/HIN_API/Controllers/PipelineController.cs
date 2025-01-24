using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HIN_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Math.EC.Rfc7748;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HIN_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PipelineController : ControllerBase
    {
        private readonly TenantContext _context;
        public PipelineController(TenantContext context)
        {
            _context = context;
        }
        // GET: api/<PipelineController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroup>>> Get()
        {
            //from c in _context.PipelineGroup
            //join p in _context.PipelineMap on c.PipelineGroupId equals p.PipelineGroupId
            //join p2 in _context.Pipeline on p.PipelineId equals p2.PipelineId
            //select new
            //{
            //   c.Name,
            //   c.Pipelines = p2
            //}


            return await _context.PipelineGroup.ToListAsync();
        }



        // GET api/<PipelineController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PipelineController>
        [HttpPost]
        public async Task<ActionResult<PipelineGroup>> Post([FromBody] PipelineGroup pipelineGroup)
        {
            if (pipelineGroup.PipelineGroupId == 0)
            {
                List<Pipeline> pipelines = new List<Pipeline>();
                foreach (var pipe in pipelineGroup.Pipelines)
                {
                    pipe.PipelineId = 0;
                    pipelines.Add(pipe);
                }
                _context.Pipeline.AddRange(pipelines);
                await _context.SaveChangesAsync();
                PipelineGroup pipeline = new PipelineGroup();
                pipeline.Name = pipelineGroup.Name;
                pipeline.PipelineGroupType = pipelineGroup.PipelineGroupType;
                _context.PipelineGroup.Add(pipeline);
                await _context.SaveChangesAsync();
                List<PipelineMap> pipelineMaps = new List<PipelineMap>();
                foreach (var pipe in pipelineGroup.Pipelines)
                {
                    var pipelineMap = new PipelineMap();
                    pipelineMap.PipelineGroupId = pipeline.PipelineGroupId;
                    pipelineMap.PipelineId = pipe.PipelineId;
                    pipelineMap.DisplayOrder = pipe.DisplayOrder;
                    pipelineMaps.Add(pipelineMap);
                }
                _context.PipelineMap.AddRange(pipelineMaps);
                await _context.SaveChangesAsync();
                return pipeline;
            }
            else
            {
                var _pipelineGroup = _context.PipelineGroup.Where(x => x.PipelineGroupId == pipelineGroup.PipelineGroupId).FirstOrDefault();
                if (_pipelineGroup != null)
                {
                    _pipelineGroup.Name = pipelineGroup.Name;
                }
                var pipelineMaps = _context.PipelineMap.Where(x => x.PipelineGroupId == _pipelineGroup.PipelineGroupId);
                foreach (var pipe in pipelineGroup.Pipelines)
                {
                    if (pipe.PipelineId == 0)
                    {
                        var pipelineMap = new PipelineMap();
                        pipelineMap.PipelineGroupId = _pipelineGroup.PipelineGroupId;
                        _context.Pipeline.Add(pipe);
                        await _context.SaveChangesAsync();
                        pipelineMap.PipelineId = pipe.PipelineId;
                        pipelineMap.DisplayOrder = pipe.DisplayOrder;
                        _context.PipelineMap.Add(pipelineMap);
                    }
                    else
                    {
                        var _pipeline = _context.Pipeline.Where(x => x.PipelineId == pipe.PipelineId).FirstOrDefault();
                        if (_pipeline != null)
                        {
                            _pipeline.Name = pipe.Name;
                            _pipeline.Probability = pipe.Probability;
                            _context.Pipeline.Update(_pipeline);
                        }
                        var _pipemap = _context.PipelineMap.Where(x => x.PipelineId == pipe.PipelineId && x.PipelineGroupId == _pipelineGroup.PipelineGroupId).FirstOrDefault();
                        if (_pipemap != null)
                        {
                            _pipemap.DisplayOrder = pipe.DisplayOrder;
                            _context.PipelineMap.Update(_pipemap);
                        }
                    }
                }
                await _context.SaveChangesAsync();
                return pipelineGroup;
            }

        }

        // PUT api/<PipelineController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        [Route("GetPipeLineGroup")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroup>>> GetPipeLineGroup()
        {
            var result = await _context.PipelineGroup.ToListAsync();
            return Ok(result);
        }

        [Route("GetPipelineGroupType")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroupType>>> GetPipelineGroupType()
        {
            var result = await _context.PipelineGroupType.ToListAsync();
            return Ok(result);
        }

        [Route("getPipeLine")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PipelineGroup>>> getPipeLine()
        {
            var result = await _context.Pipeline.ToListAsync();
            return Ok(result);
        }


        [Route("GetPipeLineByPipeLineGroupId")]
        [HttpGet]
        public ActionResult<IEnumerable<Pipeline>> GetPipeLineByPipeLineGroupId(int Id)
        {
            if (Id == 0)
            {
                string sql = @"SELECT PL.[PipelineId] ,PL.[Name] ,PL.[Probability] ,PL.[IsRotting] ,PL.[RottingDays] , PL.[PipelineId] as [DisplayOrder], 0 as [PipelineGroupId],PL.[IsDefault], PL.[UpdatedOn], PL.[UpdatedBy], PL.[UpdatedById], PL.[CreatedOn], PL.[CreatedBy], PL.[CreatedById] FROM [Pipeline] PL where PL.[IsDefault] = 1";
                return _context.Query<Pipeline>().FromSqlRaw(sql).ToList();
            }
            else
            {
                string sql = @"SELECT PL.[PipelineId] ,PL.[Name] ,PL.[Probability] ,PL.[IsRotting] ,PL.[RottingDays] ,PLM.[DisplayOrder] ,PLM.PipelineGroupId,PL.[IsDefault], PL.[UpdatedOn], PL.[UpdatedBy], PL.[UpdatedById], PL.[CreatedOn], PL.[CreatedBy], PL.[CreatedById]  FROM [Pipeline] as PL 
               join PipelineMap PLM on PLM.PipelineId = PL.PipelineId 
                where PLM.PipelineGroupId = '" + Id + "'";
                return _context.Query<Pipeline>().FromSqlRaw(sql).ToList();
            }

        }

        [Route("GetPipelineByGroupTypeName")]
        [HttpGet]
        public ActionResult<IEnumerable<Pipeline>> GetPipelineByGroupTypeName(string Name)
        {
            if (!string.IsNullOrEmpty(Name))
            {
                string sql = @"SELECT PL.[PipelineId] ,PL.[Name] ,PL.[Probability] ,PL.[IsRotting] ,PL.[RottingDays] ,PLM.[DisplayOrder] ,PLM.PipelineGroupId,PL.[IsDefault], PL.[UpdatedOn], PL.[UpdatedBy], PL.[UpdatedById], PL.[CreatedOn], PL.[CreatedBy], PL.[CreatedById]  FROM [Pipeline] as PL 
               join PipelineMap PLM on PLM.PipelineId = PL.PipelineId 
			   join PipelineGroup PG on PLM.PipelineGroupId = PG.PipelineGroupId
			   Join PipelineGroupType PGT on PG.PipelineGroupType = PGT.Id
			   Where PGT.Name = '" + Name + "'";
                return _context.Query<Pipeline>().FromSqlRaw(sql).ToList();
            }
            else
                return null;
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            var pipeline = _context.Pipeline.Where(x => x.PipelineId == id).FirstOrDefault();
            if (pipeline != null)
            {
                _context.Pipeline.Remove(pipeline);
                return _context.SaveChanges();
            }
            return 0;
        }
    }
}
