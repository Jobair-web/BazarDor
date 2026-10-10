import type { Product } from "@/types";
import { changeBadge } from "@/lib/product-utils";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const b = changeBadge(change);
  return <span className={`badge badge-soft badge-sm ${b.cls}`}>{b.text}</span>;
}