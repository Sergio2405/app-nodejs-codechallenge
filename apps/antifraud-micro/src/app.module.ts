import { Module } from '@nestjs/common';
import { AntifraudModule } from './antifraud/antifraud.module';

@Module({
  imports: [AntifraudModule],
})
export class AppModule {}
