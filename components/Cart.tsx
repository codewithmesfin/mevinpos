'use client';
import React, { useState } from 'react';
import { CartItem, VariantOption, Customer } from '../types';
import { CUSTOMERS } from '../constants';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  setSelectedCustomer
} from '../lib/features/cart/cartSlice';
import { Trash2, Plus, Minus, ChevronRight, Sparkles, ReceiptText, Tag, User, Search, CheckCircle2, AlertCircle, X, Edit2 } from 'lucide-react';

interface CartProps {
  onEditVariants: (item: CartItem) => void;
  onCheckout: () => void;
  onCloseMobile?: () => void;
}

export const Cart: React.FC<CartProps> = ({ 
  onEditVariants, onCheckout, onCloseMobile
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const selectedCustomer = useAppSelector((state) => state.cart.selectedCustomer);
  const activeCoupon = useAppSelector((state) => state.cart.activeCoupon);

  const [isChoosingCustomer, setIsChoosingCustomer] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  
  const subtotal = items.reduce((sum, item) => sum + item.totalUnitPrice * item.quantity, 0);
  let discountValue = 0;
  if (activeCoupon) {
    discountValue = activeCoupon.discountType === 'percentage' ? subtotal * (activeCoupon.value / 100) : activeCoupon.value;
  }
  const tax = (subtotal - discountValue) * 0.08;
  const grandTotal = subtotal - discountValue + tax;

  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) || 
    c.phone.includes(customerSearch)
  );

  return (
    <div className="flex flex-col h-full bg-white relative rounded-t-[48px] md:rounded-none overflow-hidden">
      {/* Mobile Handle / Close Bar */}
      <div className="md:hidden flex items-center justify-center py-4 shrink-0" onClick={onCloseMobile}>
         <div className="w-16 h-1.5 bg-gray-100 rounded-full"></div>
      </div>

      {/* Search Overlay */}
      {isChoosingCustomer && (
        <div className="absolute inset-0 z-[60] bg-white flex flex-col p-6 md:p-10 animate-in slide-in-from-bottom-8 duration-500">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-2xl font-black text-black uppercase tracking-tight">Select Client</h3>
             <button onClick={() => setIsChoosingCustomer(false)} className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all">
               <X className="w-5 h-5" />
             </button>
          </div>
          <div className="relative mb-8">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search Registry..." 
               className="w-full bg-gray-50 border-transparent border focus:border-black rounded-2xl pl-14 pr-6 py-4 text-xs font-bold outline-none transition-all"
               autoFocus
               value={customerSearch}
               onChange={(e) => setCustomerSearch(e.target.value)}
             />
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
             {filteredCustomers.map(c => (
               <button 
                key={c.id} 
                onClick={() => { dispatch(setSelectedCustomer(c)); setIsChoosingCustomer(false); }}
                className="w-full p-6 rounded-3xl border border-gray-50 bg-gray-50 hover:border-black hover:bg-white text-left flex justify-between items-center transition-all group shadow-sm hover:shadow-xl"
               >
                 <div>
                   <p className="text-sm font-black text-black uppercase tracking-tight">{c.name}</p>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{c.phone} • {c.type}</p>
                 </div>
                 <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-[#d3af35] transition-all" />
               </button>
             ))}
          </div>
        </div>
      )}

      <div className="px-6 md:px-8 py-6 md:py-10 border-b border-gray-50 space-y-6 md:space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-black text-black tracking-tighter uppercase">Order Overview</h3>
          <div className="flex items-center gap-4">
            <button onClick={() => dispatch(clearCart())} className="text-[9px] font-black text-gray-300 uppercase tracking-widest hover:text-red-500 transition-colors">Reset</button>
            <button onClick={onCloseMobile} className="md:hidden p-2 text-gray-300 hover:text-black transition-colors"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Identity Section */}
        <button 
          onClick={() => setIsChoosingCustomer(true)}
          className={`w-full p-5 md:p-6 rounded-[32px] md:rounded-[36px] border-2 transition-all flex items-center justify-between group active:scale-95 ${selectedCustomer ? 'border-black bg-black text-white shadow-xl md:shadow-2xl' : 'border-dashed border-gray-200 bg-white hover:border-[#d3af35]'}`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[16px] md:rounded-[20px] flex items-center justify-center transition-all ${selectedCustomer ? 'bg-[#d3af35]' : 'bg-gray-50 text-gray-400 group-hover:text-[#d3af35]'}`}>
              {selectedCustomer ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-black" /> : <User className="w-5 h-5 md:w-6 md:h-6" />}
            </div>
            <div className="text-left">
              <p className={`text-[8px] font-black uppercase tracking-[0.2em] mb-0.5 ${selectedCustomer ? 'text-[#d3af35]' : 'text-gray-400'}`}>Identity Link</p>
              <h4 className="text-[11px] md:text-xs font-black uppercase truncate max-w-[120px] md:max-w-[160px] tracking-tight">{selectedCustomer?.name || 'Assign Customer'}</h4>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 ${selectedCustomer ? 'text-[#d3af35]' : 'text-gray-200 group-hover:text-[#d3af35]'}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10 md:py-20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-inner">
              <ReceiptText className="w-6 h-6 md:w-8 md:h-8 text-gray-100" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300">Register is Empty</p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {items.map((item) => (
              <div key={item.cartId} className="group animate-in fade-in slide-in-from-right-4 duration-500 bg-white rounded-[28px] md:rounded-[32px] p-2 transition-all hover:bg-gray-50 border border-transparent hover:border-gray-100">
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 px-2 md:px-3 pt-2 md:pt-3">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-[12px] md:text-[13px] font-black text-black leading-tight uppercase tracking-tight truncate">{item.name}</h4>
                      <span className="text-[12px] md:text-[13px] font-black text-black tabular-nums shrink-0">Br {(item.totalUnitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                    {Object.keys(item.selectedVariants).length > 0 && (
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[7px] md:text-[8px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 truncate">
                          <Tag className="w-2 h-2" />
                          {Object.values(item.selectedVariants).map(v => (v as VariantOption).name).join(' • ')}
                        </p>
                        <button 
                          onClick={() => onEditVariants(item)}
                          className="p-1 text-gray-300 hover:text-black transition-colors rounded-lg"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-2 md:px-3 pb-2 md:pb-3">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                    <button onClick={() => dispatch(updateQuantity({ cartId: item.cartId, delta: -1 }))} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg md:rounded-xl transition-all"><Minus className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[3px]" /></button>
                    <span className="w-6 md:w-8 text-center text-[11px] md:text-xs font-black">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ cartId: item.cartId, delta: 1 }))} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg md:rounded-xl transition-all"><Plus className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[3px]" /></button>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.cartId))} className="p-2 text-gray-200 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 md:px-8 py-8 md:py-10 bg-[#FBFBFB] border-t border-gray-100 pb-24 md:pb-10">
        {!selectedCustomer && items.length > 0 && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-[24px] border border-red-100 animate-in fade-in zoom-in-95 duration-500">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-relaxed">Identity verification required</p>
          </div>
        )}

        <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
          <div className="flex justify-between text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
            <span>Subtotal</span>
            <span className="text-black tabular-nums">Br {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[10px] md:text-[11px] font-black uppercase tracking-widest text-gray-400">
            <span>VAT (8%)</span>
            <span className="text-black tabular-nums">Br {tax.toFixed(2)}</span>
          </div>
          <div className="pt-6 md:pt-8 flex justify-between items-baseline border-t border-gray-100">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-black">Total</span>
            <span className="text-3xl md:text-5xl font-black text-black tracking-tighter tabular-nums">
              <span className="text-xl md:text-2xl mr-1 text-[#d3af35]">Br</span>
              {grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          disabled={items.length === 0 || !selectedCustomer}
          onClick={onCheckout}
          className={`group w-full h-16 md:h-24 rounded-[28px] md:rounded-[40px] text-white font-black text-sm md:text-xl shadow-xl md:shadow-2xl transition-all duration-500 active:scale-95 flex items-center justify-between px-6 md:px-10 ${
            items.length > 0 && selectedCustomer ? 'bg-black hover:bg-[#d3af35] shadow-black/10' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center gap-3 md:gap-5">
            <Sparkles className={`w-5 h-5 md:w-7 md:h-7 ${items.length > 0 && selectedCustomer ? 'text-[#d3af35] animate-pulse' : 'text-gray-200'}`} />
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-[12px] font-black">Authorize Bill</span>
          </div>
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-3" />
        </button>
      </div>
    </div>
  );
};
