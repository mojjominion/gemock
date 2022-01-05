import App from '@/app';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import MockApiRoute from './routes/mock.api.route';

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new MockApiRoute()]);

app.listen();
