import Supermarket from '../../types/supermarket.type';

export interface ISupermarketService {
    getAll(): Promise<Supermarket[]>;
    getById(id: string): Promise<Supermarket | null>;
    create(aisle: Supermarket): Promise<Supermarket | null>;
    updateName(id: string, name: string): Promise<Supermarket | null>;
    updateLocation(id: string, location: string): Promise<Supermarket | null>;
    delete(id: string): Promise<Supermarket | null>;
    addAisle(supermarketId: string, aisleId: string): Promise<Supermarket | null>;
    addDepartment(supermarketId: string, departmentId: string): Promise<Supermarket | null>;
    addProduct(supermarketId: string, productId: string): Promise<Supermarket | null>;
}
