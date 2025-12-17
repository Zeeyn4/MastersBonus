export enum TransactionType {
  ACCRUAL = 'ACCRUAL',       // Начисление
  REDEMPTION = 'REDEMPTION', // Списание
  REFUND = 'REFUND'          // Списание за возврат
}

export interface Transaction {
  id: string;
  storeId: string;
  date: string;
  amount: number;
  type: TransactionType;
  description: string;
  orderNumber?: string;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  balance: number;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'success' | 'warning' | 'info';
}

export interface User {
  id: string;
  name: string;
  phone: string;
  totalBalance: number;
  avatar?: string;
}