import { CreateMessageDto } from '@/dtos/message.dto';
import { MessageWithoutId } from '@/interfaces/message.interface';
import { PrismaClient, Message } from '@prisma/client';

class MessageService {
  public messages = new PrismaClient().message;

  public async createMessage(messageData: CreateMessageDto): Promise<Message> {
    console.log(messageData)
    const createMessageData: Message = await this.messages.create({
      data: { ...messageData},
    });
    return createMessageData;
  }

  public async findChatMessages(appToken: string, chatNumber: number): Promise<MessageWithoutId[]> {
    const messages: MessageWithoutId[] = await this.messages.findMany({
      where: {
        applicationToken: appToken,
        chatNumber: chatNumber
      },
      select: {
        id: false,
        number: true,
        applicationToken: true,
        chatNumber: true,
        content: true
      },
    });
    return messages;
  }

  public async findMessage(appToken: string, chatNumber: number, messageNumber: number): Promise<MessageWithoutId> {
    const message: MessageWithoutId = await this.messages.findUnique({
      where:{
        applicationToken_chatNumber_number:{
          applicationToken: appToken,
          chatNumber: chatNumber,
          number: messageNumber
        }
      },
      select: {
        id: false,
        number: true,
        applicationToken: true,
        content: true,
        chatNumber: true
      },
    });
    return message;
  }

}

export default MessageService;
