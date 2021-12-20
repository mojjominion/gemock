import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET /users
    this.router.get(`${this.path}`, this.usersController.getUsers);

    // GET /users/:id
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);

    // POST /users
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser,
    );

    // PUT users/:id
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser,
    );

    // DELETE users/:id
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
