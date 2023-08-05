import { Telegraf } from 'telegraf';

interface TelegramServiceType {
  sendMessage(message: string): void;
}

class TelegramService implements TelegramServiceType {
  private bot: Telegraf;
  private chatId: Number = 69380796;

  constructor() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    console.log('TelegramService initialized');

    const { TELEGRAM_BOT_TOKEN } = process.env;

    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }

    this.bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    this.bot.launch();

    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }

  sendMessage(message: string) {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    console.log('Sending message to Telegram');
    //send message to chatId

    this.bot.telegram.sendMessage(String(this.chatId), message);
  }
}

const telegramServiceInstance = new TelegramService();

export default telegramServiceInstance;
