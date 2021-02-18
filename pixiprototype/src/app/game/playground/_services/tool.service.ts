import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ToolFactory } from 'src/app/game/pixi/tools/tool-factory.model';
import { Tool } from 'src/app/game/pixi/tools/tool.model';
import { ToolType } from 'src/app/game/pixi/tools/tool.type';
import { PlaygroundService } from './playground.service';

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    private selectedTool?: Tool;
    private selectedToolSubject: ReplaySubject<Tool>;

    constructor(private playgroundService: PlaygroundService, private toolFactory: ToolFactory) {
        this.selectedToolSubject = new ReplaySubject(1);
    }

    getTool(): Observable<Tool> {
        return this.selectedToolSubject.asObservable();
    }

    selectTool(toolType: ToolType): void {
        if (!this.playgroundService.playground) { return; }
        if (this.selectedTool) {
            this.selectedTool.disable();
        }
        this.selectedTool = this.toolFactory.createTool(toolType, this.playgroundService.playground);
        this.selectedTool.enable();
    }
}
