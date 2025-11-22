import { FundCategory } from './fund.model';

export interface Subscription {
  id: string;
  fundId: number;
  fundName: string;
  category: FundCategory;
  amount: number;
  createdAt: string;
}
