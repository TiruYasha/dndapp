import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlaygroundService } from './playground.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToolService } from './tool.service';

import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlaygroundListItem } from '../_models/playground-list-item.model';
import { PlaygroundMapper } from '../playground-mapper/playground-mapper';
import { GameHub } from '../../_hubs/game.hub';
import { PlaygroundModel } from '../_models/playground.model';
import { Playground } from '../../pixi/pixi-structure/playground.model';
import { ConnectToPlayground } from '../_hub-models/comands/connect-to-playground.model';

describe('PlaygroundService', () => {
  let sut: PlaygroundService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let mockedPlaygroundMapper: PlaygroundMapper;
  let mockedGameHub: GameHub;
  let mockedPlayground: Playground;

  beforeEach(() => {
    mockedPlaygroundMapper = mock(PlaygroundMapper);
    mockedGameHub = mock(GameHub);
    mockedPlayground = mock(Playground);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlaygroundService,
        { provide: PlaygroundMapper, useValue: instance(mockedPlaygroundMapper) },
        { provide: GameHub, useValue: instance(mockedGameHub) }
      ]
    });
    sut = TestBed.inject(PlaygroundService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('getPlaygrounds Should return PlaygroundListItem array observable', () => {
    const testData: PlaygroundListItem[] = [];

    sut.getPlaygrounds().subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(`${environment.gameApi}playground`);

    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('changePlayground should change the playground to the specified playgroundId and join that group on the server', fakeAsync(() => {
    const playgroundId = 'test';
    const playgroundModel = new PlaygroundModel();
    const playground = instance(mockedPlayground);

    const expectedHubData: ConnectToPlayground = {
      oldPlaygroundId: undefined,
      playgroundId
    };
    let obervableIsCalled = false;

    when(mockedPlaygroundMapper.MapPlayground(playgroundModel)).thenReturn(playground);

    sut.changePlayground(playgroundId);

    sut.playground$.subscribe(p => {
      expect(p).toEqual(playground);
      verify(mockedGameHub.send('ConnectToPlayground', deepEqual(expectedHubData))).once();
      expect(sut.playground).toEqual(p);
      obervableIsCalled = true;
    });

    const req = httpTestingController.expectOne(`${environment.gameApi}playground/${playgroundId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(playgroundModel);
    expect(obervableIsCalled).toBeTruthy();
  }));

  it('changePlayground should set oldplaygroundid on the second call', fakeAsync(() => {
    const playgroundId = 'test';
    const playgroundModel = new PlaygroundModel();
    const playground = instance(mockedPlayground);
    when(mockedPlayground.id).thenReturn(playgroundId);
    when(mockedPlaygroundMapper.MapPlayground(playgroundModel)).thenReturn(playground);
    sut.changePlayground(playgroundId);

    const req = httpTestingController.expectOne(`${environment.gameApi}playground/${playgroundId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(playgroundModel);

    // Second call
    const playgroundId2 = 'test2';
    const playgroundModel2 = new PlaygroundModel();
    const playground2 = instance(mock(Playground));

    when(mockedPlaygroundMapper.MapPlayground(playgroundModel2)).thenReturn(playground2);

    let obervableIsCalled = false;
    const expectedHubData: ConnectToPlayground = {
      oldPlaygroundId: playgroundId,
      playgroundId: playgroundId2
    };

    sut.changePlayground(playgroundId2);
    const req2 = httpTestingController.expectOne(`${environment.gameApi}playground/${playgroundId2}`);
    req2.flush(playgroundModel);

    sut.playground$.subscribe(p => {
      expect(p).toEqual(playground);
      verify(mockedGameHub.send('ConnectToPlayground', deepEqual(expectedHubData))).once();
      expect(sut.playground).toEqual(p);
      obervableIsCalled = true;
    });

    expect(obervableIsCalled).toBeTruthy();
  }));
});
