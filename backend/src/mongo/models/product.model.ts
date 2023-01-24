import mongoose from 'mongoose';
import config from '../../config/config';
import Product from '../../types/product.type';

const { mongo } = config;

const productSchema = new mongoose.Schema<Product>(
    {
        name: { type: String, required: true, unique: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { versionKey: false },
);

const Product = mongoose.model<Product>(mongo.collectionsNames.product, productSchema);

export default Product;
