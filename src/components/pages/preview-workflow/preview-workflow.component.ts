import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'preview-workflow',
  templateUrl: './preview-workflow.component.html',
  styleUrls: ['./preview-workflow.component.scss']
})
export class PreviewWorkflowComponent implements OnInit {
  public workflowId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.workflowId = this.route.snapshot.params.id;
  }

  goToWorkflow() {
    this.router.navigate([`workflow/${this.workflowId}`]);
  }

}