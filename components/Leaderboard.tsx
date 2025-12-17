import React from 'react';
import { User } from '../types';
import { Crown, Trophy, Medal } from 'lucide-react';

interface LeaderboardProps {
  users: User[];
  currentUserId: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUserId }) => {
  // Sort users by balance desc
  const sortedUsers = [...users].sort((a, b) => b.totalBalance - a.totalBalance);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      <header className="mb-6 flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Лидеры</h2>
            <p className="text-gray-500 text-sm">Топ мастеров по бонусам</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-2 rounded-xl">
            <Trophy size={24} />
        </div>
      </header>

      {/* Podium for Top 3 */}
      <div className="flex justify-center items-end gap-3 mb-8 pt-4">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="flex flex-col items-center w-1/3">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full border-4 border-gray-300 p-1 bg-white shadow-lg overflow-hidden relative z-10">
                 {top3[1].avatar ? (
                    <img src={top3[1].avatar} alt="" className="w-full h-full object-cover rounded-full" />
                 ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">{top3[1].name[0]}</div>
                 )}
              </div>
              <div className="absolute -bottom-2 -right-1 bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white z-20">2</div>
            </div>
            <p className="font-bold text-sm text-center text-gray-900 leading-tight mb-1 truncate w-full">{top3[1].name.split(' ')[0]}</p>
            <p className="text-xs text-gray-500 font-medium">{top3[1].totalBalance.toLocaleString()}</p>
            <div className="h-16 w-full bg-gradient-to-t from-gray-200 to-gray-50 rounded-t-xl mt-2 opacity-50"></div>
          </div>
        )}

        {/* 1st Place */}
        {top3[0] && (
          <div className="flex flex-col items-center w-1/3 z-20 -mx-2">
            <div className="relative mb-3">
              <Crown className="text-yellow-500 absolute -top-7 left-1/2 -translate-x-1/2 w-8 h-8 drop-shadow-sm animate-bounce" />
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 p-1 bg-white shadow-xl shadow-yellow-500/20 overflow-hidden relative z-10">
                 {top3[0].avatar ? (
                    <img src={top3[0].avatar} alt="" className="w-full h-full object-cover rounded-full" />
                 ) : (
                    <div className="w-full h-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600 text-2xl">{top3[0].name[0]}</div>
                 )}
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-3 py-0.5 rounded-full text-sm font-bold border-2 border-white z-20 shadow-sm">1</div>
            </div>
            <p className="font-bold text-base text-center text-gray-900 leading-tight mb-1 truncate w-full">{top3[0].name.split(' ')[0]}</p>
            <p className="text-sm text-yellow-600 font-bold">{top3[0].totalBalance.toLocaleString()} ₽</p>
            <div className="h-24 w-full bg-gradient-to-t from-yellow-100 to-yellow-50/50 rounded-t-xl mt-2"></div>
          </div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <div className="flex flex-col items-center w-1/3">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-full border-4 border-orange-300 p-1 bg-white shadow-lg overflow-hidden relative z-10">
                 {top3[2].avatar ? (
                    <img src={top3[2].avatar} alt="" className="w-full h-full object-cover rounded-full" />
                 ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">{top3[2].name[0]}</div>
                 )}
              </div>
              <div className="absolute -bottom-2 -left-1 bg-orange-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white z-20">3</div>
            </div>
            <p className="font-bold text-sm text-center text-gray-900 leading-tight mb-1 truncate w-full">{top3[2].name.split(' ')[0]}</p>
            <p className="text-xs text-gray-500 font-medium">{top3[2].totalBalance.toLocaleString()}</p>
            <div className="h-12 w-full bg-gradient-to-t from-orange-100 to-orange-50/50 rounded-t-xl mt-2 opacity-50"></div>
          </div>
        )}
      </div>

      {/* Rest of the list */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {rest.map((user, index) => {
          const rank = index + 4;
          const isMe = user.id === currentUserId;
          
          return (
            <div 
              key={user.id} 
              className={`flex items-center p-4 border-b border-gray-50 last:border-0 ${isMe ? 'bg-blue-50' : ''}`}
            >
              <span className="w-6 text-center font-bold text-gray-400 text-sm mr-3">{rank}</span>
              
              <div className="w-10 h-10 rounded-full bg-gray-100 mr-3 overflow-hidden shrink-0">
                {user.avatar ? (
                   <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 text-xs">{user.name[0]}</div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${isMe ? 'text-blue-900' : 'text-gray-900'}`}>
                    {user.name} {isMe && '(Вы)'}
                </p>
              </div>
              
              <div className="font-bold text-gray-900 text-sm">
                {user.totalBalance.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};