const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017',
  port: process.env.PORT ?? 4000,
  environment: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'super_secret',
  jwtExpires: process.env.JWT_EXPIRES ?? '10m'// 10minutes
};

export { serverConfig };
