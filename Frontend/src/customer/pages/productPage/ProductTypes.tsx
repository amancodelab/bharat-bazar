export interface ProductType {
  _id: string;
  title: string;
  description: string;
  color: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  images: string[];
  category: string;
  seller: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
