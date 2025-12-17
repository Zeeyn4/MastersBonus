import React, { useState } from 'react';
import { Button } from './Button';
import { Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) setStep('OTP');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mb-8 text-blue-600">
        <Smartphone size={40} />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {step === 'PHONE' ? 'Вход' : 'Подтверждение'}
      </h1>
      <p className="text-gray-500 mb-8 max-w-xs">
        {step === 'PHONE' 
          ? 'Введите номер телефона для входа в личный кабинет партнера' 
          : `Мы отправили код на номер ${phone}`}
      </p>

      {step === 'PHONE' ? (
        <form onSubmit={handlePhoneSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="tel"
            placeholder="+7 (999) 000-00-00"
            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
          />
          <Button fullWidth type="submit" disabled={!phone}>
            Получить код
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="w-full max-w-sm space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2, 3].map((_, i) => (
              <div 
                key={i} 
                className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold ${
                  otp.length > i ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200'
                }`}
              >
                {otp[i] || ''}
              </div>
            ))}
          </div>
          <input
            type="tel"
            className="opacity-0 absolute" 
            value={otp}
            onChange={(e) => {
              const val = e.target.value.slice(0, 4);
              setOtp(val);
              if (val.length === 4) onLogin();
            }}
            maxLength={4}
            autoFocus
          />
          
          <Button fullWidth type="submit" disabled={otp.length !== 4}>
            Войти <ArrowRight className="inline ml-2 w-4 h-4" />
          </Button>
          
          <button 
            type="button" 
            onClick={() => setStep('PHONE')}
            className="text-sm text-gray-400 mt-4 hover:text-gray-600"
          >
            Изменить номер
          </button>
        </form>
      )}

      <div className="mt-12 flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
        <ShieldCheck size={14} />
        <span>Безопасное соединение</span>
      </div>
    </div>
  );
};