import * as mongoose from 'mongoose';
import config from '../../config/config';
import Supermarket from '../../types/supermarket.type';

const { mongo } = config;

const supermarketSchema = new mongoose.Schema<Supermarket>(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        aisles: [{ type: mongoose.Types.ObjectId, ref: mongo.collectionsNames.aisle }],
        departments: [{ type: mongoose.Types.ObjectId, ref: mongo.collectionsNames.department }],
        products: [{ type: mongoose.Types.ObjectId, ref: mongo.collectionsNames.product }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { versionKey: false },
);

const Supermarket = mongoose.model<Supermarket>(mongo.collectionsNames.supermarket, supermarketSchema);
export default Supermarket;
