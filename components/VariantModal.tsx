
import React, { useState } from 'react';
import { Product, VariantOption } from '../types';
import { X, ChevronRight } from 'lucide-react';

interface VariantModalProps {
  product: Product;
  initialSelections?: Record<string, VariantOption>;
  onClose: () => void;
  onAdd: (product: Product, selected: Record<string, VariantOption>) => void;
}

export const VariantModal: React.FC<VariantModalProps> = ({ product, initialSelections, onClose, onAdd }) => {
  const [selections, setSelections] = useState<Record<string, VariantOption>>(() => {
    if (initialSelections) return { ...initialSelections };
    
    const initial: Record<string, VariantOption> = {};
    product.variantGroups?.forEach(group => {
      initial[group.type] = group.options[0];
    });
    return initial;
  });

  const totalPrice = product.basePrice + Object.values(selections).reduce((sum: number, v) => sum + (v as VariantOption).priceModifier, 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg h-[90vh] md:h-auto rounded-t-[48px] md:rounded-[48px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-500 flex flex-col">
        <div className="p-6 md:p-10 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-start mb-8 md:mb-10">
            <div className="flex gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
                 <img src={product.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black text-[#d3af35] uppercase tracking-widest mb-1">{product.category}</p>
                <h2 className="text-xl md:text-2xl font-black text-black leading-tight uppercase tracking-tight truncate max-w-[200px] md:max-w-none">{product.name}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all"><X className="w-5 h-5" /></button>
          </div>

          <div className="space-y-8 md:space-y-10">
            {product.variantGroups?.map((group) => (
              <div key={group.type}>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select {group.type}</p>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {group.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelections(prev => ({ ...prev, [group.type]: opt }))}
                      className={`p-4 md:p-5 rounded-2xl border-2 transition-all text-left relative group ${
                        selections[group.type]?.id === opt.id 
                          ? 'border-black bg-black text-white shadow-lg' 
                          : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-[12px] md:text-sm font-black uppercase tracking-tight truncate">{opt.name}</span>
                        {opt.priceModifier !== 0 && (
                          <span className={`text-[9px] md:text-[10px] font-bold mt-0.5 md:mt-1 uppercase ${selections[group.type]?.id === opt.id ? 'text-[#d3af35]' : 'text-gray-400'}`}>
                            {opt.priceModifier > 0 ? `+ Br ${opt.priceModifier.toFixed(2)}` : `- Br ${Math.abs(opt.priceModifier).toFixed(2)}`}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-10 bg-gray-50 border-t border-gray-100 shrink-0">
           <div className="flex justify-between items-center mb-6 md:mb-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Yield Price</p>
              <p className="text-3xl md:text-4xl font-black text-black tracking-tighter">
                <span className="text-xl md:text-2xl mr-0.5 text-[#d3af35]">Br</span>{totalPrice.toFixed(2)}
              </p>
           </div>
           <button 
             onClick={() => onAdd(product, selections)}
             className="w-full h-16 md:h-20 bg-black text-white rounded-2xl md:rounded-[28px] font-black text-base md:text-lg shadow-xl hover:bg-[#d3af35] transition-all flex items-center justify-between px-8 md:px-10 active:scale-95"
           >
             <span className="uppercase tracking-[0.15em] text-[10px] md:text-[11px]">{initialSelections ? 'Update Config' : 'Register Item'}</span>
             <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
           </button>
        </div>
      </div>
    </div>
  );
};
