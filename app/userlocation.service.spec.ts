import { TestBed } from '@angular/core/testing';

import { UserlocationService } from './userlocation.service';

describe('UserlocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserlocationService = TestBed.get(UserlocationService);
    expect(service).toBeTruthy();
  });
});
