import { Controller, Get, Req } from '@nestjs/common';
import { TelegramService } from 'cscmobi-nestjs-telegram';
import { AppService } from './app.service';
import { encrypt3DES, getCountryCode } from 'cscmobi-utils'
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly telegramService: TelegramService
  ) {

  }

  @Get()
  getHello(): string {
    const data = this.appService.getHello();
    const result = encrypt3DES('gameplantemprise20220000', data);
    return result;
  }
  @Get('sendTelegram')
  sendTelegram() {
    return this.telegramService.sendInfo('Test send telegram');
  }
  @Get('getip')
  getIp(@Req() req: Request): string {
    let ip = getCountryCode(req)
    return ip;
  }
}
