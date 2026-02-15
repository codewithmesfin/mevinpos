
export interface VariantOption {
  id: string;
  name: string;
  priceModifier: number;
}

export interface VariantGroup {
  type: string;
  options: VariantOption[];
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  category: string;
  image: string;
  barcode: string;
  variantGroups?: VariantGroup[];
}

export interface CartItem extends Product {
  cartId: string;
  selectedVariants: Record<string, VariantOption>;
  totalUnitPrice: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
}

export type TaxType = 'VAT15' | 'VAT0' | 'VATEX' | 'Excise';

export interface Tax {
  id: string;
  name: string;
  rate: number;
  type: TaxType;
  harmonizationCode: string;
}

export type CustomerType = 'Individual' | 'Business' | 'Government';

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  email: string;
  phone: string;
  tin?: string;
  address?: string;
}

export interface Shift {
  id: string;
  operator: string;
  startTime: string;
  endTime?: string;
  openingBalance: number;
  closingBalance?: number;
  totalSales: number;
  status: 'Open' | 'Closed';
}

export interface Invoice {
  id: string;
  customerId: string;
  customerName: string;
  customerType: CustomerType;
  date: string;
  total: number;
  taxTotal: number;
  status: 'Paid' | 'Unpaid' | 'Cancelled';
  items: CartItem[];
}

export enum ViewMode {
  CHECKOUT = 'checkout',
  SHIFTS = 'shifts',
  INVOICES = 'invoices',
  RECEIPTS = 'receipts',
  REPORTS = 'reports',
  TAXES = 'taxes',
  CUSTOMERS = 'customers',
  PROMOTIONS = 'promotions',
  SETTINGS = 'settings'
}

export type Category = 'All' | 'Coffee' | 'Bakery' | 'Sandwiches' | 'Retail' | 'Drinks';
