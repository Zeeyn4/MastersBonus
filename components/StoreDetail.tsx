import React from 'react';
import { Store, Transaction, TransactionType } from '../types';
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, AlertCircle, Calendar, Wallet } from 'lucide-react';

interface StoreDetailProps {
  store: Store;
  transactions: Transaction[];
  onBack: () => void;
}

export const StoreDetail: React.FC<StoreDetailProps> = ({ store, transactions, onBack }) => {
  const getIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.ACCRUAL:
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case TransactionType.REDEMPTION:
        return <ArrowUpRight className="w-5 h-5 text-gray-600" />;
      case TransactionType.REFUND:
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getAmountColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.ACCRUAL: return 'text-green-600';
      case TransactionType.REFUND: return 'text-red-600';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Compact Header */}
      <div className={`${store.color} text-white pb-8 pt-4 px-4 rounded-b-3xl shadow-lg relative z-10 transition-all`}>
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 bg-white/10 pl-3 pr-2 py-1.5 rounded-full backdrop-blur-md">
            <span className="font-bold text-sm">{store.name}</span>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-900 text-[10px] font-bold shadow-sm">
              {store.logo}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center mb-2">
           <span className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Текущий баланс</span>
           <div className="flex items-baseline gap-1">
             <span className="text-4xl font-bold tracking-tight">{store.balance.toLocaleString()}</span>
             <span className="text-xl opacity-80">₽</span>
           </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[300px]">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0">
            <h3 className="font-bold text-gray-900">История операций</h3>
            <button className="p-1.5 bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600">
                <Calendar size={18} />
            </button>
          </div>
          
          <div className="divide-y divide-gray-50">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl mt-1 ${
                        tx.type === TransactionType.ACCRUAL ? 'bg-green-50' : 
                        tx.type === TransactionType.REFUND ? 'bg-red-50' : 'bg-gray-100'
                      }`}>
                        {getIcon(tx.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{tx.description}</p>
                        {tx.orderNumber && (
                          <p className="text-xs text-blue-600 bg-blue-50 inline-block px-1.5 py-0.5 rounded mt-1">
                            {tx.orderNumber}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold text-sm sm:text-base whitespace-nowrap ${getAmountColor(tx.type)}`}>
                      {tx.type === TransactionType.ACCRUAL ? '+' : ''}
                      {tx.amount.toLocaleString()} ₽
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                <Wallet className="w-12 h-12 text-gray-200 mb-3" />
                <p>История операций пуста</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};