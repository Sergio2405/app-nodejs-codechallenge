import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class AntifraudService {
  private readonly logger = new Logger(AntifraudService.name, {timestamp: true})
  constructor(
    @Inject('ANTIFRAUD_MICROSERVICE') private readonly antifraudClient: ClientKafka
  ) {}

  validateTransaction(transaction: CreateTransactionDto): string {
    return transaction.value > 1000 ? "rejected" : "approved"
  }

  emitValidation(transactionExternalId: string, status: string) {
    this.antifraudClient.emit("update_transaction_status", {transactionExternalId, status})
    this.logger.log(`Update Transaction Status event has been emitted for id: ${transactionExternalId}`)
  }

}