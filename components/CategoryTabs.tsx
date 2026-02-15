
import React from 'react';
import { Category } from '../types';
import { CATEGORIES, PRIMARY_GOLD } from '../constants';

interface CategoryTabsProps {
  active: Category;
  onChange: (category: Category) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ active, onChange }) => {
  return (
    <div className="flex items-center gap-6 md:gap-14 overflow-x-auto no-scrollbar py-3 md:py-6 scroll-smooth snap-x">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`px-4 md:px-8 py-2 md:py-3 text-[11px] md:text-[13px] font-black whitespace-nowrap transition-all uppercase tracking-[0.2em] md:tracking-[0.3em] relative group snap-start ${
              isActive
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {cat}
            <div 
              className={`absolute -bottom-1 md:-bottom-4 left-1/2 -translate-x-1/2 h-1 md:h-2 rounded-full transition-all duration-700 ${
                isActive ? 'w-full opacity-100 scale-100' : 'w-0 opacity-0 scale-50'
              }`}
              style={{ backgroundColor: PRIMARY_GOLD }}
            ></div>
          </button>
        );
      })}
    </div>
  );
};
