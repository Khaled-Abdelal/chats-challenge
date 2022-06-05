import { logger } from '@/utils/logger';
import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const chatDB = prismaClient.chat;
const applicationDB = prismaClient.application;

// TODO: separate to a data layer
const _findChats = async () => {
  const a20MinuteAgo = new Date(Date.now() - 20 * 1000 * 60);

  const chats = await chatDB.findMany({
    where: {
      createdAt: {
        lte: new Date(),
        gte: a20MinuteAgo,
      },
    },
    distinct: ['applicationToken'],
    orderBy: {
      // return the chats with the highest number
      number: 'desc',
    },
    select: {
      applicationToken: true,
      number: true,
    },
  });
  return chats;
};

// TODO: separate to a data layer
const _updateApplicationCount = async (chat) => {
  await applicationDB.update({
    // set the count to the max chat count
    where: {
      token: chat.applicationToken,
    },
    data: {
      chatsCount: chat.number,
    },
  });
  logger.info(`Updated Chats Count for app ${chat.applicationToken}`)
};

const updateChatsCountHandler = async () => {
  try {
    logger.info('Updated Chats Count Cron started ...');
    const chats = await _findChats(); // return the chats that have been created in the last 20 min
    for (const chat of chats) {
      try {
        await _updateApplicationCount(chat);
      } catch (error) {
        logger.error(`Error Updating Chats Count for ${chat.applicationToken} ${error}`);
      }
    }
    logger.info('Update Chat Count Cron Is Done ...');
  } catch (error) {
    logger.error(`Error in Updating chats count ${error}`);
  }
};

const job = new CronJob('*/20 * * * * *', updateChatsCountHandler, null, true);

export default job;
