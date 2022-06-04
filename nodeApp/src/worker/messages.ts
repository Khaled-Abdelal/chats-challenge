import rabbitMQ from '@/config/rabbitMQ';
import { CreateMessageDto } from '@/dtos/message.dto';
import MessageService from '@/services/messages.service';
import ChatService from '@/services/chats.service';
import { logger } from '@/utils/logger';
import { isEmpty } from '@/utils/util';
import { ConsumeMessage, Channel } from 'amqplib';

export class MessageCreation {
  private chatService = new ChatService();
  private messageService = new MessageService();

  public async consume() {
    const channel: Channel = await rabbitMQ.connect();
    const q = process.env.MESSAGE_CREATION_QUEUE || 'MESSAGE_CREATION_QUEUE';
    await channel.assertQueue(q, { durable: true });
    await channel.consume(q, (msg: ConsumeMessage | null) => this.handler(msg, channel));
  }

  private async handler(msg: ConsumeMessage | null, channel: Channel) {
    const message: CreateMessageDto = JSON.parse(msg.content.toString());
    try {
      const chat = await this.chatService.findApplicationChat(message.applicationToken, message.chatNumber);
      console.log(chat)
      if (isEmpty(chat)) {
        // chat not found
        channel.ack(msg);
        logger.info(`Create message job discarded`);
        return;
      }
      await this.messageService.createMessage(message);
      channel.ack(msg);
      logger.info(`Message number ${message.number} Created for chat ${message.chatNumber} for app ${message.applicationToken}`);
    } catch (err) {
      // TODO: handle failed messages
      logger.error(
        `Error processing create Message number ${message.number} for Chat number 
        ${message.chatNumber} for app ${message.applicationToken} ${err}`,
      );
    }
  }
}
