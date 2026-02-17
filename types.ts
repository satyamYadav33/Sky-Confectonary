
export interface Product {
  id: number;
  brand: string;
  title: string;
  price: number;
  basePrice?: number;
  discount?: {
    type: 'none' | 'percent' | 'fixed' | 'bogo';
    value: string;
  };
  unitPriceText: string;
  moq: string;
  shipping: string;
  badges: Array<{ text: string; color: string; bg: string }>;
  customBadges?: Array<{ text: string; color: string; bg: string }>;
  image: string;
  type: string;
  shippingIcon: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
