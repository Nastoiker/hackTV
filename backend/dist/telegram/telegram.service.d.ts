import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './ITelegram.interface';
export declare class TelegramService {
    bot: Telegraf;
    options: ITelegramOptions;
    constructor(_options: ITelegramOptions);
    sendMessage(message: string, chatId?: string): Promise<void>;
}
