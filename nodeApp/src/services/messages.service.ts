import { CreateMessageDto } from '@/dtos/message.dto';
import { MessageWithoutId } from '@/interfaces/message.interface';
import { isEmpty } from '@/utils/util';
import { PrismaClient, Message } from '@prisma/client';
import searchClient from '@/config/elasticSearch';
class MessageService {
  private messages = new PrismaClient().message;
  private searchClient = searchClient.getConnection();
  public searchIndex = 'messages';

  public async createMessage(messageData: CreateMessageDto): Promise<Message> {
    const createMessageData: Message = await this.messages.create({
      data: { ...messageData },
    });
    return createMessageData;
  }

  public async findChatMessages(appToken: string, chatNumber: number): Promise<MessageWithoutId[]> {
    const messages: MessageWithoutId[] = await this.messages.findMany({
      where: {
        applicationToken: appToken,
        chatNumber: chatNumber,
      },
      select: {
        id: false,
        number: true,
        applicationToken: true,
        chatNumber: true,
        content: true,
      },
    });
    return messages;
  }

  public async findMessage(appToken: string, chatNumber: number, messageNumber: number): Promise<MessageWithoutId> {
    const message: MessageWithoutId = await this.messages.findUnique({
      where: {
        applicationToken_chatNumber_number: {
          applicationToken: appToken,
          chatNumber: chatNumber,
          number: messageNumber,
        },
      },
      select: {
        id: false,
        number: true,
        applicationToken: true,
        content: true,
        chatNumber: true,
      },
    });
    return message;
  }

  public async indexMessage(message: Message | MessageWithoutId): Promise<void> {
    if (isEmpty(message)) throw new Error('Record Not Found');
    this.searchClient.index({
      index: this.searchIndex,
      document: {
        content: message.content,
        applicationToken: message.applicationToken, // TODO: convert this to keyword analyzer
        chatNumber: message.chatNumber,
        number: message.number,
      },
    });
    await this.searchClient.indices.refresh({ index: this.searchIndex });
  }

  public async searchMessages(appToken: string, chatNumber: number, searchText: string){
    const result = this.searchClient.search({
      index: this.searchIndex,
      query: {
        bool: {
          must: [
            { match_phrase_prefix: { content: searchText } }, // partial match
          ],
          filter: [{ match: { applicationToken: appToken } }, { term: { chatNumber: chatNumber } }],
        },
      },
    });
    await this.searchClient.indices.refresh({ index: this.searchIndex });
    return result;
  }
}

export default MessageService;
