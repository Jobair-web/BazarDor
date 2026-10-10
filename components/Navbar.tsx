import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import BanglaDate from "./BanglaDate";
import CategoryNav from "./CategoryNav";
import NavAuth from "./NavAuth";

export default async function Navbar() {
  const categories = await getCategories();
  return (
    <header className="bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={40}
            height={40}
            className="size-10 rounded-xl object-contain"
          />
          <span>
            <span className="block text-lg font-bold leading-tight">বাজার দর</span>
            <BanglaDate />
          </span>
        </Link>
        <Suspense fallback={<div className="skeleton h-8 w-28" />}>
          <NavAuth />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <nav className="border-t border-base-300">
            <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
              {categories.map((c) => (
                <li key={c.id} className="shrink-0">
                  <Link href={`/category/${c.slug}`} className="btn btn-ghost btn-sm rounded-full">
                    <span>{c.icon}</span> {c.nameBn}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        <CategoryNav categories={categories} />
      </Suspense>
    </header>
  );
}