'use client';
import React from 'react';
import { ViewMode } from '../types';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { setViewMode } from '../lib/features/view/viewSlice';
import { LayoutGrid, Receipt, BarChart3, Users, Settings, Ticket } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector((state) => state.view.viewMode);

  const items = [
    { mode: ViewMode.CHECKOUT, icon: LayoutGrid, label: 'POS' },
    { mode: ViewMode.RECEIPTS, icon: Receipt, label: 'Sales' },
    { mode: ViewMode.PROMOTIONS, icon: Ticket, label: 'Promos' },
    { mode: ViewMode.REPORTS, icon: BarChart3, label: 'Intel' },
    { mode: ViewMode.CUSTOMERS, icon: Users, label: 'Clients' },
  ];

  return (
    <nav className="bg-white border-t border-gray-100 px-2 py-2 flex justify-between items-center h-20 safe-area-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {items.map((item) => (
        <button
          key={item.mode}
          onClick={() => dispatch(setViewMode(item.mode))}
          className={`flex flex-col items-center gap-1.5 transition-all flex-1 py-1 ${
            currentView === item.mode ? 'text-black' : 'text-gray-300'
          }`}
        >
          <item.icon className={`w-5 h-5 ${currentView === item.mode ? 'stroke-[2.5px] text-[#d3af35]' : 'stroke-[2px]'}`} />
          <span className="text-[7px] font-black uppercase tracking-widest leading-none mt-1">{item.label}</span>
          {currentView === item.mode && (
            <div className="w-1 h-1 bg-black rounded-full mt-1.5"></div>
          )}
        </button>
      ))}
    </nav>
  );
};
