import { CreateMockApiDto, MockApiBody } from '@/dtos/mock.api.dto';
import MockApiController from '@controllers/mock.api.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class MockApiRoute implements Routes {
  public path = '/api';
  public router = Router();
  public mockApiController = new MockApiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:count`, validationMiddleware(MockApiBody, 'body'), this.mockApiController.getMockDataByConfig);
    this.router.get(`${this.path}/:id`, this.mockApiController.getMockApiById);
    this.router.post(`${this.path}`, validationMiddleware(CreateMockApiDto, 'body'), this.mockApiController.createMockApi);
    //     this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.mockApiController.);
    this.router.delete(`${this.path}/:id`, this.mockApiController.deleteMockApi);
  }
}

export default MockApiRoute;
