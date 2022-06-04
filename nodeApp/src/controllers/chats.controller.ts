import { NextFunction, Request, Response } from 'express';
import chatsService from '@services/chats.service';
import { ChatWithoutId } from '@/interfaces/chat.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@/exceptions/HttpException';

class ChatsController {
  public chatsService = new chatsService();

  public getChats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const appToken = req.params.token;
      const result: ChatWithoutId[] = await this.chatsService.findApplicationChats(appToken);

      res.status(200).json({ data: result, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.params.token;
      const number = Number(req.params.number);

      const result: ChatWithoutId = await this.chatsService.findApplicationChat(token, number);
      if (isEmpty(result)) throw new HttpException(404, 'Record not found')
      res.status(200).json({ data: result, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default ChatsController;
