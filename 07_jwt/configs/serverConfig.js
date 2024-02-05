const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017',
  port: process.env.PORT ?? 4000,
  environment: process.env.NODE_ENV ?? 'development'
};

export { serverConfig };
