import { Router } from 'express';
import ChatsController from '@controllers/chats.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { GetChatDto } from '@/dtos/chat.dto';


class ChatsRoute implements Routes {
  public path = '/applications/:token/chats';
  public router = Router();
  public chatsController = new ChatsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.chatsController.getChats);
    this.router.get(`${this.path}/:number`, validationMiddleware(GetChatDto, 'params'), this.chatsController.getChat);
  }
}

export default ChatsRoute;
