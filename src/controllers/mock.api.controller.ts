import MockApiService from '@/services/mock.api.service';
import { useFakerUtils } from '@/utils/faker/faker.utils';
import { NextFunction, Request, Response } from 'express';

class MockApiController {
  public mockApiService = new MockApiService();

  public getMockDataTemplate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { getFakerObjectsTemplate } = useFakerUtils(`${req.query.locale}`);
      const mockDataTemplate = await getFakerObjectsTemplate();

      res
        .status(200)
        .json({ data: mockDataTemplate, message: 'mockDataTemplate' });
    } catch (error) {
      next(error);
    }
  };

  public getMockDataByConfig = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const mockData = await this.mockApiService.getMockDataFromConfig(
        req.body.config,
        req.query,
      );

      res.status(200).json({ data: mockData, message: 'mockData' });
    } catch (error) {
      next(error);
    }
  };

  public getMockApiById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const apiId = req.params.id;
      const findApiData = await this.mockApiService.findMockApiById(apiId);

      res.status(200).json({ data: findApiData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getMockApiDataById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const apiId = req.params.id;
      const count = +req.query.count;

      const apiMockData = await this.mockApiService.findMockApiDataById(
        apiId,
        count,
      );

      res.status(200).json({ data: apiMockData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMockApi = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const apiData = req.body;
      const createApiData = await this.mockApiService.createMockApi(apiData);

      res.status(201).json({ data: createApiData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMockApi = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
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
