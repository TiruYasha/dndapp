import { TestBed } from '@angular/core/testing';
import { PlaygroundService } from './playground.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToolService } from './tool.service';

import { instance, mock, verify, when } from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PlaygroundListItem } from '../_models/playground-list-item.model';

describe('PlaygroundService', () => {
  let playgroundService: PlaygroundService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });
    playgroundService = TestBed.inject(PlaygroundService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(playgroundService).toBeTruthy();
  });

  it('getPlaygrounds Should return PlaygroundListItem array observable', () => {
    const testData: PlaygroundListItem[] = [];

    playgroundService.getPlaygrounds().subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(`${environment.gameApi}playground`);

    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
