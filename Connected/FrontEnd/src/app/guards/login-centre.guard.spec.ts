import { TestBed } from '@angular/core/testing';

import { LoginCentreGuard } from './login-centre.guard';

describe('LoginCentreGuard', () => {
  let guard: LoginCentreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginCentreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
