import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Transaction as TransactionModel } from './transaction.model';

export enum TransactionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected"
}

enum TransferType {
  DEPOSIT = 1,
  WITHDRAWAL = 2,
  EXTERNAL = 3,
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionExternalId: string;

  @Column('uuid')
  accountExternalIdDebit: string;

  @Column('uuid')
  accountExternalIdCredit: string;

  @Column('int')
  transferTypeId: number;

  @Column('decimal')
  value: number;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  }) 
  transactionStatus: string;

  @CreateDateColumn()
  createdAt: Date;

  getTransferTypeName(): string {
    switch (this.transferTypeId) {
      case TransferType.DEPOSIT:
        return "DEPOSIT";
      case TransferType.WITHDRAWAL:
        return "WITHDRAWAL";
      case TransferType.EXTERNAL:
        return "TRANSFER";
      default:
        return "UNKNOWN";
    }
  }

  toModel(): TransactionModel {
    return {
      transactionExternalId: this.transactionExternalId,
      transactionType: {
        name: this.getTransferTypeName(),
      },
      transactionStatus: {
        name: this.transactionStatus,
      },
      value: this.value,
      createdAt: this.createdAt 
    }
  }
}


