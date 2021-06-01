import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/pages/home/home.component';
import { WorkflowsComponent } from 'src/components/pages/workflows/workflows.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workflows', component: WorkflowsComponent },
  { path: 'workflow', component: WorkflowComponent },
  { path: 'workflow/:id', component: WorkflowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
