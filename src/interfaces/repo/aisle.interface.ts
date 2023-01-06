import Aisle from '../../types/aisle.type';

export interface IAisleRepo {
    create(aisle: Aisle): Promise<Aisle>;
    update(aisleId: string, name: string): Promise<Aisle | null>;
    delete(aisleId: string): Promise<Aisle | null>;
    getById(aisleId: string): Promise<Aisle | null>;
    getAll(): Promise<Aisle[]>;
    addProduct(aisleId: string, productId: string): Promise<Aisle | null>;
}
