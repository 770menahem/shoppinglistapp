import * as express from 'express';
import { wrapController } from '../utils/wraps';
// import validateRequest from '../joi/joi';
// import { updateSchema, createSchema } from '../joi/validator/supermarket.schema';
import { ISupermarketController } from '../../interfaces/controller/supermarket.interface';

class SupermarketRouter {
    public path: string = '/supermarkets';
    public router = express.Router();
    private supermarketController: ISupermarketController;
    private auth: express.RequestHandler;

    constructor(supermarketController: ISupermarketController, auth: express.RequestHandler) {
        this.supermarketController = supermarketController;
        this.auth = auth;
        this.initializeRoutes();
    }

    public getRouter() {
        return this.router;
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('', wrapController(this.supermarketController.getAll));
        this.router.get('/:supermarketId', wrapController(this.supermarketController.getById));
        this.router.put('/:supermarketId/name/:name', wrapController(this.supermarketController.updateName));
        this.router.put('/:supermarketId/location/:location', wrapController(this.supermarketController.updateLocation));
        this.router.patch('/:supermarketId/aisle/:aisleId', wrapController(this.supermarketController.addAisle));
        this.router.patch('/:supermarketId/department/:departmentId', wrapController(this.supermarketController.addDepartment));
        this.router.patch('/:supermarketId/product/:productId', wrapController(this.supermarketController.addProduct));
        this.router.post('', wrapController(this.supermarketController.create));
        this.router.delete('/:supermarketId', wrapController(this.supermarketController.delete));
    }
}

export default SupermarketRouter;
