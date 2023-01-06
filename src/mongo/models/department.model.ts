import mongoose from 'mongoose';
import config from '../../config/config';
import Department from '../../types/department.type';

const { mongo } = config;

const departmentSchema = new mongoose.Schema<Department>(
    {
        name: { type: String, required: true },
        aisles: [{ type: mongoose.Types.ObjectId, ref: mongo.collectionsNames.aisle }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { versionKey: false },
);

const Department = mongoose.model<Department>(mongo.collectionsNames.department, departmentSchema);
export default Department;
