import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/ITelegram.interface';
export declare const getTelegramConfig: (configService: ConfigService) => ITelegramOptions;
