import { getProducts } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";
import { topFallers, topRisers } from "@/lib/product-utils";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="space-y-10">
      <Hero />
      <ProductSection
        title={<><span className="text-error">{"\u25B2"}</span> আজ দাম বেড়েছে</>}
        products={topRisers(products)}
      />
      <ProductSection
        title={<><span className="text-success">{"\u25BC"}</span> আজ দাম কমেছে</>}
        products={topFallers(products)}
      />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
        wide
      />
    </div>
  );
}