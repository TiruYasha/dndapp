import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/app/game/playground/_services/tool.service';
import { ToolType } from '../../pixi/tools/tool.type';

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
