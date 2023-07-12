import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  template: {
    dir: process.cwd() + '/src/config/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: process.cwd() + '/src/config/templates/',
      partialsDir: process.cwd() + '/src/config/templates/',
    },
  },
  transport: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
};
