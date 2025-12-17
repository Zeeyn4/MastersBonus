import React, { useState } from 'react';
import { Home, Calculator as CalcIcon, Bell, User as UserIcon, Trophy } from 'lucide-react';

// Components
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { StoreDetail } from './components/StoreDetail';
import { Calculator } from './components/Calculator';
import { Notifications } from './components/Notifications';
import { Leaderboard } from './components/Leaderboard';

// Data
import { CURRENT_USER, STORES, TRANSACTIONS, NOTIFICATIONS, LEADERBOARD_DATA } from './constants';
import { Transaction } from './types';

type ViewState = 'DASHBOARD' | 'LEADERBOARD' | 'CALCULATOR' | 'NOTIFICATIONS' | 'PROFILE';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    if (selectedStoreId) {
      const store = STORES.find(s => s.id === selectedStoreId);
      const storeTransactions = TRANSACTIONS.filter(t => t.storeId === selectedStoreId);
      if (store) {
        return (
          <StoreDetail 
            store={store} 
            transactions={storeTransactions} 
            onBack={() => setSelectedStoreId(null)} 
          />
        );
      }
    }

    switch (currentView) {
      case 'DASHBOARD':
        return (
          <Dashboard 
            user={CURRENT_USER} 
            stores={STORES} 
            onSelectStore={setSelectedStoreId}
          />
        );
      case 'LEADERBOARD':
        return (
            <Leaderboard users={LEADERBOARD_DATA} currentUserId={CURRENT_USER.id} />
        );
      case 'CALCULATOR':
        return <Calculator />;
      case 'NOTIFICATIONS':
        return <Notifications notifications={NOTIFICATIONS} />;
      case 'PROFILE':
        return (
          <div className="p-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden mb-4">
              {CURRENT_USER.avatar ? (
                <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-gray-500">{CURRENT_USER.name.charAt(0)}</span>
              )}
            </div>
            <h2 className="text-xl font-bold">{CURRENT_USER.name}</h2>
            <p className="text-gray-500 mb-6">{CURRENT_USER.phone}</p>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-500 font-medium px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              Выйти из аккаунта
            </button>
          </div>
        );
      default:
        return <Dashboard user={CURRENT_USER} stores={STORES} onSelectStore={setSelectedStoreId} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
      {/* Main Content Area */}
      <main className="h-full no-scrollbar overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {!selectedStoreId && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-2 py-3 pb-6 flex justify-around items-center z-50">
          <NavButton 
            active={currentView === 'DASHBOARD'} 
            onClick={() => setCurrentView('DASHBOARD')}
            icon={<Home size={22} />}
            label="Главная"
          />
          <NavButton 
            active={currentView === 'LEADERBOARD'} 
            onClick={() => setCurrentView('LEADERBOARD')}
            icon={<Trophy size={22} />}
            label="Топ"
          />
          <NavButton 
            active={currentView === 'CALCULATOR'} 
            onClick={() => setCurrentView('CALCULATOR')}
            icon={<CalcIcon size={22} />}
            label="Расчет"
          />
          <NavButton 
            active={currentView === 'NOTIFICATIONS'} 
            onClick={() => setCurrentView('NOTIFICATIONS')}
            icon={<Bell size={22} />}
            label="События"
            hasBadge={NOTIFICATIONS.some(n => !n.read)}
          />
          <NavButton 
            active={currentView === 'PROFILE'} 
            onClick={() => setCurrentView('PROFILE')}
            icon={<UserIcon size={22} />}
            label="Профиль"
          />
        </div>
      )}
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hasBadge?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, hasBadge }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors relative w-16 ${
      active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    <div className="relative">
      {icon}
      {hasBadge && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      )}
    </div>
    <span className="text-[10px] font-medium truncate w-full text-center">{label}</span>
  </button>
);