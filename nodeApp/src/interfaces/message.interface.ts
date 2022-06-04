import { Message } from '@prisma/client';

export type MessageWithoutId = Omit<Message, 'id'>;
