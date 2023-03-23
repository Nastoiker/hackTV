import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/ITelegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token: undefined | string = configService.get('TELEGRAM_TOKEN');
	if (!token) {
		throw new Error('Telegram token not ainit');
	}
	return { token, chatId: configService.get('CHAT_ID') ?? '' };
};
