import { fakeAsync, TestBed } from '@angular/core/testing';
import { PlaygroundService } from './playground.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlaygroundListItem } from '../../_hubs/models/shared/playground-list-item.model';
import { PlaygroundMapper } from '../playground-mapper/playground-mapper';
import { PlaygroundModel } from '../../_hubs/models/shared/playground.model';
import { Playground } from '../../pixi/pixi-structure/playground.model';
import { ConnectToPlayground } from '../../_hubs/models/commands/connect-to-playground.model';
import { Hub } from '../../_hubs/hub';

describe('PlaygroundService', () => {
  let sut: PlaygroundService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let mockedPlaygroundMapper: PlaygroundMapper;
  let mockedHub: Hub;
  let mockedPlayground: Playground;

  beforeEach(() => {
    mockedPlaygroundMapper = mock(PlaygroundMapper);
    mockedHub = mock(Hub);
    mockedPlayground = mock(Playground);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PlaygroundService,
        { provide: PlaygroundMapper, useValue: instance(mockedPlaygroundMapper) },
        { provide: Hub, useValue: instance(mockedHub) }
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

  it('changePlayground should map the playground model and notify the playground subject', fakeAsync(() => {
    const playgroundModel = new PlaygroundModel();
    const playground = instance(mockedPlayground);

    let obervableIsCalled = false;

    when(mockedPlaygroundMapper.MapPlayground(playgroundModel)).thenReturn(playground);

    sut.changePlayground(playgroundModel);

    sut.playground$.subscribe(p => {
      expect(p).toEqual(playground);
      expect(sut.playground).toEqual(p);
      obervableIsCalled = true;
    });

    expect(obervableIsCalled).toBeTruthy();
  }));

  it('ConnectToPlayground should send a playgroundId to ConnectToPlayground', fakeAsync(() => {
    const playgroundId = 'test';

    const expectedHubData: ConnectToPlayground = {
      oldPlaygroundId: undefined,
      playgroundId
    };

    sut.connectToPlayground(playgroundId);

    verify(mockedHub.send('ConnectToPlayground', deepEqual(expectedHubData))).once();
  }));

  it('ConnectToPlayground should send a playgroundId and oldPlaygroundId to ConnectToPlayground', fakeAsync(() => {
    const playgroundModel = new PlaygroundModel();
    const playground = instance(mockedPlayground);

    when(mockedPlayground.id).thenReturn('oldid');
    when(mockedPlaygroundMapper.MapPlayground(playgroundModel)).thenReturn(playground);

    sut.changePlayground(playgroundModel);

    const playgroundId = 'test';

    const expectedHubData: ConnectToPlayground = {
      oldPlaygroundId: playground.id,
      playgroundId
    };

    sut.connectToPlayground(playgroundId);

    verify(mockedHub.send('ConnectToPlayground', deepEqual(expectedHubData))).once();
  }));
});
