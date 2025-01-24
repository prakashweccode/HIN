import { Component, OnInit } from '@angular/core';
import { Pipeline, PipelineGroup, PipelineGroupType } from '../model/pipeline';
import { PipelineService } from './pipeline.service';
import { NotyHelper } from '../helper/NotyHelper';
import { Router, ActivatedRoute } from '@angular/router';
import { Datashared } from '../helper/datashared';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {

  constructor(public pipelineService: PipelineService, public notyHelper: NotyHelper, private router: Router, private data: Datashared) { }
  pipeLineGroup: PipelineGroup = new PipelineGroup();
  dragElement: Pipeline;
  dropElement: Pipeline;
  pipelineGroupTypes: Array<PipelineGroupType>;
  pipelines: Array<Pipeline>;
  addtoggle: boolean = false;;
  tempPipe: Pipeline;
  ngOnInit() {
    this.getPipelineGroupType();
    var pipeline = this.data.getValue();
    if (pipeline) {
      this.pipeLineGroup.PipelineGroupId = pipeline.PipelineGroupId;
      this.pipeLineGroup.Name = pipeline.Name;
      this.pipeLineGroup.PipelineGroupType = pipeline.PipelineGroupType;
    }

    else
      this.pipeLineGroup.PipelineGroupId = 0;
    this.loadPipeLines();

  }
  noAllowDrop(ev) {
    ev.stopPropagation();
  }
  drop(ev) {
    var displayOrder = this.dragElement.DisplayOrder;
    this.dragElement.DisplayOrder = ev.DisplayOrder;
    ev.DisplayOrder = displayOrder;
    console.log("drop");
    console.log(ev);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
  removePipeLine(pipeline) {
    if (window.confirm("Are you sure you want to delete?")) {
      if (pipeline && pipeline.PipelineId) {
        this.pipelineService.removePipeline(pipeline.PipelineId).subscribe(data => {
          this.notyHelper.ShowNoty("Funnel removed successfully !!!");
          this.loadPipeLines();
        }, err => { }, () => { });
      }
      else {
        this.pipeLineGroup.Pipelines = this.pipeLineGroup.Pipelines.filter(x => x != pipeline);
        this.pipelines = this.pipeLineGroup.Pipelines;
      }
    }
  }

  loadPipeLines() {
    this.pipelineService.getPipeLineByPipeLineGroupId(this.pipeLineGroup.PipelineGroupId).subscribe(data => {
      this.pipelines = data;
    }, err => { }, () => { });
  }
  drag(ev) {
    console.log("drag");
    console.log(ev);
    this.dragElement = ev;
  }
  savePipeline() {
    if (this.pipeLineGroup.Name && this.pipeLineGroup.PipelineGroupType) {
      this.pipeLineGroup.Pipelines = this.sortBy('DisplayOrder');
      this.pipelineService.savePipeline(this.pipeLineGroup).subscribe(data => {
        if (data) {
          this.pipeLineGroup = data;
          this.notyHelper.ShowNoty("Funnel saved successfully !!!");
          this.loadPipeLines();
        }
        
      }, err => {

      }, () => { });
    }
    else {
      this.notyHelper.ShowNoty("Name and Type is requierd");
    }
    
  }
  openStage(pipeline) {
    this.addtoggle = true;
    this.tempPipe = new Pipeline();
    this.tempPipe.DisplayOrder = pipeline ? pipeline.DisplayOrder : 0;
  }
  leftStage(pipeline, index) {
    let tempPipelines = JSON.parse(JSON.stringify(this.pipelines));
    this.pipelines[index].DisplayOrder = this.pipelines[index - 1].DisplayOrder;
    this.pipelines[index - 1].DisplayOrder = tempPipelines[index].DisplayOrder;

  }
  rightStage(pipeline, index) {
    let tempPipelines = JSON.parse(JSON.stringify(this.pipelines));
    this.pipelines[index].DisplayOrder = this.pipelines[index + 1].DisplayOrder;
    this.pipelines[index + 1].DisplayOrder = tempPipelines[index].DisplayOrder;
  }
  closeStage() {
    this.tempPipe = new Pipeline();
    this.addtoggle = false;
  }

  addStage(pipeLine) {
    this.pipeLineGroup.Pipelines = this.sortBy('DisplayOrder');
    this.pipeLineGroup.Pipelines.forEach((data, index) => {
      if (data.DisplayOrder >= pipeLine.DisplayOrder) {
        data.DisplayOrder += 1;
      }
    });
    this.pipeLineGroup.Pipelines.push(pipeLine);
    this.addtoggle = !this.addtoggle;
  }

  checkValidation(obj) {
    if (obj)
      return obj.invalid && (obj.dirty || obj.touched);
    else
      return false;
  }
  checkReqValidation(obj) {
    if (obj)
      return obj.invalid;
    else
      return false;
  }

  sortBy(prop: string) {
    if (!this.pipelines) return [];
    return this.pipelines.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
  addDeal() {
    this.router.navigate(['/funnel']);
  }
  ngOnDestroy() {
  }

  getPipelineGroupType() {
    this.pipelineService.getPipelineGroupType().subscribe(data => {
      this.pipelineGroupTypes = data;
    });
  }

}
