import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/pages/home/home.component';
import { WorkflowsComponent } from 'src/components/pages/workflows/workflows.component';
import { PreviewWorkflowComponent } from './pages/preview-workflow/preview-workflow.component';
import { ViewWorkflowComponent } from './pages/view-workflow/view-workflow.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workflows', component: WorkflowsComponent },
  { path: 'workflow', component: WorkflowComponent },
  { path: 'workflow/:id', component: ViewWorkflowComponent },
  { path: 'preview-workflow/:id', component: PreviewWorkflowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
