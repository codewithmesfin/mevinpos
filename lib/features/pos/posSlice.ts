import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shift, Invoice, Tax, Customer } from '../../../types';
import { TAX_RULES, CUSTOMERS } from '../../../constants';

interface PosState {
  shifts: Shift[];
  invoices: Invoice[];
  taxRules: Tax[];
  allCustomers: Customer[];
}

const initialState: PosState = {
  shifts: [{
    id: 'SH-001',
    operator: 'Admin Operator',
    startTime: new Date().toLocaleTimeString(),
    openingBalance: 500,
    totalSales: 1240.50,
    status: 'Open'
  }],
  invoices: [],
  taxRules: TAX_RULES,
  allCustomers: CUSTOMERS,
};

export const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.unshift(action.payload);
    },
    updateShift: (state, action: PayloadAction<Shift>) => {
      const index = state.shifts.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.shifts[index] = action.payload;
      } else {
        state.shifts.unshift(action.payload);
      }
    },
  },
});

export const { addInvoice, updateShift } = posSlice.actions;

export default posSlice.reducer;
