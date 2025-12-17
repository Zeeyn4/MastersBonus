import React, { useState } from 'react';
import { Calculator as CalcIcon, RefreshCw, Info } from 'lucide-react';
import { Button } from './Button';

export const Calculator: React.FC = () => {
  const [perimeter, setPerimeter] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [rollWidth, setRollWidth] = useState<string>('1.06');
  const [rollLength, setRollLength] = useState<string>('10');
  const [repeat, setRepeat] = useState<string>('0');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const P = parseFloat(perimeter);
    const H = parseFloat(height);
    const RW = parseFloat(rollWidth);
    const RL = parseFloat(rollLength);
    const R = parseFloat(repeat) / 100; // convert cm to m usually, assuming input in cm if labeled

    if (!P || !H || !RW || !RL) return;

    // 1. Calculate strips needed for the room
    const stripsNeeded = Math.ceil(P / RW);

    // 2. Calculate usable length of one strip (Height + Repeat)
    // Note: Usually you add repeat to every strip except maybe the first, but simpler to add to all for safety.
    // Also need to account for "offset" but standard estimation is H + Repeat.
    const stripLength = H + (R > 0 ? R : 0) + 0.05; // +5cm margin for trimming

    // 3. Calculate how many strips we get from one roll
    const stripsPerRoll = Math.floor(RL / stripLength);

    if (stripsPerRoll === 0) {
      alert("Высота потолка больше длины рулона!");
      setResult(0);
      return;
    }

    // 4. Calculate total rolls
    const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll);

    setResult(rollsNeeded);
  };

  const reset = () => {
    setPerimeter('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Калькулятор</h2>
        <p className="text-gray-500 text-sm">Расчет количества рулонов</p>
      </header>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Периметр (м)</label>
            <input 
              type="number" 
              inputMode="decimal"
              value={perimeter}
              onChange={e => setPerimeter(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="0.0"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Высота (м)</label>
            <input 
              type="number" 
              inputMode="decimal"
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Ширина рулона (м)</label>
          <div className="grid grid-cols-3 gap-2">
            {['0.53', '0.70', '1.06'].map(w => (
              <button
                key={w}
                onClick={() => setRollWidth(w)}
                className={`py-2 px-1 rounded-lg text-sm font-medium transition-colors ${
                  rollWidth === w ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Длина рулона (м)</label>
            <input 
              type="number" 
              inputMode="decimal"
              value={rollLength}
              onChange={e => setRollLength(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase">Раппорт (м)</label>
            <input 
              type="number" 
              inputMode="decimal"
              value={repeat}
              onChange={e => setRepeat(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
              placeholder="0.0"
            />
          </div>
        </div>

        <Button onClick={calculate} fullWidth className="mt-4">
          <CalcIcon className="inline mr-2 w-5 h-5" /> Рассчитать
        </Button>
      </div>

      {result !== null && (
        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="text-gray-400 text-sm font-medium mb-1">Вам понадобится</span>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold tracking-tighter">{result}</span>
            <span className="text-xl text-gray-400">рул.</span>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center px-4">
            *Расчет является приблизительным и включает 5см запас на подрезку. Рекомендуем проконсультироваться с менеджером.
          </p>
          <button 
            onClick={reset}
            className="mt-6 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Сбросить
          </button>
        </div>
      )}

      {result === null && (
        <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Для точного расчета учитывайте дверные и оконные проемы. Обычно их не вычитают из периметра, чтобы создать запас материала.
          </p>
        </div>
      )}
    </div>
  );
};