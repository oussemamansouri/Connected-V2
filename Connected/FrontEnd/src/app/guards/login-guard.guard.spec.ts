import { TestBed } from '@angular/core/testing';

import { LoginGuardGuard } from './login-guard.guard';

describe('LoginGuardGuard', () => {
  let guard: LoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
