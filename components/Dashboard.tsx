import React from 'react';
import { User, Store } from '../types';
import { ChevronRight, TrendingUp, Wallet } from 'lucide-react';

interface DashboardProps {
  user: User;
  stores: Store[];
  onSelectStore: (storeId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, stores, onSelectStore }) => {
  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-gray-500 text-sm">Добро пожаловать,</p>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/30">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
            <Wallet className="w-6 h-6 text-blue-100" />
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
            Общий баланс
          </span>
        </div>
        <div>
          <span className="text-4xl font-bold tracking-tight">{user.totalBalance.toLocaleString()}</span>
          <span className="ml-2 text-blue-200 text-lg">₽</span>
        </div>
        <div className="mt-4 flex items-center text-sm text-blue-100/80">
          <TrendingUp className="w-4 h-4 mr-1.5" />
          <span>+15% за последний месяц</span>
        </div>
      </div>

      {/* Stores List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-gray-900">Ваши магазины</h3>
          <span className="text-xs text-gray-400">{stores.length} партнера</span>
        </div>
        
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => onSelectStore(store.id)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${store.color}`}>
                {store.logo}
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">{store.name}</h4>
                <p className="text-xs text-gray-500">ID партнера: 8832</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-900">{store.balance.toLocaleString()} ₽</div>
              <div className="flex items-center justify-end text-xs text-blue-600 font-medium">
                Детали <ChevronRight size={14} />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 border border-orange-200">
        <h4 className="font-bold text-orange-900 mb-1">Пригласи друга</h4>
        <p className="text-sm text-orange-800 mb-3">Получи 500 бонусов за каждого нового мастера.</p>
        <button className="bg-white text-orange-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:bg-orange-50 transition-colors">
          Поделиться ссылкой
        </button>
      </div>
    </div>
  );
};