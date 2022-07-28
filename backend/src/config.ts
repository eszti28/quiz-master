import dotenv from 'dotenv';

dotenv.config();

export default {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  servers: {
    host: 'http://localhost',
    port: 3000,
  },
  jwt: { secretKey: process.env.JWT_SECRET },
  smtp: {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT!,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};
