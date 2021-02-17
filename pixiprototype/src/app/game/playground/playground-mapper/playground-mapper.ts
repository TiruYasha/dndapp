import { Injectable } from '@angular/core';
import { Application } from 'pixi.js';
import { Playground } from '../../pixi/pixi-structure/playground.model';
import { PlaygroundModel } from '../_models/playground.model';
import { LayerMapper } from './layer-mapper';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundMapper {

  constructor(private layerMapper: LayerMapper) { }

  MapPlayground(p: PlaygroundModel): Playground {
    const app = new Application({ width: 700, height: 600, backgroundColor: 0xffffff });
    app.stage.width = 700;
    app.stage.height = 600;

    const playground = new Playground(app);
    this.layerMapper.addLayers(playground, p.layers);

    return playground;
  }
}
