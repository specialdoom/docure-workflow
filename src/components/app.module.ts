import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GojsAngularModule } from 'gojs-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowchartComponent } from './flowchart/flowchart.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkflowsComponent } from './pages/workflows/workflows.component';
import { HttpClientModule } from '@angular/common/http';
import { PaletteCompoment } from './palette/palette.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import { ViewWorkflowComponent } from './pages/view-workflow/view-workflow.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowchartComponent,
    WorkflowsComponent,
    HomeComponent,
    PaletteCompoment,
    WorkflowComponent,
    ViewWorkflowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GojsAngularModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
