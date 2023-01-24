import mongoose from 'mongoose';
import config from '../../config/config';
import { ISupermarketRepo } from '../../interfaces/repo/supermarket.interface';
import Supermarket from '../../types/supermarket.type';

const colNames = config.mongo.collectionsNames;
const departmentColl = colNames.department.toLowerCase() + 's';
const aislesColl = colNames.aisle.toLowerCase() + 's';
const productsColl = colNames.product.toLowerCase() + 's';

export class SupermarketRepository implements ISupermarketRepo {
    private SupermarketModel: mongoose.Model<Supermarket>;
    private populate = {
        path: departmentColl,
        model: colNames.department,
        populate: {
            path: aislesColl,
            model: colNames.aisle,
            populate: {
                path: productsColl,
                model: colNames.product,
            },
        },
    };

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
        const supermarket = this.SupermarketModel.findById(supermarketId).populate(this.populate);
        return supermarket;
    }

    async getAll(): Promise<Supermarket[]> {
        const supermarkets = await this.SupermarketModel.find({}).populate(this.populate);
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
