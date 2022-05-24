import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from "telegraf";
import { TelegramOptions, TELEGRAM_OPTIONS } from './telegram.options';
import * as process from "process";
@Injectable()
export class TelegramService {
    bot: Telegraf
    constructor(
        @Inject(TELEGRAM_OPTIONS) private telegramOptionsProvider: TelegramOptions,
    ) {
        this.bot = new Telegraf(telegramOptionsProvider.botToken)
    }
    private send(value: string | object) {
        if (!this.telegramOptionsProvider.allowSend) {
            return;
        }
        let message = value;
        if (value !== null && typeof value === "object") {
            message = JSON.stringify(value);
        }
        console.log(`Telegram LOG----- >>>>>>> ${message}`);
        const prjName = this.telegramOptionsProvider.projectName || "Default-RestApi";

        message = `${prjName}-${process.pid}-> ${message}`;
        this.bot.telegram
            .sendMessage(String(this.telegramOptionsProvider.chatId), String(message))
            .catch((err) => {
            });
    }
    public sendInfo(value: string | object) {
        let message = "Info: ";
        if (value !== null && typeof value === "object") {
            message += JSON.stringify(value);
        } else {
            message += value;
        }

        this.send(message);
    }
    public sendError(value: string | object) {
        let message = "Error: ";
        if (value !== null && typeof value === "object") {
            message += JSON.stringify(value);
        } else {
            message += value;
        }
        this.send(message);
    }
}