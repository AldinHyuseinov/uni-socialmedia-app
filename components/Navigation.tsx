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
    <nav className="sticky top-0 z-40 bg-brand-primary border-b border-brand-accent/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT SIDE: Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 text-xl font-black text-white tracking-widest uppercase hover:text-brand-accent transition-colors duration-300"
            >
              <CapIcon className="w-6 h-6" />
              STUDSU
            </Link>
          </div>

          {/* RIGHT SIDE: Dynamic Auth Area */}
          {session ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-white font-bold text-sm hidden sm:inline truncate max-w-45">
                Здравейте, {session.user.name}!
              </span>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="btn text-xs sm:text-sm px-3 py-1.5 sm:px-5 sm:py-2 transition-all active:scale-95"
                >
                  Изход
                </button>
              </form>
            </div>
          ) : (
            // LOGGED OUT STATE
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/signin"
                className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm hover:text-brand-accent transition-colors"
              >
                Вход
              </Link>

              <Link
                href="/signup"
                className="btn text-xs sm:text-sm px-3 py-1.5 sm:px-5 sm:py-2 transition-all active:scale-95 shadow-sm"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
