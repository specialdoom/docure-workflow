import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/pages/home/home.component';
import { WorkflowsComponent } from 'src/components/pages/workflows/workflows.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'workflows', component: WorkflowsComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
