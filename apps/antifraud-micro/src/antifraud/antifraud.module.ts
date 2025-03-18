import { Module } from '@nestjs/common';
import { AntifraudService } from './antifraud.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AntifraudController } from './antifraud.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANTIFRAUD_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'antifraud',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'antifraud-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AntifraudController],
  providers: [AntifraudService],
})
export class AntifraudModule {}
