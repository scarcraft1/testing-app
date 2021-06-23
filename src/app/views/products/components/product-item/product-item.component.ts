import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductItem } from '../../models';
import { ProductsService } from '../../services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  // con este tipo de estrategia, los valores no se cambian si los actualizamos en el subscription del router
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input()
  public item!: ProductItem;

  constructor(
    private service: ProductsService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef, // El servicio de angular que permite actualizar el componente
    private router: Router,
  ) {}

  ngOnInit(): void {
    //  const routeItem = this.service.loadProducts().find(i => i.id === Number(this.route.snapshot.paramMap.get('id')));
    //  if (routeItem) { this.item = routeItem; }

    this.subscriptions.push(
      this.route.paramMap
        .pipe(
          // con esto hacemos que no muestre el producto cuando se lo han pasado como parametro de entrada
          filter(() => !this.item),
          map((params) => Number(params.get('id'))),
          map((id) => this.service.loadProducts().find((i) => i.id === id))
        )
        .subscribe((item) => {
          if (item) {
            this.item = item;
            this.cd.detectChanges(); // le decimos a angular que actualice el componente
          } else {
            this.router.navigateByUrl('/products/all-products');
          }
        })
    );
    console.log('on init', this.item);
  }

  ngOnDestroy() {
    console.log('destroy');
    this.subscriptions.filter((sub) => sub).forEach((sub) => sub.unsubscribe());
  }
}
