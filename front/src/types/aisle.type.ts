import Product from './product.type';

export type Directions =
  | 'vertical'
  | 'horizontal'
  | 'end-horizontal'
  | 'end-vertical'
  | 'start-horizontal'
  | 'start-vertical';

type Aisle = {
  _id?: string;
  number: number;
  products: Product[];
  direction: Directions;
  createdAt?: Date;
  updatedAt?: Date;
};

export default Aisle;
