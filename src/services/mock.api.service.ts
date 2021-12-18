import { CreateMockApiDto } from '@/dtos/mock.api.dto';
import mockApiModel from '@/models/mock.api.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class MockApiService {
  public mockApis = mockApiModel;

  public async findMockApiById(mockApiId: string) {
    if (isEmpty(mockApiId)) throw new HttpException(400, 'Api id can not be null');

    const findApi = await this.mockApis.findOne({ _id: mockApiId });
    if (!findApi) throw new HttpException(409, 'No api found');

    return findApi;
  }

  public async createMockApi(mockApiData: CreateMockApiDto) {
    if (isEmpty(mockApiData)) throw new HttpException(400, "You're not userData");

    const createMockApiData = await this.mockApis.create(mockApiData);

    return createMockApiData;
  }

  public async updateMockApi(mockApiId: string, mockApiData: CreateMockApiDto) {
    if (isEmpty(mockApiData)) throw new HttpException(400, "You're not userData");

    if (mockApiId) {
      const findMockApi = await this.mockApis.findOne({ _id: mockApiId });
      if (!findMockApi) throw new HttpException(409, `You're email ${mockApiData} already exists`);
    }

    const updateMockApiById = await this.mockApis.findByIdAndUpdate(mockApiId, mockApiData);
    if (!updateMockApiById) throw new HttpException(409, `Api ${mockApiId} not found`);

    return updateMockApiById;
  }

  public async deleteMockApi(mockApiId: string) {
    const deleteMockApiById = await this.mockApis.findByIdAndDelete(mockApiId);
    if (!deleteMockApiById) throw new HttpException(409, `Api ${mockApiId} not found`);

    return deleteMockApiById;
  }
}

export default MockApiService;
