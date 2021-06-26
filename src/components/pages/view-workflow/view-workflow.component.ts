import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from 'src/services/workflow.service';

@Component({
  selector: 'app-view-workflow',
  templateUrl: './view-workflow.component.html',
  styleUrls: ['./view-workflow.component.scss']
})
export class ViewWorkflowComponent implements OnInit {
  public diagramNodeData: any[] = [];
  public diagramLinkData: any[] = [];

  public display: boolean = false;

  constructor(private workflowService: WorkflowService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.workflowService.get(this.route.snapshot.params.id)?.then(data => {
      this.diagramNodeData = data.nodes;
      this.diagramLinkData = data.links;
      this.display = true;
    });
  }

}
