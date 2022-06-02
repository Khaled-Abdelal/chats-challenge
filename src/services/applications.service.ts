import { PrismaClient } from '@prisma/client';
import { CreateApplicationDto } from '@dtos/application.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty, prismaCustomErrorHandler } from '@utils/util';
import { v4 as uuidv4 } from 'uuid';
import { ApplicationWithoutId } from '@/interfaces/application.interface';

class ApplicationService {
  public applications = new PrismaClient().application;

  public async findAllApplications(): Promise<ApplicationWithoutId[]> {
    const allApps: ApplicationWithoutId[] = await this.applications.findMany({
      select: {
        name: true,
        token: true,
      },
    });
    return allApps;
  }

  public async findApplicationByToken(token: string): Promise<ApplicationWithoutId> {
    if (isEmpty(token)) throw new HttpException(400, 'Token is invalid');

    const findAPP: ApplicationWithoutId = await this.applications.findUnique({ where: { token }, select: { name: true, token: true } });
    if (!findAPP) throw new HttpException(404, 'Record not found');

    return findAPP;
  }

  public async createApplication(applicationData: CreateApplicationDto): Promise<ApplicationWithoutId> {
    if (isEmpty(applicationData)) throw new HttpException(400, 'Application Date is invalid');
    const token = uuidv4();
    const createApplicationData: ApplicationWithoutId = await this.applications.create({
      data: { token, ...applicationData },
      select: { name: true, token: true },
    });
    return createApplicationData;
  }

  public async updateApplication(token: string, applicationData: CreateApplicationDto): Promise<ApplicationWithoutId> {
    if (isEmpty(applicationData)) throw new HttpException(400, 'Record is invalid');
    try {
      const updateData: ApplicationWithoutId = await this.applications.update({
        where: { token },
        data: { ...applicationData },
        select: { name: true, token: true },
      });
      return updateData;
    } catch (error) {
      prismaCustomErrorHandler(error);
    }
  }
}

export default ApplicationService;
