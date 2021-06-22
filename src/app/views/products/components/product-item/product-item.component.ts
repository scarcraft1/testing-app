import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductItem } from '../../models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {

  @Input()
  public item!: ProductItem;

  constructor() { }

  ngOnInit(): void {
  }

}
