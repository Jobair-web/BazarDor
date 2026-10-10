"use client";
import type { SortKey } from "@/lib/product-utils";

export default function SortSelect({
  value, onChange,
}: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center justify-end gap-2 text-sm">
      <span className="text-base-content/60">সাজান</span>
      <select
        className="select select-sm w-auto"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}