import { TestBed } from '@angular/core/testing';

import { Updater } from './updater';

describe('UpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Updater = TestBed.get(Updater);
    expect(service).toBeTruthy();
  });
});
