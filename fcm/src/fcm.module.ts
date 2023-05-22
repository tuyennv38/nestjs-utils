import { DynamicModule,  Module, ValueProvider } from '@nestjs/common';
import { FcmOptions } from './fcm.options';
import { FcmService } from './fcm.service';
@Module({})
export class FcmModule {
  static forRoot(options: FcmOptions, serviceName: string): DynamicModule {
    const fcmProvider: ValueProvider = {
      provide: serviceName,
      useValue: new FcmService(options),
    };
    return {
      module: FcmModule,
      providers: [
        fcmProvider
      ],
      exports: [fcmProvider],
    };
  }
}
