import { Response, Request } from 'express';

export interface ISupermarketController {
    create(req: Request, res: Response): Promise<void>;
    updateName(req: Request, res: Response): Promise<void>;
    updateLocation(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    addProduct(req: Request, res: Response): Promise<void>;
    addDepartment(req: Request, res: Response): Promise<void>;
    addAisle(req: Request, res: Response): Promise<void>;
}
