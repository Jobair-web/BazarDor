import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-56 w-full" />
      <div className="skeleton h-6 w-40" />
      <ProductGridSkeleton />
      <div className="skeleton h-6 w-40" />
      <ProductGridSkeleton />
    </div>
  );
}