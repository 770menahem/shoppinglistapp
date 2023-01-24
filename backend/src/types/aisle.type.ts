import Product from './product.type';

type Aisle = {
    _id?: string;
    number: number;
    products: Product[];
    createdAt?: Date;
    updatedAt?: Date;
};

export default Aisle;
