import { TestBed } from '@angular/core/testing';

import { AuthontificationService } from './authontification.service';

describe('AuthontificationService', () => {
  let service: AuthontificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthontificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
