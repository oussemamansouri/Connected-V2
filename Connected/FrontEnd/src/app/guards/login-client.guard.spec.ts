import { TestBed } from '@angular/core/testing';

import { LoginClientGuard } from './login-client.guard';

describe('LoginClientGuard', () => {
  let guard: LoginClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
