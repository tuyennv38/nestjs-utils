import { DynamicModule, Logger, Module, ValueProvider } from '@nestjs/common';
import { FcmOptions, FCM_OPTIONS } from './fcm.options';
import { FcmService } from './fcm.service';
@Module({})
export class FcmModule {
    static forRoot(options: FcmOptions): DynamicModule {
        const optionsProvider: ValueProvider = {
          provide: FCM_OPTIONS,
          useValue: options,
        };
        const logger = options.logger ? options.logger : new Logger('FcmService');
        return {
          module: FcmModule,
          providers: [
            { provide: Logger, useValue: logger },
            FcmService,
            optionsProvider,
          ],
          exports: [FcmService],
        };
      }
}
