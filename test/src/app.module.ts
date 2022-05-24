import { Module } from '@nestjs/common';
import { TelegramModule } from 'cscmobi-nestjs-telegram';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
