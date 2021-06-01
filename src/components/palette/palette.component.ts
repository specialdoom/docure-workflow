import { Component, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { addNodesTemplate } from 'src/utils/flowchart.utils';

@Component({
  selector: 'palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaletteCompoment {
  public paletteNodeData: Array<any> = [
    { key: 'Start', category: 'Start' },
    { key: 'Step', },
    { key: 'Conditional', category: 'Conditional' },
    { key: 'End', category: 'End' }
  ];
  public paletteModelData: any = { prop: 'val' };
  public paletteDivClassName = 'myPaletteDiv';
  public skipsPaletteUpdate = true;

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