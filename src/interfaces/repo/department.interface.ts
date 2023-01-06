import Department from '../../types/department.type';

export interface IDepartmentRepo {
    create(department: Department): Promise<Department>;
    update(departmentId: string, name: string): Promise<Department | null>;
    delete(departmentId: string): Promise<Department | null>;
    getById(departmentId: string): Promise<Department | null>;
    getAll(): Promise<Department[]>;
    addAisle(departmentId: string, aisleId: string): Promise<Department | null>;
}
