import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { signOutAction } from "@/actions/auth-actions";
import { CapIcon } from "./Icons";

export default async function Navigation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="bg-brand-primary border-b border-brand-accent/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 p-4">
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-black text-white tracking-widest uppercase hover:text-blue-200 transition-colors duration-300"
            >
              <CapIcon />
              STUDSU
            </Link>
          </div>

          {session ? (
            <>
              <div className="flex items-center space-x-4">
                <span className="text-white font-bold">Здравейте, {session.user.name}!</span>
              </div>
              <form action={signOutAction}>
                <button type="submit" className="btn">
                  Изход
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/signup" className="btn">
                Регистрация
              </Link>

              <Link href="/signin" className="btn">
                Вписване
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
