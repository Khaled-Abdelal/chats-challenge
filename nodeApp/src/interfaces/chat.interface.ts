import { Chat } from '@prisma/client';

export type ChatWithoutId = Omit<Chat, 'id'>;
