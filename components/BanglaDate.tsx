"use client";
import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/bn";

const subscribe = () => () => {};

export default function BanglaDate({
  className = "block min-h-4 text-xs text-base-content/60",
}: { className?: string }) {
  const date = useSyncExternalStore(subscribe, () => banglaDate(), () => "");
  return <span className={className}>{date}</span>;
}