import request from 'supertest';
import App from '@/app';
import { CreateApplicationDto } from '@dtos/application.dto';
import ApplicationRoute from '@routes/applications.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe.only('Testing Applications', () => {
  describe('[GET] /Applications', () => {
    it('response findAll applications', async () => {
      const applicationsRoute = new ApplicationRoute();
      const applications = applicationsRoute.applicationsController.applicationService.applications;

      applications.findMany = jest.fn().mockReturnValue([
        {
          name: 'a test name',
          token: '1234',
        },
        {
          name: 'b test name',
          token: '64346',
        },
      ]);

      const app = new App([applicationsRoute]);
      return request(app.getServer()).get(`${applicationsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /applications/:token', () => {
    it('response findOne token', async () => {
      const applicationToken = 'test_token';

      const applicationsRoute = new ApplicationRoute();
      const applications = applicationsRoute.applicationsController.applicationService.applications;

      applications.findUnique = jest.fn().mockReturnValue({
        name: 'a name',
        token: 'test_token',
      });

      const app = new App([applicationsRoute]);
      return request(app.getServer()).get(`${applicationsRoute.path}/${applicationToken}`).expect(200);
    });
  });

  describe('[POST] /applications', () => {
    it('response Create user', async () => {
      const applicationData: CreateApplicationDto = {
        name: 'a name',
      };

      const applicationsRoute = new ApplicationRoute();
      const applications = applicationsRoute.applicationsController.applicationService.applications;

      applications.create = jest.fn().mockReturnValue({
        name: 'a name',
      });

      const app = new App([applicationsRoute]);
      return request(app.getServer()).post(`${applicationsRoute.path}`).send(applicationData).expect(201);
    });
  });

  describe('[PUT] /applications/:id', () => {
    it('response Update application', async () => {
      const token = 'token';
      const applicationData: CreateApplicationDto = {
        name: 'a name',
      };

      const applicationsRoute = new ApplicationRoute();
      const applications = applicationsRoute.applicationsController.applicationService.applications;

      applications.update = jest.fn().mockReturnValue({
        name: 'b name',
      });

      const app = new App([applicationsRoute]);
      return request(app.getServer()).put(`${applicationsRoute.path}/${token}`).send(applicationData).expect(200);
    });
  });
});
