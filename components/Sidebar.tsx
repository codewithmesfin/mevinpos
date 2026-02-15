
import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { LOGO_URL } from '../constants';
import { 
  LayoutGrid, 
  Users, 
  Settings,
  Ticket,
  Clock,
  FileText,
  ShieldCheck,
  Receipt,
  BarChart3,
  ChevronLeft,
  Menu
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(currentView === ViewMode.CHECKOUT);

  // Auto-collapse when switching to Settle/Checkout view as per requirement
  useEffect(() => {
    if (currentView === ViewMode.CHECKOUT) {
      setIsCollapsed(true);
    }
  }, [currentView]);

  const navItems = [
    { mode: ViewMode.CHECKOUT, icon: LayoutGrid, label: 'Point of Sale' },
    { mode: ViewMode.INVOICES, icon: FileText, label: 'Invoices' },
    { mode: ViewMode.RECEIPTS, icon: Receipt, label: 'Receipts' },
    { mode: ViewMode.SHIFTS, icon: Clock, label: 'Shifts' },
    { mode: ViewMode.CUSTOMERS, icon: Users, label: 'Clients' },
    { mode: ViewMode.TAXES, icon: ShieldCheck, label: 'Taxes' },
    { mode: ViewMode.REPORTS, icon: BarChart3, label: 'Reports' },
    { mode: ViewMode.PROMOTIONS, icon: Ticket, label: 'Promos' },
  ];

  return (
    <nav 
      className={`bg-[#FBFBFB] flex flex-col py-8 h-full shrink-0 border-r border-gray-100 z-50 transition-all duration-300 ease-in-out relative ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Section */}
      <div className={`flex items-center px-4 mb-10 transition-all ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}>
        <div className="w-12 h-12 rounded-2xl overflow-hidden p-1.5 bg-white shadow-lg border border-gray-50 flex items-center justify-center shrink-0">
           <img src={LOGO_URL} alt="SantimPay" className="w-full h-full object-contain" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-xs font-black uppercase tracking-widest text-black">SantimPay</span>
            <span className="text-[8px] font-bold text-[#d3af35] uppercase tracking-[0.2em]">Elite POS</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-2 w-full px-3 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => onViewChange(item.mode)}
              title={isCollapsed ? item.label : ''}
              className={`flex items-center rounded-2xl transition-all relative group h-14 ${
                isActive 
                  ? 'bg-black text-white shadow-xl shadow-black/10' 
                  : 'text-gray-400 hover:text-black hover:bg-white'
              } ${isCollapsed ? 'justify-center' : 'px-4 gap-4'}`}
            >
              <item.icon className={`w-5 h-5 transition-all shrink-0 ${isActive ? 'text-[#d3af35] stroke-[2.5px]' : 'group-hover:scale-110'}`} />
              
              {!isCollapsed && (
                <span className={`text-[10px] font-black uppercase tracking-widest leading-none truncate animate-in fade-in slide-in-from-left-2 duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              )}

              {isActive && (
                <div className={`absolute bg-[#d3af35] rounded-full transition-all ${
                  isCollapsed 
                    ? 'left-0 top-1/2 -translate-y-1/2 w-1 h-8' 
                    : 'right-2 top-1/2 -translate-y-1/2 w-1 h-1'
                }`}></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Footer Actions */}
      <div className={`px-3 pt-6 flex flex-col gap-2 transition-all ${isCollapsed ? 'items-center' : 'items-stretch'}`}>
        <button 
          onClick={() => onViewChange(ViewMode.SETTINGS)}
          className={`h-14 rounded-2xl flex items-center transition-all shadow-sm ${
            currentView === ViewMode.SETTINGS 
              ? 'bg-black text-[#d3af35]' 
              : 'bg-white text-gray-300 border border-gray-50 hover:bg-gray-100'
          } ${isCollapsed ? 'w-14 justify-center' : 'px-4 gap-4'}`}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && (
            <span className="text-[10px] font-black uppercase tracking-widest leading-none truncate animate-in fade-in slide-in-from-left-2 duration-300">Settings</span>
          )}
        </button>

        {/* Collapse Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`h-14 rounded-2xl flex items-center transition-all bg-gray-50 text-gray-400 hover:text-black hover:bg-white border border-transparent hover:border-gray-100 ${
            isCollapsed ? 'w-14 justify-center' : 'px-4 gap-4'
          }`}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none truncate animate-in fade-in slide-in-from-left-2 duration-300">Collapse</span>
            </>
          )}
        </button>
      </div>
    </nav>
  );
};
