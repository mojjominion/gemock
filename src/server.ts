process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import App from '@/app';
import AuthRoute from '@routes/auth.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import path from 'path';
import MockApiRoute from './routes/mock.api.route';

require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    `environments/.env.${process.env.NODE_ENV}`,
  ),
});

validateEnv();

const app = new App([new UsersRoute(), new AuthRoute(), new MockApiRoute()]);

app.listen();
