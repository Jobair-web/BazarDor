"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

type Props = { user: { name: string; email: string; image?: string | null } };

export default function UserMenu({ user }: Props) {
  const router = useRouter();
  const close = () => (document.activeElement as HTMLElement | null)?.blur();

  async function handleSignOut() {
    close();
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2">
        <Avatar name={user.name} image={user.image} size="size-7" />
        <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
      </div>
      <div tabIndex={0} className="dropdown-content z-50 mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg">
        <p className="font-semibold">{user.name}</p>
        <p className="truncate text-xs text-base-content/60">{user.email}</p>
        <div className="divider my-2" />
        <Link href="/profile" onClick={close} className="btn btn-ghost btn-sm w-full justify-start">
          <User size={16} /> আমার প্রোফাইল
        </Link>
        <button onClick={handleSignOut} className="btn btn-ghost btn-sm w-full justify-start text-error">
          <LogOut size={16} /> সাইন আউট
        </button>
      </div>
    </div>
  );
}