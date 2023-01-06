import * as express from 'express';
import { wrapController } from '../utils/wraps';
// import validateRequest from '../joi/joi';
// import { updateSchema, createSchema } from '../joi/validator/aisle.schema';
import { IAisleController } from '../../interfaces/controller/aisle.interface';

class AisleRouter {
    public path: string = '/aisles';
    public router = express.Router();
    private aisleController: IAisleController;
    private auth: express.RequestHandler;

    constructor(aisleController: IAisleController, auth: express.RequestHandler) {
        this.aisleController = aisleController;
        this.auth = auth;
        this.initializeRoutes();
    }

    public getRouter() {
        return this.router;
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('', wrapController(this.aisleController.getAll));
        this.router.get('/:aisleId', wrapController(this.aisleController.getById));
        this.router.patch('/:aisleId/product/:productId', wrapController(this.aisleController.addProduct));
        this.router.post('', wrapController(this.aisleController.create));
        this.router.put('/:aisleId', wrapController(this.aisleController.update));
        this.router.delete('/:aisleId', wrapController(this.aisleController.delete));
    }
}

export default AisleRouter;
