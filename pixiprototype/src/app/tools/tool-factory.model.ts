import { Injectable } from '@angular/core';
import { Playground } from '../pixi-structure/playground.model';
import { MoveTool } from './move-tool/move-tool';
import { Tool } from './tool.model';
import { ToolType } from './tool.type';

export function createTool(toolType: ToolType, playground: Playground): Tool {
    switch (toolType) {
        case ToolType.Selector:
            return new MoveTool(playground);
    }

    return null;
}

