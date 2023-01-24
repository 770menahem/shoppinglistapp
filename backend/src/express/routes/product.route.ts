import * as express from 'express';
import { wrapController } from '../utils/wraps';
import validateRequest from '../joi/joi';
import { updateSchema, createSchema } from '../joi/validator/product.schema';
import { IProductController } from '../../interfaces/controller/product.interface';

class ProductRouter {
    public path: string = '/products';
    public router = express.Router();
    private productController: IProductController;
    private auth: express.RequestHandler;

    constructor(productController: IProductController, auth: express.RequestHandler) {
        this.productController = productController;
        this.auth = auth;
        this.initializeRoutes();
    }

    public getRouter() {
        return this.router;
    }

    public initializeRoutes() {
        this.router.get('', wrapController(this.productController.getAll));
        this.router.get('/:productId', wrapController(this.productController.get));
        this.router.post('', validateRequest(createSchema), wrapController(this.productController.create));
        this.router.put('/:productId', validateRequest(updateSchema), wrapController(this.productController.update));
        this.router.delete('/:productId', wrapController(this.productController.delete));
        this.router.use(this.auth);
    }
}

export default ProductRouter;
