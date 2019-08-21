import { TestBed } from '@angular/core/testing';

import { AllItemsService } from './all-items.service';

describe('AllItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllItemsService = TestBed.get(AllItemsService);
    expect(service).toBeTruthy();
  });
});
