import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from 'src/services/workflow.service';

@Component({
  selector: 'workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {
  public title: string = '';
  public diagramNodeData: any[] = [];
  public diagramLinkData: any[] = [];

  constructor(private workflowService: WorkflowService) { }

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
