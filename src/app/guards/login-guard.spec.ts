import { TestBed } from '@angular/core/testing';
import { loginGuard } from './login-guard';

describe('loginGuardGuard', () => {
  let service: loginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(loginGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
