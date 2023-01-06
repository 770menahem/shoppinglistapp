import mongoose from 'mongoose';
import { IDepartmentRepo } from '../../interfaces/repo/department.interface';
import Department from '../../types/department.type';

export class DepartmentRepository implements IDepartmentRepo {
    private DepartmentModel: mongoose.Model<Department>;

    constructor(departmentModel: mongoose.Model<Department>) {
        this.DepartmentModel = departmentModel;
    }

    async create(department: Department): Promise<Department> {
        const newDepartment = await this.DepartmentModel.create(department);
        return newDepartment;
    }

    async update(departmentId: string, name: string): Promise<Department | null> {
        return this.DepartmentModel.findByIdAndUpdate(departmentId, { name }, { new: true });
    }

    async delete(departmentId: string): Promise<Department | null> {
        return this.DepartmentModel.findByIdAndDelete(departmentId);
    }

    async getById(departmentId: string): Promise<Department | null> {
        return this.DepartmentModel.findById(departmentId).populate('products');
    }

    async getAll(): Promise<Department[]> {
        const departments = await this.DepartmentModel.find({}).populate('products');
        return departments;
    }

    async addAisle(departmentId: string, aisleId: string): Promise<Department | null> {
        return this.DepartmentModel.findByIdAndUpdate(
            departmentId,
            {
                $push: { products: aisleId },
            },
            { new: true },
        );
    }
}
