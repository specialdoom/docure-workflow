import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService } from 'gojs-angular';
import { addNodesTemplate } from '../../utils/flowchart.utils';

const $ = go.GraphObject.make;

@Component({
  selector: 'flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlowchartComponent {
  @Input() diagramNodeData: Array<any> = [];
  @Input() diagramLinkData: Array<any> = [];
  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData: any = { prop: 'value' };
  public skipsDiagramUpdate = false;

  constructor() {
  }

  public paletteNodeData: Array<any> = [
    { key: 'Start', category: 'Start' },
    { key: 'Step', },
    { key: 'Conditional', category: 'Conditional' },
    { key: 'End', category: 'End' }
  ];
  public paletteModelData: any = { prop: 'val' };
  public paletteDivClassName = 'myPaletteDiv';
  public skipsPaletteUpdate = true;

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