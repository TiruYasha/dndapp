import { Injectable } from '@angular/core';
import { Playground } from '../pixi-structure/playground.model';
import { DrawShapeTool } from './draw-shape-tool/draw-shape-tool.model';
import { FogOfWarTool } from './fog-of-war-tool/fog-of-war-tool';
import { MoveTool } from './move-tool/move-tool';
import { Tool } from './tool.model';
import { ToolType } from './tool.type';

@Injectable({
    providedIn: 'root'
})
export class ToolFactory {
    createTool(toolType: ToolType, playground: Playground): Tool {
        switch (toolType) {
            case ToolType.Selector:
                return new MoveTool(playground);
            case ToolType.DrawShape:
                return new DrawShapeTool(playground);
            case ToolType.FogOfWar:
                return new FogOfWarTool(playground);
        }
    }
}
