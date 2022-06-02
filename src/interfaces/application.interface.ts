import { Application } from '@prisma/client';

export type ApplicationWithoutId = Omit<Application, 'id'>;
