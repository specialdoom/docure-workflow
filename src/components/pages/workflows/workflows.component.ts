import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from 'src/services/workflow.service';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.scss']
})
export class WorkflowsComponent implements OnInit {

  public workflows: any = [];

  constructor(private workflowService: WorkflowService, private router: Router) { }

  ngOnInit(): void {
    this.workflowService.all()?.then(data => this.workflows = data).catch(e => console.log(e));
  }

  goToWorkflow(id: any) {
    this.router.navigate([`workflow/${id}`]);
  }

}
