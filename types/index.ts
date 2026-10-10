export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export type ChangeDir = "up" | "down" | "flat";

export interface PriceChange {
  dir: ChangeDir;
  pct: number; // dir === "down" হলে ঋণাত্মক
}

export type Unit = "kg" | "litre" | "dozen" | "piece";

export interface MarketPrice {
  market: string;   // বাজারের নাম
  division: string; // বিভাগ
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;        // ক্যাটাগরির slug, যেমন "chal"
  categoryNameBn: string;
  categoryIcon: string;
  unit: Unit;
  image: string;           // emoji
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}