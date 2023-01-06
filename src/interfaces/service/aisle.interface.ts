import Aisle from '../../types/aisle.type';

export interface IAisleService {
    getAll(): Promise<Aisle[]>;
    getById(id: string): Promise<Aisle | null>;
    create(aisle: Aisle): Promise<Aisle | null>;
    update(id: string, name: string): Promise<Aisle | null>;
    delete(id: string): Promise<Aisle | null>;
    addProduct(aisleId: string, productId: string): Promise<Aisle | null>;
}
