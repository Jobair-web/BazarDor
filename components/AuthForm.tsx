"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

// শুধু নিজের সাইটের path এ redirect হতে দেবে
const safePath = (p: string | null) => (p && p.startsWith("/") && !p.startsWith("//") ? p : "/");

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safePath(params.get("redirect"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("reason") === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSignup) {
      if (!name.trim()) { toast.error("নাম লিখুন"); return; }
      if (password !== confirm) { toast.error("পাসওয়ার্ড দুটি মিলছে না"); return; }
    }
    if (password.length < 8) { toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"); return; }

    setLoading(true);
    const { error } = isSignup
      ? await authClient.signUp.email({ name: name.trim(), email, password })
      : await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || (isSignup ? "অ্যাকাউন্ট তৈরি করা যায়নি" : "সাইন ইন ব্যর্থ হয়েছে"));
      return;
    }
    toast.success(isSignup ? "অ্যাকাউন্ট তৈরি হয়েছে" : "সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 py-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</h1>
        <p className="mt-1 text-sm text-base-content/60">
          {isSignup
            ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
            : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
        </p>
      </div>

      <div className="card card-border bg-base-100">
        <form onSubmit={onSubmit} className="card-body gap-3">
          {isSignup && (
            <label className="block text-sm">
              <span className="mb-1 block">নাম</span>
              <input className="input w-full" placeholder="যেমন: রহিম উদ্দিন" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          )}
          <label className="block text-sm">
            <span className="mb-1 block">ইমেইল</span>
            <input type="email" required className="input w-full" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block">পাসওয়ার্ড</span>
            <input type="password" required className="input w-full" placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {isSignup && (
            <label className="block text-sm">
              <span className="mb-1 block">পাসওয়ার্ড নিশ্চিত করুন</span>
              <input type="password" required className="input w-full" placeholder="আবার লিখুন" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </label>
          )}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading && <span className="loading loading-spinner loading-sm" />}
            {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </button>

          <div className="divider my-1 text-xs">অথবা</div>
          <SocialButtons callbackURL={redirectTo} />

          <p className="text-center text-sm">
            {isSignup ? (
              <>অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-primary">সাইন ইন করুন</Link></>
            ) : (
              <>অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-primary">সাইন আপ করুন</Link></>
            )}
          </p>
        </form>
      </div>

      <p className="text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:underline">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}