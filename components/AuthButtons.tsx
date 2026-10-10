import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-ghost btn-sm">সাইন ইন</Link>
      <Link href="/signup" className="btn btn-primary btn-sm">সাইন আপ</Link>
    </div>
  );
}