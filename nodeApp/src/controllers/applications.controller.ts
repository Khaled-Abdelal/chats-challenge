import { NextFunction, Request, Response } from 'express';
import applicationService from '@services/applications.service';
import { CreateApplicationDto } from '@/dtos/application.dto';
import { ApplicationWithoutId } from '@/interfaces/application.interface';

class ApplicationsController {
  public applicationService = new applicationService();

  public getApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllApplicationsData: ApplicationWithoutId[] = await this.applicationService.findAllApplications();

      res.status(200).json({ data: findAllApplicationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getApplicationByToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.params.token;
      const findOneApplicationData: ApplicationWithoutId = await this.applicationService.findApplicationByToken(token);

      res.status(200).json({ data: findOneApplicationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const applicationData: CreateApplicationDto = req.body;
      const createApplicationData: ApplicationWithoutId = await this.applicationService.createApplication(applicationData);

      res.status(201).json({ data: createApplicationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.params.token;
      const applicationData: CreateApplicationDto = req.body;
      const updateApplicationData: ApplicationWithoutId = await this.applicationService.updateApplication(token, applicationData);

      res.status(200).json({ data: updateApplicationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApplicationsController;
