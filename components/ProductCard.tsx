import Link from "next/link";
import type { Product } from "@/types";
import { formatTaka } from "@/lib/bn";
import { unitLabel } from "@/lib/product-utils";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.id}`}
      className="card card-border bg-base-100 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="card-body gap-3 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-base-200 text-xl">{p.image}</span>
          <div>
            <h3 className="font-semibold leading-tight">{p.nameBn}</h3>
            <p className="text-xs text-base-content/60">{unitLabel(p.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold">{formatTaka(p.today)}</p>
          </div>
          <ChangeBadge change={p.change} />
        </div>
      </div>
    </Link>
  );
}