import { IAisleService } from '../../interfaces/service/aisle.interface';
import { Request, Response } from 'express';
import Aisle from '../../types/aisle.type';
import { IAisleController } from '../../interfaces/controller/aisle.interface';
import { logInfo } from '../../log/logger';

export class AisleController implements IAisleController {
    private aisleService: IAisleService;

    constructor(aisleService: IAisleService) {
        logInfo('AisleController created');
        this.aisleService = aisleService;
    }

    public create = async (req: Request, res: Response) => {
        const newAisle = req.body;
        const aisle: Aisle | null = await this.aisleService.create(newAisle);
        if (!aisle) res.status(404).send({ error: 'fail to create aisle' });
        else res.send(aisle);
    };

    public update = async (req: Request, res: Response) => {
        const aisleId = req.params.aisleId;
        const description = req.body.description;
        const aisle: Aisle | null = await this.aisleService.update(aisleId, description);
        if (!aisle) res.status(404).send({ error: 'fail to update aisle' });
        else res.send(aisle);
    };

    public delete = async (req: Request, res: Response) => {
        const aisleId = req.params.aisleId;
        const aisle: Aisle | null = await this.aisleService.delete(aisleId);
        if (!aisle) res.status(404).send({ error: 'fail to delete aisle' });
        else res.send({ msg: 'Aisle deleted successfully', aisle });
    };

    public getById = async (req: Request, res: Response) => {
        const aisleId = req.params.aisleId;
        const aisle: Aisle | null = await this.aisleService.getById(aisleId);
        if (!aisle) res.status(404).send('aisle not found');
        else res.send(aisle);
    };

    public getAll = async (_req: Request, res: Response) => {
        const aisles: Aisle[] | null = await this.aisleService.getAll();
        if (!aisles) res.status(404).send({ error: 'fail to get all aisles' });
        else res.send(aisles);
    };

    public addProduct = async (req: Request, res: Response) => {
        const { aisleId } = req.params;
        const productId = req.body.productId;

        const aisle = await this.aisleService.getById(aisleId);
        if (!aisle) {
            res.status(404).send({ message: 'Aisle not found' });
            return;
        }

        const updatedAisle = await this.aisleService.addProduct(aisleId, productId);
        if (!updatedAisle) {
            res.status(500).send({ message: 'Error adding product to aisle' });
            return;
        }

        res.send(updatedAisle);
    };
}
