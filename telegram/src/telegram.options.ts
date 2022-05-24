export const TELEGRAM_OPTIONS = 'TelegramOptions';
export class TelegramOptions {
    botToken: string;
    chatId: string;
    projectName?: string;
    allowSend?: boolean;

}