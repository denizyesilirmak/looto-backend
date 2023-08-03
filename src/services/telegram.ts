import { Telegraf } from 'telegraf';

interface TelegramServiceType {
  sendMessage(message: string): void;
}

class TelegramService implements TelegramServiceType {
  private bot: Telegraf;
  private chatId: Number = 69380796;

  constructor() {
    console.log('TelegramService initialized');

    const { TELEGRAM_BOT_TOKEN } = process.env;

    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }

    this.bot = new Telegraf(TELEGRAM_BOT_TOKEN);

    //get bot info
    this.bot.telegram.getMe().then((botInfo) => {
      //   console.log('botInfo', botInfo);
    });
  }

  startService() {
    this.bot.launch();
  }

  sendMessage(message: string) {
    console.log('Sending message to Telegram');
    //send message to chatId

    this.bot.telegram.sendMessage(String(this.chatId), message);
  }
}

const telegramServiceInstance = new TelegramService();

export default telegramServiceInstance;
