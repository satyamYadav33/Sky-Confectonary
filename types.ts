
export interface Product {
  id: number;
  brand: string;
  title: string;
  price: number;
  unitPriceText: string;
  moq: string;
  shipping: string;
  badges: Array<{ text: string; color: string; bg: string }>;
  image: string;
  type: string;
  shippingIcon: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
