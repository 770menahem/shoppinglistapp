import { IProductRepo } from '../../interfaces/repo/product.interface';
import { IProductService } from '../../interfaces/service/product.interface';
import Product from '../../types/product.type';

export class ProductService implements IProductService {
    private productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async getAll(): Promise<Product[]> {
        const products = await this.productRepo.getAll();
        return products;
    }

    async getById(id: string): Promise<Product | null> {
        const product = await this.productRepo.getById(id);
        return product;
    }

    async create(product: Product): Promise<Product> {
        const newProduct = await this.productRepo.create(product);
        return newProduct;
    }

    async update(id: string, name: string): Promise<Product | null> {
        const updatedProduct = await this.productRepo.update(id, name);
        return updatedProduct;
    }

    async delete(id: string): Promise<Product | null> {
        const deletedProduct = await this.productRepo.delete(id);
        return deletedProduct;
    }
}
