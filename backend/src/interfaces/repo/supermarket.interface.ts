import Supermarket from '../../types/supermarket.type';

export interface ISupermarketRepo {
    create(supermarket: Supermarket): Promise<Supermarket>;
    updateName(supermarketId: string, name: string): Promise<Supermarket | null>;
    updateLocation(supermarketId: string, location: string): Promise<Supermarket | null>;
    delete(supermarketId: string): Promise<Supermarket | null>;
    getById(supermarketId: string): Promise<Supermarket | null>;
    getAll(): Promise<Supermarket[]>;
    addAisle(supermarketId: string, aisleId: string): Promise<Supermarket | null>;
    addDepartment(supermarketId: string, departmentId: string): Promise<Supermarket | null>;
    addProduct(supermarketId: string, productId: string): Promise<Supermarket | null>;
}
