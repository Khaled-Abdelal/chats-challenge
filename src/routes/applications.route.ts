import { Router } from 'express';
import ApplicationsController from '@controllers/applications.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateApplicationDto } from '@/dtos/application.dto';

class ApplicationsRoute implements Routes {
  public path = '/applications';
  public router = Router();
  public applicationsController = new ApplicationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.applicationsController.getApplications);
    this.router.get(`${this.path}/:token`, this.applicationsController.getApplicationByToken);
    this.router.post(`${this.path}`, validationMiddleware(CreateApplicationDto, 'body'), this.applicationsController.createApplication);
    this.router.put(`${this.path}/:token`, validationMiddleware(CreateApplicationDto, 'body', true), this.applicationsController.updateApplication);
  }
}

export default ApplicationsRoute;
