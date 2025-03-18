import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AntifraudService } from './antifraud.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller()
export class AntifraudController {
  constructor(private readonly antifraudService: AntifraudService) {}

  @EventPattern('create_transaction')
  handleTransactionCreate(@Payload() data: CreateTransactionDto) {
    let newStatus = this.antifraudService.validateTransaction(data);
    this.antifraudService.emitValidation(data.transactionExternalId, newStatus)
  }
}