import { Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './dto/create-transaction.input';

@Resolver(of => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(returns => Transaction)
  async transaction(
    @Args('id')
    id: string,
  ): Promise<Transaction> {
    return this.transactionService.findById(id);
  }

  @Mutation(returns => Transaction)
  async create(@Args('createTransaction') createTransactionInput: CreateTransactionInput): Promise<Transaction> {
    const transaction = await this.transactionService.create(createTransactionInput);
    this.transactionService.emitTransaction(transaction.transactionExternalId, transaction.value);
    return transaction;
  }
}