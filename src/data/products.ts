export interface Product {
  id: string;
  slug: string;
  name: string;
  chip_amount: number;
  price: number;
  gimmick_price: number;
  image_url: string;
  badge?: string; // optional: "Best Seller", "Hemat", etc.
}

export const products: Product[] = [
  {
    id: "rd-001",
    slug: "chip-250k",
    name: "Chip 250K",
    chip_amount: 250000,
    price: 23000,
    gimmick_price: 28000,
    image_url: "/images/chip-250k.webp",
    badge: "Terlaris",
  },
  {
    id: "rd-002",
    slug: "chip-500k",
    name: "Chip 500K",
    chip_amount: 500000,
    price: 44000,
    gimmick_price: 52000,
    image_url: "/images/chip-500k.webp",
  },
  {
    id: "rd-003",
    slug: "chip-1m",
    name: "Chip 1 Juta",
    chip_amount: 1000000,
    price: 85000,
    gimmick_price: 100000,
    image_url: "/images/chip-1m.webp",
    badge: "Hemat",
  },
  {
    id: "rd-004",
    slug: "chip-2m",
    name: "Chip 2 Juta",
    chip_amount: 2000000,
    price: 165000,
    gimmick_price: 195000,
    image_url: "/images/chip-2m.webp",
  },
  {
    id: "rd-005",
    slug: "chip-5m",
    name: "Chip 5 Juta",
    chip_amount: 5000000,
    price: 400000,
    gimmick_price: 470000,
    image_url: "/images/chip-5m.webp",
    badge: "Paling Hemat",
  },
  {
    id: "rd-006",
    slug: "chip-10m",
    name: "Chip 10 Juta",
    chip_amount: 10000000,
    price: 780000,
    gimmick_price: 920000,
    image_url: "/images/chip-10m.webp",
  },
];

export async function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 10);
  });
}
