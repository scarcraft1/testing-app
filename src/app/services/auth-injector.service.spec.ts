import { TestBed } from '@angular/core/testing';

import { AuthInjectorService } from './auth-injector.service';

describe('AuthInjectorService', () => {
  let service: AuthInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
