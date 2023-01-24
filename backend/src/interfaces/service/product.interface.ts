import Product from '../../types/product.type';

export interface IProductService {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(id: string, name: string): Promise<Product | null>;
    delete(id: string): Promise<Product | null>;
}
