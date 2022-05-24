import { NestFactory } from '@nestjs/core';
import { TelegramService } from 'cscmobi-nestjs-telegram';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  let telegram =new TelegramService({
    botToken:'',
    chatId:'',
    projectName:'Test-module',
    allowSend:true
  });
  telegram.sendInfo(`Application listening on port: ${3000}`);
}
bootstrap();
