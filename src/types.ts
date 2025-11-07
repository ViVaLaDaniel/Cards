export interface Color {
  name: string;
  class: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
  colors: Color[];
  rating: number;
  reviewCount: number;
}