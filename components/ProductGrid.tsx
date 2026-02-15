'use client';
import React from 'react';
import { Product } from '../types';
import { Plus, Tag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-64 md:h-96 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Inventory Empty</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick(product)}
          className="group cursor-pointer flex flex-col bg-white rounded-4xl border border-gray-100 hover:border-black hover:shadow-2xl transition-all duration-500 text-left overflow-hidden active:scale-[0.96]"
        >
          <div className="relative aspect-[4/5] max-h-[200px] overflow-hidden bg-gray-50 shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            {product.variantGroups && (
              <div className="absolute top-2 right-2 md:top-5 md:right-5 px-2 md:px-2.5 py-0.5 md:py-1 bg-white/90 backdrop-blur-md rounded-full text-[6px] md:text-[8px] font-black uppercase tracking-widest text-black flex items-center gap-1 border border-white/50 shadow-sm">
                <Tag className="w-2 md:w-2.5 h-2 md:h-2.5" /> Options
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="p-3 flex flex-col flex-1 relative">
            <p className="text-[6px] md:text-[9px] font-black text-[#d3af35] uppercase tracking-widest mb-1 md:mb-2">{product.category}</p>
            <h3 className="text-[10px] md:text-sm font-black text-black leading-tight line-clamp-2 mb-3 tracking-tight">
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
              <span className="text-sm md:text-xl font-black text-black tracking-tighter tabular-nums">
                <span className="text-[9px] md:text-xs mr-0.5 text-[#d3af35]">Br</span>
                {product.basePrice.toFixed(2)}
              </span>
              <div className="w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <Plus className="w-3.5 h-3.5 md:w-6 md:h-6 stroke-[3px]" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
