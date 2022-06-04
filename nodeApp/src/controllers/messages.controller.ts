import { NextFunction, Request, Response } from 'express';
import MessagesService from '@services/messages.service';
import { MessageWithoutId } from '@/interfaces/message.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@/exceptions/HttpException';

class MessagesController {
  public messagesService = new MessagesService();

  public getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const appToken = req.params.token;
      const chatNumber = Number(req.params.chatNumber);
      const result: MessageWithoutId[] = await this.messagesService.findChatMessages(appToken, chatNumber);

      res.status(200).json({ data: result, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.params.token;
      const chatNumber = Number(req.params.chatNumber);
      const messageNumber = Number(req.params.number);

      const result: MessageWithoutId = await this.messagesService.findMessage(token, chatNumber, messageNumber);
      if (isEmpty(result)) throw new HttpException(404, 'Record not found')
      res.status(200).json({ data: result, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default MessagesController;
