import { TransactionStatus } from '../transaction.entity';

export class UpdateStatusDto {
  transactionExternalId: string;
  status: TransactionStatus;
}