import App from '@/app';
import IndexRoute from '@routes/index.route';
import ApplicationsRoute from '@routes/applications.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new ApplicationsRoute()]);

app.listen();
