export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: Trating;
  stock: number;
}

export type Trating = {
  rate: number;
  count: number;
};
