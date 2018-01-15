import { TestBed, async, inject } from '@angular/core/testing';

import { TollGuard } from './toll.guard';

describe('TollGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TollGuard]
    });
  });

  it('should ...', inject([TollGuard], (guard: TollGuard) => {
    expect(guard).toBeTruthy();
  }));
});
