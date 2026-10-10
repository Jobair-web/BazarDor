import { cache } from "react";
import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "./auth";

export const getSession = cache(async () => {
  await connection(); // রিকোয়েস্টের সময় চালাও, prerender এ নয়
  return auth.api.getSession({ headers: await headers() });
});