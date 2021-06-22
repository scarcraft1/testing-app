import { ProductItem } from "../views/products/models";


const Products: ProductItem[] = [
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

export { Products };
