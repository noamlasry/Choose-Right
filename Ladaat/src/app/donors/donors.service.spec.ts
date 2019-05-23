import { TestBed } from '@angular/core/testing';

import { DonorsService } from './donors.service';

describe('DonorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonorsService = TestBed.get(DonorsService);
    expect(service).toBeTruthy();
  });
});
