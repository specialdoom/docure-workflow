import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent } from 'gojs-angular';
import { WorkflowService } from 'src/services/workflow.service';
import { addNodesTemplate } from '../../utils/flowchart.utils';

const $ = go.GraphObject.make;

@Component({
  selector: 'flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlowchartComponent {
  @ViewChild('myDiagram', { static: true })
  public myDiagramComponent!: DiagramComponent;

  public title: string = '';

  public diagramNodeData: Array<any> = [];
  public diagramLinkData: Array<any> = [];
  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData: any = { prop: 'value' };
  public skipsDiagramUpdate = false;

  public paletteNodeData: Array<any> = [
    { key: 'Start', category: 'Start' },
    { key: 'Step', },
    { key: 'Conditional', category: 'Conditional' },
    { key: 'End', category: 'End' }
  ];
  public paletteModelData: any = { prop: 'val' };
  public paletteDivClassName = 'myPaletteDiv';
  public skipsPaletteUpdate = true;
  workflowService: WorkflowService;

  constructor(workflowService: WorkflowService) {
    this.workflowService = workflowService;
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
    this.myDiagramComponent.diagram.clear();
  }

  public initDiagram(): go.Diagram {
    const diagram = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel,
        {
          linkKeyProperty: 'key'
        }
      )
    });

    addNodesTemplate(diagram);

    diagram.linkTemplate =
      $(go.Link,
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5, toShortLength: 4,
          relinkableFrom: true,
          relinkableTo: true,
          reshapable: true,
          resegmentable: true,
          selectionAdorned: false
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,
          { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
        $(go.Shape,
          { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
          new go.Binding("stroke", "isSelected", function (sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
        $(go.Shape,
          { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
        $(go.Panel, "Auto",
          { visible: true, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
          new go.Binding("visible", "visible", () => console.log('test')),
          $(go.Shape, "RoundedRectangle",
            { fill: "transparent", strokeWidth: 0 }),
          $(go.TextBlock,
            {
              font: "12pt helvetica, arial, sans-serif",
              stroke: "#fff",
              editable: true,
            },
            new go.Binding("text").makeTwoWay())
        )
      );

    return diagram;
  }

  public diagramModelChange = (changes: go.IncrementalData) => {
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  };

  public initPalette(): go.Palette {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    addNodesTemplate(palette);

    palette.model = $(go.GraphLinksModel,
      {
        linkKeyProperty: 'key'
      });

    return palette;
  }
}