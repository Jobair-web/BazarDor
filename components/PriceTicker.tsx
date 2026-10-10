import { getProducts } from "@/lib/api";
import { formatTaka } from "@/lib/bn";
import { changeBadge, unitShort } from "@/lib/product-utils";

export default async function PriceTicker() {
  const products = await getProducts();
  const items = [...products, ...products]; // দুইবার, যাতে loop নিখুঁত হয়

  return (
    <div className="marquee overflow-hidden border-y border-base-300 bg-base-100 py-2 text-sm">
      <div className="marquee-track">
        {items.map((p, i) => {
          const b = changeBadge(p.change);
          return (
            <span
              key={`${p.id}-${i}`}
              className="flex items-center gap-2 border-r border-base-300 px-4 whitespace-nowrap"
            >
              <span>{p.image}</span>
              <span>{p.nameBn}</span>
              <span className="text-base-content/70">
                {formatTaka(p.today)}/{unitShort(p.unit)}
              </span>
              <span className={`font-medium ${b.tone}`}>{b.text}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}