import { CreateChatDto } from '@/dtos/chat.dto';
import { ChatWithoutId } from '@/interfaces/chat.interface';
import { PrismaClient, Chat } from '@prisma/client';

class ChatService {
  public chats = new PrismaClient().chat;

  public async createChat(chatData: CreateChatDto): Promise<Chat> {
    const createChatData: Chat = await this.chats.create({
      data: { ...chatData },
    });
    return createChatData;
  }

  public async findApplicationChats(appToken: string): Promise<ChatWithoutId[]> {
    const allChats: ChatWithoutId[] = await this.chats.findMany({
      where: {
        applicationToken: appToken,
      },
      select: {
        id: false,
        number: true,
        applicationToken: true,
        updatedAt: true,
        createdAt: true,
        messagesCount: true
      },
    });
    return allChats;
  }

  public async findApplicationChat(appToken: string, chatNumber: number): Promise<ChatWithoutId> {
    const chat: ChatWithoutId = await this.chats.findUnique({
      where:{
        applicationToken_number:{
          applicationToken: appToken,
          number: chatNumber,
        }
      },
      select: {
        id: false,
        number: true,
        applicationToken: true,
        updatedAt: true,
        createdAt: true,
        messagesCount: true
      },
    });
    return chat;
  }
}

export default ChatService;
