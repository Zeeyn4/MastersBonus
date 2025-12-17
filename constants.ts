import { Store, Transaction, TransactionType, Notification, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Алексей Мастеров',
  phone: '+7 (999) 000-00-00',
  totalBalance: 15400,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces'
};

export const LEADERBOARD_DATA: User[] = [
  {
    id: 'l1',
    name: 'Дмитрий Волков',
    phone: '',
    totalBalance: 42500,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 'l2',
    name: 'Иван Петров',
    phone: '',
    totalBalance: 38200,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 'l3',
    name: 'Сергей Сидоров',
    phone: '',
    totalBalance: 29100,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 'u1',
    name: 'Алексей Мастеров', // Current user
    phone: '+7 (999) 000-00-00',
    totalBalance: 15400,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 'l5',
    name: 'Анна Строителева',
    phone: '',
    totalBalance: 12000,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces'
  },
  {
    id: 'l6',
    name: 'Михаил Отделкин',
    phone: '',
    totalBalance: 8500,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop&crop=faces'
  }
];

export const STORES: Store[] = [
  {
    id: 's1',
    name: 'Обойный Мир',
    logo: 'OM',
    balance: 8500,
    color: 'bg-blue-600'
  },
  {
    id: 's2',
    name: 'Дом Декора',
    logo: 'DD',
    balance: 4200,
    color: 'bg-emerald-600'
  },
  {
    id: 's3',
    name: 'Элит Wallpapers',
    logo: 'EW',
    balance: 2700,
    color: 'bg-purple-600'
  }
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    storeId: 's1',
    date: '2023-10-25',
    amount: 1500,
    type: TransactionType.ACCRUAL,
    description: 'Бонус за заказ клиента',
    orderNumber: '#Order-1234'
  },
  {
    id: 't2',
    storeId: 's1',
    date: '2023-10-20',
    amount: -500,
    type: TransactionType.REDEMPTION,
    description: 'Вывод средств на карту',
  },
  {
    id: 't3',
    storeId: 's2',
    date: '2023-10-18',
    amount: 3000,
    type: TransactionType.ACCRUAL,
    description: 'Бонус за крупный опт',
    orderNumber: '#Order-9988'
  },
  {
    id: 't4',
    storeId: 's1',
    date: '2023-10-15',
    amount: -200,
    type: TransactionType.REFUND,
    description: 'Возврат товара клиентом',
    orderNumber: '#Order-1100'
  },
  {
    id: 't5',
    storeId: 's3',
    date: '2023-10-10',
    amount: 2700,
    type: TransactionType.ACCRUAL,
    description: 'Приветственный бонус',
  }
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Начисление бонусов',
    message: 'Вам начислено 1500 бонусов от магазина "Обойный Мир"',
    date: '25 окт 14:30',
    read: false,
    type: 'success'
  },
  {
    id: 'n2',
    title: 'Списание за возврат',
    message: 'Списано 200 бонусов. Клиент вернул товар по заказу #Order-1100.',
    date: '15 окт 09:15',
    read: true,
    type: 'warning'
  },
  {
    id: 'n3',
    title: 'Новая акция',
    message: 'В магазине "Дом Декора" повышенный кэшбек на флизелин до конца месяца!',
    date: '10 окт 12:00',
    read: true,
    type: 'info'
  }
];