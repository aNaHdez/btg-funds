export type TransactionType = 'SUBSCRIPTION' | 'CANCELLATION';
export type NotificationMethod = 'EMAIL' | 'SMS';

export interface Transaction {
  id: string;
  fundId: number;
  fundName?: string;
  amount: number;
  type: TransactionType;
  notificationMethod: NotificationMethod;
  createdAt: string;
}
