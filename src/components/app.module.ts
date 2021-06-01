import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GojsAngularModule } from 'gojs-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowchartComponent } from './flowchart/flowchart.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkflowsComponent } from './pages/workflows/workflows.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowchartComponent,
    WorkflowsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GojsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
