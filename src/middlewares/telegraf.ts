import { Request, Response, NextFunction } from 'express';
import { Context, Telegraf } from 'telegraf';
import { log } from '../utils';

class TelegramBot {
  context: Context | null;
  constructor() {
    this.init();
    this.context = null;
  }

  init() {
    log('Telegram', 'Bot is starting...');
    if (!process.env.TELEGRAM_BOT_TOKEN)
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');

    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    bot.start((ctx) => {
      ctx.reply('Context generated');
      this.context = ctx;
    });

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

    bot.launch();
  }
}

const botInstance = new TelegramBot();

export const telegramMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = new Date();
  console.log(
    `-----${req.method}`
  );
  botInstance.context?.reply(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );

  next();
};

export default telegramMiddleware;
