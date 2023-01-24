import Department from '../../types/department.type';

export interface IDepartmentService {
    getAll(): Promise<Department[]>;
    getById(id: string): Promise<Department | null>;
    create(department: Department): Promise<Department | null>;
    update(id: string, name: string): Promise<Department | null>;
    delete(id: string): Promise<Department | null>;
    addAisle(departmentId: string, aisleId: string): Promise<Department | null>;
}
