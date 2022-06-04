import rabbitMQ from '@/config/rabbitMQ';
import { CreateChatDto } from '@/dtos/chat.dto';
import { HttpException } from '@/exceptions/HttpException';
import ApplicationService from '@/services/applications.service';
import ChatService from '@/services/chats.service';
import { logger } from '@/utils/logger';
import { ConsumeMessage, Channel } from 'amqplib';

export class ChatCreation {
  private chatService = new ChatService();
  private applicationService = new ApplicationService();

  public async consume() {
    const channel: Channel = await rabbitMQ.connect();
    const q = process.env.CHAT_CREATION_QUEUE || 'CHAT_CREATION_QUEUE';
    await channel.assertQueue(q, { durable: true });
    await channel.consume(q, (msg: ConsumeMessage | null) => this.handler(msg, channel));
  }

  private async handler(msg: ConsumeMessage | null, channel: Channel) {
    const chat: CreateChatDto = JSON.parse(msg.content.toString());
    try {
      const app = await this.applicationService.findApplicationByToken(chat.applicationToken);
      await this.chatService.createChat(chat);
      channel.ack(msg);
      logger.info(`Chat number ${chat.number} Created for app ${app.token}`);
    } catch (err) {
      if (err instanceof HttpException) {
        // token is invalid or app not found
        channel.ack(msg);
        logger.info(`Create Chat message discarded`);
        return;
      }
      // TODO: handle failed messages
      logger.error(`Error processing create Chat number ${chat.number} for app ${chat.applicationToken} ${err}`);
    }
  }
}
