import type { Product } from "@/types";
import { formatTaka, toBnDigits } from "@/lib/bn";
import { marketStats } from "@/lib/product-utils";

const fmt = (n: number) =>
  Number.isInteger(n) ? formatTaka(n) : `${toBnDigits(n.toFixed(2))} টাকা`;

export default function MarketTable({ product }: { product: Product }) {
  const { rows } = marketStats(product);
  return (
    <div className="overflow-x-auto rounded-box border border-base-300">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>বাজার</th>
            <th>বিভাগ</th>
            <th className="text-right">সর্বনিম্ন</th>
            <th className="text-right">সর্বাধিক</th>
            <th className="text-right">গড়</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={m.market}>
              <td>{m.market}</td>
              <td>{m.division}</td>
              <td className="text-right">{fmt(m.min)}</td>
              <td className="text-right">{fmt(m.max)}</td>
              <td className="text-right font-semibold">{fmt(m.avg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}