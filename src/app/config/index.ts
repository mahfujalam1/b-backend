import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  jwt_access_secret: process.env.JWT_SECRET || 'secret',
  jwt_access_expires_in: process.env.JWT_EXPIRES_IN || '1d',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '365d',
  smtp: {
    smtp_host: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtp_port: process.env.SMTP_PORT || 465,
    smtp_service: process.env.SMTP_SERVICE || 'gmail',
    smtp_mail: process.env.SMTP_MAIL,
    smtp_pass: process.env.SMTP_PASS,
    name: 'Hisab Nikash Pro',
  },
};
