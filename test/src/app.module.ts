import { Module } from '@nestjs/common';
import { TelegramModule } from 'cscmobi-nestjs-telegram';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TelegramModule.forRoot({
      botToken:'5047339580:AAGfGB1xC4w5SW9A0TiuSFXbQmDIiZDXMu0',
      chatId:'-1001738907146',
      projectName:'Test-module',
      allowSend:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
