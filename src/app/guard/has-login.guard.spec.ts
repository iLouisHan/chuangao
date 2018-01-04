import { TestBed, async, inject } from '@angular/core/testing';

import { HasLoginGuard } from './has-login.guard';

describe('HasLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasLoginGuard]
    });
  });

  it('should ...', inject([HasLoginGuard], (guard: HasLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
