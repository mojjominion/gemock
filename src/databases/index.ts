export const dbConnection = {
  url: process.env.MONGO_DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
