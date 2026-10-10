import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Avatar from "@/components/Avatar";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?reason=login-required&redirect=/profile");
  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/60">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>
      <div className="card card-border bg-base-100">
        <div className="card-body flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} image={user.image} size="size-16" />
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-base-content/60">{user.email}</p>
            </div>
          </div>
          <Link href="/profile/update" className="btn btn-primary btn-sm">তথ্য আপডেট করুন</Link>
        </div>
      </div>
    </div>
  );
}