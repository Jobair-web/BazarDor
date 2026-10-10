import Link from "next/link";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category?.nameBn) {
    return (
      <div className="grid place-items-center gap-4 py-20 text-center">
        <span className="text-5xl">🔍</span>
        <h1 className="text-2xl font-bold">ক্যাটাগরিটি খুঁজে পাওয়া যায়নি</h1>
        <p className="text-base-content/60">আপনি যে ক্যাটাগরি খুঁজছেন তা নেই বা সরানো হয়েছে।</p>
        <Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card card-border flex-row items-center gap-4 bg-base-100 p-5">
        <span className="grid size-12 place-items-center rounded-xl bg-base-200 text-2xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            {toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <CategoryProducts products={products} />
    </div>
  );
}