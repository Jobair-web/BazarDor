import type { ReactNode } from "react";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
  id?: string;
  title: ReactNode;
  subtitle?: string;
  products: Product[];
  wide?: boolean; // বড় স্ক্রিনে ৪ কলাম
};

export default function ProductSection({ id, title, subtitle, products, wide }: Props) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>}
      <div className={`mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${wide ? "xl:grid-cols-4" : ""}`}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}