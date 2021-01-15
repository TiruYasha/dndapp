import { TestBed } from '@angular/core/testing';
import { PlaygroundService } from './playground.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToolFactory } from '../pixi/tools/tool-factory.model';
import { ToolType } from '../pixi/tools/tool.type';
import { Tool } from '../pixi/tools/tool.model';
import { ToolService } from './tool.service';
import { of } from 'rxjs';

describe('ToolService', () => {
  let toolService: ToolService;
  let playgroundSpy: jasmine.SpyObj<PlaygroundService>;
  let toolFactorySpy: jasmine.SpyObj<ToolFactory>;

  beforeEach(() => {
    const pSpy = jasmine.createSpyObj('PlaygroundService', ['test'], []);
    const tSpy = jasmine.createSpyObj('ToolFactory', ['createTool']);
    Object.defineProperty(pSpy, 'playground', {
      ...Object.getOwnPropertyDescriptor(pSpy, 'playground'),
      enumerable: true,
      configurable: true,
      get: () => {}
    });
    //spyOnProperty(pSpy, 'playground').and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToolService,
        { provide: PlaygroundService, useValue: pSpy },
        { provide: ToolFactory, useValue: tSpy }
      ]
    });
    toolService = TestBed.inject(ToolService);

    playgroundSpy = TestBed.inject(PlaygroundService) as jasmine.SpyObj<PlaygroundService>;
    toolFactorySpy = TestBed.inject(ToolFactory) as jasmine.SpyObj<ToolFactory>;

  });

  it('should be created', () => {
    expect(toolService).toBeTruthy();
  });

  it('should select tool when playgroundService has playground', () => {
    spyOnProperty(playgroundSpy, 'playground', 'get').and.returnValue(<any>{});
    const toolMock = jasmine.createSpyObj('Tool', ['enable']) as jasmine.SpyObj<Tool>;
    toolFactorySpy.createTool.and.returnValue(toolMock);

    toolService.selectTool(ToolType.Selector);

    expect(toolMock.enable).toHaveBeenCalled();
  });
});
