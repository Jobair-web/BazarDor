import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?reason=login-required&redirect=/profile/update");

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <div className="card card-border bg-base-100">
        <UpdateProfileForm defaultName={session.user.name} />
      </div>
    </div>
  );
}