'use client';
import React, { useState } from 'react';
import { Customer, CartItem } from '../types';
import { LOGO_URL } from '../constants';
import { X, Banknote, Smartphone, CheckCircle2, Loader2, Globe, ChevronRight, User, ReceiptText, ChevronDown, ChevronUp } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  items: CartItem[];
  customer: Customer;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ total, items, customer, onClose, onSuccess }) => {
  const [status, setStatus] = useState<'selecting' | 'processing' | 'success'>('selecting');
  const [showSummary, setShowSummary] = useState(false);

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2500);
  };

  const tax = total * 0.08;
  const grandTotal = total + tax;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg transition-all duration-1000" onClick={status === 'selecting' ? onClose : undefined} />
      
      <div className="bg-white w-full max-w-6xl h-full md:h-auto md:max-h-[92vh] rounded-none md:rounded-[56px] shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-10 duration-700 flex flex-col lg:flex-row">
        
        {/* Mobile Header - Total & Summary Toggle */}
        <div className="lg:hidden bg-[#FBFBFB] border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0 z-20">
          <div onClick={() => setShowSummary(!showSummary)} className="flex items-center gap-2 cursor-pointer">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Due Amount</span>
              <span className="text-2xl font-black text-black tracking-tighter">Br {grandTotal.toFixed(2)}</span>
            </div>
            {showSummary ? <ChevronUp className="w-4 h-4 text-[#d3af35]" /> : <ChevronDown className="w-4 h-4 text-[#d3af35]" />}
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 rounded-full text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapsible/Sidebar Receipt Summary */}
        <div className={`
          w-full lg:w-[420px] bg-[#FAFAFA] flex flex-col border-r border-gray-100 overflow-hidden transition-all duration-500
          ${showSummary ? 'max-h-[60vh] lg:max-h-none' : 'max-h-0 lg:max-h-none'}
        `}>
          <div className="hidden lg:flex p-12 shrink-0 border-b border-gray-100">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm border border-gray-50 p-2.5">
              <img src={LOGO_URL} alt="SantimPay" className="w-full h-full object-contain" />
            </div>
            
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Identity Auth</p>
              <div className="flex items-center gap-4 bg-white p-5 rounded-[28px] border border-gray-50">
                 <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#d3af35]">
                    <User className="w-5 h-5" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-black text-black uppercase truncate">{customer.name}</h4>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{customer.type}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 no-scrollbar">
            <div className="flex items-center gap-3 mb-6">
              <ReceiptText className="w-3.5 h-3.5 text-[#d3af35]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Node Contents</h4>
            </div>
            
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-black text-black uppercase tracking-tight truncate leading-tight">{item.name}</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">
                      {item.quantity} Unit × Br {item.totalUnitPrice.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-[11px] font-black text-black tabular-nums">
                    Br {(item.totalUnitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-12 bg-gray-50 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span>Gross Bill</span>
               <span className="text-black">Br {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span>VAT (8%)</span>
               <span className="text-black">Br {tax.toFixed(2)}</span>
            </div>
            <div className="pt-4 flex justify-between items-baseline border-t border-gray-100/50">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">Net Total</span>
               <p className="text-3xl lg:text-5xl font-black tabular-nums tracking-tighter text-black">
                 <span className="text-xl lg:text-2xl mr-1 text-[#d3af35] font-black">Br</span>{grandTotal.toFixed(2)}
               </p>
            </div>
          </div>
        </div>

        {/* Action Layer */}
        <div className="flex-1 flex flex-col p-6 md:p-16 bg-white overflow-y-auto no-scrollbar relative">
          {status === 'selecting' && (
            <div className="h-full flex flex-col">
              <div className="hidden lg:flex items-center justify-between mb-16">
                <div>
                  <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Auth Node</h2>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Select payment vector</p>
                </div>
                <button onClick={onClose} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-full transition-all group">
                  <X className="w-7 h-7 text-gray-200 group-hover:text-black transition-colors" />
                </button>
              </div>

              <div className="lg:hidden mb-8">
                <h3 className="text-xl font-black uppercase tracking-tight">Select Method</h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Settle via financial link</p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:gap-6 flex-1">
                {[
                  { id: 'cash', icon: Banknote, label: 'Physical Cash', desc: 'Settle via currency capture' },
                  { id: 'gateway', icon: Globe, label: 'Financial Link', desc: 'SantimPay Direct Sync' },
                  { id: 'pos', icon: Smartphone, label: 'Card Device', desc: 'External POS terminal auth' },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={handlePay}
                    className="flex items-center gap-6 lg:gap-8 p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-gray-100 lg:border-2 lg:border-gray-50 hover:border-black hover:bg-gray-50 transition-all duration-500 text-left group active:scale-95 shadow-sm"
                  >
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl lg:rounded-3xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-all border border-gray-100 group-hover:border-black/10 shrink-0">
                      <method.icon className="w-6 h-6 lg:w-8 lg:h-8 text-gray-300 group-hover:text-black transition-colors stroke-[2.5px]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-lg lg:text-xl font-black text-black group-hover:text-[#d3af35] transition-colors uppercase tracking-tight leading-none">{method.label}</span>
                      <span className="block text-[9px] lg:text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest leading-none truncate">{method.desc}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-200 group-hover:text-black transition-all group-hover:translate-x-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {status === 'processing' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
              <div className="relative mb-10 lg:mb-12">
                <Loader2 className="w-32 h-32 lg:w-40 lg:h-40 text-black animate-spin stroke-[1px] opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#d3af35] rounded-full animate-ping"></div>
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-black uppercase tracking-tighter mb-2">Syncing Node</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] animate-pulse">Establishing Financial Link</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[36px] lg:rounded-[48px] bg-green-50 flex items-center justify-center mb-8 lg:mb-10 shadow-inner">
                <CheckCircle2 className="w-12 h-12 lg:w-16 lg:h-16 text-green-500 stroke-[2.5px]" />
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-black mb-2 uppercase tracking-tighter">Settled</h2>
              <p className="text-[10px] lg:text-[12px] font-black text-[#d3af35] uppercase tracking-[0.5em] mb-10 lg:mb-12">Entry Verified & Finalized</p>
              <div className="h-1.5 w-40 lg:w-48 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                 <div className="h-full bg-green-500 w-full animate-[progress_1s_ease-out]"></div>
              </div>
              
              <div className="mt-12 md:hidden">
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Digital Receipt Broadcasted</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
