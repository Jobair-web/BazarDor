"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { toBnDigits } from "@/lib/bn";
import { sortProducts, type SortKey } from "@/lib/product-utils";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  if (products.length === 0) {
    return <p className="rounded-box bg-base-100 p-8 text-center">এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।</p>;
  }

  return (
    <div className="space-y-4">
      <div className="card card-border bg-base-100 p-3">
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <p className="text-xs text-base-content/60">
        মোট {toBnDigits(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}