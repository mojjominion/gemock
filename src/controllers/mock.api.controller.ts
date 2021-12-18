import MockApiService from '@/services/mock.api.service';
import { NextFunction, Request, Response } from 'express';

class MockApiController {
  public mockApiService = new MockApiService();

  public getMockApiById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiId = req.params.id;
      const findApiData = await this.mockApiService.findMockApiById(apiId);

      res.status(200).json({ data: findApiData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMockApi = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiData = req.body;
      const createApiData = await this.mockApiService.createMockApi(apiData);

      res.status(201).json({ data: createApiData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMockApi = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiId = req.params.id;
      const deleteApiData = await this.mockApiService.deleteMockApi(apiId);

      res.status(200).json({ data: deleteApiData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default MockApiController;
