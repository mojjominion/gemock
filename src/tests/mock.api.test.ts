import App from '@/app';
import MockApiRoute from '@/routes/mock.api.route';
import mongoose from 'mongoose';
import request from 'supertest';

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });

describe('Testing Mock Apis', () => {
  describe('[GET] /api', () => {
    it('response get Fake data for config', async () => {
      const mockApiRoute = new MockApiRoute();

      const config: NestedConfig = {
        Name: 'firstName',
        Address: 'streetAddress',
      };

      (mongoose as any).connect = jest.fn();
      const app = new App([mockApiRoute]);

      const count = 2;
      const res = await request(app.getServer())
        .post(`${mockApiRoute.path}?count=${count}`)
        .send({ config })
        .expect(200);

      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ Name: expect.any(String) }),
          expect.objectContaining({ Address: expect.any(String) }),
        ]),
      );

      expect(res.body.data.length).toEqual(count);
    });

    it('response count should match with body.count', async () => {
      const mockApiRoute = new MockApiRoute();

      const config: NestedConfig = {
        Name: 'firstName',
        Address: 'streetAddress',
      };

      (mongoose as any).connect = jest.fn();
      const app = new App([mockApiRoute]);

      const count = 5;
      const res = await request(app.getServer())
        .post(`${mockApiRoute.path}?count=${2}`)
        .send({ config, count: `${count}` })
        .expect(200);

      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ Name: expect.any(String) }),
          expect.objectContaining({ Address: expect.any(String) }),
        ]),
      );

      expect(res.body.data.length).toEqual(count);
    });
  });
});
