import config from 'config';

const url = config.get('db_url') as string;
export const dbConnection = {
  url,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
