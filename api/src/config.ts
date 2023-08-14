import dotenv from 'dotenv';

dotenv.config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, APP_PORT, JWT_SECRET, AUTH_EXPIRES_IN } = process.env;

export default {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  port: Number(APP_PORT) || 5000,
  auth: {
    secret: JWT_SECRET,
    expiresIn: AUTH_EXPIRES_IN,
  }
}