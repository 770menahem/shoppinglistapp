import mongoose from 'mongoose';
import config from '../../config/config';
import aisle from '../../types/aisle.type';

const { mongo } = config;

const aisleSchema = new mongoose.Schema<aisle>(
    {
        number: { type: Number, required: true },
        products: [{ type: mongoose.Types.ObjectId, ref: mongo.collectionsNames.product }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        direction: { type: String, required: true },
    },
    { versionKey: false },
);

const Aisle = mongoose.model<aisle>(mongo.collectionsNames.aisle, aisleSchema);
export default Aisle;
