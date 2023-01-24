import { IDepartmentRepo } from '../../interfaces/repo/department.interface';
import { IDepartmentService } from '../../interfaces/service/department.interface';
import Department from '../../types/department.type';

export class DepartmentService implements IDepartmentService {
    private departmentRepo: IDepartmentRepo;

    constructor(departmentRepo: IDepartmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    async getAll(): Promise<Department[]> {
        const departments = await this.departmentRepo.getAll();
        return departments;
    }

    async getById(id: string): Promise<Department | null> {
        const department = await this.departmentRepo.getById(id);
        return department;
    }

    async create(department: Department): Promise<Department | null> {
        const newDepartment = await this.departmentRepo.create(department);
        return newDepartment;
    }

    async update(id: string, name: string): Promise<Department | null> {
        const updatedDepartment = await this.departmentRepo.update(id, name);
        return updatedDepartment;
    }

    async delete(id: string): Promise<Department | null> {
        const deletedDepartment = await this.departmentRepo.delete(id);
        return deletedDepartment;
    }

    async addAisle(departmentId: string, aisleId: string): Promise<Department | null> {
        const updatedDepartment = await this.departmentRepo.addAisle(departmentId, aisleId);
        return updatedDepartment;
    }
}
