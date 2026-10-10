import type { Product, Unit } from "@/types";
import { toBnDigits } from "./bn";

const UNIT_LABEL: Record<Unit, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const UNIT_SHORT: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitLabel = (u: Unit) => UNIT_LABEL[u] ?? u;
export const unitShort = (u: Unit) => UNIT_SHORT[u] ?? u;

const UP = "\u25B2"; // ▲
const DOWN = "\u25BC"; // ▼
const FLAT = "\u2014"; // —

// Figma অনুযায়ী: দাম বাড়লে লাল, কমলে সবুজ
export function changeBadge({ dir, pct }: Product["change"]) {
  const text = `${toBnDigits(Math.abs(pct).toFixed(1))}%`;
  if (dir === "up") {
    return { text: `${UP} ${text}`, cls: "badge-error", tone: "text-error" };
  }
  if (dir === "down") {
    return { text: `${DOWN} ${text}`, cls: "badge-success", tone: "text-success" };
  }
  return { text: `${FLAT} ${text}`, cls: "badge-ghost", tone: "text-base-content/60" };
}

// দাম বেড়েছে: সবচেয়ে বেশি বৃদ্ধি আগে
export const topRisers = (p: Product[], n = 6) =>
  p
    .filter((x) => x.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

// দাম কমেছে: সবচেয়ে বেশি পতন আগে
export const topFallers = (p: Product[], n = 6) =>
  p
    .filter((x) => x.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);

export type SortKey = "default" | "asc" | "desc";

export const sortProducts = (p: Product[], key: SortKey) =>
  key === "default"
    ? p
    : [...p].sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today));

// Price summary box + market table এর জন্য
export function marketStats(p: Product) {
  const rows = p.markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 }));
  const lowest = rows.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = rows.reduce((a, b) => (b.max > a.max ? b : a));
  return {
    rows,
    min: lowest.min,
    minMarket: lowest.market,
    max: highest.max,
    maxMarket: highest.market,
    avg: p.today, // Figma অনুযায়ী গড় = আজকের দাম
    diffFromYesterday: p.today - p.yesterday,
  };
}