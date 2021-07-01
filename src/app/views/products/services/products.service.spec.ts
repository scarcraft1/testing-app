import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';

fdescribe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products', () => {
    expect(service.loadProducts()).toBeDefined();
    expect(service.loadProducts().length).toBeGreaterThan(0);
  })

  it('should find a product', () => {
    expect(service.searchProductsByName('seagate').length).toBe(1);
  })
});
