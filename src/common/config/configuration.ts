import { registerAs } from '@nestjs/config';

const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
}));

const dbConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

const jwtSecretConfig = registerAs('jwtSecret', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
}));

export { appConfig, dbConfig, jwtSecretConfig };
