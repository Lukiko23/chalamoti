export interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  format: string;
  price: number;
  description: string;
  longDescription: string;
  tastingNotes: string;
  foodPairing: string;
  origin: string;
  available: boolean;
  category: 'bouteille' | 'bidon';
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  paymentMethod: 'cash' | 'card';
  pickupDate: string;
  pickupSlot: string;
  ageConfirmed: boolean;
}

export type OrderStatus = 'new' | 'confirmed' | 'ready' | 'picked-up';

export interface Order {
  id: string;
  items: CartItem[];
  info: OrderInfo;
  total: number;
  createdAt: string;
  status: OrderStatus;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  role: 'customer' | 'admin';
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
  replyText?: string;
  repliedAt?: string;
}
