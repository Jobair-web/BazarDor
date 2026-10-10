import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProduct } from "@/lib/api";
import { getSession } from "@/lib/session";
import { formatTaka } from "@/lib/bn";
import { changeBadge, unitLabel, unitShort } from "@/lib/product-utils";
import PriceSummary from "@/components/PriceSummary";
import MarketTable from "@/components/MarketTable";

export default async function ProductPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect(`/signin?reason=login-required&redirect=/product/${id}`);

  const p = await getProduct(id);
  if (!p?.nameBn) notFound();

  const diff = p.today - p.yesterday;
  const b = changeBadge(p.change);
  const diffText =
    diff > 0 ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatTaka(diff)}`
    : diff < 0 ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatTaka(-diff)}`
    : "গতকালের মতোই আছে";

  return (
    <div className="space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link href="/">হোম</Link></li>
          <li><Link href={`/category/${p.category}`}>{p.categoryNameBn}</Link></li>
          <li>{p.nameBn}</li>
        </ul>
      </div>

      <div className="card card-border bg-base-100">
        <div className="card-body flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-xl bg-base-200 text-4xl">{p.image}</span>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{p.nameBn}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-soft badge-primary">{p.categoryIcon} {p.categoryNameBn}</span>
                <span className="badge badge-outline">{unitLabel(p.unit)}</span>
              </div>
              <p className="text-sm text-base-content/60">{diffText}</p>
            </div>
          </div>
          <div className="rounded-box bg-base-200 p-4 text-center">
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold">{formatTaka(p.today)}</p>
            <p className="text-xs text-base-content/60">টাকা / {unitShort(p.unit)}</p>
            <p className={`mt-1 text-sm font-medium ${b.tone}`}>{b.text}</p>
          </div>
        </div>
      </div>

      <section className="card card-border bg-base-100 p-5">
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <PriceSummary product={p} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <MarketTable product={p} />
      </section>
    </div>
  );
}