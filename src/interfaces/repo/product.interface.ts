import Product from '../../types/product.type';

export interface IProductRepo {
    create(product: Product): Promise<Product>;
    update(productId: string, name: string): Promise<Product | null>;
    delete(productId: string): Promise<Product | null>;
    getById(productId: string): Promise<Product | null>;
    getAll(): Promise<Product[]>;
}
