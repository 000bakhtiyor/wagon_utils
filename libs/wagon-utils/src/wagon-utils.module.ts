import { Module } from '@nestjs/common';
import { WagonUtilsService } from './wagon-utils.service';

@Module({
  providers: [WagonUtilsService],
  exports: [WagonUtilsService],
})
export class WagonUtilsModule { }
