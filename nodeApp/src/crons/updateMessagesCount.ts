import { logger } from '@/utils/logger';
import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const chatDB = prismaClient.chat;
const messageDB = prismaClient.message;

// TODO: separate to a data layer
const _findMessages = async () => {
  const a20MinuteAgo = new Date(Date.now() - 20 * 1000 * 60);

  const messages = await messageDB.findMany({
    where: {
      createdAt: {
        lte: new Date(),
        gte: a20MinuteAgo,
      },
    },
    distinct: ['applicationToken', 'chatNumber'],
    orderBy: {
      // return the chats with the highest number
      number: 'desc',
    },
    select: {
      applicationToken: true,
      number: true,
      chatNumber: true,
    },
  });
  return messages;
};

// TODO: separate to a data layer
const _updateChatsCount = async (message) => {
  await chatDB.update({
    // set the count to the max chat count
    where: {
      applicationToken_number:{
        applicationToken: message.applicationToken,
        number: message.chatNumber
      }
    },
    data: {
      messagesCount: message.number,
    },
  });
  logger.info(`Updated messages Count for app ${message.applicationToken} and chat ${message.chatNumber}`)
};

const updateMessagesCountHandler = async () => {
  try {
    logger.info('Updated Messages Count Cron started ...');
    const messages = await _findMessages(); // return the messages that have been created in the last 20 min
    for (const message of messages) {
      try {
        await _updateChatsCount(message);
      } catch (error) {
        logger.error(`Error Updating messages Count for app ${message.applicationToken} and chat ${message.chatNumber}  ${error}`);
      }
    }
    logger.info('Update Chat Count Cron Is Done ...');
  } catch (error) {
    logger.error(`Error in Updating chats count ${error}`);
  }
};

const job = new CronJob('* */20 * * * *', updateMessagesCountHandler, null, true);

export default job;
