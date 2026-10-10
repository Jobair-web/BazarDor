export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-5 w-48" />
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-80 w-full" />
    </div>
  );
}