import mongoose from 'mongoose';
import { IAisleRepo } from '../../interfaces/repo/aisle.interface';
import Aisle from '../../types/aisle.type';

export class AisleRepository implements IAisleRepo {
    private AisleModel: mongoose.Model<Aisle>;

    constructor(aisleModel: mongoose.Model<Aisle>) {
        this.AisleModel = aisleModel;
    }

    async create(aisle: Aisle): Promise<Aisle> {
        const newAisle = await this.AisleModel.create(aisle);
        return newAisle;
    }

    async update(aisleId: string, name: string): Promise<Aisle | null> {
        return this.AisleModel.findByIdAndUpdate(aisleId, { name }, { new: true });
    }

    async delete(aisleId: string): Promise<Aisle | null> {
        return this.AisleModel.findByIdAndDelete(aisleId);
    }

    async getById(aisleId: string): Promise<Aisle | null> {
        return this.AisleModel.findById(aisleId).populate('products');
    }

    async getAll(): Promise<Aisle[]> {
        const aisles = await this.AisleModel.find({}).populate('products');
        return aisles;
    }

    async addProduct(aisleId: string, productId: string): Promise<Aisle | null> {
        return this.AisleModel.findByIdAndUpdate(
            aisleId,
            {
                $push: { products: productId },
            },
            { new: true },
        ).populate('products');
    }

    async removeProduct(aisleId: string, productId: string): Promise<Aisle | null> {
        return this.AisleModel.findByIdAndUpdate(
            aisleId,
            {
                $unset: { products: productId },
            },
            { new: true },
        ).populate('products');
    }
}
