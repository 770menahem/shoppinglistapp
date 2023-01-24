import { SupermarketRepository } from './mongo/repo/supermarket.repo';
import { DepartmentRepository } from './mongo/repo/department.repo';
import { UserRepo } from './mongo/repo/user.repo';
import App from './express/app';
import UserRouter from './express/routes/user.route';
import { userModel } from './mongo/models/user.model';
import { UserService } from './express/services/user.service';
import { UserController } from './express/controllers/user.controller';
import { BlogController } from './express/controllers/blog.controller';
import BlogRouter from './express/routes/blog.route';
import { BlogService } from './express/services/blog.service';
import blogModel from './mongo/models/blog.model';
import productModel from './mongo/models/product.model';
import { BlogRepo } from './mongo/repo/blog.repo';
import Auth from './express/services/auth.service';
import { ProductRepo } from './mongo/repo/product.repo';
import { AisleRepository } from './mongo/repo/aisle.repo';
import aisleModel from './mongo/models/aisle.model';
import departmentModel from './mongo/models/department.model';
import supermarketModel from './mongo/models/supermarket.model';
import { AisleService } from './express/services/aisle.service';
import { DepartmentService } from './express/services/department.service';
import { ProductService } from './express/services/product.service';
import { SupermarketService } from './express/services/supermarket.service';
import { AisleController } from './express/controllers/aisle.controller';
import { DepartmentController } from './express/controllers/department.controller';
import { ProductController } from './express/controllers/product.controller';
import { SupermarketController } from './express/controllers/supermarket.controller';
import AisleRouter from './express/routes/aisle.route';
import DepartmentRouter from './express/routes/department.route';
import ProductRouter from './express/routes/product.route';
import SupermarketRouter from './express/routes/supermarket.route';

export function initializeExpress(port: number) {
    const userRepo = new UserRepo(userModel);
    const blogRepo = new BlogRepo(blogModel);

    const productRepo = new ProductRepo(productModel);
    const aisleRepo = new AisleRepository(aisleModel);
    const departmentRepo = new DepartmentRepository(departmentModel);
    const supermarketRepo = new SupermarketRepository(supermarketModel);

    const userService = new UserService(userRepo);
    const blogService = new BlogService(blogRepo);

    const productService = new ProductService(productRepo);
    const aisleService = new AisleService(aisleRepo);
    const departmentService = new DepartmentService(departmentRepo);
    const supermarketService = new SupermarketService(supermarketRepo);

    const userController = new UserController(userService);
    const blogController = new BlogController(blogService);

    const productController = new ProductController(productService);
    const aisleController = new AisleController(aisleService);
    const departmentController = new DepartmentController(departmentService);
    const supermarketController = new SupermarketController(supermarketService);

    const auth = new Auth(userService.auth);

    const userRouter = new UserRouter(userController, auth.check);
    const blogRouter = new BlogRouter(blogController, auth.check);

    const productRouter = new ProductRouter(productController, auth.check);
    const aisleRouter = new AisleRouter(aisleController, auth.check);
    const departmentRouter = new DepartmentRouter(departmentController, auth.check);
    const supermarketRouter = new SupermarketRouter(supermarketController, auth.check);

    const app = new App(port, [userRouter, blogRouter, productRouter, aisleRouter, departmentRouter, supermarketRouter]);
    return app;
}
