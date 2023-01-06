import mongoose from 'mongoose';
import { ISupermarketRepo } from '../../interfaces/repo/supermarket.interface';
import Supermarket from '../../types/supermarket.type';

export class SupermarketRepository implements ISupermarketRepo {
    private SupermarketModel: mongoose.Model<Supermarket>;

    constructor(supermarketModel: mongoose.Model<Supermarket>) {
        this.SupermarketModel = supermarketModel;
    }

    async create(supermarket: Supermarket): Promise<Supermarket> {
        const newSupermarket = await this.SupermarketModel.create(supermarket);
        return newSupermarket;
    }

    async updateName(supermarketId: string, name: string): Promise<Supermarket | null> {
        const updatedSupermarket = this.SupermarketModel.findByIdAndUpdate(supermarketId, { name }, { new: true });
        return updatedSupermarket;
    }
    async updateLocation(supermarketId: string, location: string): Promise<Supermarket | null> {
        const updatedSupermarket = this.SupermarketModel.findByIdAndUpdate(supermarketId, { location }, { new: true });
        return updatedSupermarket;
    }

    async delete(supermarketId: string): Promise<Supermarket | null> {
        const deletedSupermarket = this.SupermarketModel.findByIdAndDelete(supermarketId);
        return deletedSupermarket;
    }

    async getById(supermarketId: string): Promise<Supermarket | null> {
        const supermarket = this.SupermarketModel.findById(supermarketId).populate('products');
        return supermarket;
    }

    async getAll(): Promise<Supermarket[]> {
        const supermarkets = await this.SupermarketModel.find({}).populate('products');
        return supermarkets;
    }

    async addAisle(supermarketId: string, aisleId: string): Promise<Supermarket | null> {
        const updatedSupermarket = this.addElement(supermarketId, aisleId, 'aisles');
        return updatedSupermarket;
    }

    async addDepartment(supermarketId: string, departmentId: string): Promise<Supermarket | null> {
        const updatedSupermarket = this.addElement(supermarketId, departmentId, 'departments');
        return updatedSupermarket;
    }

    async addProduct(supermarketId: string, productId: string): Promise<Supermarket | null> {
        const updatedSupermarket = this.addElement(supermarketId, productId, 'products');
        return updatedSupermarket;
    }

    private async addElement(supermarketId: string, elementId: string, field: string): Promise<Supermarket | null> {
        const updatedSupermarket = this.SupermarketModel.findByIdAndUpdate(
            supermarketId,
            {
                $push: { [field]: elementId },
            },
            { new: true },
        );
        return updatedSupermarket;
    }
}
