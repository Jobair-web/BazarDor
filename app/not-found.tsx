import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid place-items-center gap-4 py-20 text-center">
      <span className="text-6xl">🛒</span>
      <h1 className="text-3xl font-bold">৪০৪ — পেজ খুঁজে পাওয়া যায়নি</h1>
      <p className="text-base-content/60">আপনি যে পেজ বা পণ্য খুঁজছেন তা নেই বা সরানো হয়েছে।</p>
      <Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link>
    </div>
  );
}