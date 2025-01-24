import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pipeline, PipelineGroup, PipelineGroupType } from '../model/pipeline';
@Injectable({
  providedIn: 'root'
})
export class PipelineService {

  constructor(private http: HttpClient) { }
  savePipeline(pipeLine) {
    return this.http.post<PipelineGroup>("/api/Pipeline", pipeLine).pipe();
  }
  getPipeLineByPipeLineGroupId(Id) {
    return this.http.get<Array<Pipeline>>("/api/Pipeline/GetPipeLineByPipeLineGroupId?Id=" + (Id ? Id : 0)).pipe();
  }
  removePipeline(pipelineId) {
    return this.http.delete<any>("/api/Pipeline/DeletePipeline?Id=" + pipelineId).pipe();
  }

  getPipeLine() {
    return this.http.get<Array<Pipeline>>("/api/Pipeline/getPipeLine").pipe();
  }
  getPipelineByGroupTypeName(groupType) {
    return this.http.get<Array<Pipeline>>("/api/Pipeline/GetPipelineByGroupTypeName?Name=" + groupType).pipe();
  }
  getPipelineGroupType() {
    return this.http.get<Array<PipelineGroupType>>("/api/Pipeline/GetPipelineGroupType").pipe();
  }
}
