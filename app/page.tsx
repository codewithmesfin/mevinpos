'use client';

import React, { useState, useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ProductGrid } from '../components/ProductGrid';
import { Cart } from '../components/Cart';
import { CategoryTabs } from '../components/CategoryTabs';
import { PaymentModal } from '../components/PaymentModal';
import { VariantModal } from '../components/VariantModal';
import { BottomNav } from '../components/BottomNav';
import { ViewMode, Product, CartItem, Invoice, CustomerType } from '../types';
import { PRODUCTS, LOGO_URL } from '../constants';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import {
  addToCart,
  updateCartItemVariants,
  clearCart,
} from '../lib/features/cart/cartSlice';
import { setActiveCategory, setSearchQuery } from '../lib/features/products/productsSlice';
import { addInvoice } from '../lib/features/pos/posSlice';
import { 
  Search, Bell, UserCircle, 
  Scan, ShieldCheck, Mail, Phone, Building2, User, Landmark, History, X,
  Receipt, TrendingUp, DollarSign, Plus,
  ShoppingBag, Sparkles, Gift, Zap
} from 'lucide-react';

const ReceiptsView = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Receipts</h2>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Transaction Ledger</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-black transition-all">
            <div className="flex justify-between items-start mb-6">
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center text-black">
                  <Receipt className="w-5 h-5 md:w-6 md:h-6" />
               </div>
               <span className="text-[9px] font-black text-[#d3af35] uppercase tracking-widest">#RCPT-00{i}</span>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time</span>
                  <span className="text-xs font-bold text-black">10:2{i} AM</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Method</span>
                  <span className="text-xs font-bold text-black uppercase">Santim Wallet</span>
               </div>
               <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Settlement</span>
                  <span className="text-xl md:text-2xl font-black text-black tracking-tighter">Br {(45 * i).toFixed(2)}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PromotionsView = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-10 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Promotions</h2>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Offer Strategy Hub</p>
        </div>
        <button className="w-full md:w-auto px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#d3af35] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
          <Plus className="w-4 h-4" /> Create Offer
        </button>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-4 h-4 text-[#d3af35]" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">Active Campaigns</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Summer Harvest', code: 'SUN24', discount: '15% OFF', usage: '42/100', color: 'bg-orange-50 text-orange-600' },
              { title: 'Elite Rewards', code: 'ELITE10', discount: '10% Fixed', usage: '128/∞', color: 'bg-black text-[#d3af35]' },
              { title: 'First Sip', code: 'WELCOME', discount: '5.00 Fixed', usage: '890/∞', color: 'bg-green-50 text-green-600' },
            ].map((promo, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative group hover:border-black transition-all overflow-hidden">
                <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[8px] font-black uppercase tracking-widest ${promo.color}`}>
                   {promo.discount}
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-black text-black uppercase tracking-tight">{promo.title}</h4>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Code: {promo.code}</p>
                  </div>
                  <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Redemptions</p>
                      <p className="text-sm font-black text-black">{promo.usage}</p>
                    </div>
                    <button className="p-3 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all">
                      <History className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-[#d3af35]" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">Loyalty Tiers</h3>
          </div>
          <div className="bg-black rounded-[48px] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d3af35]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: 'Bronze', perks: '2% Cashback', req: '0+ Points' },
                { name: 'Silver', perks: '5% Cashback', req: '1000+ Points' },
                { name: 'Gold Elite', perks: '10% Cashback', req: '5000+ Points' },
              ].map((tier, i) => (
                <div key={i} className={`p-8 rounded-[32px] border transition-all ${i === 2 ? 'border-[#d3af35] bg-[#d3af35]/5 shadow-[0_0_30px_rgba(211,175,53,0.1)]' : 'border-white/10'}`}>
                  <p className={`text-[8px] font-black uppercase tracking-[0.3em] mb-4 ${i === 2 ? 'text-[#d3af35]' : 'text-white/40'}`}>Identity Tier</p>
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-2">{tier.name}</h4>
                  <p className="text-sm font-bold text-white mb-6">{tier.perks}</p>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{tier.req}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-4 h-4 text-[#d3af35]" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">Global Overrides</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex items-center justify-between group hover:border-black transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-black">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-black uppercase tracking-tight">Gov Exempt</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Automatic Tax Override</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Active</span>
                 <div className="w-12 h-6 bg-black rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-[#d3af35] rounded-full"></div>
                 </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 flex items-center justify-between group hover:border-black transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-black">
                  <History className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-black uppercase tracking-tight">Happy Hour</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">3PM - 5PM Daily • 5%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Inactive</span>
                 <div className="w-12 h-6 bg-gray-100 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ReportsView = () => {
  const [reportType, setReportType] = useState<'X' | 'Z' | 'General'>('General');

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Intelligence</h2>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Audit & Analytics</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto">
          {['General', 'X', 'Z'].map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type as any)}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${reportType === type ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {reportType === 'General' && (
        <div className="space-y-8 md:space-y-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Revenue', value: 'Br 12.4k', icon: DollarSign, color: 'text-green-500' },
              { label: 'TXN', value: '142', icon: History, color: 'text-blue-500' },
              { label: 'Avg Sale', value: 'Br 87', icon: TrendingUp, color: 'text-[#d3af35]' },
              { label: 'Tax', value: 'Br 1.8k', icon: ShieldCheck, color: 'text-purple-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 md:p-8 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm">
                <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center mb-4 md:mb-6 ${stat.color}`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-lg md:text-3xl font-black text-black tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-black rounded-[40px] md:rounded-[48px] p-6 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#d3af35]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2 md:space-y-4 text-center md:text-left">
                   <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight">Performance</h3>
                   <p className="text-white/40 text-[8px] font-bold uppercase tracking-widest">Operational Day Cycle</p>
                </div>
                <div className="flex gap-10 md:gap-12">
                   <div className="text-center">
                      <p className="text-3xl md:text-5xl font-black tracking-tighter text-[#d3af35]">92%</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1.5 md:mt-2">Efficiency</p>
                   </div>
                   <div className="text-center">
                      <p className="text-3xl md:text-5xl font-black tracking-tighter text-white">12.5k</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1.5 md:mt-2">Daily Peak</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {(reportType === 'X' || reportType === 'Z') && (
        <div className="bg-white rounded-[40px] md:rounded-[48px] border border-gray-100 shadow-sm p-6 md:p-12 max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
          <div className="text-center space-y-2">
             <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest">{reportType === 'X' ? 'X-Reading' : 'Z-Report Final'}</h3>
             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">{reportType === 'X' ? 'Non-Closing Audit' : 'Shift Termination'}</p>
          </div>
          <div className="space-y-5 border-y border-gray-50 py-8">
             {[
               { label: 'Opening', val: 'Br 500.00' },
               { label: 'Net Sales', val: 'Br 2,140.50' },
               { label: 'Tax', val: 'Br 321.08' },
               { label: 'Balance', val: 'Br 2,961.58' }
             ].map((row, i) => (
               <div key={i} className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{row.label}</span>
                  <span className="text-base md:text-lg font-black text-black">{row.val}</span>
               </div>
             ))}
          </div>
          <button className={`w-full py-5 md:py-6 rounded-[24px] md:rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${reportType === 'Z' ? 'bg-red-600 text-white hover:bg-black' : 'bg-black text-white hover:bg-[#d3af35]'}`}>
             {reportType === 'X' ? 'Print X-Reading' : 'Finalize & Close Shift'}
          </button>
        </div>
      )}
    </div>
  );
};

const ShiftsView = () => {
  const shifts = useAppSelector((state) => state.pos.shifts);
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Shift Ops</h2>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">System Logs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map(shift => (
          <div key={shift.id} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
               <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${shift.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {shift.status}
               </div>
               <span className="text-[9px] font-black text-[#d3af35] uppercase tracking-widest">{shift.id}</span>
            </div>
            <div className="space-y-4">
               <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Operator</p>
                  <p className="text-xs font-bold text-black uppercase">{shift.operator}</p>
               </div>
               <div className="flex justify-between">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Started</p>
                    <p className="text-[10px] font-bold text-black">{shift.startTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Volume</p>
                    <p className="text-lg font-black text-black">Br {shift.totalSales.toFixed(2)}</p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InvoicesView = () => {
  const invoices = useAppSelector((state) => state.pos.invoices);
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Tax Invoices</h2>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Authorized Fiscal Docs</p>
      </div>
      <div className="bg-white rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Client</th>
                <th className="px-6 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Empty Registry</td>
                </tr>
              ) : (
                invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5 text-[11px] font-black text-black">{inv.id}</td>
                    <td className="px-6 py-5">
                      <p className="text-[11px] font-bold text-black uppercase">{inv.customerName}</p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{inv.date}</p>
                    </td>
                    <td className="px-6 py-5 text-base font-black text-black text-right tracking-tighter">Br {inv.total.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TaxesView = () => {
  const taxRules = useAppSelector((state) => state.pos.taxRules);
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Tax Matrix</h2>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">HS Harmonization</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
        {taxRules.map(tax => (
          <div key={tax.id} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm flex justify-between items-center group hover:border-black transition-all">
             <div className="space-y-3">
                <h4 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">{tax.name}</h4>
                <div className="px-3 py-1 bg-gray-50 rounded-full inline-block text-[8px] font-black text-black uppercase tracking-widest">
                   {tax.harmonizationCode}
                </div>
             </div>
             <div className="text-right">
                <p className="text-[9px] font-black text-[#d3af35] uppercase tracking-widest mb-0.5">Rate</p>
                <p className="text-3xl md:text-4xl font-black text-black tracking-tighter">{tax.rate}%</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomersView = () => {
  const allCustomers = useAppSelector((state) => state.pos.allCustomers);
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 bg-[#FBFBFB] animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight">Identity</h2>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Master Registry</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {allCustomers.map(cust => (
          <div key={cust.id} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm group hover:shadow-xl transition-all relative overflow-hidden">
             <div className="flex items-center gap-4 md:gap-6 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[24px] bg-black flex items-center justify-center text-[#d3af35] shadow-xl shrink-0">
                   <User className="w-5 h-5 md:w-8 md:h-8" />
                </div>
                <div>
                   <h4 className="text-base md:text-xl font-black text-black uppercase tracking-tight">{cust.name}</h4>
                   <span className="text-[8px] font-black text-[#d3af35] uppercase tracking-[0.2em]">{cust.type}</span>
                </div>
             </div>
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-black transition-colors">
                   <Phone className="w-3.5 h-3.5 shrink-0" />
                   <span className="text-[11px] font-bold uppercase truncate">{cust.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-black transition-colors">
                   <Mail className="w-3.5 h-3.5 shrink-0" />
                   <span className="text-[11px] font-bold uppercase truncate">{cust.email}</span>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.view.viewMode);
  const cart = useAppSelector((state) => state.cart.items);
  const selectedCustomer = useAppSelector((state) => state.cart.selectedCustomer);
  const activeCategory = useAppSelector((state) => state.products.activeCategory);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCartOpenMobile, setIsCartOpenMobile] = useState(false);
  const [selectedProductForVariants, setSelectedProductForVariants] = useState<Product | null>(null);
  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.barcode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleProductClick = (product: Product) => {
    if (product.variantGroups && product.variantGroups.length > 0) {
      setSelectedProductForVariants(product);
    } else {
      dispatch(addToCart({ product, variants: {} }));
    }
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalUnitPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderView = () => {
    switch(viewMode) {
      case ViewMode.CHECKOUT:
        return (
          <>
            <div className="px-4 md:px-12 py-2 md:py-4 bg-white shrink-0 border-b border-gray-100 z-20 overflow-x-auto no-scrollbar">
              <CategoryTabs active={activeCategory} onChange={(cat) => dispatch(setActiveCategory(cat))} />
            </div>
            <div className="flex-1 overflow-y-auto px-4 md:px-12 py-4 md:py-10 pb-44 md:pb-12 bg-white no-scrollbar">
              <ProductGrid products={filteredProducts} onProductClick={handleProductClick} />
            </div>
          </>
        );
      case ViewMode.SHIFTS: return <ShiftsView />;
      case ViewMode.INVOICES: return <InvoicesView />;
      case ViewMode.RECEIPTS: return <ReceiptsView />;
      case ViewMode.REPORTS: return <ReportsView />;
      case ViewMode.TAXES: return <TaxesView />;
      case ViewMode.CUSTOMERS: return <CustomersView />;
      case ViewMode.PROMOTIONS: return <PromotionsView />;
      default: return <div className="p-12 text-center opacity-20 uppercase font-black tracking-widest">Restricted View</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden select-none font-sans text-black">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40 transition-all">
          <div className="h-16 md:h-20 flex items-center px-4 md:px-12 justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="md:hidden w-8 h-8 rounded-lg overflow-hidden p-1.5 bg-black">
                 <img src={LOGO_URL} alt="SantimPay" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                 <h1 className="text-xs md:text-xl font-black uppercase tracking-[0.2em] text-black leading-none">SantimPay POS</h1>
                 <p className="text-[7px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Terminal #29 • Elite</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-50 text-black border border-transparent hover:border-gray-200 transition-all">
                <Bell className="w-4.5 h-4.5" />
              </button>
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-black flex items-center justify-center overflow-hidden shadow-xl">
                <UserCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="px-4 md:px-12 pb-4 md:pb-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-[400px] lg:w-[500px]">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                <input 
                  type="text" 
                  placeholder="SKU Search..." 
                  className="w-full bg-gray-50 md:bg-[#F5F5F5] border-transparent focus:bg-white focus:border-black rounded-xl md:rounded-2xl pl-10 md:pl-12 pr-4 md:pr-6 py-2.5 md:py-3.5 text-[10px] md:text-sm font-bold transition-all outline-none border"
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                />
              </div>
              <button 
                onClick={() => setIsScannerOpen(true)}
                className="w-10 h-10 md:w-14 md:h-14 bg-black text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-[#d3af35] transition-all shadow-xl active:scale-95"
              >
                <Scan className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </header>

        {renderView()}

        {viewMode === ViewMode.CHECKOUT && cartItemCount > 0 && !isCartOpenMobile && (
          <button 
            onClick={() => setIsCartOpenMobile(true)}
            className="md:hidden fixed bottom-24 right-6 w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center z-[45] animate-in slide-in-from-bottom-10 duration-500 active:scale-90"
          >
            <div className="relative">
              <ShoppingBag className="w-7 h-7" />
              <span className="absolute -top-3 -right-3 w-7 h-7 bg-[#d3af35] text-black rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                {cartItemCount}
              </span>
            </div>
          </button>
        )}

        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>

      <div className={`
        fixed inset-0 z-50 transition-all duration-700 md:relative md:translate-y-0 md:inset-auto md:z-20 md:flex
        ${isCartOpenMobile ? 'bg-black/60 backdrop-blur-md' : 'pointer-events-none md:pointer-events-auto'}
      `}>
        <div 
          className={`
            absolute inset-x-0 bottom-0 top-[8%] bg-white rounded-t-[40px] md:rounded-none shadow-2xl transition-transform duration-500 md:relative md:top-0 md:rounded-none md:shadow-none md:w-[380px] lg:w-[420px] md:translate-y-0 flex flex-col pointer-events-auto border-l border-gray-100
            ${isCartOpenMobile ? 'translate-y-0' : 'translate-y-full md:translate-y-0'}
          `}
        >
          <Cart 
            onEditVariants={(item) => setEditingCartItem(item)}
            onCheckout={() => {
              setIsPaymentModalOpen(true);
              setIsCartOpenMobile(false);
            }}
            onCloseMobile={() => setIsCartOpenMobile(false)}
          />
        </div>
      </div>

      {(selectedProductForVariants || editingCartItem) && (
        <VariantModal 
          product={selectedProductForVariants || (editingCartItem as CartItem)}
          initialSelections={editingCartItem?.selectedVariants}
          onClose={() => {
            setSelectedProductForVariants(null);
            setEditingCartItem(null);
          }}
          onAdd={(p, s) => {
            if (editingCartItem) {
              dispatch(updateCartItemVariants({ oldCartId: editingCartItem.cartId, product: p, variants: s }));
              setEditingCartItem(null);
            } else {
              dispatch(addToCart({ product: p, variants: s }));
              setSelectedProductForVariants(null);
            }
          }}
        />
      )}

      {isPaymentModalOpen && selectedCustomer && (
        <PaymentModal 
          total={cartSubtotal} 
          items={cart}
          customer={selectedCustomer}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={() => {
            const newInv: Invoice = {
              id: `INV-${Date.now().toString().slice(-6)}`,
              customerId: selectedCustomer.id,
              customerName: selectedCustomer.name,
              customerType: selectedCustomer.type,
              date: new Date().toLocaleString(),
              total: cartSubtotal * 1.08,
              taxTotal: cartSubtotal * 0.08,
              status: 'Paid',
              items: [...cart]
            };
            dispatch(addInvoice(newInv));
            dispatch(clearCart());
            setIsPaymentModalOpen(false);
          }}
        />
      )}

      {isScannerOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-3xl animate-in fade-in duration-300 px-4">
          <div className="bg-white/10 w-full max-w-lg rounded-[48px] md:rounded-[64px] overflow-hidden relative border border-white/20 p-8 md:p-12 flex flex-col items-center shadow-2xl">
             <button onClick={() => setIsScannerOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 p-2.5 bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
               <X className="w-6 h-6" />
             </button>
             <div className="w-full aspect-square md:aspect-video rounded-[32px] md:rounded-[48px] bg-black/60 border border-white/10 relative overflow-hidden flex flex-col items-center justify-center mb-10">
                <div className="w-[85%] h-1 bg-[#d3af35] absolute animate-[scan_2s_infinite_linear] shadow-[0_0_25px_#d3af35]"></div>
                <p className="text-[8px] font-black uppercase text-white/30 tracking-[0.4em]">Node Capturing Active</p>
             </div>
             <div className="text-center space-y-3 mb-10">
                <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight">Scanner Hub</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">Position SKU for laser sync</p>
             </div>
             <div className="grid grid-cols-2 gap-3 w-full">
                <button onClick={() => { handleProductClick(PRODUCTS[0]); setIsScannerOpen(false); }} className="py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl text-[9px] font-black uppercase transition-all">Mock Coffee</button>
                <button onClick={() => { handleProductClick(PRODUCTS[3]); setIsScannerOpen(false); }} className="py-4 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl text-[9px] font-black uppercase transition-all">Mock Hoodie</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
