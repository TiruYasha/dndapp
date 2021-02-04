import { TestBed } from '@angular/core/testing';

import { ObjectHub } from './object.hub';

describe('ObjectService', () => {
  let service: ObjectHub;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectHub);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
