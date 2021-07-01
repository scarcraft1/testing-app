import { Inject } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductsService } from '../../services';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let service: ProductsService;
  let spy: any;
  let product = {
    id: 1,
    name: 'Seagate Barracuda 6400',
    category: 'almacenamiento',
    imgUrl: '',
    price: 50.0,
    stock: 3,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{
        provide: ActivatedRoute, useValue: { paramMap: of({ get: (val: string) => 1 })}
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new ProductsService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shold get product when have a correct ID', () => {
    spy = spyOn(service, 'loadProducts').and.returnValue([product]);
    expect(component.item).toEqual(product)
  })

  it('should navigate when product is not found', () => {
    spy = spyOn(service, 'loadProducts').and.returnValue([]);

  })
});
