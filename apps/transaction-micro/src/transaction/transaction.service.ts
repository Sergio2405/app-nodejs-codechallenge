import { Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { Transaction } from './transaction.model';
import { Transaction as TransactionEntity, TransactionStatus} from './transaction.entity';
import { ClientKafka } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {

  private readonly logger = new Logger(TransactionService.name, {timestamp: true})

  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>
  ) {}

  async create(transactionInput: CreateTransactionInput): Promise<Transaction> {
    let transactionEntity = this.transactionRepository.create(transactionInput);
    transactionEntity = await this.transactionRepository.save(transactionEntity);

    this.logger.log(`Transaction entity created with id: ${transactionEntity.transactionExternalId}`)

    return transactionEntity.toModel();
  }

  async findById(id: string): Promise<Transaction> {
    const transactionEntity = await this.transactionRepository.findOneBy({transactionExternalId: id})

    if (!transactionEntity) {
      let errorMessage = `Transaction with id: ${transactionEntity.transactionExternalId} was not found`
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
    return transactionEntity.toModel();
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<void> {
    await this.transactionRepository.update({transactionExternalId: id}, {transactionStatus: status})
  }

  emitTransaction(transactionExternalId: string, value: number) {
    this.kafkaClient.emit('create_transaction', JSON.stringify({transactionExternalId, value}));
    this.logger.log(`Create Transaction event has been emitted for id: ${transactionExternalId}`)
  }
}