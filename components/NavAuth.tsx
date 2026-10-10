import { getSession } from "@/lib/session";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

export default async function NavAuth() {
  const session = await getSession();
  return session ? <UserMenu user={session.user} /> : <AuthButtons />;
}