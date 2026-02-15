import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../../types';

interface ProductsState {
  activeCategory: Category;
  searchQuery: string;
}

const initialState: ProductsState = {
  activeCategory: 'All',
  searchQuery: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<Category>) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setActiveCategory, setSearchQuery } = productsSlice.actions;

export default productsSlice.reducer;
