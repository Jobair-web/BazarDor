"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ defaultName }: { defaultName: string }) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error("নাম লিখুন"); return; }
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) { toast.error(error.message || "আপডেট করা যায়নি"); return; }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-body gap-3">
      <h2 className="font-semibold">তথ্য</h2>
      <label className="block text-sm">
        <span className="mb-1 block">নাম</span>
        <input className="input w-full" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading && <span className="loading loading-spinner loading-sm" />}
        আপডেট
      </button>
    </form>
  );
}