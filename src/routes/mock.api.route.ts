import { MockApiBody, MockApiQuery } from '@/dtos/mock.api.dto';
import MockApiController from '@controllers/mock.api.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class MockApiRoute implements Routes {
  public path = '';
  public router = Router();
  public mockApiController = new MockApiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // GET /api
    this.router.get(
      `${this.path}/template/`,
      validationMiddleware(MockApiQuery, 'query'),
      this.mockApiController.getMockDataPayloadTemplate,
    );

    this.router.get(
      `${this.path}/sample/`,
      validationMiddleware(MockApiQuery, 'query'),
      this.mockApiController.getMockDataSample,
    );

    // POST /api
    this.router.post(
      `${this.path}`,
      validationMiddleware(MockApiBody, 'body'),
      validationMiddleware(MockApiQuery, 'query'),
      this.mockApiController.getMockDataByConfig,
    );

    // GET /api/:id/data
    this.router.get(
      `${this.path}/:id/data`,
      validationMiddleware(MockApiQuery, 'query'),
      this.mockApiController.getMockApiDataById,
    );

    // GET /api/:id
    this.router.get(`${this.path}/:id`, this.mockApiController.getMockApiById);

    // POST /api/create
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(MockApiBody, 'body'),
      this.mockApiController.createMockApi,
    );

    // DELETE /api/:id
    this.router.delete(
      `${this.path}/:id`,
      this.mockApiController.deleteMockApi,
    );
  }
}

export default MockApiRoute;
