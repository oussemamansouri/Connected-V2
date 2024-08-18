import { TestBed } from '@angular/core/testing';

import { RegistreGuardGuard } from './registre-guard.guard';

describe('RegistreGuardGuard', () => {
  let guard: RegistreGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistreGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
