import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from 'src/services/workflow.service';

@Component({
  selector: 'workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {
  public title: string = '';
  public diagramNodeData: any[] = [];
  public diagramLinkData: any[] = [];

  workflowId: string = '';

  public display = this.workflowId ? this.diagramNodeData.length === 0 && this.diagramLinkData.length === 0 ? false : true : true;

  constructor(private workflowService: WorkflowService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(item => this.workflowId = item.id);
    if (this.workflowId) {
      this.workflowService.get(this.workflowId)?.then(data => {
        this.title = data.title;
        this.diagramNodeData = data.nodes;
        this.diagramLinkData = data.links;
        this.display = true;
      }).catch(e => console.log(e))
    }
  }

  show() {
    if (!this.title) {
      alert('No title provided');
      return;
    }

    if (this.diagramNodeData.length === 0 || this.diagramLinkData.length === 0) {
      alert('Create workflow!');
      return;
    }

    const errors: [] = this.diagramContainsAllRequiredSteps();

    if (errors.length !== 0) {
      alert(errors.join('\n'));
      return;
    }

    this.workflowService.add(this.title, this.diagramNodeData, this.diagramLinkData)?.then(data => {
      this.reset();
      alert('Workflow added successfully!');

    }).catch(e => {
      alert('Something went wrong!');
    });
  }

  diagramContainsAllRequiredSteps() {
    const errors: any = [];
    this.diagramNodeData.filter(item => item.key.includes('Start')).length > 1 && errors.push('Only one Start step');
    this.diagramNodeData.filter(item => item.key.includes('Start')).length === 0 && errors.push('Start step required');
    this.diagramNodeData.filter(item => item.key.includes('Step')).length === 0 && errors.push('At least one step required');
    this.diagramNodeData.filter(item => item.key.includes('End')).length === 0 && errors.push('End step required');
    this.diagramNodeData.filter(item => item.key.includes('End')).length > 1 && errors.push('Only one End step');
    return errors;
  }

  reset() {
    this.title = '';
    // this.myDiagramComponent.diagram.clear();
  }

}
