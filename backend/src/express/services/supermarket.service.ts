import { ISupermarketRepo } from '../../interfaces/repo/supermarket.interface';
import { ISupermarketService } from '../../interfaces/service/supermarket.interface';
import Supermarket from '../../types/supermarket.type';

export class SupermarketService implements ISupermarketService {
    private supermarketRepo: ISupermarketRepo;

    constructor(supermarketRepo: ISupermarketRepo) {
        this.supermarketRepo = supermarketRepo;
    }

    async getAll(): Promise<Supermarket[]> {
        const supermarkets = await this.supermarketRepo.getAll();
        return supermarkets;
    }

    async getById(id: string): Promise<Supermarket | null> {
        const supermarket = await this.supermarketRepo.getById(id);
        return supermarket;
    }

    async create(supermarket: Supermarket): Promise<Supermarket | null> {
        const newSupermarket = await this.supermarketRepo.create(supermarket);
        return newSupermarket;
    }

    async updateName(id: string, name: string): Promise<Supermarket | null> {
        const updatedSupermarket = await this.supermarketRepo.updateName(id, name);
        return updatedSupermarket;
    }

    async updateLocation(id: string, name: string): Promise<Supermarket | null> {
        const updatedSupermarket = await this.supermarketRepo.updateLocation(id, name);
        return updatedSupermarket;
    }

    async delete(id: string): Promise<Supermarket | null> {
        const deletedSupermarket = await this.supermarketRepo.delete(id);
        return deletedSupermarket;
    }

    async addAisle(supermarketId: string, aisleId: string): Promise<Supermarket | null> {
        const updatedSupermarket = await this.supermarketRepo.addAisle(supermarketId, aisleId);
        return updatedSupermarket;
    }

    async addProduct(supermarketId: string, productId: string): Promise<Supermarket | null> {
        const updatedSupermarket = await this.supermarketRepo.addProduct(supermarketId, productId);
        return updatedSupermarket;
    }

    async addDepartment(supermarketId: string, departmentId: string): Promise<Supermarket | null> {
        const updatedSupermarket = await this.supermarketRepo.addDepartment(supermarketId, departmentId);
        return updatedSupermarket;
    }
}
