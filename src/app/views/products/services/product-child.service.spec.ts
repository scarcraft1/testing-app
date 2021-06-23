import { TestBed } from '@angular/core/testing';

import { ProductChildService } from './product-child.service';

describe('ProductChildService', () => {
  let service: ProductChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
