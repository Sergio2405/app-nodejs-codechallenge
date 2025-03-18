import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class TransactionType {
  @Field()
  name: string;
}

@ObjectType()
class TransactionStatus {
  @Field()
  name: string;
}

@ObjectType({ description: 'transaction'})
export class Transaction {
  @Field()
  transactionExternalId: string;

  @Field(() => TransactionType)
  transactionType: TransactionType;

  @Field(() => TransactionStatus)
  transactionStatus: TransactionStatus;

  @Field()
  value: number;

  @Field()
  createdAt: Date;
}
