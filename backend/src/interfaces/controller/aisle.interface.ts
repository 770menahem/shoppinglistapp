import { Response, Request } from 'express';

export interface IAisleController {
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
    addProduct(req: Request, res: Response): Promise<void>;
    removeProduct(req: Request, res: Response): Promise<void>;
}
