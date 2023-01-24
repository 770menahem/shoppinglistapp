import { AisleController } from './../src/express/controllers/aisle.controller';
import * as request from 'supertest';
import AisleRouter from '../src/express/routes/aisle.route';
import App from '../src/express/app';
import { IAisleService } from '../src/interfaces/service/aisle.interface';
import * as express from 'express';
import Aisle from '../src/types/aisle.type';

class mockAisleService implements IAisleService {
    async getAll(): Promise<Aisle[]> {
        return [];
    }
    async getById(id: string): Promise<Aisle | null> {
        return { id } as any;
    }
    async create(aisle: Aisle): Promise<Aisle | null> {
        return aisle;
    }
    async update(id: string, name: string): Promise<Aisle | null> {
        return { id, name } as any;
    }
    async delete(id: string): Promise<Aisle | null> {
        return { id } as any;
    }
    async addProduct(aisleId: string, productId: string): Promise<Aisle | null> {
        return { aisleId, products: [productId] } as any;
    }
    async removeProduct(aisleId: string, _productId: string): Promise<Aisle | null> {
        return { aisleId, products: [] } as any;
    }
}

const mockAuth = jest.fn((_req, _res, next) => next());

describe('Aisle Router', () => {
    let app: express.Application;
    beforeAll(async () => {
        const aisleRouter = new AisleRouter(new AisleController(new mockAisleService()), mockAuth);
        const server = new App(1000, [aisleRouter]);
        server.start();
        app = server.getApp();
    });
    describe('GET /aisles', () => {
        it('should return a list of aisles', async () => {
            const res = await request(app).get('/aisles');

            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });
    });
    it('should return an aisle on GET /aisles/:aisleId', async () => {
        const aisleId = 'test-aisle';
        const res = await request(app).get(`/aisles/${aisleId}`);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ id: aisleId });
    });

    it('should add a product to an aisle on PATCH /aisles/:aisleId/product/:productId', async () => {
        const aisleId = 'test-aisle';
        const productId = 'test-product';
        const res = await request(app).patch(`/aisles/${aisleId}/product/${productId}`);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ id: aisleId, products: [productId] });
    });

    it('should remove a product from an aisle on DELETE /aisles/:aisleId/product/:productId', async () => {
        const aisleId = 'test-aisle';
        const productId = 'test-product';
        const res = await request(app).delete(`/aisles/${aisleId}/product/${productId}`);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ id: aisleId, products: [] });
    });
});
