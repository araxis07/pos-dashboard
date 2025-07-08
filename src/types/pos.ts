export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  barcode?: string;
  description?: string;
  discount?: number;
  costPrice?: number;
  supplier?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItem extends Product {
  qty: number;
}
