import { ISupermarketService } from '../../interfaces/service/supermarket.interface';
import { Request, Response } from 'express';
import Supermarket from '../../types/supermarket.type';
import { ISupermarketController } from '../../interfaces/controller/supermarket.interface';
import { logInfo } from '../../log/logger';

export class SupermarketController implements ISupermarketController {
    private supermarketService: ISupermarketService;

    constructor(supermarketService: ISupermarketService) {
        logInfo('SupermarketController created');
        this.supermarketService = supermarketService;
    }

    public create = async (req: Request, res: Response) => {
        const newSupermarket = req.body;
        const supermarket: Supermarket | null = await this.supermarketService.create(newSupermarket);
        if (!supermarket) res.status(404).send({ error: 'fail to create supermarket' });
        else res.send(supermarket);
    };

    public updateName = async (req: Request, res: Response) => {
        const supermarketId = req.params.supermarketId;
        const name = req.body.name;
        const supermarket: Supermarket | null = await this.supermarketService.updateName(supermarketId, name);
        if (!supermarket) res.status(404).send({ error: 'fail to update supermarket' });
        else res.send(supermarket);
    };
    public updateLocation = async (req: Request, res: Response) => {
        const supermarketId = req.params.supermarketId;
        const location = req.body.location;
        const supermarket: Supermarket | null = await this.supermarketService.updateLocation(supermarketId, location);
        if (!supermarket) res.status(404).send({ error: 'fail to update supermarket' });
        else res.send(supermarket);
    };

    public delete = async (req: Request, res: Response) => {
        const supermarketId = req.params.supermarketId;
        const supermarket: Supermarket | null = await this.supermarketService.delete(supermarketId);
        if (!supermarket) res.status(404).send({ error: 'fail to delete supermarket' });
        else res.send({ msg: 'Supermarket deleted successfully', supermarket });
    };

    public getById = async (req: Request, res: Response) => {
        const supermarketId = req.params.supermarketId;
        const supermarket: Supermarket | null = await this.supermarketService.getById(supermarketId);
        if (!supermarket) res.status(404).send('supermarket not found');
        else res.send(supermarket);
    };

    public getAll = async (_req: Request, res: Response) => {
        const supermarkets: Supermarket[] | null = await this.supermarketService.getAll();
        if (!supermarkets) res.status(404).send({ error: 'fail to get all supermarkets' });
        else res.send(supermarkets);
    };

    public addAisle = async (req: Request, res: Response) => {
        const { supermarketId } = req.params;
        const aisleId = req.body.aisleId;

        const supermarket = await this.supermarketService.getById(supermarketId);
        if (!supermarket) {
            res.status(404).send({ message: 'Supermarket not found' });
            return;
        }

        const updatedSupermarket = await this.supermarketService.addAisle(supermarketId, aisleId);
        if (!updatedSupermarket) {
            res.status(500).send({ message: 'Error adding product to supermarket' });
            return;
        }

        res.send(updatedSupermarket);
    };
    public addDepartment = async (req: Request, res: Response) => {
        const { supermarketId, departmentId } = req.params;

        const supermarket = await this.supermarketService.getById(supermarketId);
        if (!supermarket) {
            res.status(404).send({ message: 'Supermarket not found' });
            return;
        }

        const updatedSupermarket = await this.supermarketService.addDepartment(supermarketId, departmentId);
        if (!updatedSupermarket) {
            res.status(500).send({ message: 'Error adding product to supermarket' });
            return;
        }

        res.send(updatedSupermarket);
    };
    public addProduct = async (req: Request, res: Response) => {
        const { supermarketId } = req.params;
        const productId = req.body.productId;

        const supermarket = await this.supermarketService.getById(supermarketId);
        if (!supermarket) {
            res.status(404).send({ message: 'Supermarket not found' });
            return;
        }

        const updatedSupermarket = await this.supermarketService.addProduct(supermarketId, productId);
        if (!updatedSupermarket) {
            res.status(500).send({ message: 'Error adding product to supermarket' });
            return;
        }

        res.send(updatedSupermarket);
    };
}
