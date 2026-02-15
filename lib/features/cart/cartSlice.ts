import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product, VariantOption, Coupon, Customer } from '../../../types';

interface CartState {
  items: CartItem[];
  activeCoupon: Coupon | null;
  selectedCustomer: Customer | null;
}

const initialState: CartState = {
  items: [],
  activeCoupon: null,
  selectedCustomer: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; variants: Record<string, VariantOption>; quantityOverride?: number }>) => {
      const { product, variants, quantityOverride } = action.payload;
      const variantIdStr = Object.values(variants).map(v => v.id).sort().join('-');
      const cartId = `${product.id}-${variantIdStr}`;
      const modifierTotal = Object.values(variants).reduce((sum: number, v) => sum + (v as VariantOption).priceModifier, 0);
      const totalUnitPrice = product.basePrice + modifierTotal;

      const existing = state.items.find(item => item.cartId === cartId);
      if (existing) {
        if (quantityOverride !== undefined) {
          existing.quantity += (quantityOverride - existing.quantity);
        } else {
          existing.quantity += 1;
        }
      } else {
        state.items.push({
          ...product,
          cartId,
          selectedVariants: variants,
          totalUnitPrice,
          quantity: quantityOverride || 1
        });
      }
    },
    updateCartItemVariants: (state, action: PayloadAction<{ oldCartId: string; product: Product; variants: Record<string, VariantOption> }>) => {
      const { oldCartId, product, variants } = action.payload;
      const itemToUpdate = state.items.find(item => item.cartId === oldCartId);
      if (!itemToUpdate) return;

      const currentQty = itemToUpdate.quantity;
      state.items = state.items.filter(item => item.cartId !== oldCartId);

      const variantIdStr = Object.values(variants).map(v => v.id).sort().join('-');
      const newCartId = `${product.id}-${variantIdStr}`;
      const modifierTotal = Object.values(variants).reduce((sum: number, v) => sum + (v as VariantOption).priceModifier, 0);
      const totalUnitPrice = product.basePrice + modifierTotal;

      const existingInFiltered = state.items.find(item => item.cartId === newCartId);
      if (existingInFiltered) {
        existingInFiltered.quantity += currentQty;
      } else {
        state.items.push({
          ...product,
          cartId: newCartId,
          selectedVariants: variants,
          totalUnitPrice,
          quantity: currentQty
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.cartId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ cartId: string; delta: number }>) => {
      const item = state.items.find(i => i.cartId === action.payload.cartId);
      if (item) {
        item.quantity = Math.max(1, item.quantity + action.payload.delta);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.activeCoupon = null;
      state.selectedCustomer = null;
    },
    setActiveCoupon: (state, action: PayloadAction<Coupon | null>) => {
      state.activeCoupon = action.payload;
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const {
  addToCart,
  updateCartItemVariants,
  removeFromCart,
  updateQuantity,
  clearCart,
  setActiveCoupon,
  setSelectedCustomer
} = cartSlice.actions;

export default cartSlice.reducer;
