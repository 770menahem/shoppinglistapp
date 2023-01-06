import { IProductService } from '../../interfaces/service/product.interface';
import { Request, Response } from 'express';
import Product from '../../types/product.type';
import { IProductController } from '../../interfaces/controller/product.interface';
import { logInfo } from '../../log/logger';
export class ProductController implements IProductController {
    private productService: IProductService;

    constructor(productService: IProductService) {
        logInfo('ProductController created');
        this.productService = productService;
    }

    public create = async (req: Request, res: Response) => {
        const newProduct = req.body;
        const product: Product = await this.productService.create(newProduct);
        if (!product) res.status(404).send({ error: 'fail to create product' });
        else res.send(product);
    };

    public update = async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const name = req.body.name;
        const product: Product | null = await this.productService.update(productId, name);
        if (!product) res.status(404).send({ error: 'fail to update product' });
        else res.send(product);
    };

    public delete = async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const product: Product | null = await this.productService.delete(productId);
        if (!product) res.status(404).send({ error: 'fail to delete product' });
        else res.send({ msg: 'Product deleted successfully', product });
    };

    public get = async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const product: Product | null = await this.productService.getById(productId);
        if (!product) res.status(404).send('product not found');
        else res.send(product);
    };

    public getAll = async (_req: Request, res: Response) => {
        const products: Product[] | null = await this.productService.getAll();
        if (!products) res.status(404).send({ error: 'fail to get all products' });
        else res.send(products);
    };
}
