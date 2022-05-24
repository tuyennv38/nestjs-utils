import { DynamicModule, Module, ValueProvider } from "@nestjs/common";
import { TelegramOptions, TELEGRAM_OPTIONS } from "./telegram.options";
import { TelegramService } from "./telegram.service";

@Module({})
export class TelegramModule {
    static forRoot(options: TelegramOptions): DynamicModule {
        const optionsProvider: ValueProvider = {
            provide: TELEGRAM_OPTIONS,
            useValue: options
        }
        return {
            module: TelegramModule,
            providers: [
                TelegramService,
                optionsProvider
            ],
            exports: [TelegramService]
        }
    }
}