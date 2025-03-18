import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @EventPattern('update_transaction_status')
  handleTransactionCreate(@Payload() request: UpdateStatusDto) {
    this.transactionService.updateStatus(
      request.transactionExternalId,
      request.status,
    );
  }
}
