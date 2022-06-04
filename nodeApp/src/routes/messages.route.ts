import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { GetMessagesDto, GetMessageDto } from '@/dtos/message.dto';
import MessagesController from '@/controllers/messages.controller';


class MessagesRoute implements Routes {
  public path = '/applications/:token/chats/:chatNumber/messages';
  public router = Router();
  public messagesController = new MessagesController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, validationMiddleware(GetMessagesDto, 'params'), this.messagesController.getMessages);
   this.router.get(`${this.path}/:number`, validationMiddleware(GetMessageDto, 'params'), this.messagesController.getMessage);
  }
}

export default MessagesRoute;
