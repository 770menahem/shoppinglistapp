import Aisle from './aisle.type';
import Department from './department.type';
import Product from './product.type';

type Supermarket = {
    _id?: string;
    name: string;
    location: string;
    aisles: Aisle[];
    departments: Department[];
    products: Product[];
    createdAt?: Date;
    updatedAt?: Date;
};

export default Supermarket;
