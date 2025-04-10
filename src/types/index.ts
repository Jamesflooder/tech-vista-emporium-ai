
export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  subcategory: string;
  image: string;
  specifications: Record<string, string>;
  stock: number;
  rating: number;
  createdAt: string;
}

export type ProductCategory = 'smartphone' | 'laptop' | 'tablet' | 'accessory';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  paymentMethod: string;
  createdAt: string;
}

export type ThemeType = 'light' | 'dark' | 'auto';
export type LanguageType = 'fr' | 'en';
