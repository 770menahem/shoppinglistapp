import { IDepartmentService } from '../../interfaces/service/department.interface';
import { Request, Response } from 'express';
import Department from '../../types/department.type';
import { IDepartmentController } from '../../interfaces/controller/department.interface';
import { logInfo } from '../../log/logger';

export class DepartmentController implements IDepartmentController {
    private departmentService: IDepartmentService;

    constructor(departmentService: IDepartmentService) {
        logInfo('DepartmentController created');
        this.departmentService = departmentService;
    }

    public create = async (req: Request, res: Response) => {
        const newDepartment = req.body;
        const department: Department | null = await this.departmentService.create(newDepartment);
        if (!department) res.status(404).send({ error: 'fail to create department' });
        else res.send(department);
    };

    public update = async (req: Request, res: Response) => {
        const departmentId = req.params.departmentId;
        const name = req.body.name;
        const department: Department | null = await this.departmentService.update(departmentId, name);
        if (!department) res.status(404).send({ error: 'fail to update department' });
        else res.send(department);
    };

    public delete = async (req: Request, res: Response) => {
        const departmentId = req.params.departmentId;
        const department: Department | null = await this.departmentService.delete(departmentId);
        if (!department) res.status(404).send({ error: 'fail to delete department' });
        else res.send({ msg: 'Department deleted successfully', department });
    };

    public getById = async (req: Request, res: Response) => {
        const departmentId = req.params.departmentId;
        const department: Department | null = await this.departmentService.getById(departmentId);
        if (!department) res.status(404).send('department not found');
        else res.send(department);
    };

    public getAll = async (_req: Request, res: Response) => {
        const departments: Department[] | null = await this.departmentService.getAll();
        if (!departments) res.status(404).send({ error: 'fail to get all departments' });
        else res.send(departments);
    };

    public addAisle = async (req: Request, res: Response) => {
        const { departmentId } = req.params;
        const aisleId = req.body.productId;

        const department = await this.departmentService.getById(departmentId);
        if (!department) {
            res.status(404).send({ message: 'Department not found' });
            return;
        }

        const updatedDepartment = await this.departmentService.addAisle(departmentId, aisleId);
        if (!updatedDepartment) {
            res.status(500).send({ message: 'Error adding product to department' });
            return;
        }

        res.send(updatedDepartment);
    };
}
