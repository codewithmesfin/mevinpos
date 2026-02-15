
import { Product, Category, Tax, Customer } from './types';

export const CATEGORIES: Category[] = ['All', 'Coffee', 'Bakery', 'Sandwiches', 'Drinks', 'Retail'];

export const TAX_RULES: Tax[] = [
  { id: 'tx1', name: 'Standard VAT', rate: 15, type: 'VAT15', harmonizationCode: 'HS-8517.12' },
  { id: 'tx2', name: 'Zero Rated', rate: 0, type: 'VAT0', harmonizationCode: 'HS-0000.00' },
  { id: 'tx3', name: 'Exempt Supply', rate: 0, type: 'VATEX', harmonizationCode: 'HS-EXEMPT' },
  { id: 'tx4', name: 'Excise Tax', rate: 10, type: 'Excise', harmonizationCode: 'HS-2203.00' },
];

export const CUSTOMERS: Customer[] = [
  { id: 'cust1', name: 'Abinet Tekle', type: 'Individual', email: 'abinet@gmail.com', phone: '+251 911 22 33 44' },
  { id: 'cust2', name: 'Ethio Telecom', type: 'Business', email: 'billing@ethiotel.et', phone: '+251 11 66 11 11', tin: '0012345678' },
  { id: 'cust3', name: 'Ministry of Revenue', type: 'Government', email: 'info@mor.gov.et', phone: '+251 11 12 34 56', tin: '9988776655' },
];

export const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Santim Signature Gold', 
    basePrice: 18.50, 
    category: 'Coffee', 
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80', 
    barcode: 'SP-8901',
    variantGroups: [
      {
        type: 'Size',
        options: [
          { id: 's1', name: 'Regular', priceModifier: 0 },
          { id: 's2', name: 'Large', priceModifier: 4.50 },
        ]
      },
      {
        type: 'Milk',
        options: [
          { id: 'm1', name: 'Whole', priceModifier: 0 },
          { id: 'm2', name: 'Oat', priceModifier: 1.50 },
        ]
      }
    ]
  },
  { id: '2', name: 'Ethiopian Yirgacheffe', basePrice: 22.00, category: 'Coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80', barcode: 'SP-8902' },
  { 
    id: '4', 
    name: 'Artisan Croissant', 
    basePrice: 8.50, 
    category: 'Bakery', 
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80', 
    barcode: 'SP-8904',
    variantGroups: [
      {
        type: 'Filling',
        options: [
          { id: 'f1', name: 'Plain', priceModifier: 0 },
          { id: 'f2', name: 'Chocolate', priceModifier: 2.00 },
        ]
      }
    ]
  },
  { id: '10', name: 'Santim Branded Hoodie', basePrice: 45.00, category: 'Retail', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80', barcode: 'SP-8910',
    variantGroups: [
      {
        type: 'Size',
        options: [
          { id: 'sz1', name: 'S', priceModifier: 0 },
          { id: 'sz2', name: 'M', priceModifier: 0 },
          { id: 'sz3', name: 'L', priceModifier: 0 },
          { id: 'sz4', name: 'XL', priceModifier: 5.00 },
        ]
      }
    ]
  }
];

export const PRIMARY_GOLD = '#d3af35';
export const ELITE_BLACK = '#000000';
export const LOGO_URL = 'https://santimpay.com/assets/SP%20logo-DCfy78Vx.png';
