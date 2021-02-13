import { Component, OnInit } from '@angular/core';
import { ToolType } from 'src/app/pixi/tools/tool.type';
import { ToolService } from 'src/app/_services/game/tool.service';

@Component({
  selector: 'trpg-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  toolType = ToolType;

  constructor(private toolService: ToolService) { }

  ngOnInit(): void {
  }

  selectTool(toolType: ToolType): void {
    this.toolService.selectTool(toolType);
  }
}
