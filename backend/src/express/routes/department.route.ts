import * as express from 'express';
import { wrapController } from '../utils/wraps';
// import validateRequest from '../joi/joi';
// import { updateSchema, createSchema } from '../joi/validator/department.schema';
import { IDepartmentController } from '../../interfaces/controller/department.interface';

class DepartmentRouter {
    public path: string = '/departments';
    public router = express.Router();
    private departmentController: IDepartmentController;
    private auth: express.RequestHandler;

    constructor(departmentController: IDepartmentController, auth: express.RequestHandler) {
        this.departmentController = departmentController;
        this.auth = auth;
        this.initializeRoutes();
    }

    public getRouter() {
        return this.router;
    }

    public initializeRoutes() {
        this.router.use(this.auth);
        this.router.get('', wrapController(this.departmentController.getAll));
        this.router.get('/:departmentId', wrapController(this.departmentController.getById));
        this.router.post('', wrapController(this.departmentController.create));
        this.router.put('/:departmentId', wrapController(this.departmentController.update));
        this.router.delete('/:departmentId', wrapController(this.departmentController.delete));
        this.router.patch('/:departmentId/aisle/:aisleId', wrapController(this.departmentController.addAisle));
    }
}

export default DepartmentRouter;
