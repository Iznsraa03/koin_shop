export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
}

export const products: Product[] = [
  {
    slug: 'mobile-legends',
    name: 'Mobile Legends',
    description: 'Top Up Diamond Mobile Legends murah dan cepat.',
    price: 3000,
  },
  {
    slug: 'free-fire',
    name: 'Free Fire',
    description: 'Top Up Diamond Free Fire instan.',
    price: 2000,
  },
  {
    slug: 'pubg-mobile',
    name: 'PUBG Mobile',
    description: 'Top Up UC PUBG Mobile terpercaya.',
    price: 5000,
  },
];

export async function fetchSemuaProduk(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 10);
  });
}
