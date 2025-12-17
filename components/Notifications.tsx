import React from 'react';
import { Notification } from '../types';
import { Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface NotificationsProps {
  notifications: Notification[];
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-orange-50';
      case 'info': return 'bg-blue-50';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Уведомления</h2>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-400" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-gray-50 rounded-full"></span>
          )}
        </div>
      </header>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div 
            key={note.id} 
            className={`p-4 rounded-2xl border ${note.read ? 'bg-white border-gray-100' : 'bg-white border-blue-200 shadow-md'} transition-all`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${getBgColor(note.type)}`}>
                {getIcon(note.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-bold ${note.read ? 'text-gray-900' : 'text-blue-900'}`}>
                    {note.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{note.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {note.message}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Нет новых уведомлений
          </div>
        )}
      </div>
    </div>
  );
};