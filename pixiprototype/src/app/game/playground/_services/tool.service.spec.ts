import { TestBed } from '@angular/core/testing';
import { PlaygroundService } from './playground.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToolService } from './tool.service';

import { instance, mock, verify, when } from 'ts-mockito';
import { Playground } from '../../pixi/pixi-structure/playground.model';
import { MoveTool } from '../../pixi/tools/move-tool/move-tool';
import { ToolFactory } from '../../pixi/tools/tool-factory.model';
import { ToolType } from '../../pixi/tools/tool.type';

describe('ToolService', () => {
  let toolService: ToolService;
  let mockedPlaygroundService: PlaygroundService;
  let mockedToolFactory: ToolFactory;
  let mockedPlayground: Playground;
  let mockedMoveTool: MoveTool;

  beforeEach(() => {
    mockedPlaygroundService = mock(PlaygroundService);
    mockedToolFactory = mock(ToolFactory);
    mockedMoveTool = mock(MoveTool);
    mockedPlayground = mock(Playground);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToolService,
        { provide: PlaygroundService, useValue: instance(mockedPlaygroundService) },
        { provide: ToolFactory, useValue: instance(mockedToolFactory) }
      ]
    });
    toolService = TestBed.inject(ToolService);
  });

  it('should be created', () => {
    expect(toolService).toBeTruthy();
  });

  it('should select tool when playgroundService has playground', () => {
    const playground = instance(mockedPlayground);
    const moveTool = instance(mockedMoveTool);

    const toolType = ToolType.Selector;

    when(mockedPlaygroundService.playground).thenReturn(playground);
    when(mockedToolFactory.createTool(toolType, playground))
      .thenReturn(moveTool);

    toolService.selectTool(toolType);

    verify(mockedPlaygroundService.playground).called();
    verify(mockedMoveTool.enable()).called();
  });
});
