import { IAisleRepo } from '../../interfaces/repo/aisle.interface';
import { IAisleService } from '../../interfaces/service/aisle.interface';
import Aisle from '../../types/aisle.type';

export class AisleService implements IAisleService {
    private aisleRepo: IAisleRepo;

    constructor(aisleRepo: IAisleRepo) {
        this.aisleRepo = aisleRepo;
    }

    async getAll(): Promise<Aisle[]> {
        const aisles = await this.aisleRepo.getAll();
        return aisles;
    }

    async getById(id: string): Promise<Aisle | null> {
        const aisle = await this.aisleRepo.getById(id);
        return aisle;
    }

    async create(aisle: Aisle): Promise<Aisle | null> {
        const newAisle = await this.aisleRepo.create(aisle);
        return newAisle;
    }

    async update(id: string, name: string): Promise<Aisle | null> {
        const updatedAisle = await this.aisleRepo.update(id, name);
        return updatedAisle;
    }

    async delete(id: string): Promise<Aisle | null> {
        const deletedAisle = await this.aisleRepo.delete(id);
        return deletedAisle;
    }

    async addProduct(aisleId: string, productId: string): Promise<Aisle | null> {
        const updatedAisle = await this.aisleRepo.addProduct(aisleId, productId);
        return updatedAisle;
    }
}
