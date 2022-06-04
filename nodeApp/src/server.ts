import App from '@/app';
import IndexRoute from '@routes/index.route';
import ApplicationsRoute from '@routes/applications.route';
import ChatsRoute from '@routes/chats.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new ApplicationsRoute(), new ChatsRoute()]);

app.listen();
