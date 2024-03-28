import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
}));

const dbConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

export { appConfig, dbConfig };
