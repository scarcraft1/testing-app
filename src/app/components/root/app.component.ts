import { Component, ViewEncapsulation } from '@angular/core';
import { ProductItem } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'testing-app 2';
  public categorias = ['almacenamiento', 'baterias', 'periféricos'];
  public productos: ProductItem[] = [
    {
      id: 1,
      name: 'Seagate Barracuda 6400',
      category: 'almacenamiento',
      imgUrl: '',
      price: 50.0,
      stock: 3,
    },
    {
      id: 2,
      name: 'Western Digital Red',
      category: 'almacenamiento',
      price: 60.0,
      imgUrl: '',
      stock: 3,
    },
    {
      id: 3,
      name: 'Powerbank anker 3000',
      category: 'baterias',
      imgUrl: '',
      price: 10.0,
      stock: 1,
    },
    {
      id: 4,
      name: 'Mando Dual shock PS5',
      category: 'periféricos',
      imgUrl: '',
      price: 100.0,
      stock: 0,
    },
  ];

  public log(obj: any): void {
    console.log(obj);
  }

  public onTitleChanged(title: string = 'titulo') {
    this.title = title;
  }
}
