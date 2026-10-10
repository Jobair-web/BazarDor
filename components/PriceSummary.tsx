import type { Product } from "@/types";
import { formatTaka } from "@/lib/bn";
import { marketStats, unitLabel } from "@/lib/product-utils";

export default function PriceSummary({ product }: { product: Product }) {
  const s = marketStats(product);
  const boxes = [
    { label: "সর্বনিম্ন দাম", value: s.min, note: `সবচেয়ে কম দামের বাজার: ${s.minMarket}`, tone: "text-success" },
    { label: "সর্বাধিক দাম", value: s.max, note: `সবচেয়ে বেশি দামের বাজার: ${s.maxMarket}`, tone: "text-error" },
    { label: "গড় দাম", value: s.avg, note: `${unitLabel(product.unit)}-এর হিসাবে`, tone: "text-success" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {boxes.map((b) => (
        <div key={b.label} className="rounded-box border border-base-300 p-4">
          <p className="text-xs text-base-content/60">{b.label}</p>
          <p className={`text-2xl font-bold ${b.tone}`}>{formatTaka(b.value)}</p>
          <p className="mt-1 text-xs text-base-content/60">{b.note}</p>
        </div>
      ))}
    </div>
  );
}