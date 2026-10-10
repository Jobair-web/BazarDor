import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export default async function SignInPage() {
  if (await getSession()) redirect("/");
  return (
    <Suspense>
      <AuthForm mode="signin" />
    </Suspense>
  );
}