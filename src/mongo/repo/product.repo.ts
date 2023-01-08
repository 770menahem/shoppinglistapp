import { IProductRepo } from '../../interfaces/repo/product.interface';
import mongoose from 'mongoose';
import Product from '../../types/product.type';
import { logInfo } from '../../log/logger';

export class ProductRepo implements IProductRepo {
    private ProductModel: mongoose.Model<Product>;

    constructor(productModel: mongoose.Model<Product>) {
        logInfo('ProductRepo created');
        this.ProductModel = productModel;
    }

    public create = async (product: Product): Promise<Product> => {
        const newProduct = await this.ProductModel.create(product);
        return newProduct;
    };

    public update = async (productId: string, description: string): Promise<Product | null> => {
        const product = await this.ProductModel.findByIdAndUpdate(productId, { description }, { new: true });
        return product;
    };

    public delete = async (productId: string): Promise<Product | null> => {
        const product = await this.ProductModel.findByIdAndDelete(productId);
        return product;
    };

    public getById = async (productId: string): Promise<Product | null> => {
        const product = await this.ProductModel.findById(productId);
        return product;
    };

    public getAll = async (): Promise<Product[]> => {
        const products = await this.ProductModel.find({});
        return products;
    };
}
