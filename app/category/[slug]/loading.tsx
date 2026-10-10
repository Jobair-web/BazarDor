import ProductGridSkeleton from "@/components/ProductGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-20 w-full" />
      <div className="skeleton h-12 w-full" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}